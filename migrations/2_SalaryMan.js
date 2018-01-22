var SalaryMan = artifacts.require("./SalaryMan.sol");

module.exports = function(deployer) {
  deployer.deploy(SalaryMan);
};
