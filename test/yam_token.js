const YamToken = artifacts.require("YamToken");
const Web3 = require('web3');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("YamToken", function (/* accounts */) {
  it("should assert true", async function () {
    await YamToken.deployed();
    return assert.isTrue(true);
  });
});
