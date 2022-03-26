import { ethers } from "hardhat";

async function tokenContract() {
    const boreApeToken = await ethers.getContractFactory("BoredApeToken");
    const deploy = await boreApeToken.deploy();
    await deploy.deployed();

    console.log(`Bored Ape token address: ${deploy.address}`);
}

tokenContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
