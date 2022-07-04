import { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import idl from "../idl/project";

const Counter: FC = () => {
  const wallet = useAnchorWallet();

  const [counterAddress, setCounterAddress] = useState<Keypair | null>(null);
  const [count, setCount] = useState<string | null>(null);
  const [input, setInput] = useState<number | null>(null);
  
  // generates a new keypair address to be used across each transaction 
  useEffect(() => {
    setCounterAddress(web3.Keypair.generate());
  }, []);
  
  function getProvider() {
    if (!wallet) {
      return null;
    }

    const network = "http:127.0.0.1:8899";
    const connection = new Connection(network, "processed");

    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
    return provider;
  }
  
  /*
  *   INTERACTING WITH PROGRAM FROM FRONTEND
  *   Below are the functions that interacts with the on-chain program
  *   For each buttion we have a different function that has a different instruction set.
  */
  
  async function initializeCounter() {
    const provider = getProvider();
    if (!provider) {
      throw "Provider is null";
    }

    const program = new Program(idl, idl.metadata.address, provider);

    try {
      // this is how you interact with on-chain programs, same as when testing
      await program.methods
        .initialize()
        .accounts({
          authority: provider.wallet.publicKey,
          counter: counterAddress.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([counterAddress])
        .rpc();

      const counterAccount = await program.account.counter.fetch(
        counterAddress.publicKey
      );
      setCount(counterAccount.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function updateCounter(num: number) {
    const provider = getProvider();
    if (!provider) {
      throw "Provider is null";
    }

    const program = new Program(idl, idl.metadata.address, provider);

    try {
      await program.methods
        .update(new BN(num))
        .accounts({
          counter: counterAddress.publicKey,
        })
        .rpc();

      const counterAccount = await program.account.counter.fetch(
        counterAddress.publicKey
      );
      setCount(counterAccount.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function incrementCounter() {
    const provider = getProvider();
    if (!provider) {
      throw "Provider is null";
    }

    const program = new Program(idl, idl.metadata.address, provider);

    try {
      await program.methods
        .increment()
        .accounts({
          counter: counterAddress.publicKey,
        })
        .rpc();

      const counterAccount = await program.account.counter.fetch(
        counterAddress.publicKey
      );
      setCount(counterAccount.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function decrementCounter() {
    const provider = getProvider();
    if (!provider) {
      throw "Provider is null";
    }

    const program = new Program(idl, idl.metadata.address, provider);

    try {
      await program.methods
        .decrement()
        .accounts({
          counter: counterAddress.publicKey,
        })
        .rpc();

      const counterAccount = await program.account.counter.fetch(
        counterAddress.publicKey
      );
      setCount(counterAccount.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  return (
    <div className="space-y-8">
      <button
        className="bg-[#512da8] text-[#fff] flex font-semibold items-center rounded h-12 px-6 font-sans"
        onClick={initializeCounter}
      >
        Initialize
      </button>
      {count ? <h2>Counter: {count}</h2> : null}
      <div className="flex space-x-8">
        <button
          className="bg-[#512da8] text-[#fff] flex font-semibold items-center rounded h-12 px-6 font-sans"
          onClick={() => {
            input ? updateCounter(input) : null;
          }}
        >
          Update
        </button>
        <input
          className="bg-[#202020] text-[#fff] flex font-semibold items-center rounded h-12 px-6 font-sans"
          type="text"
          placeholder="Enter Number"
          value={input ? input : ""}
          onChange={(event) => {
            Number(event.target.value)
              ? setInput(Number(event.target.value))
              : setInput(null);
            console.log(input);
          }}
        />
      </div>
      <button
        className="bg-[#512da8] text-[#fff] flex font-semibold items-center rounded h-12 px-6 font-sans"
        onClick={incrementCounter}
      >
        Increment
      </button>
      <button
        className="bg-[#512da8] text-[#fff] flex font-semibold items-center rounded h-12 px-6 font-sans"
        onClick={decrementCounter}
      >
        Decrement
      </button>
    </div>
  );
};

export default Counter;
