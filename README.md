# 🏗 Conflux Scaffold

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 This repository modifies the repo Ethereum Scaffold ETH for Conflux ESpace. The main differences are as follows:

- It updates the viem package to 1.19.10 which includes Conflux Espace Testnet as a chain definition. Current Scaffold-ETH-2 only has Conflux Espace. Conflux Espace Testnet Faucet for testfunds can be found in https://efaucet.confluxnetwork.org/. The RPC used by viem is https://evmtestnet.confluxrpc.org but if you find this to be 
- It adds deployment of hardhat to include Conflux Espace Testnet and Conflux Espace by adding the chains in hardhat.config.ts 
- It includes a simple example of using the scaffold components of sending conflux from one address to another. This demonstrates how to read and write contracts deployed on Conflux Espace Testnet

This allows developers on Conflux ESpace to leverage the open-source, up-to-date toolkit for building decentralized applications (dapps). It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Conflux Scaffold, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/intrepidcanadian/scaffold-conflux
cd scaffold-conflux
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. Since Conflux is EVM compatible, we can use hardhat to test the contracts out prior to deploying on the Conflux network. The network runs on your local machine and can be used for testing and development. 

We have adjusted the network configuration in `hardhat.config.ts` to include Conflux ESpace.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

To deploy the contract on Conflux ESpace or Conflux ESpace Testnet, use 


```
yarn deploy --network Conflux 
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
nvm use 18
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Conflux-Scaffold.

To know more about its features, check out the Scaffold-ETH 2 website [website](https://scaffoldeth.io) for more information

