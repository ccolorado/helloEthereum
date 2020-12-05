// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract HelloWorld {
  constructor() public {
  }

  function greet() pure public returns(bytes32) {
    return "Hello World";
  }

}
