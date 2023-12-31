# GoFundMe
This contract utilized the power of decentralization through smartcontracts (solidity) and chainlink pricefeed to setup a GoFundMe platform with the minimum of 50USD from funder

# Getting Started
## Requirements
* [git](https://git-scm.com/)
   ** run `git --version` to see the version if you already have git installed.
* [Nodejs] (https://nodejs.org/en/)
   - run `node --version` to check if you already have nodejs installed
* [yarn] (https://yarnpkg.com/getting-started/install)
   - run `yarn --version` to check if you already have yarn installed
   
# Quickstart
- ` git clone https://github.com/stevegee1/GoFundMe_Web3.git`
- ` cd GoFundMe_Web3`
- `yarn `

# Usage

## Deploy (default network - hardhat):
- `yarn hardhat deploy`

## Testing:
- `yarn hardhat testing`
## Test Coverage:
- `yarn hardhat coverage`

# Deployment to a testnet or mainnet:
1. Setup environment variable
 - You will want to set your RPC_SEPOLIA_URL/RPC_Mainnet_URL: [Alchemy](https://www.alchemy.com/)
   + [Infura](https://www.infura.io/)) or any EVM_Compatible RPC
 - PRIVATE_KEY: The private key of your account (like from [metamask](https://metamask.io/))
 __NOTE: FOR DEVELOPMENT, USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT__

2. Get testnet ETH (for [testnet](https://faucets.chain.link/))
3. Set [ETHERSCAN_API_KEY](https://etherscan.io/myapikey)
4. Deploy
 - `yarn hardhat deploy --network sepolia`

## Scripts
After deploy to a testnet, you can run the following scripts after deploy to a testnet:
- fund contract: `yarn run fundScriptSepolia`
- withdraw contractBalance: `yarn run withdrawScriptSepolia`

## Estimate gas
You can estimate how much gas cost by running:
`yarn hardhat test`, with the output file `gasEstimate.txt`

## Verify on EtherScan
If you deploy to a mainnet or testnet, by running `yarn hardhat deploy`, verification script is called

   





