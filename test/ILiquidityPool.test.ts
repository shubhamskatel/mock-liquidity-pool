import { expect } from "chai";
import { ethers } from "hardhat";
import { MockToken, MockLiquidityPool } from "../typechain-types";

describe("ILiquidityPool", function () {
  let liquidityPool: MockLiquidityPool;
  let tokenA: MockToken, tokenB: MockToken;
  let owner: any, addr1: any;
  let liquidityPoolAddress: string;
  let tokenAAddress: string, tokenBAddress: string;
  beforeEach(async function () {
    // Deploy mock tokens and liquidity pool contract
    const Token = await ethers.getContractFactory("MockToken");
    tokenA = await Token.deploy("TokenA", "TKA", 18) as MockToken;
    tokenB = await Token.deploy("TokenB", "TKB", 18) as MockToken;
    tokenAAddress = await tokenA.getAddress();
    tokenBAddress = await tokenB.getAddress();
    console.log("TokenA address: ", tokenAAddress);
    console.log("TokenB address: ", tokenBAddress);

    const LiquidityPool = await ethers.getContractFactory("MockLiquidityPool");
    liquidityPool = await LiquidityPool.deploy() as MockLiquidityPool;
    liquidityPoolAddress = await liquidityPool.getAddress();
    console.log("Liquidity pool address: ", liquidityPoolAddress);
    [owner, addr1] = await ethers.getSigners();
  });

  describe("addLiquidity", function () {
    it("should add liquidity to the pool", async function () {
      await tokenA.approve(liquidityPoolAddress, 1000);
      await liquidityPool.addLiquidity(tokenAAddress, 1000);
      const balance = await liquidityPool.getLiquidity(tokenAAddress);
      expect(balance).to.equal(1000);
    });
  });

  describe("removeLiquidity", function () {
    it("should remove liquidity from the pool", async function () {
      await tokenA.approve(liquidityPoolAddress, 1000);
      await liquidityPool.addLiquidity(tokenAAddress, 1000);
      await liquidityPool.removeLiquidity(tokenAAddress, 500);
      const balance = await liquidityPool.getLiquidity(tokenAAddress);
      expect(balance).to.equal(500);
    });
  });

  describe("swap", function () {
    it("should swap tokens", async function () {
      await tokenA.approve(liquidityPoolAddress, 1000);
      await liquidityPool.addLiquidity(tokenAAddress, 1000);
      await liquidityPool.addLiquidity(tokenBAddress, 1000);
      await liquidityPool.swap(tokenAAddress, tokenBAddress, 100);
      const balanceA = await liquidityPool.getLiquidity(tokenAAddress);
      const balanceB = await liquidityPool.getLiquidity(tokenBAddress);
      expect(balanceA).to.equal(900);
      expect(balanceB).to.be.above(1000);
    });
  });

  describe("getExchangeRate", function () {
    it("should return the correct exchange rate", async function () {
      await tokenA.approve(liquidityPoolAddress, 1000);
      await liquidityPool.addLiquidity(tokenAAddress, 1000);
      await liquidityPool.addLiquidity(tokenBAddress, 1000);
      const rate = await liquidityPool.getExchangeRate(tokenAAddress, tokenBAddress);
      expect(BigInt(rate)).to.be.above(0n);

    });
  });
});
