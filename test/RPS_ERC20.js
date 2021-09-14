const { assert } = require("chai");

const RPS = artifacts.require("./RPS_ERC20.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("RPS", accounts => {
  let contract;
  before(async () => {
    contract = await RPS.deployed();
  });
  describe("deployment", async () => {
    it("deploys succesfully", async () => {
      const address = contract.address;
      assert.notEqual(address, "");
    });
    it("has name", async () => {
      const name = await contract.name();
      assert.equal(name, "RPS");
    });
    /* it("minted", async () => {
      const minted_event = await contract.mint();
      console.log(minted_event.logs);
    }); */
    it("Total supply", async () => {
      const totalSupply = await contract.totalSupply();
      console.log(totalSupply.toNumber());
    });
    it("Check balance contract", async () => {
      const bal = await contract.balanceOf(contract.address);
      console.log(bal.toNumber());
    });
  });
  describe("ICO", async () => {
    it("mint for account 0", async () => {
      const mint = await contract.mint(100);
    });
    it("check balance of account 0", async () => {
      const bal = await contract.balanceOf(accounts[0]);
      console.log("balance of account[0]=" + bal.toNumber());
    });
  });
  describe("play", async () => {
    it("get Choice", async () => {
      const choice = await contract.play(0, 10);
      console.log(
        choice.receipt.logs[1].args.pResult +
          "  " +
          choice.receipt.logs[1].args.contractChoice
      );
    });
    it("check balance of account 0 after play", async () => {
      const bal = await contract.balanceOf(accounts[0]);
      console.log("balance of account[0]=" + bal.toNumber());
    });
    it("check balance of contract after play", async () => {
      const bal = await contract.balanceOf(contract.address);
      console.log("balance of contract=" + bal.toNumber());
    });
  });
});
