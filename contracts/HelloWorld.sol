// SPDX-License-Identifier: MIT
pragma solidity 0.6.2;

contract HelloWorld {
  constructor() public {
  }

  function greet() pure public returns(bytes32) {
    return "Hello World";
  }

}
