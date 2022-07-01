import { Container, Heading, Text, Box, Image, Skeleton } from "@chakra-ui/react";
import { PositionSideTypes } from "../types/PositionSide.types";
import { AssetAddressTypes, AssetSymbolTypes } from "../types/Asset.types";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { BorrowFactorTypes } from "../types/BorrowFactor.types";

type SideBarTypes = {
	isLong: boolean;
	assetAddress: string;
	assetSymbol: string;
	assetLogo: string | undefined;
	stablecoinSymbol: string;
	collateralAmount: number;
	isInsured: boolean;
	insuranceAvailable: number;
	borrowAPY: number | undefined;
	isLoadingRates: boolean;
};

export const Sidebar = ({ isLong, assetAddress, assetSymbol, assetLogo, stablecoinSymbol, collateralAmount, borrowFactor, setBorrowFactor, isInsured, insuranceAvailable, borrowAPY, isLoadingRates }: SideBarTypes & BorrowFactorTypes) => {
	return (
		<Container padding="10">
			{borrowAPY && (
				<>
					<Heading as="h3" fontSize="xl">
						{isLong ? "DAI" : assetSymbol} Estimated Borrow APY
					</Heading>
					<Skeleton isLoaded={!isLoadingRates} startColor="#2d2bbc" endColor="#ff5ea7">
						<Text fontSize="5xl">
							<strong>{(borrowAPY * 100).toFixed(2)}%</strong>
						</Text>
					</Skeleton>
				</>
			)}

			{/* <Text fontSize="xl">Borrowed Token: DAI</Text> */}
			<Box height="100px" />
			<Box borderLeft="1px solid" borderColor="#161522" pl="20px">
				<InfoOutlineIcon mb="12px" w={5} h={5} />
				<Text verticalAlign="bottom" fontSize="m">
					{borrowFactor / 10}x {isInsured && "insured"} leveraged <strong>{isLong ? "long" : "short"}</strong> position on <Image display="inline" boxSize="1rem" src={assetLogo} />
					<strong>
						{"  "}
						{isLong && collateralAmount}
						{assetSymbol}
					</strong>
					{!isLong && ` from a ${collateralAmount}${stablecoinSymbol} collateral deposit.`}
				</Text>
				<br />
				<Text>{isInsured && `Insurance Available: $${insuranceAvailable.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Text>
			</Box>
		</Container>
	);
};
