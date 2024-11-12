use anchor_lang::prelude::*;

// Defines the structure of the ScoreAccount that will be stored on-chain.
#[account]
pub struct ScoreAccount {
    pub authority: Pubkey,
    pub score: u64,
    pub initialized: bool,
}
