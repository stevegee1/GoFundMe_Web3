import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, DECIMAL,INITIAL_ANSWER,networkConfig } from "../helper-hardhat-config";
import {network} from "hardhat"

const FundMe= async(hre:HardhatRuntimeEnvironment)=>{
    const {getNamedAccounts, deployments,run}=hre
    const {deployer}= await getNamedAccounts()
    const {deploy,log}=deployments
let ethUSDpriceFeedAddress
if(developmentChains.includes(network.name)){
    const ethUSDpriceFeed= await deployments.get("MockV3Aggregator")
    ethUSDpriceFeedAddress=ethUSDpriceFeed.address

   
   
} else
{
      
ethUSDpriceFeedAddress=networkConfig["11155111"]["ethUSDPriceFeed"]
}

await deploy("FundMe", {
    from: deployer,
    args: [ethUSDpriceFeedAddress],
    log: true,
})



}
export default FundMe
FundMe.tags=["all", "fundme"]