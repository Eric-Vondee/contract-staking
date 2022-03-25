# Creating A Staking Contract That Accepts an ERC20 Token

## GUIDELINES TO RUN THIS CONTRACT
1. Spin up local node on your terminal: `yarn hardhat run node` 
2. Deploy the staking contract to get the contract address: `yarn hardhat run scripts/deployStakingContract.ts --network localhost`
3. Copy the staking contract address and replace in deployToken.ts file
4. Run deploy token scripts which mints and transfer tokens to our staking contract: `yarn hardhat run scripts/deployToken.ts --network localhost` 


## Environment Variables 
check `.env.example`
- `ETHERUM_RPC`
- `PRIVATE_KEY`