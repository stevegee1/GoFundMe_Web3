import { ethers, getNamedAccounts } from "hardhat"
import { FundMe } from "../../typechain-types"

const fundScript = async () => {
    
    const { deployer } = await getNamedAccounts()
    const fundMe:FundMe = await ethers.getContract("FundMe", deployer)
    const value= await ethers.parseEther("0.04")
    const fundTxn= await fundMe.fund({value:value})
    await fundTxn.wait(1)
    const contractBalance= await ethers.provider.getBalance(fundMe.target)
    console.log(contractBalance.toString())
}
fundScript()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
