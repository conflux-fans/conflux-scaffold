# Repository Guidelines

## Project Context
This repo adapts Scaffold-ETH 2 for Conflux eSpace so the `packages/hardhat` workspace can author and deploy Solidity contracts to Conflux networks while `packages/nextjs` renders the accompanying dapp. The default flows target Conflux eSpace Testnet for iteration before switching configuration to the Conflux eSpace Mainnet when you are ready to launch. Both workspaces share TypeChain bindings and synced ABIs so contract changes propagate to the frontend without manual wiring.

## Conflux Quick Facts
- Conflux eSpace is the EVM-compatible environment that pairs with the native Tree-Graph consensus layer, so Hardhat tasks and MetaMask behave like standard Ethereum tooling while benefiting from Conflux throughput.
- Gas is paid in `CFX` (18 decimals). The public RPCs are `https://evmtestnet.confluxrpc.com` (Testnet, chain id 71) and `https://evm.confluxrpc.com` (Mainnet, chain id 1030).
- Block explorers live at `https://evmtestnet.confluxscan.net` for Testnet and `https://evm.confluxscan.net` for Mainnet. Share these links alongside deployed addresses for verification.
- Testnet CFX is available through the faucet at https://efaucet.confluxnetwork.org and requires a Conflux Portal wallet address.

## Project Structure & Module Organization
Yarn 3 workspaces split on-chain code in `packages/hardhat` from the Next.js dapp in `packages/nextjs`. Hardhat organises Solidity in `contracts/`, deploy logic in `deploy/`, task helpers in `scripts/`, and generated outputs under `deployments/` and `typechain-types/`. The frontend keeps routes in `app/`, UI primitives in `components/`, shared logic in `services/` and `utils/`, types in `types/`, and synced ABIs in `contracts/`.

## Modifying Contracts & Frontend
Edit Solidity inside `packages/hardhat/contracts/` and update `deploy/00_deploy_your_contract.ts` when constructor params or tags change. Run `yarn compile` or `yarn hardhat:test`, then redeploy with `yarn deploy` (optionally `--tags yourContract`) so artifacts and the "Debug Contracts" panel refresh. Frontend updates should use `useScaffoldReadContract`, `useScaffoldWriteContract`, and components from `~~/components/scaffold-eth`, keeping feature code within the relevant `app/` route.

## Build, Test, and Development Commands
- `yarn start` launches the Next.js dev server.
- `yarn chain` plus `yarn deploy` boot a local Hardhat network.
- `yarn next:check-types`, `yarn next:build`, and `yarn next:serve` validate production bundles.
- `yarn format` runs Prettier across both workspaces.

## Coding Style & Naming Conventions
Prettier and ESLint enforce 2-space indentation, trailing commas, and semicolons—run `yarn next:lint` and `yarn hardhat:lint` before review. Use `PascalCase` for React components and contracts, `camelCase` for helpers, keep one contract per file, and let the formatter order imports.

## Testing Guidelines
Store Mocha/Chai specs in `packages/hardhat/test/*.test.ts`. Execute `yarn hardhat:test` (set `REPORT_GAS=true` when profiling) and add `yarn workspace @se-2/hardhat hardhat coverage` for risky protocol edits. Frontend checks rely on type safety plus manual QA; log verified routes and wallets in your PR.

## Deploying to Conflux eSpace
Copy `packages/hardhat/.env.example` to `.env`, set `DEPLOYER_PRIVATE_KEY`, and run `yarn deploy --network confluxESpaceTestnet` or `--network confluxESpace`. Align `packages/nextjs/scaffold.config.ts` target networks, confirm with `yarn start`, then ship via `yarn next:build` and `yarn vercel` (or `yarn vercel:yolo`) while sharing contract and explorer links.

## Commit & Pull Request Guidelines
Follow Conventional Commits and keep changes scoped. PRs need a summary, linked issues, relevant screenshots, command checklist, and reviewer tags for touched areas.

## Environment & Secrets
Duplicate each `.env.example`, fill in RPC endpoints, keys, and project IDs locally, and keep them out of git. Hardhat loads secrets via `dotenv`, and only `NEXT_PUBLIC_*` variables belong in the browser bundle; rotate shared credentials after demos.

## Scaffold-ETH Reference
For deeper patterns review https://docs.scaffoldeth.io/llms-full.txt. It catalogs contract hooks, component usage, wallet integration, styling, deployment targets, and troubleshooting advice that expand on this checklist.
