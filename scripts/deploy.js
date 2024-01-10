require("dotenv").config();
const hre = require("hardhat");
const { data } = require("./data.js");
const { UploadtoThirdweb } = require("./upload.js");
const projectId = process.env.INFURA_PROJECT_ID;

async function deploy() {
  const lock = await hre.ethers.deployContract("RedWallet_Test");

  await lock.waitForDeployment();

  console.log(`Deployed to ${lock.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
