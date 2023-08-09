import { deployments, ethers, getNamedAccounts, network } from "hardhat"
//import FundMe from "../../deploy/01-deploy-fundme";
import { FundMe, MockV3Aggregator } from "../../typechain-types"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"

import { assert, expect } from "chai"
import { Deployment } from "hardhat-deploy/dist/types"
import { mock } from "node:test"
//import FundMe from "../../deploy/01-deploy-fundme"
//import networkConfig from "../../helper-hardhat-config"

describe("FundMe", async () => {
    let fundme: FundMe
    let deployer: string
    let mockV3: MockV3Aggregator
    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer

        await deployments.fixture(["all"])
        fundme = await ethers.getContract("FundMe", deployer)
        // console.log(fundme)
    })

    describe("constructor", async () => {
        it("sets the aggregator addresses correctly", async () => {
            let ethPriceFeeds: Deployment
            let ethpricefeedAddress: string
            const response = await fundme.priceFeed()
            //  console.log("is"+developmentChains)
            if (developmentChains.includes(network.name)) {
                ethPriceFeeds = await deployments.get("MockV3Aggregator")
                ethpricefeedAddress = ethPriceFeeds.address
                assert.equal(ethpricefeedAddress, response)
            } else {
                const ethPriceFeed: string =
                    networkConfig["11155111"]["ethUSDPriceFeed"]
                assert.equal(response, ethPriceFeed)
            }
        })
        it("sets the admin/owner of the contract correctly", async () => {
            const actualAddress: string = await fundme.i_owner()
            // console.log(actualAddress)
            const expectedAddress = deployer
            assert.equal(expectedAddress, actualAddress)
        })
    })
    describe("Payable fund function", async () => {
        it("Fail when the value is less than the minimum ETH required ", async () => {
            const value: bigint = await ethers.parseEther("0.000002")

            await expect(fundme.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
            // try {
            //      const tx = await fundme.fund({ value: value })
            //     // console.log(tx)

            // } catch (error) {
            //     //console.log(typeof error)
            //     if(typeof error=="object" && error != null && "message" in error){
            //        const errorMsg= (error as {message:string}).message

            //         assert.include(errorMsg, "You was")
            //        // assert.equal(errorMsg, "You are mad")

            //     }

            //     }
        })
        it("checks if the value of ETH passed by the msg.sender of fund function is equal to that of its mapping", async () => {
            const value = await ethers.parseEther("2")
            const tx = await fundme.fund({ value: value })
            await tx.wait(1)
            //console.log(deployer)
            const expectedValue = await fundme.addressToAmountFunded(deployer)
            assert.strictEqual(value, expectedValue)
        })
        it("checks the address element of the funders array is equal to the deployer after calling the func fund", async () => {
            const value = await ethers.parseEther("2")
            const tx = await fundme.fund({ value: value })
            const txnReceipt = await tx.wait(1)
            const addressGotten = await fundme.funders(0)
            // console.log(addressGotten)
            assert.equal(addressGotten, deployer)
        })
    })
    describe("withdraw function", async () => {
        let value: bigint
        beforeEach(async () => {
            value = await ethers.parseEther("2")
            // console.log(await fundme.runner?.provider?.getBalance(deployer))
            const tx = await fundme.fund({ value: value })
            const txnRecipt = await tx.wait(1)
            // console.log(txnRecipt)
        })
        it("Withdraw ETH from a single funder", async () => {
            const startingBalance = await ethers.provider.getBalance(
                fundme.target,
            )
            const startingDeployerBalance = await ethers.provider.getBalance(
                deployer,
            )
            console.log(await ethers.formatEther(startingBalance))
            const txR = await fundme.withdraw()
            const txRcpt = await txR.wait(1)
            const gasPrice: bigint = txRcpt?.gasPrice!
            const gasUsed: bigint = txRcpt?.gasUsed!

            const closingBalance = await ethers.provider.getBalance(
                fundme.target,
            )

            const endDeployerBalance = await ethers.provider.getBalance(
                deployer,
            )
            console.log(await ethers.formatEther(closingBalance))
            assert.equal(closingBalance, BigInt(0))
            assert.equal(
                startingBalance + startingDeployerBalance,
                endDeployerBalance + gasPrice * gasUsed,
            )
        })
        it("withdraw from multiple funders", async () => {
            //let contractConnected:FundMe
            const accounts = await ethers.getSigners()
            for (let i = 1; i <= 6; i++) {
                const contractConnected = fundme.connect(accounts[i])
                await contractConnected.fund({ value: value })
            }
            const startingBalance = await ethers.provider.getBalance(
                fundme.target,
            )
            const startingDeployerBalance = await ethers.provider.getBalance(
                deployer,
            )
            const balanceBfr = await ethers.provider.getBalance(deployer)
            console.log("Before" + balanceBfr)
            const txnRes = await fundme.withdraw()
            const txnRcpt = await txnRes.wait(1)
            const { gasPrice, gasUsed } = txnRcpt!
            const closingDeployerBalance = await ethers.provider.getBalance(
                deployer,
            )
            for (let i = 1; i <= 6; i++) {
                const values = await fundme.addressToAmountFunded(accounts[i])
                assert.equal(values, BigInt(0))
            }
            assert.equal(
                closingDeployerBalance + gasPrice * gasUsed,
                startingDeployerBalance + startingBalance,
            )
        })
        it("only allows the owner to withdraw",async () => {
             const accounts = await ethers.getSigners()
            const contractConnected = fundme.connect(accounts[1])
            // try {
            //     await contractConnected.withdraw()
            // } catch (error) {
            //     console.error(error)
            // }
           await expect(contractConnected.withdraw()).to.be.reverted
        })
    })
})
