const Migrations = artifacts.require("RPS_ERC20");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
