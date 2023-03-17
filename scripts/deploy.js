const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const ONE_MATIC = ethers.utils.parseEther("1");

  const PaypenFactory = await hre.ethers.getContractFactory("Paypen");
  const paypen = await PaypenFactory.deploy("PayPen", "PPN", ONE_MATIC);
  console.log("Paypen deployed to:", paypen.address);

  fs.writeFileSync(
    "./config.js",
    `
    export const paypenAddress = "${paypen.address}"
  `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
