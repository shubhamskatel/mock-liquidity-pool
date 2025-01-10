// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILiquidityPool {
    function addLiquidity(address token, uint256 amount) external;
    function removeLiquidity(address token, uint256 amount) external;
    function swap(address fromToken, address toToken, uint256 amount) external;
    function getExchangeRate(address fromToken, address toToken) external view returns (uint256);
    function getLiquidity(address token) external view returns (uint256);
}

contract MockLiquidityPool is ILiquidityPool {
    mapping(address => uint256) public liquidity;

    function addLiquidity(address token, uint256 amount) external override {
        liquidity[token] += amount;
    }

    function removeLiquidity(address token, uint256 amount) external override {
        require(liquidity[token] >= amount, "Insufficient liquidity");
        liquidity[token] -= amount;
    }

    function swap(address fromToken, address toToken, uint256 amount) external override {
        require(liquidity[fromToken] >= amount, "Insufficient liquidity");
        liquidity[fromToken] -= amount;
        liquidity[toToken] += amount;
    }

    function getExchangeRate(address fromToken, address toToken) external view override returns (uint256) {
        return liquidity[toToken] / liquidity[fromToken];
    }

    function getLiquidity(address token) external view override returns (uint256) {
        return liquidity[token];
    }
}
