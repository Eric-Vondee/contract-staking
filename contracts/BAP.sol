// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BoredApeToken is ERC20 {

    constructor() ERC20("boredApeToken", "boredAT"){
        _mint(msg.sender, 1e18);
        _approve(address(this), msg.sender, 1e10);
    }

    function transferToken(address _address) public {
        _transfer(msg.sender, _address, 1e6);
    }
}