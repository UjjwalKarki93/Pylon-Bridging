//SPDX-License-Identifier:MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


 contract petn is Ownable,ERC20{

   
    address public bridge;
    constructor(address _bridge,uint supply) ERC20("Pylon Eco Token","PETN"){
        bridge= _bridge;
        _mint(_bridge,supply);
    }

    modifier onlyBridgeOwner(){
        require(msg.sender == bridge,"only owner is allowed");
        _;
    }

    function bridgeBurn(address owner,uint _amount) public onlyBridgeOwner {
        
        _burn(owner,_amount);
    }

    function bridgeMint(address _to,uint _amount) public onlyBridgeOwner {
        _mint(_to,_amount);
    }

    function setBridgeOwner(address _newOwner) public onlyOwner {
        bridge = _newOwner;
    }
}