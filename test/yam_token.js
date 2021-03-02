const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const YamToken = artifacts.require("YamToken");
const YamTokenContract = require('../build/contracts/YamToken.json');

const BigNumber = require('bignumber.js');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract("YamToken", function (accounts) {
  beforeEach(async function () {
    this.tokenName = 'YamToken';
    this.tokenSymbol = 'YT';

    this.yamToken = await YamToken.new(
      this.tokenName, this.tokenSymbol
    );

    this.CYamToken = await new web3.eth.Contract(
      YamTokenContract.abi, this.yamToken.address
    );


  })

  describe('Token integrity', async function () {

    it('have a totalSupply function', async function () {

      this.CYamToken.methods.hasOwnProperty('totalSupply')

      const _totalSupply = await this.CYamToken.methods.totalSupply().call()

      _totalSupply.should.be.equal('0');

    })

    it('have a balanceOf function', async function () {

      this.CYamToken.methods.hasOwnProperty('balnaceOf')

      const _balanceOf = await this.CYamToken.methods.balanceOf(accounts[0]).call()
      _balanceOf.should.be.equal('0');

    })


    it('have a allowance function', async function () {

      this.CYamToken.methods.hasOwnProperty('allowance')

      const _allowance = await this.CYamToken.methods.allowance(accounts[0], accounts[1]).call()
      _allowance.should.be.equal('0');

    })


    it('have a transfer function', async function () {

      this.CYamToken.methods.hasOwnProperty('transfer')

      const _txReciept = await this.CYamToken.methods.transfer(
        accounts[0], BigNumber('1000000000000000000')
      ).send( { from:accounts[0] }).should.be.rejectedWith(
        Error,
        'revert ERC20: transfer amount exceeds balance'
      )

    })

  })

  describe('event emmision', async function () {
    beforeEach(async function () {

    })

    it('emit a Transfer event when minting', async function () {

      await this.CYamToken.methods.mint(accounts[0], BigNumber('1000000000000000000')).send({
        from: accounts[0],
        gas: 6721975
      }).should.be.fulfilled

      const events = await this.CYamToken.getPastEvents('Transfer');

      events[0].returnValues.to.should.be.equal(accounts[0])
      events[0].returnValues.value.should.be.equal('1000000000000000000')

    })

    it('emit a Approval event when minting', async function () {

      await this.CYamToken.methods.approve(accounts[2], BigNumber('1000000000000000000')).send({
        from: accounts[0],
        gas: 6721975
      }).should.be.fulfilled

      const events = await this.CYamToken.getPastEvents('Approval');

      events[0].returnValues.owner.should.be.equal(accounts[0])
      events[0].returnValues.spender.should.be.equal(accounts[2])
      events[0].returnValues.value.should.be.equal('1000000000000000000')

    })

  })

});
