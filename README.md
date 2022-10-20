# Anchor Fullstack Template

This is a full stack example projuct using Anchor.

![screenshot_20220703_233417](https://user-images.githubusercontent.com/38043930/177123525-15ea3933-e602-4375-bf4f-1fe92257cd24.png)

## Getting Started

To deploy programs locally, you need to have the [Solana CLI](https://docs.solana.com/cli) . Please create a [File System Wallet](https://docs.solana.com/cli/conventions) before hand.

Running a test validator
```
// Configure CLI Tool Suite to target a local cluster by default
solana config set --url http://127.0.0.1:8899

// Run a local test validator
solana-test-validator
```

In a new terminal, navigate to the root directory

```
yarn // install the dependencies for the root directory

anchor build // build program
```

The output of the terminal should say `Program Id: <PROGRAM_ID>`. Replace the current program id in `programs/project/src/lib.rs` and also in `Anchor.toml` and then run `anchor build` again.

Running a test validator
```
// Configure CLI Tool Suite to target a local cluster by default
solana config set --url http://127.0.0.1:8899

// Run a local test validator
solana-test-validator
```

Now that we have a local validator spun up, time to deploy the program. In the root directory, run:

```
anchor deploy // deploys the programs to the local cluster
```

Great! Now our program is deployed locally. Now lets spin up the front end to interact with it.

```
cd app // navigate to app directory

yarn // install the dependencies for the front end

yarn dev // spin up server
```

Open http://localhost:3000 in a new tab and connect your wallet! To get sol for your browser wallet, run the command `solana airdrop 5 <YOUR_WALLET_ADDRESS`.

## Repo Overview

The main components of this repo are:

- `app`: directory of next.js front end
- `programs/project`: directory of the counter program

The most important files are:

- `programs/project/src/lib.rs`: the counter program
- `app/pages/_app.tsx`: the wrapper of the app, contains wallet provider logic
- `app/pages/index.tsx`: the home page with the counter component and the wallet button
- `app/components/Counter.tsx`: the counter component with all logic on interacting with the program

## Notes
- the IDL that anchor build creates is a .json file. For the front end, one must make this into a type Idl object in a .js or .tx file and export it. Example is shown in `app/idl/project.ts`.
