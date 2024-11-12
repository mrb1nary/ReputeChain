import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor"; 
import { Anchor } from "../target/types/anchor";
import { BankrunProvider, startAnchor } from "anchor-bankrun";
import { Keypair, PublicKey } from "@solana/web3.js";
const IDL = require("../target/idl/anchor.json");

const address = new PublicKey("8u2absR3zLEnTcsM542zjMNbeNzf1dpViq9FKPxAiFfd");

describe("anchor", async () => {
  it("Initialize score", async () => {
   const context = await startAnchor("", [{name: "anchor", programId: address}], []);

	 const provider = new BankrunProvider(context);

   const Score =  new Program<Anchor>(IDL, provider);

   const scoreAccount = Keypair.generate();

   const user = Keypair.generate();


   Score.methods.initialize(new anchor.BN(100),"secret")
   .accounts({
      scoreAccount: scoreAccount,
      systemProgram: anchor.web3.SystemProgram.programId,
   }).signers([user])
   .rpc();

   const [scoreAddress, bump] = PublicKey.findProgramAddressSync([Buffer.from("secret")], address);
   console.log(scoreAddress.toBase58());
   const fetchedScore = await Score.account.scoreAccount.fetch(scoreAddress);
  //  console.log(fetchedScore);
  });
});


