// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import "hardhat/console.sol";

contract StreamBook is ERC721URIStorage {
    using Counters for Counters.Counter;
    using SafeMath for uint;
    using SuperTokenV1Library for ISuperToken;

    ISuperToken public token;
    Counters.Counter private _itemsSold;
    Counters.Counter private _tokenIds;

    uint256 listingPrice = 0.03 ether;
    int96 flowRate = 10 ** 15;
    address payable owner;

    struct MarketItem {
        uint256 tokenId;
        // address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address owner,
        uint256 price,
        bool sold
    );

    constructor(ISuperToken _token) ERC721("StreamBook Tokens", "STRM") {
        owner = payable(msg.sender);
        token = _token;
    }

    function updateListingPrice(uint _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function getNFTPrice(uint256 tokenId) public view returns (uint256) {
        return idToMarketItem[tokenId].price;
    }

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        payable(owner).transfer(listingPrice);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            // payable(address(this)),
            price,
            true
        );

        // approve(address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            // address(this),
            price,
            true
        );
    }

    function listToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        // idToMarketItem[tokenId].owner = payable(msg.sender);
        // idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        approve(address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function buy(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;
        // uint feePercent = SafeMath.div(2, 100);
        // uint fee = SafeMath.mul(price, feePercent);

        address tokenOwner = idToMarketItem[tokenId].owner;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        // idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        safeTransferFrom(tokenOwner, msg.sender, tokenId);
        // _transfer(address(this), msg.sender, tokenId);

        payable(tokenOwner).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchAllItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        // uint totalItemCount = _tokenIds.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            // if (idToMarketItem[i + 1].owner == address(this)) {
            // uint currentId = i + 1;
            MarketItem storage currentItem = idToMarketItem[i + 1];
            items[currentIndex] = currentItem;
            currentIndex += 1;
            // }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function read(uint256 tokenId) public {
        address receiver = idToMarketItem[tokenId].owner;
        token.createFlow(receiver, flowRate);
    }

    function stop(uint256 tokenId) public {
        address receiver = idToMarketItem[tokenId].owner;
        token.deleteFlow(msg.sender, receiver);
    }

    /* Returns only items a user has listed */
    // function fetchItemsListed() public view returns (MarketItem[] memory) {
    //     uint totalItemCount = _tokenIds.current();
    //     uint itemCount = 0;
    //     uint currentIndex = 0;

    //     for (uint i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].seller == msg.sender) {
    //             itemCount += 1;
    //         }
    //     }

    //     MarketItem[] memory items = new MarketItem[](itemCount);
    //     for (uint i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].seller == msg.sender) {
    //             uint currentId = i + 1;
    //             MarketItem storage currentItem = idToMarketItem[currentId];
    //             items[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return items;
    // }
}
