export const useGet88Graph = async () => {
	const APIURL = "https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph-v3";

	const query = `
        query
    `;

	const client = createClient({
		url: APIURL,
	});

	try {
		const response = await client.query(query).toPromise();
		console.log("response: ", response);
	} catch (error) {
		alert("There was an error retrieving data from the 88mph subgraph", error);
	}
	return ({ response } = fetchData());
};
