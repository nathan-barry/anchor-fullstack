use anchor_lang::prelude::*;

declare_id!("Dj1FHKXX59RdRTV6W2bjgtosU7oMPfPSWjaavhkdEgpf");

#[program]
pub mod project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: u64) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = data;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count -= 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    authority: Signer<'info>,
    #[account(init, payer = authority, space = 16)]
    counter: Account<'info, Counter>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    counter: Account<'info, Counter>,
}

#[account]
pub struct Counter {
    count: u64,
}
