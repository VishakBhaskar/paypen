// const hre = require("hardhat");
const { ethers, network } = require("hardhat");
// const { Framework } = require("@superfluid-finance/sdk-core");
// require("dotenv").config();

const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";
const WHALE = "0x6fb4706c9290Aa74456A59fb84faf7eD236951Fe";
async function main() {
  {
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [WHALE],
    });
  }

  const whale = await ethers.getSigner(WHALE);
  const daix = await ethers.getContractAt("ISuperToken", fDAIx);
  const ONE_TOKEN = ethers.utils.parseUnits("1", 18);

  const [acc1, acc2, acc3] = await ethers.getSigners();

  let whaleBal = await daix.balanceOf(WHALE);
  let attackerBal = await daix.balanceOf(acc1.address);

  console.log(
    "Initial DAIx balance of whale : ",
    ethers.utils.formatUnits(whaleBal, 18)
  );

  console.log(
    "Initial DAIx balance of attacker : ",
    ethers.utils.formatUnits(attackerBal, 18)
  );

  await acc1.sendTransaction({
    to: whale.address,
    value: ethers.utils.parseEther("50.0"), // Sends exactly 50.0 ether
  });

  await daix.connect(whale).transfer(acc1.address, ONE_TOKEN);

  let newWhaleBal = await daix.balanceOf(WHALE);
  let newAttackerBal = await daix.balanceOf(acc1.address);

  console.log(
    "Final DAIx balance of whale : ",
    ethers.utils.formatUnits(newWhaleBal, 18)
  );

  console.log(
    "Final DAIx balance of attacker : ",
    ethers.utils.formatUnits(newAttackerBal, 18)
  );

  const ONE_MATIC = ethers.utils.parseEther("1");

  const PaypenFactory = await hre.ethers.getContractFactory("Paypen");
  const paypen = await PaypenFactory.deploy("PayPen", "PPN", ONE_MATIC);
  console.log("Paypen deployed to:", paypen.address);

  await paypen
    .connect(acc2)
    .safeMint(
      acc2.address,
      "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
      { value: ONE_MATIC }
    );

  let authorizeContractOperation = daix.updateFlowOperatorPermissions({
    flowOperator: paypen.address,
    permissions: "7", //full control
    flowRateAllowance: "10000000000000000", // ~2500 per month
  });
  await authorizeContractOperation.exec(acc1);
  await paypen.connect(acc1).read(0, daix.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
