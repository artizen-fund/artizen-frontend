# Artizen Frontend

Welcome to Artize Frontend codebase. This repository includes the Artizen design components for the information pages and NFT Ruffle. You can check it easily by running the command under the Getting started Session below.

![Screenshot 2022-06-22 at 16 24 55](https://user-images.githubusercontent.com/1488156/175069661-b0f6e6f0-2e3e-430f-9058-c1f5955e628d.png)

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
- FIAT flow
  ```
  Card Number: 4111111111111111

  Expiration: 10/2023

  CVV: 555
  ```
- USDC Flow
  - Install and setup Metamask in your browser
  - Get some MATIC from [faucet](https://faucet.polygon.technology/) to your Metamask wallet
  - Ask Rodrigo for some USDC on Mumbai
  - Go ahead and try USDC donation

- ETH Flow
  - Install and setup Metamask in your browser
  - Get some Ropsten ETH from [faucet](https://faucet.egorfine.com/) to your Metamask wallet
  - Get some Goerli ETH from [faucet](https://goerlifaucet.com/) to your Metamask wallet
  - Ask Rodrigo for some USDC on Goerli
  - Go ahead and try ETH donation 

## Licence

This code is published under [MIT licence](https://github.com/artizen-fund/artizen-frontend/blob/main/LICENSE.md)
