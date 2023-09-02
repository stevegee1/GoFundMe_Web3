import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//import "@nomicfoundation/hardhat-ethers"
import"hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "dotenv/config"

const SEPOLIA_URL= process.env.SEPOLIA_RPC_URL!
const PPRIVATE_KEY=process.env.PRIVATE_KEY!
const ETHERSCAN=process.env.ETHERSCAN_API_KEY!

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: " http://127.0.0.1:8545/",
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [PPRIVATE_KEY],
          
            
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gasEstimate.txt",
        noColors: true,
    },
}

export default config;
