pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract RPS_ERC20 is ERC20{
    address owner;
constructor() public ERC20("RPS", "RPS") {
    _mint(address(this),1000);
    owner = msg.sender;
}

event playResult(uint pResult, uint contractChoice);
modifier onlyOwner() {
    require(msg.sender==owner, "only owner can mint");_;
}
function mint(uint amount) public onlyOwner {
    _mint(msg.sender,amount);
}
function play(uint userChoice, uint amount) public {    
    require(userChoice<3, "not a legible choice");
    require(amount<=balanceOf(msg.sender),"not enough balance");
    uint8 result;
    uint contractChoice = uint(keccak256(abi.encodePacked(blockhash(block.number-10),block.timestamp)))%3;
    if(userChoice == contractChoice) {
        result = 2;
    }
    else if((userChoice == 0 && contractChoice == 2) || (userChoice == 1 && contractChoice == 0) || (userChoice == 2 && contractChoice == 1))
    {         
        _transfer(address(this),msg.sender,amount);
       result = 1;
    }
    else {
        _transfer(msg.sender,address(this),amount);
        result = 0;
    }
    emit playResult(result,contractChoice);
}
}