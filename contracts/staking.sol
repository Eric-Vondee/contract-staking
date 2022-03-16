// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol"

// contract Token is ERC20 {

    
//     constructor() ERC20("boredApeToken", "boredAT"){
//         _mint(msg.sender, 1e8);
//     }
// }
import "./IERC20.sol";

 

contract Staking {

    IERC20 name;
    uint8 constant MONTHLY_INTEREST = 10;
    struct Stakers {
        address  staker;
        bool staked;
        uint88 minimumStakingDays;
        uint256 amountstaked;
        uint256 stakedAt;
    }

    mapping(address => Stakers) public stakers;
    
    constructor(address _tokenAddr) {
        name = IERC20(_tokenAddr);
    }
  
    function stake(address _address, uint256 _amount) public{
        require(stakers[_address].staked == true, "You don stake already");
        Stakers storage i_ = stakers[_address];
        i_.staker = _address;
        i_.staked = true;
        i_.minimumStakingDays = block.timestamp + 3 days;
        i_.amountstaked = _amount;
        i.stakedAt = block.timestamp;
    }

    function withdraw(address _address) public {
        Stakers storage i_ = stakers[_address];
        uint256 _maturityDate = block.timestamp - i_.minimumStakingDays;

        if(i_.minimumStakingDays < block.timestamp){
            name.transfer(_address, i_.amountstaked);
        }
        else{
            uint256 interest = calculateInterest(i_.amountstaked);
            name.transfer(_address, amount);
        }
    }
    /*
    * this calculates the interest 
     */
    function calculateInterest(uint256 _amountStaked, uint256 _maturityDate) public view returns(uint256){
        
        if(_maturityDate < 3 days) {
            return _amountStaked;
        }

        uint256 cycles = _maturityDate / 30 days;


        uint256 interest = (_amount * 10)/100;
        uint256 accumulatedInterest = _amount + interest;
        return accumulatedInterest;
    }
}