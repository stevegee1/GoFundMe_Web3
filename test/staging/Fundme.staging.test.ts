import { assertArgument, ContractTransactionResponse } from "ethers"
import { getNamedAccounts, ethers, network, deployments } from "hardhat"
import { FundMe } from "../../typechain-types"
import { assert, expect } from "chai"
import { developmentChains } from "../../helper-hardhat-config"
import { HardhatRuntimeEnvironment } from "hardhat/types"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          const { log } = deployments
          let fundMe: FundMe
          let deployer: string
          const val: bigint = ethers.parseEther("0.2")

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              console.log(deployer)

              fundMe = await ethers.getContract("FundMe", deployer)
          })
        //   describe("fund contract", async () => {
        //       it("funds the contract with val", async () => {
        //           //   const tx = await fundMe.fund({
        //           //      value: val,
        //           //   })
        //           console.log(fundMe.target)
        //           //await tx.wait(1)
        //           const contractBalance: bigint =
        //               await ethers.provider.getBalance(fundMe.target)
        //           //  assert.equal(val, contractBalance)
        //           //  console.log(contractBalance.toString())
        //           const balance = ethers.formatEther(contractBalance)
        //           console.log(balance)
        //       })
        //   })
          describe("withdraw from the contract", async () => {
              it("withdraws the balance", async () => {
                  const deployerStartingBalance= await ethers.provider.getBalance(deployer)
                  const withdrawTxn = await fundMe.withdraw()
                //  await withdrawTxn.wait(1)

                  //the contract balance must be equal to zero after withdrawal
                  const contractBalance: bigint =
                      await ethers.provider.getBalance(fundMe.target)
                console.log(contractBalance)
                  assert.equal("0", contractBalance.toString())


                  //the deployer start balance == (deployer bal + contractBal + (gasPrice*gasUsed)) 
                    
                  //fundersArray must be empty

                  //AddresstoamountFunded must be empty

              })
          })
      })
