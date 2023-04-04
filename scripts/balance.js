const hre = require("hardhat");

const { ethers } = require("hardhat");
import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

async function main() {
  let paypen = new ethers.Contract(paypenAddress, Paypen.abi, signer);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
