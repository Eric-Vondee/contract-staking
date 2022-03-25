// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "./IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Staking {
    address BOREDAPES_NFT= 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D;
    
    uint8 constant MONTHLY_PERCENTAGE = 10;
    uint8 constant DAYS = 30;
    address boredApeNft;
    address batToken;
    uint88 constant MULTIPLIER_EFFECT = 10000;

    struct Stakers {
        address  staker;
        bool stakedStatus;
        uint256 minimumStakingDays;
        uint256 amountStaked;
        uint256 stakedAt;
    }

    mapping(address => Stakers) public stakers; 

    constructor(address _boredApeNft, address _batToken) {
        boredApeNft = _boredApeNft;
        batToken = _batToken;
    }
  
    function stake(address _address, uint256 _amount) public{
        require(!stakers[_address].stakedStatus, "You have staked");
        require(IERC721(boredApeNft).balanceOf(_address) >=1, "Insufficient BAYC to stake");
        require(IERC20(boredApeNft).transferFrom(_address, address(this), _amount), "Insufficient funds");
        Stakers storage i_ = stakers[_address];
        i_.staker = _address;
        i_.stakedStatus = true;
        i_.minimumStakingDays = block.timestamp + 3 days;
        i_.amountStaked = _amount;
        i_.stakedAt = block.timestamp;
    }

    function withdrawStake(address _address, uint256 _amount) public {
        Stakers storage i_ = stakers[_address];
        require(i_.amountStaked >= _amount, "Insufficient funds");
        
        uint256 currentBalance = i_.amountStaked - _amount;

        if(block.timestamp < i_.minimumStakingDays){
            i_.amountStaked = currentBalance;
            i_.stakedAt = block.timestamp;
            IERC20(batToken).transfer(_address, currentBalance);
        }
        else{
            uint256 maturityDate = block.timestamp - i_.stakedAt;
            uint256 accumulatedDays = maturityDate/(60*60*24);
            uint256 interest = MONTHLY_PERCENTAGE*MULTIPLIER_EFFECT * accumulatedDays * 100;
            uint256 division = MULTIPLIER_EFFECT*100*30;
            uint256 calculatedInterest = interest/division;
            uint256 value = (i_.amountStaked + calculatedInterest)- _amount;
            i_.amountStaked = value;
            i_.minimumStakingDays = block.timestamp + 3 days;
            i_.stakedAt = block.timestamp;
            IERC20(batToken).transfer(_address, value);
        
        }
    }

     function reStake(address _address, uint256 _amount) public {
          Stakers storage i_ = stakers[_address];
          uint256 currentBalance = i_.amountStaked;

          if(block.timestamp < i_.minimumStakingDays){
              i_.amountStaked = currentBalance + _amount;
              i_.stakedAt = block.timestamp;
              i_.minimumStakingDays = block.timestamp + 3 days;
          }
          else{
              uint256 maturityDate = block.timestamp - i_.stakedAt;
              uint256 accumulatedDays = maturityDate/(60*60*24);
               uint256 interest = MONTHLY_PERCENTAGE*MULTIPLIER_EFFECT * accumulatedDays * 100;
               uint256 division = MULTIPLIER_EFFECT*100*30;
               uint256 calculatedInterest = interest/division;
              uint256 newStakingAmount = currentBalance + _amount + calculatedInterest;
            i_.amountStaked = newStakingAmount; 
            i_.stakedAt = block.timestamp + 3 days;
          }
     }

     function getStakeBalance(address _address) public view returns(Stakers memory) {
         Stakers storage i_ = stakers[_address];
         return i_;
     }

    //  function gett() public view returns(uint256){
    //      return xx;
    //  }
}