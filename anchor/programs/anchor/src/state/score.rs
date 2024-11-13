use anchor_lang::prelude::*;

// Defines the structure of the ScoreAccount that will be stored on-chain.
#[account]
pub struct ScoreAccount {
    pub username: String,
    pub authority: Pubkey,
    pub score: u64,
    pub initialized: bool,
}
