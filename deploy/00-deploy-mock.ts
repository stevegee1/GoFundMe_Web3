import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, DECIMAL,INITIAL_ANSWER } from "../helper-hardhat-config";
import {network} from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types";

const deployMocks:DeployFunction= async(hre:HardhatRuntimeEnvironment)=>{
    const {getNamedAccounts, deployments}=hre
    const {deployer}= await getNamedAccounts()
    const {deploy,log}=deployments
    
    

if(developmentChains.includes(network.name)){
    log("Local network detected! Deploying mocks.........")
    const Mock = await deploy("MockV3Aggregator", {
        contract: "MockV3Aggregator",
        from: deployer,
        args: [DECIMAL,INITIAL_ANSWER],
        log: true,
    })

    log("MOCK DEPLOYED..............................")

}
    
}
export default deployMocks
deployMocks.tags=["all", "mock"]