//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract YourContract {
	// State Variables
	address public immutable owner;
	string public greeting = "Building Unstoppable Apps on Conflux!!";
	uint256 public totalCounter = 0;
	mapping(address => uint) public userGreetingCounter;
	
	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner) {
		owner = _owner;
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function transferEther(address payable _recipient) public payable {
        require(msg.value > 0, "Must send ether to transfer");
        _recipient.transfer(msg.value);
    }

	function setGreeting(string memory _newGreeting) public payable {
	
		// Change state variables
		greeting = _newGreeting;
		totalCounter += 1;
		userGreetingCounter[msg.sender] += 1;
	}

	function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	receive() external payable {}
}
