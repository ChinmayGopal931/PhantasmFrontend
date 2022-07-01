export const useGetPools = async (/* tokenAddress */) => {
	let assetPools;
	let tokens = [];
	let tokenAddressList = [];

	try {
		let response = await fetch("https://api.88mph.app/v3/pools");
		let jsonData = await response.json();
		for (let i = 0; i < jsonData.length; i++) {
			// tokens.push(jsonData[i]);
			if (!tokenAddressList.includes(jsonData[i].token)) {
				tokenAddressList.push(jsonData[i].token);
			}
			// if (jsonData[i].address == tokenAddress) {
			// 	assetPools.push(jsonData[i]);
			// }
		}
	} catch (error) {
		alert("There was an error getting insurance Pools:" + error);
	}

	return { assetPools, tokens, tokenAddressList };
};
