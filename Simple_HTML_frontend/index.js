import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js"
import { ABI, contractAddress } from "./constant.js"

document.getElementById("connectButton").onclick = connect
document.getElementById("fundButton").onclick = fund
document.getElementById("withdrawButton").onclick = withdraw


async function connect() {
    if (typeof window.ethereum !== undefined) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            console.log(accounts[0])
        } catch (error) {
            console.log(error)
        }

        document.getElementById("connectButton").innerHTML = "connected!"
    } else {
        document.getElementById("connectButton").innerHTML =
            "please install Metamask"
    }
}
async function fund() {
    var ethAmount = document.getElementById("fundInput").value

    console.log(`funding with ${ethAmount}...`)
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const value = ethers.parseEther(`${ethAmount}`)

        const signer = await provider.getSigner(1)
        const fundMeConnect = new ethers.Contract(contractAddress, ABI, signer)
        const fundMeTxn = await fundMeConnect.fund({ value: value })
        await fundMeTxn.wait(1)
        console.log("Transaction confirmed")
    } else {
        document.getElementById("connectButton").innerHTML =
            "please install Metamask"
    }

    /**
     * To interact with a contract, we need the following:
     * ABI, ContractAddress,Signer
     */
}
async function withdraw() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)

        const signer =await provider.getSigner(1)
        const fundMeConnect = new ethers.Contract(contractAddress, ABI, signer)
        const fundMeTxn = await fundMeConnect.withdraw()
        await fundMeTxn.wait(1)
        console.log("Transaction confirmed")
    } else {
        document.getElementById("connectButton").innerHTML =
            "please install Metamask"
    }
}
