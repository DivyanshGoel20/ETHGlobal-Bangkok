
import { keccak256 } from 'viem';
import { privateKeyToAccount } from "viem/accounts";

// interface EthereumKeypair {
//     addr: string;
//     secret: string;
//     nonce: number;
// }

function generateEthereumKeypairFromSeed(seed) {
    // Derive a deterministic private key from the seed
    const privateKey = keccak256(`0x${Buffer.from(seed).toString('hex')}`);

    // Convert the private key to an Ethereum address
    const address = privateKeyToAccount(privateKey);

    // Generate a deterministic nonce (e.g., hash the seed and take part of it)
    const nonce = parseInt(0);

    return {
        addr: address,
        secret: privateKey,
        nonce: nonce,
    };
}

// Example usage
const seed = "my-unique-seed";
const keypair = generateEthereumKeypairFromSeed(seed);
console.log('Ethereum Keypair:', keypair);

