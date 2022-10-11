const Migrations = artifacts.require("Migrations");
const CV_Storage = artifacts.require("CV_Storage");


module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CV_Storage);
};
