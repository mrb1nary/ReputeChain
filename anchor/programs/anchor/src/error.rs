use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The account has already been initialized. Please choose a new key.")]
    AccountAlreadyInitialized,
}
