import { Container, List, ListItem, ListIcon, Skeleton } from "@chakra-ui/react";
import { CheckCircleIcon, AddIcon, MinusIcon, RepeatIcon } from "@chakra-ui/icons";
import { TokenPriceTypes } from "../../types/Asset.types";

type InfoBoxTypes = {
	isLong: boolean;
	collateralAmount: number;
	assetSymbol: string;
	stablecoinSymbol: string;
	isLoadingRates: boolean;
};

export const InfoBox = ({ isLong, collateralAmount, assetSymbol, stablecoinSymbol, isLoadingRates, assetPrice, stablecoinPrice }: InfoBoxTypes & TokenPriceTypes) => {
	return (
		<Container>
			<List spacing={3} border="1px solid" borderColor="#161522" borderRadius="0.25rem" p="12px" fontSize="sm">
				<ListItem>
					<ListIcon as={MinusIcon} color="green.500" />
					{collateralAmount} {isLong ? assetSymbol : stablecoinSymbol} collateral deposit
				</ListItem>
				<ListItem>
					<ListIcon as={AddIcon} color="green.500" />
					{assetPrice && stablecoinPrice && (
						<Skeleton display="inline-block" isLoaded={!isLoadingRates} startColor="#2d2bbc" endColor="#ff5ea7">
							{isLong ? (collateralAmount / assetPrice).toFixed(2) : (collateralAmount / stablecoinPrice).toFixed(2)} {isLong ? "DAI" : assetSymbol} loan
						</Skeleton>
					)}
				</ListItem>
				<ListItem>
					<ListIcon as={RepeatIcon} color="green.500" />
					Swap{" "}
					{assetPrice && stablecoinPrice && (
						<Skeleton mr="4px" display="inline-block" isLoaded={!isLoadingRates} startColor="#2d2bbc" endColor="#ff5ea7">
							{isLong ? (collateralAmount / assetPrice).toFixed(2) : (collateralAmount / stablecoinPrice).toFixed(2)} {isLong ? "DAI" : assetSymbol} for
						</Skeleton>
					)}
					{assetPrice && stablecoinPrice && (
						<Skeleton /* w="42px" height="14px" */ display="inline-block" isLoaded={!isLoadingRates} startColor="#2d2bbc" endColor="#ff5ea7">
							{isLong ? (collateralAmount / assetPrice / stablecoinPrice).toFixed(2) : (collateralAmount / stablecoinPrice / assetPrice).toFixed(2)} {isLong ? assetSymbol : "DAI"}
						</Skeleton>
					)}
				</ListItem>
				<ListItem>
					<ListIcon as={CheckCircleIcon} color="green.500" />
					Total Debt:{" "}
					{assetPrice && stablecoinPrice && (
						<Skeleton /* w="42px" height="14px" */ display="inline-block" isLoaded={!isLoadingRates} startColor="#2d2bbc" endColor="#ff5ea7">
							{isLong ? (collateralAmount / assetPrice).toFixed(2) : (collateralAmount / stablecoinPrice).toFixed(2)} {isLong ? "DAI" : assetSymbol}
						</Skeleton>
					)}
				</ListItem>
			</List>
		</Container>
	);
};
