// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface ITokenRoyalties {
    function royaltyInfo(
        uint256 tokenId,
        uint256 value
    )
        external
        view
        returns (
            address[] memory receivers,
            uint256[] memory royalties,
            uint256 totalAmount
        );
}