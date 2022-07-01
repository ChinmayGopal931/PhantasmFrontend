import { Container, Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td, Button, Box } from "@chakra-ui/react";

const positions = [
	{ id: 187, side: "long", asset: "WFTM", amountIn: 1000, start: 1641759050, expiry: 1651003850, status: "active" },
	{ id: 193, side: "short", asset: "WETH", amountIn: 2000, start: 1642018250, expiry: 1644610250, status: "expired" },
	{ id: 199, side: "short", asset: "WETH", amountIn: 1500, start: 1644523850, expiry: 1644869450, status: "expired" },
];
export const MyPositionsTable = () => {
	const convertUnixToDate = (timestamp: number) => {
		let date = new Date(timestamp * 1000);
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();
		let symbolDate = `${month}/${day}/${year}`;
		let wordDate = new Date(symbolDate);
		let dateArr = wordDate.toDateString().split(" ");
		let dateFormat = dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
		return dateFormat;
	};

	return (
		<Container boxShadow="#a92258 0px 30px 42px -42px,  #3127a7 0px 50px 250px -47px" padding="20px" borderRadius="0.25rem" maxWidth="80%" border="1px solid" borderColor="#161522">
			<Table variant="simple" colorScheme="blue">
				<Thead>
					<Tr>
						<Th>Status</Th>
						<Th>Side</Th>
						<Th>Asset</Th>
						<Th isNumeric>Amount In</Th>
						<Th>Start Date</Th>
						<Th>End Date</Th>
						<Th>Close Position</Th>
					</Tr>
				</Thead>
				<Tbody>
					{positions.map((position, index) => {
						return (
							<Tr key={position.id}>
								<Td>
									<Box p="8px" borderRadius="0.25rem" backgroundColor={position.status == "active" ? "green.500" : "red.500"} display="inline-block">
										{position.status}
									</Box>
								</Td>
								<Td>{position.side}</Td>
								<Td>{position.asset}</Td>
								<Td isNumeric>{position.amountIn}</Td>
								<Td>{convertUnixToDate(position.start)}</Td>
								<Td>{convertUnixToDate(position.expiry)}</Td>
								<Td>
									<Button background="linear-gradient(90deg, #352db8, #ff5ea7)" _hover={{ background: "linear-gradient(150deg, #352db8, #ff5ea7)" }} isDisabled={position.status == "active" ? true : false}>
										Close Position
									</Button>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Container>
	);
};
