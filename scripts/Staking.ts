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

  const BOREDAPES_NFT = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const boredApeOwnerAddress = "0x4918fc71bd92f262c4d2f73804fa805de8602743";
  const stakingContractAddress:string = "0x40a42Baf86Fc821f972Ad2aC878729063CeEF403";

  const boredApeSigner = await ethers.getSigner(boredApeOwnerAddress);

  const staking = await ethers.getContractAt("Staking", stakingContractAddress);
  const batToken = await ethers.getContractAt("BoredApeToken", '0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE');

  
  console.log(`staking balance before approval: ${await batToken.balanceOf(stakingContractAddress)}`);

  /*******************************Bored Ape Owner ACCOUNT IMPERSONATION*******************************************/

  //@ts-ignore
  await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [boredApeOwnerAddress]
  })

  await batToken.connect(boredApeSigner).approve(staking.address, 1000)
  //await batToken.connect(boredApeSigner).transferFrom(staking.address, boredApeOwnerAddress, 100)
  
  console.log(await batToken.balanceOf(boredApeOwnerAddress))
  console.log(`staking balance after approval: ${await batToken.balanceOf(stakingContractAddress)}`);

  console.log(`Approved allowance: ${await batToken.allowance(stakingContractAddress, boredApeOwnerAddress)}`)

  console.log(`stakin xx number of tokens: ${await staking.connect(boredApeSigner).stake(boredApeOwnerAddress, 100)}`)
  
  //get staker profile
  console.log(`Get staker profile: ${await staking.getStakeBalance(boredApeOwnerAddress)}`);

  //console.log(`staking balance after approval: ${await batToken.balanceOf(stakingContractAddress)}`);



  /**
   * Jump through time by increasing evm time
   */
  //@ts-ignore
  await network.provider.send('evm_mine', [1653683245])

   //withdraw funds
  console.log(`Withdraw xx amount of funds: ${await staking.withdrawStake(boredApeOwnerAddress, 100)}`)

  //restake 
  // console.log(`Restake xx amount of funds: ${await staking.reStake(boredApeOwnerAddress, 100)}`)

  //get balance of staker
  console.log(await staking.getStakeBalance(boredApeOwnerAddress))

  console.log(await batToken.balanceOf(boredApeOwnerAddress));
  
  console.log(`Staking contract address:${staking.address}`)

}

stakingContract().catch((error) => {
console.error(error);
process.exitCode = 1;
});