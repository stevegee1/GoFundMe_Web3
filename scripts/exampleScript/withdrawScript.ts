import { ethers, getNamedAccounts } from "hardhat"
import { FundMe } from "../../typechain-types"
const withdrawScript = async () => {
    const { deployer } = await getNamedAccounts()
    const fundMe: FundMe = await ethers.getContract("FundMe", deployer)
    const withdrawTxn = await fundMe.withdraw()
    await withdrawTxn.wait(1)
    const contractBalance = await ethers.provider.getBalance(fundMe.target)
    console.log(contractBalance.toString())
}
withdrawScript()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })