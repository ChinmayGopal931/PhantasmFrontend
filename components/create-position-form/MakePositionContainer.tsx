import { Container, FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Flex, Heading, Text, Input, Spacer } from "@chakra-ui/react";
import { PositionSideTypes } from "../../types/PositionSide.types"; 
import { AssetAddressTypes, AssetSymbolTypes, StablecoinTypes } from "../../types/Asset.types";
import { BorrowFactorTypes } from "../../types/BorrowFactor.types";
import { CollateralTypes } from "../../types/Collateral.types";
import { InsuranceTypes } from "../../types/Insurance.types";
import { AssetSelector } from "./AssetSelector";
import { SideSelector } from "./SideSelector";
import { ExecuteModal } from "./ExecuteModal";
import { InsuranceSelect } from "./InsuranceSelect";
import { BorrowFactorSlider } from "./BorrowFactorSlider";
import { InfoBox } from "./InfoBox";
import { CollateralInput } from "./CollateralInput";
import { BorrowRateTypes } from "../../types/BorrowRate.types";
import { LoadingRatesTypes } from "../../types/Loading.types";
import { TokenPriceTypes } from "../../types/Asset.types";

export const MakePositionContainer = ({ isLong, setIsLong, assetAddress, setAssetAddress, assetSymbol, setAssetSymbol, assetLogo, setAssetLogo, assetDecimals, setAssetDecimals, borrowFactor, setBorrowFactor, stablecoinAddress, setStablecoinAddress, stablecoinSymbol, setStablecoinSymbol, stablecoinLogo, setStablecoinLogo, stablecoinDecimals, setStablecoinDecimals, collateralAmount, setCollateralAmount, isInsured, setIsInsured, insuranceAvailable, setInsuranceAvailable, borrowAPY, setBorrowAPY, isLoadingRates, assetPrice, stablecoinPrice }: PositionSideTypes & AssetAddressTypes & AssetSymbolTypes & BorrowFactorTypes & StablecoinTypes & CollateralTypes & InsuranceTypes & BorrowRateTypes & LoadingRatesTypes & TokenPriceTypes) => {
	return (
		<Container boxShadow="#a92258 0px 30px 42px -42px,  #3127a7 0px 50px 250px -47px" padding="20px" borderRadius="0.25rem" maxWidth="100%" border="1px solid" borderColor="#161522">
			<Flex margin="12px">
				<Box w="30%" pt="5px">
					<Heading fontSize="xl" mb="10px">
						Step 1
					</Heading>
					<Text fontSize="sm">Select Position Side</Text>
				</Box>
				<Spacer />
				<Box w="60%">
					<SideSelector isLong={isLong} setIsLong={setIsLong} />
				</Box>
			</Flex>

			<Flex margin="12px">
				<Box w="30%" pt="5px">
					<Heading fontSize="xl" mb="10px">
						Step 2
					</Heading>
					<Text fontSize="sm">Pick Token To {isLong ? "Go Long On" : "Short"}</Text>
				</Box>
				<Spacer />
				<Box w="60%">
					<AssetSelector assetAddress={assetAddress} setAssetAddress={setAssetAddress} assetSymbol={assetSymbol} setAssetSymbol={setAssetSymbol} assetLogo={assetLogo} setAssetLogo={setAssetLogo} assetDecimals={assetDecimals} setAssetDecimals={setAssetDecimals} />
				</Box>
			</Flex>

			<Flex margin="12px">
				<Box w="30%" pt="5px">
					<Heading fontSize="xl" mb="10px">
						Step 3
					</Heading>
					<Text fontSize="sm">Input Collateral Amount</Text>
				</Box>
				<Spacer />
				<Box w="60%">
					<CollateralInput isLong={isLong} assetSymbol={assetSymbol} assetLogo={assetLogo} stablecoinAddress={stablecoinAddress} setStablecoinAddress={setStablecoinAddress} stablecoinSymbol={stablecoinSymbol} setStablecoinSymbol={setStablecoinSymbol} stablecoinLogo={stablecoinLogo} setStablecoinLogo={setStablecoinLogo} collateralAmount={collateralAmount} setCollateralAmount={setCollateralAmount} stablecoinDecimals={stablecoinDecimals} setStablecoinDecimals={setStablecoinDecimals} assetAddress={assetAddress} />
				</Box>
			</Flex>

			<Flex margin="12px" marginTop="28px" marginBottom="28px">
				<Box w="30%" pt="5px"></Box>
				<Spacer />
				<Box w="60%">
					<InfoBox isLong={isLong} collateralAmount={collateralAmount} assetSymbol={assetSymbol} stablecoinSymbol={stablecoinSymbol} isLoadingRates={isLoadingRates} assetPrice={assetPrice} stablecoinPrice={stablecoinPrice} />
				</Box>
			</Flex>

			<Flex margin="12px" marginBottom="42px">
				<Box w="30%" pt="5px">
					<Heading fontSize="xl" mb="10px">
						Step 4
					</Heading>
					<Text fontSize="sm">Select Leverage Amount</Text>
				</Box>
				<Spacer />
				<Box w="60%">
					<BorrowFactorSlider borrowFactor={borrowFactor} setBorrowFactor={setBorrowFactor} />
				</Box>
			</Flex>

			<Flex margin="12px">
				<Box w="30%" pt="5px">
					<Heading fontSize="xl" mb="10px">
						Step 5
					</Heading>
					<Text fontSize="sm">Insure Your Position</Text>
				</Box>
				<Spacer />
				<Box w="60%">
					<InsuranceSelect isInsured={isInsured} setIsInsured={setIsInsured} insuranceAvailable={insuranceAvailable} setInsuranceAvailable={setInsuranceAvailable} isLoadingRates={isLoadingRates} isLong={isLong} assetAddress={assetAddress} stablecoinAddress={stablecoinAddress} />
				</Box>
			</Flex>

			<Flex margin="12px">
				<Box w="30%" pt="5px"></Box>
				<Spacer />
				<Box w="60%">
					<ExecuteModal isLong={isLong} assetAddress={assetAddress} assetSymbol={assetSymbol} assetLogo={assetLogo} borrowFactor={borrowFactor} stablecoinAddress={stablecoinAddress} stablecoinSymbol={stablecoinSymbol} stablecoinLogo={stablecoinLogo} collateralAmount={collateralAmount} isInsured={isInsured} insuranceAvailable={insuranceAvailable} borrowAPY={borrowAPY} assetPrice={assetPrice} stablecoinPrice={stablecoinPrice} />
				</Box>
			</Flex>
		</Container>
	);
};
