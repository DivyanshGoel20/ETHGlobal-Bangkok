import BLACJACK_CONTRACT from "../abi/blackjack";
import GASSLESS_CONTRACT from "../abi/gassless";
import { generateEthereumKeypairFromSeed } from "./telegram";
import { Chain, createPublicClient, parseEther } from 'viem';

import { decodeFunctionResult } from "viem";
import { flowTestnet } from "viem/chains";
export interface Contract {
    address: { [chainId: number]: string };
    abi: any; // Adjust this to the actual ABI type
    bytecode?: string;
}

// export const testTxn = async (primaryWallet) => {
//     const publicClient = await primaryWallet.getPublicClient();
//     const walletClient = await primaryWallet.getWalletClient();
//     try {
//         const { request, result } = await publicClient.simulateContract({
//             ...FlowDabContract,
//             functionName: "playSlot",
//             account: primaryWallet.address,
//         })
//         console.log("===>", result)
//         const hash = await walletClient.writeContract(request)
//         console.log(hash)
//         return { hash, result }
//     } catch (error) {
//         console.log("Error in play slot", error)
//     }
// }

export const executeProxyHit = async (primaryWallet, address) => {

    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();
    try {
        const { request, result } = await publicClient.simulateContract({
            address,//contract addresss state var
            abi: GASSLESS_CONTRACT.abi,
            functionName: "proxyHit",
            account: primaryWallet.address,
            args: [BigInt(2)]
        })
        console.log("===>", result)
        const hash = await walletClient.writeContract(request)
        console.log("Hash:", hash)
        return { hash, result, request }
    } catch (error) {
        console.log("Error in proxy hit:", error)
    }
}

export const executeStartGame = async (primaryWallet) => {

    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();
    try {
        const { request, result } = await publicClient.simulateContract({
            address: BLACJACK_CONTRACT.address,//contract addresss state var
            abi: BLACJACK_CONTRACT.abi,
            functionName: "startGame",
            args: [primaryWallet.address]
        })
        console.log("===>", request, primaryWallet.address)
        const hash = await walletClient.writeContract(request)
        console.log("Hash:", hash)
        let receipt = await publicClient.waitForTransactionReceipt({
            hash
        })
        console.log("Reciet:", receipt)
        return { hash, result, request }
    } catch (error) {
        console.log("Error in proxy hit:", error)
    }
}


// export const gasslessDeployOasis = async (primaryWallet, chainId) => {
//     const transport = sapphireHttpTransport();
//     const chain: Chain = {
//         blockExplorerUrls: ['https://explorer.oasis.io/testnet/sapphire'],
//         chainId: 23295,
//         chainName: 'Oasis Sapphire',
//         iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_oasis.jpg'],
//         name: 'Oasis',
//         nativeCurrency: {
//             decimals: 18,
//             name: 'Rose',
//             symbol: 'ROSE',
//         },
//         networkId: 23295,

//         rpcUrls: {
//             default: {
//                 http: ['https://testnet.sapphire.oasis.io']
//             }
//         },
//         vanityName: 'Oasis Sapphire',
//     }
//     const publicClient = createPublicClient({
//         chain, transport
//     });
//     const walletClient = await primaryWallet.getWalletClient();
//     const account = primaryWallet.address;
//     const keyPair = generateEthereumKeypairFromSeed(account)
//     console.log("Keypair", keyPair, account)
//     try {
//         // if (chainId != 23295) return "Not applicable"
//         let txn = await walletClient.deployContract({
//             abi: GASSLESS_CONTRACT.abi,
//             account,
//             bytecode: GASSLESS_CONTRACT.bytecode,
//             args: [
//                 [  // Note: Passing as array instead of object
//                     keyPair.addr,
//                     keyPair.secret,
//                     BigInt(keyPair.nonce)
//                 ],
//                 BLACJACK_CONTRACT.address
//             ],
//             value: parseEther('0.01')
//         })
//         console.log("Txn hash:", txn)
//         // Wait for the transaction to be mined
//         let receipt = await publicClient.waitForTransactionReceipt({
//             hash: txn
//         })
//         const contractAddress = receipt.contractAddress
//         console.log("Contract Add:", contractAddress);
//         let data = await executeProxyHit(primaryWallet, contractAddress).then((result) => {
//             return result?.result;
//         })

//         console.log(data)

//         // let executeTxn = await walletClient.sendTransaction({
//         //     data: data,
//         //     account,
//         //     to: BLACJACK_CONTRACT.address,
//         //     // functionName: "hit"
//         // });
//         // const testAdd = BLACJACK_CONTRACT.address
//         // console.log(typeof (BLACJACK_CONTRACT.address))
//         // let { request } = await publicClient.simulateContract({
//         //     account,
//         //     address: "0xAFD9f5c7c00A9e225f3f5aAD492bEbdeb31E0BB5",
//         //     abi: BLACJACK_CONTRACT.abi,
//         //     functionName: 'hit',
//         //     args: []
//         // });
//         // console.log(request)
//         const res = await walletClient.writeContract({
//             address: '0xAFD9f5c7c00A9e225f3f5aAD492bEbdeb31E0BB5',
//             abi: BLACJACK_CONTRACT.abi,
//             functionName: 'hit',
//             account,
//         })

//         console.log("Txn res:", res);

//         return res;
//     } catch (error) {
//         console.log("Error in gasless oasis:", error)
//     }
// }