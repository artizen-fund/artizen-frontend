# Artizen Frontend

Welcome to Artize Frontend codebase. This repository includes the Artizen design components for the information pages and NFT Ruffle. You can check it easily by running the command under the Getting started Session below.

![Screenshot 2022-06-22 at 16 24 55](https://user-images.githubusercontent.com/1488156/175069661-b0f6e6f0-2e3e-430f-9058-c1f5955e628d.png)

# Join our community

[![](https://dcbadge.vercel.app/api/server/INVITEID)](https://discord.gg/6ySrvPp9ek)

# Contributing to Artizen

Check [CONTRIBUTING.md](https://github.com/artizen-fund/artizen-frontend/blob/main/CONTRIBUTING.md) before open an issue or PR

## Featuring…

- NextJS 👷
- Typescript 🧑‍💻
- styled-components 💅🏻
- Cypress testing 🧑‍🏫
- Jest testing 🤪
- Component Storybooks 🖼
- react-jsonschema-forms 📝

## Installation

- requires Node 16.14.2+
- npx storybook init

## Getting Started

### Run the development server:

```bash
yarn dev
```

### Graphql codegen:

```bash
yarn codegen
```

### Create a new component:

```bash
yarn generate
```

### Run storybooks:

```bash
yarn storybook
```

### Run Cypress tests:

- make sure sure dev server is running, then…

```bash
yarn test
```

### Run Jest tests:

```bash
yarn test:jest
```

## Manual tests:

- Before setup, make sure you’re running the latest version of the Metamask extension for Chrome.
- Enable test networks:
  - top right icon, pick Settings / Advanced
  - turn on `Show test networks` (about halfway down the form)

### Metamask setup

- Install and setup [Metamask](https://metamask.io/download/) in your browser
  - [Help and Frequently Asked Questions](https://metamask.io/faqs)
- Add Mumbai network to your Metamask
  - ChainID: 80001
  - RPC URL: https://rpc-mumbai.maticvigil.com/ or ask Rodrigo for alchemy one
  - Currency Symbol: MATIC
  - Block Explorer: https://mumbai.polygonscan.com/
- Get some MATIC tokens for Mumbai network from [faucet](https://faucet.polygon.technology/) to your Magic.link wallet

### FIAT flow

```
Card Number: 4111111111111111
Expiration: 10/2023
CVV: 555
```

### USDC Flow

- Get some MATIC tokens for Mumbai network from [faucet](https://faucet.polygon.technology/) to your Metamask wallet
- Ask Rodrigo for some USDC on Mumbai
- You should now be able to run [USDC test donations](https://labs.artizen.fund)

### ETH Flow

- Get some Ropsten ETH from [faucet](https://faucet.paradigm.xyz/) to your Metamask wallet
- Get some Goerli ETH from [faucet](https://faucet.paradigm.xyz/) to your Metamask wallet
- Ask Rodrigo to add you to Alchemy
- Ask Rodrigo for some USDC on Ropsten
- Ask Rodrigo for some USDC on Goerli
- You should now be able to run [ETH test donations](https://labs.artizen.fund)

## Licence

This code is published under [MIT licence](https://github.com/artizen-fund/artizen-frontend/blob/main/LICENSE.md)
