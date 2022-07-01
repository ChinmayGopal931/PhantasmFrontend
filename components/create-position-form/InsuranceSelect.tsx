import { Container, Switch, FormControl, FormLabel, Box, Skeleton, List, ListItem, ListIcon, Badge } from "@chakra-ui/react";
import { InsuranceTypes } from "../../types/Insurance.types";
import { LockIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { LoadingRatesTypes } from "../../types/Loading.types";
import { AssetAddressTypes, StablecoinTypes } from "../../types/Asset.types";
import { PositionSideTypes } from "../../types/PositionSide.types";
import { useEffect, useState } from "react";
import { useGetAvailableInsurance } from "../../hooks/useGetAvailableInsurance";

type GetInsuranceTypes = {
	assetAddress: string;
	stablecoinAddress: string;
	isLong: boolean;
};

export const InsuranceSelect = ({ isInsured, setIsInsured, insuranceAvailable, setInsuranceAvailable, isLoadingRates, isLong, assetAddress, stablecoinAddress }: InsuranceTypes & LoadingRatesTypes & GetInsuranceTypes) => {
	const [loanAmountUsd, setLoanAmountUsd] = useState<number>(1000);

	useEffect(() => {
		async function getInsurance() {
			const { insurancePoolAddresses, totalInsuranceToken, totalInsuranceUsd }: any = await useGetAvailableInsurance(isLong ? stablecoinAddress : assetAddress);
			setInsuranceAvailable(totalInsuranceUsd);
		}
		getInsurance();
	}, [isInsured, assetAddress, stablecoinAddress, isLong]);

	return (
		<Container>
			<FormControl display="flex" alignItems="center" marginBottom="16px">
				<FormLabel htmlFor="email-alerts" mb="0">
					Insure With 88mph
				</FormLabel>
				<Switch
					isChecked={isInsured ? true : false}
					onChange={() => {
						if (isInsured) {
							setIsInsured(false);
						} else {
							setIsInsured(true);
						}
					}}
					colorScheme="teal"
				/>
			</FormControl>
			{isInsured && (
				<List spacing={3} border="1px solid" borderColor="#161522" borderRadius="0.25rem" p="12px" fontSize="sm">
					<Badge colorScheme={insuranceAvailable >= loanAmountUsd ? "green" : insuranceAvailable < loanAmountUsd && insuranceAvailable > 0 ? "purple" : "red"}>{insuranceAvailable >= loanAmountUsd ? "Fully Insured" : insuranceAvailable < loanAmountUsd && insuranceAvailable > 0 ? "Partially Insured" : "No Insurance Available"}</Badge>
					<ListItem>
						<ListIcon as={PlusSquareIcon} color="green.500" />
						<strong>Total Borrowings: </strong>
						<Skeleton display="inline-block" isLoaded={!isLoadingRates} startColor="#2d2bbc" endColor="#ff5ea7">
							${loanAmountUsd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
						</Skeleton>
					</ListItem>
					<ListItem>
						<ListIcon as={LockIcon} color="green.500" />
						<strong>Available Insurance: </strong>
						<Skeleton display="inline-block" isLoaded={!isLoadingRates} startColor="#2d2bbc" endColor="#ff5ea7">
							${insuranceAvailable.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
						</Skeleton>
					</ListItem>
				</List>
			)}
		</Container>
	);
};
