export type AssetAddressTypes = {
	assetAddress: string;
	setAssetAddress: React.Dispatch<React.SetStateAction<string>>;
};

export type AssetSymbolTypes = {
	assetSymbol: string;
	setAssetSymbol: React.Dispatch<React.SetStateAction<string>>;
	assetLogo: string | undefined;
	setAssetLogo: React.Dispatch<React.SetStateAction<string | undefined>>;
	assetDecimals: number | undefined;
	setAssetDecimals: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export type StablecoinTypes = {
	stablecoinAddress: string;
	setStablecoinAddress: React.Dispatch<React.SetStateAction<string>>;
	stablecoinSymbol: string;
	setStablecoinSymbol: React.Dispatch<React.SetStateAction<string>>;
	stablecoinLogo: string | undefined;
	setStablecoinLogo: React.Dispatch<React.SetStateAction<string | undefined>>;
	stablecoinDecimals: number | undefined;
	setStablecoinDecimals: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export type TokenPriceTypes = {
	assetPrice: number | undefined;
	stablecoinPrice: number | undefined;
};
