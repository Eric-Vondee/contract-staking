// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
interface IERC20 {
       function balanceOf(address _account) external view returns (uint256);
       function transfer(address to, uint256 amount) external returns (bool);
}