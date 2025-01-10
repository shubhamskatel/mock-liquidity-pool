# Sample Hardhat Project

This MockLiquidityPool contract simulates a basic liquidity pool with functionalities to add/remove liquidity, swap tokens, and retrieve exchange rates or token liquidity. It maintains a mapping of token addresses to their liquidity amounts and enforces checks for sufficient liquidity during operations.

## Contracts

### MockLiquidityPool

The `MockLiquidityPool` contract simulates a liquidity pool with basic functionalities such as adding liquidity, removing liquidity, swapping tokens, and getting exchange rates.

### MockToken

The `MockToken` is just a sample token used for testing.

#### Functions:

- `addLiquidity(address token, uint256 amount)`: Adds liquidity for a specific token.
- `removeLiquidity(address token, uint256 amount)`: Removes liquidity for a specific token.
- `swap(address fromToken, address toToken, uint256 amount)`: Swaps a specified amount of one token for another.
- `getExchangeRate(address fromToken, address toToken)`: Returns the exchange rate between two tokens.
- `getLiquidity(address token)`: Returns the liquidity available for a specific token.

### MockToken

The `MockToken` contract is an ERC20 token with customizable decimals.

#### Constructor:

- `constructor(string memory name, string memory symbol, uint8 decimal)`: Initializes the token with a name, symbol, and decimal places.

#### Functions:

- `decimals()`: Returns the number of decimal places for the token.

## Running Tasks

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
