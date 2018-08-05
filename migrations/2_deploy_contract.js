var contract = artifacts.require("../contracts/MainContract.sol");
module.exports = function(deployer) {
	deployer.deploy(contract);
};
