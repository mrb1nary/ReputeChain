use anchor_lang::prelude::*;


use crate::ScoreAccount;

#[derive(Accounts)]
#[instruction(key: String)]
pub struct UpdateScore<'info> {
    #[account(mut, seeds = [key.as_bytes()], bump, has_one = authority)]
    pub score_account: Account<'info, ScoreAccount>,
    pub authority: Signer<'info>,
}

pub fn update(ctx: Context<UpdateScore>, new_score: u64, _key: String) -> Result<()> {
    let score_account = &mut ctx.accounts.score_account;

    // Update the score field with the new value
    score_account.score = new_score;
    Ok(())
}
