# Phantasm Frontend

**Phantasm Is Still In Development. Do not use mainnet funds.**

First, to install depencies locally, run:

```bash
yarn
```

## Create Environment Variables

Once all dependencies are installed, it's time to connect to your Moralis Server.

Create a Moralis Account at [https://moralis.io/](https://moralis.io/).
Spin up a server on all available mainnets.

Now that you have an active Moralis server, you should connect the front-end to it:

- Create a file named `.env.local` in the root directory.
- Create The following variables & copy the Moralis App ID and Server URL values to the `.env.local` file, as shown below:

```
NEXT_PUBLIC_REACT_APP_MORALIS_APP_ID=<Insert Your Moralis App ID Here>
NEXT_PUBLIC_REACT_APP_MORALIS_SERVER_URL=<Insert Your Moralis Server URL Here>
```

(_arrows brackets: <>, and quotes " " / ' ' are unnecessary_)

## Run Phantasm

Now should be able to run the dapp in a local development server.

In the command line, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with Phantasm.
