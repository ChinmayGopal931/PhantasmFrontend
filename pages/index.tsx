import { Flex, Box, Tabs, Tab, TabList, TabPanels, TabPanel, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { MainPage } from "../components/MainPage";
import { MyPositionsTable } from "../components/my-positions/MyPositionsTable";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>88mph - Phantasm</title>
				<meta name="description" content="Phantasm" />
				<link rel="icon" href="/phantasm-icon.png" />
			</Head>
			{/* <Box marginLeft="10%" marginTop="10px">
				<Heading bgGradient="linear(225deg, #ff5ea7 36.04%, #2d2bbc 88.83%, #ff6530 220.3%)" bgClip="text">
					Insure Leveraged Positions
				</Heading>
				<Text>Explain Here...</Text>
			</Box> */}

			<Box mt="10px" backgroundColor="black">
				<Tabs variant="line">
					<TabList pl="10%">
						<Tab>Create Position</Tab>
						<Tab id="my-positions-tab">My Positions</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Flex backgroundColor="black">
								<MainPage />
							</Flex>
						</TabPanel>
						<TabPanel>
							<MyPositionsTable />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</div>
	);
};

export default Home;
