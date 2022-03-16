import { ethers } from "hardhat";

async function stakingContract() {

    const BOREDAPES_NFT = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
    const boredApeOwnerAddress = "0xcee749f1cfc66cd3fb57cefde8a9c5999fbe7b8f";

    //const boredNft = await ethers.getContractAt("IERC20", BOREDAPES_NFT);
    const staking = await ethers.getContractFactory("Whitelisting");
    const deploy = await staking.deploy();
    await deploy.deployed()

    console.log(await deploy.addAddress(boredApeOwnerAddress))
    console.log(await deploy.getAddress(boredApeOwnerAddress))
    console.log(await deploy.getbalance())
}

stakingContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
