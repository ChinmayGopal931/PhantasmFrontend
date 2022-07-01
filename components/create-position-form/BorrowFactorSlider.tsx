import { Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Box, Container, Text } from "@chakra-ui/react";
import { BorrowFactorTypes } from "../../types/BorrowFactor.types";
import { DragHandleIcon } from "@chakra-ui/icons";

export const BorrowFactorSlider = ({ borrowFactor, setBorrowFactor }: BorrowFactorTypes) => {
	return (
		<Container>
			<Text marginBottom="36px">
				<strong>Leverage Amount</strong>
			</Text>
			<Slider aria-label="slider-ex-6" onChange={(val) => setBorrowFactor(val)} min={10} value={borrowFactor}>
				<SliderMark value={25} mt="3" ml="-2.5" fontSize="sm">
					2.5x
				</SliderMark>
				<SliderMark value={50} mt="3" ml="-2.5" fontSize="sm">
					5x
				</SliderMark>
				<SliderMark value={75} mt="3" ml="-2.5" fontSize="sm">
					7.5x
				</SliderMark>
				<SliderMark value={borrowFactor} textAlign="center" bg="black" color="white" border="1px solid" borderColor="#161522" mt="-12" ml="-5" w="12">
					{borrowFactor / 10}x
				</SliderMark>
				<SliderTrack>
					<SliderFilledTrack bg="linear-gradient(90deg, #352db8, #ff5ea7)" />
				</SliderTrack>
				<SliderThumb boxSize={6}>
					<Box color="black" as={DragHandleIcon} />
				</SliderThumb>
			</Slider>
		</Container>
	);
};
