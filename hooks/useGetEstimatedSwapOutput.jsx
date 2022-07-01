import { createClient } from "urql";

export const useGetEstimatedSwapOutput = async (pairAddress, assetAddress, stablecoinAddress, inputAmount, isLong) => {
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

	const response = await client.query(query).toPromise();

	let asset;
	let stablecoin;
	let assetPrice;
	let stablecoinPrice;

	if (assetAddress.toLowerCase() == response.data.pair.token0.id.toLowerCase() && stablecoinAddress.toLowerCase() == response.data.pair.token1.id.toLowerCase()) {
		asset = response.data.pair.token0;
		assetPrice = response.data.pair.token0Price;

		stablecoin = response.data.pair.token1;
		stablecoinPrice = response.data.pair.token1Price;
	} else if (stablecoinAddress.toLowerCase() == response.data.pair.token0.id.toLowerCase() && assetAddress.toLowerCase() == response.data.pair.token1.id.toLowerCase()) {
		stablecoin = response.data.pair.token0;
		stablecoinPrice = response.data.pair.token0Price;

		asset = response.data.pair.token1;
		assetPrice = response.data.pair.token1Price;
	}

	let amountOut;

	if (isLong) {
		amountOut = inputAmount / assetPrice;
	} else if (!isLong) {
		amountOut = inputAmount / stablecoinPrice;
	}

	console.log("Est Amount Out", amountOut);
	return { amountOut, assetPrice, stablecoinPrice };
};
