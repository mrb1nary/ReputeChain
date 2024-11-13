use anchor_lang::prelude::*;

use crate::ScoreAccount;

#[derive(Accounts)]
#[instruction(username:String, score: u64, key:String)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 64, seeds = [key.as_bytes()], bump)]
    pub score_account: Account<'info, ScoreAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn initialize(
    ctx: Context<Initialize>,
    username: String,
    score: u64,
    _key: String,
) -> Result<()> {
    let score_account = &mut ctx.accounts.score_account;

    score_account.username = username;
    score_account.score = score;
    score_account.authority = *ctx.accounts.user.key;
    score_account.initialized = true;
    Ok(())
}
