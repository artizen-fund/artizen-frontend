# Artizen Frontend

Welcome to Artize Frontend codebase. This repository includes the Artizen design components for Season 2 and the API controlers. You can check it by running the command under the Getting started Session below.

![Screenshot 2023-05-12 at 12 13 04](https://github.com/artizen-fund/docs/assets/1488156/086fefdf-402c-4348-9fae-6c4f13854842)

# Join our community

[Artizen Community in Console.xyz](https://app.console.xyz/c/artizen)

# Contributing to Artizen

Check [CONTRIBUTING.md](https://github.com/artizen-fund/artizen-frontend/blob/main/CONTRIBUTING.md) before open an issue or PR



## Technologies used:

- [NextJS](https://nextjs.org/) 👷
- [Typescript](https://www.typescriptlang.org/) 🧑‍💻
- [styled-components](https://styled-components.com/) 💅🏻
- [Testing Library](https://testing-library.com/) 🤪
- [react-jsonschema-forms](https://rjsf-team.github.io/react-jsonschema-form/docs/) 📝
- [Wagmi](https://wagmi.sh/) 🐶
- [Web3 E2E testing with Playwright](https://playwright.dev/) 🚀

## You need to create an account in each one of the following services:

- [Database with Hasura GraphQL Service](https://hasura.io/)
- [Notifications infrastructure with Courier](https://www.courier.com/)
- [Newsletters with Mailchimp](https://mailchimp.com/)
- [Web3 token Authentification with MORALIS](https://moralis.io/)
- [System error tracking with Sentry](https://sentry.io/)
- [RPC Provider with Alchemy](https://www.alchemy.com/)
- [Web2 Image hosting and transformation with Cloudinary](https://cloudinary.com/)
- [User support and help pages with Intercom](https://www.intercom.com/)

## folder structure

- `src/components` - React components
- `src/contracts` - Smart contracts ABI
- `src/copy` - Copy for the app
- `src/forms` - JSON schema forms
- `src/gql` - GraphQL queries and mutations
- `src/lib` - Utility functions
- `src/theme` - Theme variables
- `src/types` - Typescript types
- `src/utils` - Utility functions
- `src/tests` - Tests
- `src/tests/e2e` - End 2 End Tests
- `src/tests/util` - Testing utilities
- `src/tools` - Templating tools to create compoenents, forms, etc
- `src/pages` - NextJS pages
- `src/pages/project` - NextJS page for projects
- `src/pages/admin` - NextJS pages for admin users only
- `src/pages/api` - NextJS API routes



## Environment variables

- Create a `.env` file in the root of the project, check `.env.test` for the required variables

We recommend using 1Password to manage your secrets. File: `.env_1password_template.txt` is a template to use with 1Password.

## Database

Metadata is mainly saved in Hasura. You can find the schema in `hasura/schema.graphql`. You can also find the schema in the Hasura console.

Web3 data is saved in the stage memory of Season smart contract. Find more information in the their [Season Contract Repository](https://github.com/artizen-fund/seasons-contracts)






## Installation

- requires Node 16.14.2+

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

### Run Cypress tests:

- make sure sure dev server is running, then…

```bash
yarn test
```

### Run Jest tests:

```bash
yarn test:jest
```

### Run Playwright end-to-end tests

The following will start a local dev server and run playwright e2e tests against it:

```bash
yarn test:e2e:local
```

Note: playwright e2e tests will run automatically when you perform a `git push` command (via a pre-push
git hook managed by husky). This is a good way to help ensure code quality but there are situations
when you may want to bypass this check. Please use good judgement when providing the `--no-verify` flag
to `git push` in these situations, i.e. use the following responsibly when pushing:

```bash
git push --no-verify
```

### Metamask setup

- Install and setup [Metamask](https://metamask.io/download/) in your browser
  - [Help and Frequently Asked Questions](https://metamask.io/faqs)
- Add Goerli network to your Metamask
  - ChainID: 80001
  - Block Explorer: https://mumbai.polygonscan.com/


### Get Goerli ETH

- Get some Goerli ETH from [faucet](https://faucet.paradigm.xyz/) to your Metamask wallet

## Licence

This code is published under [MIT licence](https://github.com/artizen-fund/artizen-frontend/blob/main/LICENSE.md)
