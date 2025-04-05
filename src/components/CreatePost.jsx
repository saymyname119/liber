import { useState } from 'react';
import { ethers } from 'ethers';

function CreatePost({ signer, contract }) {
  const [content, setContent] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setIsMinting(true);
    setError('');
    setSuccess('');

    try {
      if (!contract || !signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await contract.mintPost(
        await signer.getAddress(),
        content,
        "metadata.json",
        { gasLimit: 500000 } // Add explicit gas limit
      );
      
      await tx.wait();
      setSuccess('Post minted successfully!');
      setContent(''); // Clear input after success
      
    } catch (err) {
      console.error('Minting failed:', err);
      setError(err.reason || err.message || 'Failed to mint post');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          disabled={isMinting}
        />
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button 
          type="submit" 
          disabled={isMinting || !content.trim()}
        >
          {isMinting ? 'Minting...' : 'Post as NFT'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;