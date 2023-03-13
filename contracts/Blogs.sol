// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

// import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";

// import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

// import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
// import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

contract Blogs is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public fees;

    // using CFAv1Library for CFAv1Library.InitData;
    // CFAv1Library.InitData public cfaV1;

    using SuperTokenV1Library for ISuperToken;

    int96 flowRate = 10 ** 15;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 fees_
    ) ERC721(name_, symbol_) {
        fees = fees_;
    }

    function safeMint(address to, string memory uri) public payable {
        require(msg.value >= fees, "Not enough MATIC");
        payable(owner()).transfer(fees);

        //Mint NFT

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        //Return oversupplied fees

        uint256 contractBalance = address(this).balance;

        if (contractBalance > 0) {
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    // Override Functions

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function read(uint256 tokenId, ISuperToken token) public {
        address receiver = ownerOf(tokenId);

        token.createFlowFrom(msg.sender, receiver, flowRate);
    }

    function stop(uint256 tokenId, ISuperToken token) public {
        address receiver = ownerOf(tokenId);

        token.deleteFlow(msg.sender, receiver);
    }
}
