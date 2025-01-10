// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    uint8 private _customDecimals;

    constructor(string memory name, string memory symbol, uint8 decimal) ERC20(name, symbol) {
        _customDecimals = decimal;
        _mint(msg.sender, 1000000 * (10 ** uint256(decimal)));
    }


    function decimals() public view override returns (uint8) {
        return _customDecimals;
    }
}
