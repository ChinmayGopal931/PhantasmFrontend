import { ChainId, Token, TokenAmount, Pair, TradeType, Route, Trade, Percent } from "@uniswap/sdk";

export const useGetPairAddress = (token0Address: string, token0Decimals: number, token1Address: string, token1Decimals: number) => {
	const tokenA = new Token(ChainId.MAINNET, token0Address, token0Decimals, "TKNA", "Token A"); // WETH
	const tokenB = new Token(ChainId.MAINNET, token1Address, token1Decimals, "TKNB", "Token B"); // DAI

	const pairAddress: string = Pair.getAddress(tokenA, tokenB);

	return pairAddress;
};
