import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Project } from "../target/types/project";
const { SystemProgram } = anchor.web3;
import assert from "assert";

describe("project", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();

  anchor.setProvider(provider);

  const program = anchor.workspace.Project as Program<Project>;

  it("Is initialized!", async () => {
    const counterAddress = anchor.web3.Keypair.generate();
    // Add your test here.
    await program.methods
      .initialize()
      .accounts({
        authority: provider.wallet.publicKey,
        counter: counterAddress.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([counterAddress])
      .rpc();

    const counterAccount = await program.account.counter.fetch(
      counterAddress.publicKey
    );

    assert.ok(counterAccount.count.toString() == "0");
  });

  it("Is updates", async () => {
    const counterAddress = anchor.web3.Keypair.generate();
    // Add your test here.
    await program.methods
      .initialize()
      .accounts({
        authority: provider.wallet.publicKey,
        counter: counterAddress.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([counterAddress])
      .rpc();

    await program.methods
      .update(new anchor.BN(1234))
      .accounts({
        counter: counterAddress.publicKey,
      })
      .signers([])
      .rpc();

    const counterAccount = await program.account.counter.fetch(
      counterAddress.publicKey
    );

    assert.ok(counterAccount.count.toString() == "1234");
  });

  it("Is increments and decrements", async () => {
    const counterAddress = anchor.web3.Keypair.generate();
    // Add your test here.
    await program.methods
      .initialize()
      .accounts({
        authority: provider.wallet.publicKey,
        counter: counterAddress.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([counterAddress])
      .rpc();

    await program.methods
      .increment()
      .accounts({
        counter: counterAddress.publicKey,
      })
      .signers([])
      .rpc();

    let counterAccount = await program.account.counter.fetch(
      counterAddress.publicKey
    );

    assert.ok(counterAccount.count.toString() == "1");

    await program.methods
      .decrement()
      .accounts({
        counter: counterAddress.publicKey,
      })
      .signers([])
      .rpc();

    counterAccount = await program.account.counter.fetch(
      counterAddress.publicKey
    );

    assert.ok(counterAccount.count.toString() == "0");
  });
});
