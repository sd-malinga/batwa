const dotenv = require("dotenv");
const { ThirdwebStorage } = require("@thirdweb-dev/storage");

dotenv.config();

// Instantiate the Thirdweb IPFS storage
const storage = new ThirdwebStorage({
  secretKey:
    "LMgSm3vldkBGdtpBx7NvIhYBqsZmsXxsMLV6qnWrSIw8lqBZjq9TmgSl4ihcW5POv9SMAqfTuLFbK4S_FnR2mg",
});

exports.UploadtoThirdweb = async (json) => {
  try {
    // Get the IPFS URI of where the metadata has been uploaded
    const uri = await storage.upload(json);
    // Log the URL and return it
    console.info(uri.replace("ipfs://", "https://ipfs.io/ipfs/"));
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  } catch (error) {
    console.error("Error uploading file to Thirdweb.", error);
  }
};
