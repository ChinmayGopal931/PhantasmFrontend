import React, { useEffect, useState, useRef, useMemo } from "react";
import { Select, Menu, MenuButton, MenuList, MenuItem, Image, Button, Container, Flex, Input, Box, Center } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useMoralis, useChain } from "react-moralis";
import { AssetAddressTypes, AssetSymbolTypes } from "../../types/Asset.types";
import { useGetPools } from "../../hooks/useGetPools";

type AssetSelectorTypes = {
	assetPools: any;
	tokens: { address: string; token: string; tokenSymbol: string; protocol: string; oneYearInterestRate: string; mphAPY: string; totalValueLockedInToken: string; totalValueLockedInUSD: string }[] | undefined;
	tokenAddressList: string[] | undefined;
};

export const AssetSelector = ({ assetAddress, setAssetAddress, assetSymbol, setAssetSymbol, assetLogo, setAssetLogo, assetDecimals, setAssetDecimals }: AssetAddressTypes & AssetSymbolTypes) => {
	const { switchNetwork, chainId, chain } = useChain();
	const { Moralis, isInitialized } = useMoralis();
	const [tokenAddressList, setTokenAddressList] = useState<string[] | undefined>();
	const [tokenListMetadata, setTokenListMetadata] = useState<any[]>();
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		// getPools();
		if (!isInitialized || !chain) {
			return;
		}
		getTokenListMetadata();
	}, [isInitialized, chain]);

	// const getPools = async () => {
	// 	let { assetPools, tokens, tokenAddressList }: AssetSelectorTypes = await useGetPools();
	// 	setTokenAddressList(tokenAddressList);
	// };

	const getTokenListMetadata = async () => {
		if (!isInitialized || !chain) {
			return;
		}
		let { assetPools, tokenAddressList }: AssetSelectorTypes = await useGetPools();
		setTokenAddressList(tokenAddressList);
		const options: any = { chain: chain?.shortName, addresses: tokenAddressList };
		let tokens = await Moralis.Web3API.token.getTokenMetadata(options);
		setTokenListMetadata(tokens);
		console.log("This is the metadata");
		console.log(tokenListMetadata);
	};

	const getSelectedTokenMetadata = async (address: string) => {
		const options: any = { chain: chain?.shortName, addresses: [tokenAddressList] };
		let assetMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
		setAssetSymbol(assetMetadata[0].symbol);
		setAssetLogo(assetMetadata[0].logo);
	};

	const handleAssetSelection = async (address: string) => {
		setAssetAddress(address);
		const options: any = { chain: chain?.shortName, addresses: address };
		let assetMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
		setAssetSymbol(assetMetadata[0].symbol);
		setAssetLogo(assetMetadata[0].logo);
	};

	// const getAssetMetadata = async () => {
	// 	const options: any = { chain: chain?.chainId, addresses: assetAddress };
	// 	let assetMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
	// 	setAssetSymbol(assetMetadata[0].symbol);
	// 	setAssetLogo(assetMetadata[0].logo);
	// };

	return (
		<Container>
			<Menu>
				<MenuButton as={Button} borderRadius="0.25rem" rightIcon={<ChevronDownIcon />} border="1px solid" borderColor="#161522" background="black" paddingY="24px" _active={{ background: "linear-gradient(150deg, #352db8, #ff5ea7)" }} _hover={{ background: "transparent" }}>
					<Flex align="center">
						<Image boxSize="2rem" borderRadius="full" src={assetLogo} mr="12px" />
						{assetSymbol}
					</Flex>
				</MenuButton>
				<MenuList id="tokenDropdown" backgroundColor="#161522" height="260px" minWidth="270px" overflowY="scroll">
					<Center marginBottom="6px">
						<Input id="tokenSearchBar" width="95%" placeholder="Search Name or Address..." onChange={(event) => setSearchTerm(event.target.value)} />
					</Center>
					{tokenListMetadata?.map((token, index) => {
						if (searchTerm == "" || token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || token.name.toLowerCase().includes(searchTerm.toLowerCase()) || token.address.toLowerCase().includes(searchTerm.toLowerCase())) {
							return (
								<MenuItem
									key={index}
									minH="48px"
									onClick={() => {
										setAssetDecimals(token.decimals);
										setAssetAddress(token.address);
										setAssetSymbol(token.symbol);
										setAssetLogo(token.logo);
									}}
								>
									<Image boxSize="2rem" borderRadius="full" src={token.logo} mr="12px" />
									<span>{token.name}</span>
								</MenuItem>
							);
						}
					})}
				</MenuList>
			</Menu>
		</Container>
	);
};
