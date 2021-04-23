// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  const KowloonToken = await hre.ethers.getContractFactory("KowloonToken");
  const kowloonToken = await KowloonToken.deploy("Kowloon Token", "KLN");

  await greeter.deployed();
  await token.deployed();
  await kowloonToken.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("Token deployed to:", token.address);
  console.log("KowloonToken deployed to:", kowloonToken.address);

  const balance = await kowloonToken.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  console.log(hre.ethers.utils.formatUnits(balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
