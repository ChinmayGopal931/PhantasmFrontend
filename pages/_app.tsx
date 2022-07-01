import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";

const appId: string = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_APP_ID as string;
const serverUrl: string = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_SERVER_URL as string;

const config = {
	initialColorMode: "dark",
};
const theme = extendTheme({ config });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MoralisProvider appId={appId} serverUrl={serverUrl}>
			<ChakraProvider theme={theme}>
				<Navbar />
				<Component {...pageProps} />
			</ChakraProvider>
		</MoralisProvider>
	);
}

export default MyApp;
