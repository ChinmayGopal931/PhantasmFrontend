import { Tabs, TabList, Tab, TabPanels, TabPanel, Button, Container } from "@chakra-ui/react";
import { PositionSideTypes } from "../../types/PositionSide.types";

export const SideSelector = ({ isLong, setIsLong }: PositionSideTypes) => {
	return (
		<Container>
			<Tabs variant="soft-rounded">
				<TabList>
					<Tab onClick={() => setIsLong(true)} borderRadius="0.25rem" _selected={{ color: "white", bg: "green.400" }}>
						Long
					</Tab>
					<Tab onClick={() => setIsLong(false)} borderRadius="0.25rem" _selected={{ color: "white", bg: "red.400" }}>
						Short
					</Tab>
				</TabList>
			</Tabs>
		</Container>
	);
};
