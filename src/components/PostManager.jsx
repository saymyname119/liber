// src/components/PostManager.jsx
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, POST_NFT_ABI, NETWORK_ID } from '../config';

export default function PostManager({ setSigner, setContract }) {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      // Check network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (parseInt(chainId, 16) !== NETWORK_ID) {
        alert(`Please switch to network with ID ${NETWORK_ID} in MetaMask`);
        return;
      }

      // Connect wallet
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Initialize contract
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        POST_NFT_ABI,
        signer
      );

      setSigner(signer);
      setContract(contract);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet");
    }
  };

  return (
    <button 
      onClick={connectWallet}
      className="connect-wallet-btn"
    >
      Connect Wallet
    </button>
  );
}