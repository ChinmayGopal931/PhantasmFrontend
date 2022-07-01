import { useEffect, useState } from "react";
import { Flex, Spacer, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Container, Button } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { MakePositionContainer } from "./create-position-form/MakePositionContainer";
import { useGetBorrowInterestRate } from "../hooks/useGetBorrowInterestRate";
import { useGetPairAddress } from "../hooks/useGetPairAddress";
import { useGetSwapOutput } from "../hooks/useGetSwapOutput";
import { useGetEstimatedSwapOutput } from "../hooks/useGetEstimatedSwapOutput";
import { useGetAvailableInsurance } from "../hooks/useGetAvailableInsurance";
import { TokenPriceTypes } from "../types/Asset.types";
import { useMoralis } from "react-moralis";

export const MainPage = () => {
	const { Moralis } = useMoralis();
	const [isLong, setIsLong] = useState<boolean>(true);
	const [assetAddress, setAssetAddress] = useState<string>("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"); // WFTM
	const [assetSymbol, setAssetSymbol] = useState<string>("WETH");
	const [assetLogo, setAssetLogo] = useState<string | undefined>("https://etherscan.io/token/images/weth_28.png");
	const [assetDecimals, setAssetDecimals] = useState<number | undefined>(18);
	const [stablecoinAddress, setStablecoinAddress] = useState<string>("0x6B175474E89094C44Da98b954EedeAC495271d0F"); // DAI
	const [stablecoinSymbol, setStablecoinSymbol] = useState<string>("DAI");
	const [stablecoinLogo, setStablecoinLogo] = useState<string | undefined>("https://etherscan.io/token/images/MCDDai_32.png"); // DA
	const [stablecoinDecimals, setStablecoinDecimals] = useState<number | undefined>(18);
	const [collateralAmount, setCollateralAmount] = useState<number>(1);
	const [borrowFactor, setBorrowFactor] = useState<number>(20);
	const [isInsured, setIsInsured] = useState<boolean>(false);
	const [insuranceAvailable, setInsuranceAvailable] = useState<number>(0);
	const [borrowAPY, setBorrowAPY] = useState<number | undefined>();
	const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);
	const [pairAddress, setPairAddress] = useState<string | undefined>();
	const [assetPrice, setAssetPrice] = useState<number | undefined>();
	const [stablecoinPrice, setStablecoinPrice] = useState<number | undefined>();

	useEffect(() => {
		if (!assetAddress || !stablecoinAddress) {
			return;
		}

		const getBorrowRates = async (tokenAddress: any) => {
			setIsLoadingRates(true);
			const { variableBorrowAPY }: any = await useGetBorrowInterestRate(tokenAddress);
			setBorrowAPY(variableBorrowAPY);
			setIsLoadingRates(false);
		};
		getBorrowRates(isLong ? stablecoinAddress : assetAddress);
	}, [assetAddress, stablecoinAddress, isLong]);

	useEffect(() => {
		async function getPairAddress() {
			if (!assetAddress || !stablecoinAddress || !assetDecimals || !stablecoinDecimals) {
				return;
			}
			const pair = await useGetPairAddress(assetAddress, assetDecimals, stablecoinAddress, stablecoinDecimals);
			console.log(pair.toLowerCase());
			setPairAddress(pair);
			const { assetPrice, stablecoinPrice }: TokenPriceTypes = await useGetEstimatedSwapOutput(pair.toLowerCase(), assetAddress, stablecoinAddress, collateralAmount, isLong);
			setAssetPrice(assetPrice);
			setStablecoinPrice(stablecoinPrice);
		}
		getPairAddress();
	}, [assetAddress, stablecoinAddress, isLong]);

	return (
		<Flex w="100%" marginY="30px" marginX="80px">
			<Box w="30%">
				<Sidebar isLong={isLong} assetAddress={assetAddress} assetSymbol={assetSymbol} stablecoinSymbol={stablecoinSymbol} collateralAmount={collateralAmount} assetLogo={assetLogo} borrowFactor={borrowFactor} setBorrowFactor={setBorrowFactor} isInsured={isInsured} insuranceAvailable={insuranceAvailable} borrowAPY={borrowAPY} isLoadingRates={isLoadingRates} />
			</Box>
			<Spacer />

			<Box w="60%">
				<MakePositionContainer
					isLong={isLong}
					setIsLong={setIsLong}
					assetAddress={assetAddress}
					setAssetAddress={setAssetAddress}
					assetSymbol={assetSymbol}
					setAssetSymbol={setAssetSymbol}
					assetLogo={assetLogo}
					setAssetLogo={setAssetLogo}
					assetDecimals={assetDecimals}
					setAssetDecimals={setAssetDecimals}
					borrowFactor={borrowFactor}
					setBorrowFactor={setBorrowFactor}
					stablecoinAddress={stablecoinAddress}
					setStablecoinAddress={setStablecoinAddress}
					stablecoinSymbol={stablecoinSymbol}
					setStablecoinSymbol={setStablecoinSymbol}
					stablecoinLogo={stablecoinLogo}
					setStablecoinLogo={setStablecoinLogo}
					stablecoinDecimals={stablecoinDecimals}
					setStablecoinDecimals={setStablecoinDecimals}
					collateralAmount={collateralAmount}
					setCollateralAmount={setCollateralAmount}
					isInsured={isInsured}
					setIsInsured={setIsInsured}
					insuranceAvailable={insuranceAvailable}
					setInsuranceAvailable={setInsuranceAvailable}
					borrowAPY={borrowAPY}
					setBorrowAPY={setBorrowAPY}
					isLoadingRates={isLoadingRates}
					assetPrice={assetPrice}
					stablecoinPrice={stablecoinPrice}
				/>
			</Box>
		</Flex>
	);
};
