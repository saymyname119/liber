// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // 1. Get contract factory with enhanced error handling
  let SocialNFT;
  try {
    SocialNFT = await hre.ethers.getContractFactory("SocialNFT");
    console.log("Contract factory loaded successfully");
  } catch (error) {
    console.error("Error loading contract factory:", error);
    throw error;
  }

  // 2. Add deployment parameters (if needed)
  const constructorArgs = []; // Add constructor arguments if your contract requires them

  // 3. Deploy with transaction details
  console.log("\nStarting deployment...");
  const snft = await SocialNFT.deploy(...constructorArgs);
  
  // 4. Enhanced deployment confirmation
  await snft.waitForDeployment();
  const address = await snft.getAddress();
  const txHash = snft.deploymentTransaction().hash;

  console.log("\n=== Deployment Successful ===");
  console.log("Contract Address:", address);
  console.log("Deployer Address:", await snft.runner?.address);
  console.log("Transaction Hash:", txHash);
  console.log("Network:", hre.network.name);
  console.log("============================\n");

  // 5. Optional: Verify contract on Etherscan/polygonscan
  if (hre.network.name !== "hardhat") {
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: constructorArgs
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n!!! Deployment Failed !!!");
    console.error(error);
    process.exit(1);
  });