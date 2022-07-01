import { createClient } from "urql";

export const useGetBorrowInterestRate = async (tokenAddress) => {
	const APIURL = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";

	const query = `
		query {
			reserves(where: {
				underlyingAsset: "${tokenAddress}"
			}) {
				name
				underlyingAsset
				
				liquidityRate 
				stableBorrowRate
				variableBorrowRate
				
				aEmissionPerSecond
				vEmissionPerSecond
				sEmissionPerSecond
				
				totalATokenSupply
				totalCurrentVariableDebt
			}
		}
    `;

	const client = createClient({
		url: APIURL,
	});

	try {
		// Collect Pool Data
		const response = await client.query(query).toPromise();

		let reserves = response.data.reserves;
		let pool = reserves[0];

		for (let i = 1; i < reserves.length; i++) {
			if (reserves[i].variableBorrowRate < pool.variableBorrowRate) {
				pool = reserves[i];
			}
		}

		console.log("Pool: ", pool);

		// Do Calculation
		const RAY = 10 ** 27; // 10 to the power 27
		const SECONDS_PER_YEAR = 31536000;

		// Deposit and Borrow calculations
		// APY and APR are returned here as decimals, multiply by 100 to get the percents

		const depositAPR = pool.liquidityRate / RAY;
		const variableBorrowAPR = pool.variableBorrowRate / RAY;
		const stableBorrowAPR = pool.variableBorrowRate / RAY;

		const depositAPY = (1 + depositAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;
		const variableBorrowAPY = (1 + variableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;
		const stableBorrowAPY = (1 + stableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;

		// Incentives calculation

		// const aEmissionPerYear = aEmissionPerSecond * SECONDS_PER_YEAR;
		// const vEmissionPerYear = vEmissionPerSecond * SECONDS_PER_YEAR;

		// const WEI_DECIMALS = 10 ** 18; // All emissions are in wei units, 18 decimal places

		// UNDERLYING_TOKEN_DECIMALS will be the decimals of token underlying the aToken or debtToken
		// For Example, UNDERLYING_TOKEN_DECIMALS for aUSDC will be 10**6 because USDC has 6 decimals

		// const constincentiveDepositAPRPercent = (100 * (aEmissionPerYear * REWARD_PRICE_ETH * WEI_DECIMALS)) / (totalATokenSupply * TOKEN_PRICE_ETH * UNDERLYING_TOKEN_DECIMALS);

		// const incentiveBorrowAPRPercent = (100 * (vEmissionPerYear * REWARD_PRICE_ETH * WEI_DECIMALS)) / (totalCurrentVariableDebt * TOKEN_PRICE_ETH * UNDERLYING_TOKEN_DECIMALS);

		return { depositAPR, variableBorrowAPR, stableBorrowAPR, depositAPY, variableBorrowAPY, stableBorrowAPY };
	} catch (error) {
		alert("There was an error fetching interest rates from the lender: ", error);
	}
};
