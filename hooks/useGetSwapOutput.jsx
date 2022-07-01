import { createClient } from "urql";
import { ChainId, Token, TokenAmount, Pair, TradeType, Route, Trade, Percent } from "@uniswap/sdk";

export const useGetSwapOutput = async (pairAddress, assetAddress, stablecoinAddress, inputAmount, isLong) => {
	const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

	const query = `
		query {
			pair(id: "${pairAddress}"){
				token0 {
					id
					symbol
					name
					decimals
					derivedETH
				}
				token1 {
					id
					symbol
					name
					decimals
					derivedETH
				}
				reserve0
				reserve1
				reserveUSD
				trackedReserveETH
				token0Price
				token1Price
				volumeUSD
				txCount
			}
		}
    `;

	const client = createClient({
		url: APIURL,
	});

	try {
		const response = await client.query(query).toPromise();
		console.log("Response: ", response);

		const asset = {};
		const stablecoin = {};

		const assetReserve = {};
		const stablecoinReserve = {};

		if (assetAddress.toLowerCase() == response.data.pair.token0.id.toLowerCase() && stablecoinAddress.toLowerCase() == response.data.pair.token1.id.toLowerCase()) {
			asset = response.data.pair.token0;
			assetReserve = response.data.pair.reserve0;

			stablecoin = response.data.pair.token1;
			stablecoinReserve = response.data.pair.reserve1;
		} else if (stablecoinAddress.toLowerCase() == response.data.pair.token0.id.toLowerCase() && assetAddress.toLowerCase() == response.data.pair.token1.id.toLowerCase()) {
			stablecoin = response.data.pair.token0;
			stablecoinReserve = response.data.pair.reserve0;

			asset = response.data.pair.token1;
			assetReserve = response.data.pair.reserve1;
		} else {
			alert("This failed");
			return;
		}

		const assetToken = new Token(ChainId.MAINNET, assetAddress, parseInt(asset.decimals), asset.symbol, asset.name);
		const stablecoinToken = new Token(ChainId.MAINNET, stablecoinAddress, parseInt(stablecoin.decimals), stablecoin.symbol, stablecoin.name);
		let trade;
		if (isLong) {
			const expandedAssetReserve = assetReserve * 10 ** asset.decimals;
			const expandedStablecoinReserve = stablecoinReserve * 10 ** stablecoin.decimals;
			console.log("Expanded Asset Reserve ", expandedAssetReserve);

			const asset_stablecoin = new Pair(new TokenAmount(assetToken, expandedAssetReserve), new TokenAmount(stablecoinToken, expandedStablecoinReserve));
			console.log("asset_stablecoin", asset_stablecoin);

			const stablecoin_to_asset = new Route([asset_stablecoin], stablecoinToken);
			console.log(stablecoin_to_asset);

			trade = new Trade(stablecoin_to_asset, new TokenAmount(stablecoinToken, "2000000000000000000000"), TradeType.EXACT_INPUT);
			console.log("Trade goes like this: ", trade);
		}

		const minOut = trade.minimumAmountOut(new Percent("50", "10000"));
		console.log("Min Out", minOut);
		const decimals = asset.decimals;

		return { minOut, decimals };
	} catch (error) {
		alert("There was an error fetching the trade data: ", error);
	}
};
