import { keccak256 } from 'viem';
import { privateKeyToAccount } from "viem/accounts";



interface EthereumKeypair {
    addr: string;
    secret: string;
    nonce: number;
}

export function generateEthereumKeypairFromSeed(seed: string): EthereumKeypair {
    // Remove the extra space in the keccak input that was causing issues
    const privateKey = keccak256(
        `0x${Buffer.from(seed).toString('hex')}`
    ) as `0x${string}`

    // Get the account and extract just the address
    const account = privateKeyToAccount(privateKey)

    return {
        addr: account.address,  // Explicitly cast to Address type
        secret: privateKey,
        nonce: 0
    }
}

// Example usage
// const seed = "my-unique-seed";
// const keypair = generateEthereumKeypairFromSeed(seed);
// console.log('Ethereum Keypair:', keypair);

