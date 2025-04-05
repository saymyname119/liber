// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PostNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Post {
        string contentHash; // IPFS hash of content
        address author;
        uint256 timestamp;
        string metadataURI;
    }

    mapping(uint256 => Post) public posts;

    constructor() ERC721("SocialNFT", "SNFT") {}

    function mintPost(
        address to,
        string memory contentHash,
        string memory metadataURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newPostId = _tokenIds.current();

        _mint(to, newPostId);
        
        posts[newPostId] = Post({
            contentHash: contentHash,
            author: msg.sender,
            timestamp: block.timestamp,
            metadataURI: metadataURI
        });

        return newPostId;
    }

    function getPost(uint256 tokenId) public view returns (Post memory) {
        return posts[tokenId];
    }
}