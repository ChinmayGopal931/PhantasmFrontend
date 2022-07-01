export const useGetAvailableInsurance = async (tokenAddress) => {
	let insurancePools = [];
	let insurancePoolAddresses = [];
	let totalInsuranceToken = 0;
	let totalInsuranceUsd = 0;

	try {
		let response = await fetch("https://api.88mph.app/v3/pools");
		let jsonData = await response.json();
		for (let i = 0; i < jsonData.length; i++) {
			if (tokenAddress.toLowerCase() == jsonData[i].token) {
				insurancePools.push(jsonData[i]);
			}
		}
		for (let i = 0; i < insurancePools.length; i++) {
			if (parseInt(insurancePools[i].totalValueLockedInUSD) > 0) {
				insurancePoolAddresses.push(insurancePools[i].address);
				console.log("Individual TVL USD: ", parseFloat(insurancePools[i].totalValueLockedInUSD));
				totalInsuranceToken += parseFloat(insurancePools[i].totalValueLockedInToken);
				totalInsuranceUsd += parseFloat(insurancePools[i].totalValueLockedInUSD);
			}
		}

		console.log("Insurance Pool Addresses: ", insurancePoolAddresses);
		console.log("totalInsuranceToken: ", totalInsuranceToken);
		console.log("totalInsuranceUsd: ", totalInsuranceUsd);

		return { insurancePoolAddresses, totalInsuranceToken, totalInsuranceUsd };
	} catch (error) {
		alert("There was an error getting insurance Pools:" + error);
	}
};
