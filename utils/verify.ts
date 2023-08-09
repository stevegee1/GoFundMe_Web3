import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
    developmentChains,
    DECIMAL,
    INITIAL_ANSWER,
    networkConfig,
} from "../helper-hardhat-config"
import { network } from "hardhat"


interface errorM {
    message:string
}

const Verify = async (contractAddress:string,arry:unknown[],hre: HardhatRuntimeEnvironment) => {
    
    const { getNamedAccounts, deployments, run } = hre
   try{
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments:arry ,
            })
        } catch (error:unknown) {
            
             if(typeof error =="object" && error !=null && "message" in error){
                const errorMsg= (error as {message:unknown}).message
                if(typeof errorMsg == "string" && errorMsg.toLowerCase().includes("already verified")){
                    console.log("Already verified!")
                }
                else{
                    console.log()
                }
             }
             else
             {
                console.error(error)
             }
            
            
        }
       // log("Contract verified.............")
    }

export default Verify

