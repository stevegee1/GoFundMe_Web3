import { AddressLike } from "ethers";
import {getNamedAccounts, deployments,network,ethers  } from "hardhat";


const funStorage= async(contractAddress:AddressLike, position:number)=>{
    console.log(Uint8Array.from([position]))
   //const tx= await ethers.provider.getStorage(contractAddress, )


}
export default funStorage