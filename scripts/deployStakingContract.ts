import { ethers } from "hardhat";

async function deployStakingContract() {
    const BOREDAPES_NFT = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
    const BAT_TOKEN = "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE"
    const stakingContract = await ethers.getContractFactory("Staking");
    const deployStaking = await stakingContract.deploy(BOREDAPES_NFT, BAT_TOKEN);

    console.log(`Staking contract address:${deployStaking.address}`)
}

deployStakingContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


/**
 * 
 */