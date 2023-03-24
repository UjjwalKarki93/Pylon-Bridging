//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "./petn.sol";

contract ethPetn is petn {

    constructor (address bridge,uint supply) petn(bridge,supply){}

}