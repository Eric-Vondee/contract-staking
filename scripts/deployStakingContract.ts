import { ethers } from "hardhat";

async function deployStakingContract() {
    const stakingContract = await ethers.getContractFactory("Staking");
    const deployStaking = await stakingContract.deploy();
    
    console.log(`Staking contract address:${deployStaking.address}`)
}

deployStakingContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});