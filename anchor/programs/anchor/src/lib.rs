pub mod error;
pub mod instructions;
pub mod state;
pub use instructions::*;
pub use state::*;

use anchor_lang::prelude::*;

declare_id!("8u2absR3zLEnTcsM542zjMNbeNzf1dpViq9FKPxAiFfd");
#[program]
pub mod anchor {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>, score: u64, key: String) -> Result<()> {
        instructions::initialize(ctx, score, key)
    }

    pub fn update(ctx: Context<UpdateScore>, new_score: u64, key: String) -> Result<()> {
        instructions::update(ctx, new_score, key)
    }
}
