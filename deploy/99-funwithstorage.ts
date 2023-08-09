
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {network} from "hardhat"
import { BLOCK_CONFIRMATION, developmentChains } from "../helper-hardhat-config"
import Verify  from "../utils/verify"
import funStorage from "../scripts/exampleScript/funWithStorageScript"
import { keccak256 } from "ethers"


const funWithStorage= async(hre:HardhatRuntimeEnvironment)=>{

    const {getNamedAccounts, deployments,ethers}= hre
    const {deploy, log}= deployments
    const {deployer}= await getNamedAccounts()

    const x = await deploy("FunWithStorage", {
        from: deployer,
        log: true,
      // waitConfirmations:BLOCK_CONFIRMATION || 1
    })
    //  verify the contract
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await Verify(x.address,[], hre)
        console.log("verified")

    }
   for (let i=0; i<6; i++){
    await funStorage(x.address, i)
   }
   //const z= ethers.AbiCoder.defaultAbiCoder()
   const xz = await ethers.provider.getStorage(
       x.address,
    2
   )
   console.log("This is the array element.........................")
   console.log(xz)
  

}

export default funWithStorage
funWithStorage.tags= ["all", "storage"]
