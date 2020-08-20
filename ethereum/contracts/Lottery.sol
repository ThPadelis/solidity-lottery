// SPDX-License-Identifier: GPL-3.0
pragma solidity  >=0.4.22 ^0.7.0;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() {
        manager = msg.sender;
    }
    
    /* 
    * payable: when someone call this function  they might send ether along 
    */
    function enter() public payable {
        // if require fails, the transactions end; otherwise the transaction continues
        // msg.value are the ether the user sent in WEI
        require(msg.value > .01 ether, "The minimum amount is 0.01 ether");
        
        players.push(msg.sender);
    }
    
    /*
    * returns a big random number
    */
    function random() private view returns (uint){
        return uint (keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public restrictedToManager {
        require(players.length > 0, "There are no players");
        
        uint index = random() % players.length;
        address payable winner = address(uint160(players[index]));
        winner.transfer(address(this).balance);
        players = new address[](0);
    }
    
    function getPlayers() public view returns (address[] memory){
        return players;
    }
    
    modifier restrictedToManager(){
        require(msg.sender == manager, "You are not the manager");
        _;
    }
}