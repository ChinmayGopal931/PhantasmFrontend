import { useState, ReactNode, useEffect } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Box, Flex, Avatar, HStack, Link, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useToast, Img } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon, UnlockIcon, LockIcon, ViewIcon, LinkIcon } from "@chakra-ui/icons";

const Links = ["Earn", "Yield", "Phantasm"];

const NavLink = ({ children }: { children: ReactNode }) => (
	<Link
		px={2}
		py={1}
		rounded={"md"}
		_hover={{
			textDecoration: "none",
			bg: useColorModeValue("gray.200", "gray.700"),
		}}
		href={"#"}
	>
		{children}
	</Link>
);

const chains = [
	{ name: "Ethereum Mainnet", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" },
	{ name: "Ethereum Testnet Ropsten", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" },
	{ name: "Ethereum Testnet Kovan", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" },
	{ name: "Ethereum Testnet Rinkeby", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" },
	{ name: "Ethereum Testnet Görli", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" },
	{ name: "Fantom Opera", logo: "https://assets.coingecko.com/coins/images/4001/small/Fantom.png?1558015016" },
	{ name: "Binance Smart Chain Mainnet", logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850" },
	{ name: "Binance Smart Chain Testnet", logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850" },
	{ name: "Polygon (Matic) Mainnet", logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912" },
	{ name: "Mumbai Testnet", logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912" },
	{ name: "Avalanche Mainnet", logo: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818" },
	{ name: "Avalanche Fuji Testnet", logo: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818" },
];

export const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { Moralis, user, isAuthenticated, logout, authenticate, web3, enableWeb3, isWeb3Enabled } = useMoralis();
	const { switchNetwork, chainId, chain } = useChain();
	const toast = useToast();
	const [chainLogo, setChainLogo] = useState<string | undefined>();

	const handleAuthenticate = async () => {
		if (user) {
			await logout();
			handleAuthToast(false);
		} else {
			await authenticate({ signingMessage: "Sign This Message To Log In And Prove You Hold The Private Keys To This Wallet. This will not cost you any gas." });
			handleAuthToast(true);
		}
	};

	const handleAuthToast = async (loggingIn: boolean) => {
		if (loggingIn) {
			toast({
				title: "Logged In",
				description: "You have successfully logged into Phantasm",
				status: "success",
				duration: 5000,
				isClosable: true,
				variant: "left-accent",
				position: "bottom-left",
			});
		} else if (!loggingIn) {
			toast({
				title: "Logged Out!",
				description: "You have successfully logged out of Phantasm",
				status: "info",
				duration: 5000,
				isClosable: true,
				variant: "left-accent",
				position: "bottom-left",
			});
		}
		return;
	};

	useEffect(() => {
		enableWeb3();
	}, []);

	useEffect(() => {
		if (!chain) {
			return;
		}

		for (let i = 0; i < chains.length; i++) {
			if (chain.name == chains[i].name) {
				setChainLogo(chains[i].logo);
				return;
			}
		}
	}, [chain]);

	return (
		<>
			<Box background="black" px={28} borderBottom="1px solid #161522">
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton size={"md"} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label={"Open Menu"} display={{ md: "none" }} onClick={isOpen ? onClose : onOpen} />
					<HStack spacing={8} alignItems={"center"}>
						<Box>
							<Img src={"/phantasm-logo.png"} width={50} height={50} />
						</Box>
						<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						{chain && (
							<Button variant={"ghost"} size={"md"} mr={4} /* leftIcon={<LinkIcon />} */ border="1px solid" borderColor="#161522">
								<Img src={chainLogo} width={30} height={30} mr="12px" />
								Connected To {chain.name}
							</Button>
						)}
						{!isAuthenticated && (
							<Button onClick={handleAuthenticate} variant={"solid"} background="linear-gradient(90deg, #352db8, #ff5ea7)" borderRadius="0.25rem" size={"sm"} mr={4} leftIcon={<UnlockIcon />}>
								Connect Wallet
							</Button>
						)}
						{isAuthenticated && (
							<Menu>
								<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
									<Avatar size={"sm"} style={{ color: "ActiveCaption", background: "linear-gradient(150deg, #352db8, #ff5ea7)" }} />
								</MenuButton>
								<MenuList borderRadius="0.25rem" backgroundColor="#161522">
									<MenuItem>
										<ViewIcon mr={2} />
										My Positions
									</MenuItem>
									<MenuDivider />
									<MenuItem onClick={logout}>
										<LockIcon mr={2} />
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						)}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};
