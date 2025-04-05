// src/config.js
export const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Verify this matches your deployment
export const NETWORK_ID = 31337; // Hardhat local network ID
export const RPC_URL = "http://localhost:8546"; // Match your node port
export const DEFAULT_GAS_LIMIT = 500000; // Add gas limit for transactions

// Always import ABI from contract artifacts instead of hardcoding
import PostNFTAbi from "../artifacts/contracts/PostNFT.sol/PostNFT.json";

export const POST_NFT_ABI = PostNFTAbi.abi;

// Optional: Add helper functions
export const contractConfig = {
  address: CONTRACT_ADDRESS,
  abi: POST_NFT_ABI,
  networkId: NETWORK_ID,
  gasLimit: DEFAULT_GAS_LIMIT
};