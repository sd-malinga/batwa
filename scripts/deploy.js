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
/* deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); */

async function upload() {
  const lock = await hre.ethers.getContractAt(
    "RedWallet_Test",
    "0x4b2F7710263bF0050Bb64dc214B47757Da4C3479",
  );
  const inputData = [];
  for (let i = 0; i < data.length; i++) {
    const address = data[i].address;
    const metadata = data[i].metadata;
    const uri = await UploadtoThirdweb(metadata);
    inputData.push({
      to: address,
      uri: uri,
    });
    if (i == data.length - 1) {
      console.log(inputData);

      const tx = await lock.safeMint(inputData);
      await tx.wait();

      console.log(tx.hash);
    }
  }
}

upload().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
