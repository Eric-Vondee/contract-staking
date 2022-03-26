import { ethers } from "hardhat";

async function mintToken() {
    const boredApeTokenAddress:string = "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE";
    const stakingContractAddress:string = "0x40a42Baf86Fc821f972Ad2aC878729063CeEF403";
    const boreApeToken = await ethers.getContractAt("BoredApeToken", boredApeTokenAddress);
   
    console.log(await boreApeToken.transferToken(stakingContractAddress))
    console.log(await boreApeToken.balanceOf(stakingContractAddress));
    console.log(`Bored Ape token address: ${boreApeToken.address}`);
}

mintToken().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
