//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "./pylonBridge.sol";


contract ethBridge is pylonBridge{

constructor(address _token)  pylonBridge(_token) { }
   
}