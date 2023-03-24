//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./petn.sol";


contract pylonBridge {
    petn public token;
    mapping (address =>  uint) public transactionCount;
    mapping(address => mapping(uint => bool)) public hasProcessed;

    enum Type { Burn,Mint}

    event Transfer(address indexed from,address to,uint indexed amount,uint date,uint nounce,bytes signature,Type indexed process);

    constructor(address _token) {
        token = petn(_token);
    }

    function burn(address _of,uint _amount,bytes calldata signature) external {
        transactionCount[msg.sender] += 1;
       
  token.bridgeBurn(_of,_amount);

        emit Transfer(msg.sender,_of,_amount,block.timestamp,transactionCount[msg.sender],signature,Type.Burn);       
    }

    function mint(address from,address to,uint amount,uint nonce,bytes calldata signature) external {
        bytes32 messageHash = keccak256(abi.encodePacked(to,amount,nonce));
        bytes32 message = ECDSA.toEthSignedMessageHash(messageHash);
        address signer = ECDSA.recover(message,signature);
        require(signer == to ,"incorrect signature");
        require(!hasProcessed[from][nonce], "Already processed this transfer request");
        hasProcessed[from][nonce] = true;
        token.bridgeMint(to,amount);
        emit Transfer(from,to,amount,block.timestamp,nonce,signature,Type.Mint);
    }


}
