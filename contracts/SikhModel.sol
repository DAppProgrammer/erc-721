//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract SikhModel is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIds;

    constructor() ERC721("Sikh Model", "Model") {}

    function mintNFT(address _recipient, string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        tokenIds.increment();
        uint256 tokenId = tokenIds.current();
        _mint(_recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        return tokenId;
    }
}
