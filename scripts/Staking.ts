import { ethers } from "hardhat";

// async function stakingContract() {

//     const BOREDAPES_NFT = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
//     const boredApeOwnerAddress = "0x26bc0121ffef93e8c28d56a2eddabd590f7772b8";

//     //const boredNft = await ethers.getContractAt("IERC20", BOREDAPES_NFT);
//     const staking = await ethers.getContractFactory("Staking");
//     const deploy = await staking.deploy();

//     console.log(await deploy.stake(boredApeOwnerAddress, 200))
//     console.log(await deploy.getStakeBalance(boredApeOwnerAddress))
    
//     //restake 
//     console.log(await deploy.reStake(boredApeOwnerAddress, 100))
//     //console.log(await deploy.getStakeBalance(boredApeOwnerAddress))
//     /**
//      * Jump time by increasing evm time
//      */
//     //@ts-ignore
//     await network.provider.send('evm_mine', [1653500345])

//     //withdraw funds
//     console.log(await deploy.withdrawStake(boredApeOwnerAddress, 120))

//     //get balance of staker
//     console.log(await deploy.getStakeBalance(boredApeOwnerAddress))

//     console.log(`Staking contract address:${deploy.address}`)
// }

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// stakingContract().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


async function stakingContract() {

  const BOREDAPES_NFT = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  const boredApeOwnerAddress = "0x26bc0121ffef93e8c28d56a2eddabd590f7772b8";
  const boredApeSigner = await ethers.getSigner(boredApeOwnerAddress);
  const stakingContractAddress:string = "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE";

  const boredApeContract = await ethers.getContractAt("IERC721", BOREDAPES_NFT);

  const staking = await ethers.getContractAt("Staking", stakingContractAddress);

  const batToken = await ethers.getContractAt("BoredApeToken", '0x40a42Baf86Fc821f972Ad2aC878729063CeEF403');

  console.log(await batToken.balanceOf(stakingContractAddress));
  let boredApeOwnerBalance = await (await boredApeContract.balanceOf(boredApeOwnerAddress)).toNumber();

  /*******************************Bored Ape Owner ACCOUNT IMPERSONATION*******************************************/
    if(boredApeOwnerBalance >= 1){
    await batToken.transfer(boredApeOwnerAddress, 10)
  }

    //@ts-ignore
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [boredApeOwnerAddress]
  })

  //stake bat tokens into the contract
  await staking.connect(boredApeSigner).stake(boredApeOwnerAddress, 200)

  //get balance 
  console.log(await staking.getStakeBalance(boredApeOwnerAddress))

  /**
   * Jump through time by increasing evm time
   */
  //@ts-ignore
  await network.provider.send('evm_mine', [1653683245])

   //withdraw funds
  console.log(await staking.withdrawStake(boredApeOwnerAddress, 100))

  //   //restake 
  // console.log(await staking.reStake(boredApeOwnerAddress, 100))

  //get balance of staker
  console.log(await staking.getStakeBalance(boredApeOwnerAddress))

  
  console.log(`Staking contract address:${staking.address}`)


  // //set  balance 
  // await network.provider.send('hardhat_setBalance', [
  //     boredApeOwnerAddress,
  //     '0x10000000000000000000000000000000000000000000000000'
  // ])

  //provides allowance to the contract to transfer 
  //await staking.connect(boredApeSigner).approve(deploySwap.address, "100000000000000000");

}

stakingContract().catch((error) => {
console.error(error);
process.exitCode = 1;
});