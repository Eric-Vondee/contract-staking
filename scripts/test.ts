import { ethers } from "hardhat";

async function stakingContract() {

    const BOREDAPES_NFT = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
    const boredApeOwnerAddress = "0x26bc0121ffef93e8c28d56a2eddabd590f7772b8";

    //const boredNft = await ethers.getContractAt("IERC20", BOREDAPES_NFT);
    const staking = await ethers.getContractFactory("Staking");
    const deploy = await staking.deploy();

    console.log(await deploy.stake(boredApeOwnerAddress, 200))
    console.log(await deploy.getStakeBalance(boredApeOwnerAddress))
    
    //restake 
    console.log(await deploy.reStake(boredApeOwnerAddress, 100))
    //console.log(await deploy.getStakeBalance(boredApeOwnerAddress))
    /**
     * Jump time by increasing evm time
     */
    //@ts-ignore
    await network.provider.send('evm_mine', [1653500345])

    //withdraw funds
    console.log(await deploy.withdrawStake(boredApeOwnerAddress, 120))

    //get balance of staker
    console.log(await deploy.getStakeBalance(boredApeOwnerAddress))
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

stakingContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});