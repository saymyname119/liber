// src/App.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PostManager from './components/PostManager';
import CreatePost from './components/CreatePost';
import { CONTRACT_ADDRESS, POST_NFT_ABI } from './config';
import './App.css';

function App() {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  // Expose contract to browser console safely
  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum && CONTRACT_ADDRESS) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          window.contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            POST_NFT_ABI,
            signer
          );

          // Verify connection
          const network = await provider.getNetwork();
          console.log('Connected to network:', network.name);
          
          // Optional: Add test methods to window
          window.getTotalPosts = async () => {
            return await window.contract.totalSupply();
          };

        } catch (error) {
          console.error('Console contract initialization failed:', error);
        }
      }
    };

    // Initialize when contract address exists
    if (CONTRACT_ADDRESS) {
      initContract();
    }
  }, []); // Empty dependency array = runs once on mount

  // Sync React state with window contract
  useEffect(() => {
    if (window.contract) {
      setContract(window.contract);
      window.contract.signer?.getAddress().then(setSigner);
    }
  }, [window.contract?.signer]); // Update when signer changes

  return (
    <div className="app">
      <h1>NFT Social Platform</h1>
      
      <PostManager 
        setSigner={setSigner}
        setContract={setContract}
      />

      {signer && (
        <CreatePost 
          signer={signer} 
          contract={contract} 
        />
      )}
    </div>
  );
}

export default App;