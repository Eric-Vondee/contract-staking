import { ethers } from "hardhat";

async function tokenContract() {
  const stakingContractAddress:string = "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE";
    const boreApeToken = await ethers.getContractFactory("BoredApeToken");
    const deploy = await boreApeToken.deploy();
    await deploy.deployed();

    console.log(`Bored Ape token address: ${deploy.address}`);
    //console.log(await deploy.transferToken(stakingContractAddress))
    //console.log(await deploy.balanceOf(stakingContractAddress));
}

tokenContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
