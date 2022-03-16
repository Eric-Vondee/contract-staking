// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Whitelisting {
    address owner;
    /*
    *maximum number of addresses that can be whitelisted
    */
    uint8 public maximumWhitelistedAddresses;
    /*
    *mapping of whitelisted addresses 
     */ 
    mapping(address => bool) public whitelistedAddresses;

    // numAddressesWhitelisted would be used to keep track of how many addresses have been whitelisted
    uint8 public numAddressesWhitelisted;

    constructor() {
        owner = msg.sender;
        maximumWhitelistedAddresses = 50;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Call franktein");
        _;
    }

    /*
    * add addresses to whitelist if he has borednft equal or greater than1
     */
     function addAddress(address _address) public onlyOwner {
         //check if the user has been whitelisted
         require(!whitelistedAddresses[_address], "Sender already whitelisted");
         require(numAddressesWhitelisted < maximumWhitelistedAddresses, "Bus don full");

         whitelistedAddresses[_address] = true;
         numAddressesWhitelisted +=1;
     }

     function getbalance() public view returns(uint256) {
         return numAddressesWhitelisted;
     }

     function getAddress(address _address) public view returns(bool){
        return (whitelistedAddresses[_address]);
     }

}