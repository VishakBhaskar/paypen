const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const {
  deployTestFramework,
} = require("@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework");
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json");

async function main() {
  [owner, creator, reader1, reader2] = await ethers.getSigners();
  sfDeployer = await deployTestFramework();
  contractsFramework = await sfDeployer.getFramework();

  // initialize framework
  sf = await Framework.create({
    chainId: 1337,
    provider: owner.provider,
    resolverAddress: contractsFramework.resolver, // (empty)
    protocolReleaseVersion: "test",
  });

  // DEPLOYING DAI and DAI wrapper super token (which will be our `spreaderToken`)
  tokenDeployment = await sfDeployer.deployWrapperSuperToken(
    "Fake DAI Token",
    "fDAI",
    18,
    ethers.utils.parseEther("100000000").toString()
  );

  daix = await sf.loadSuperToken("fDAIx");
  dai = new ethers.Contract(daix.underlyingToken.address, TestToken.abi, owner);
  // minting test DAI
  await dai.mint(owner.address, thousandEther);
  await dai.mint(creator.address, thousandEther);
  await dai.mint(reader1.address, thousandEther);
  await dai.mint(reader2.address, thousandEther);

  // approving DAIx to spend DAI (Super Token object is not an ethers contract object and has different operation syntax)
  await dai.connect(owner).approve(daix.address, ethers.constants.MaxInt256);
  await dai.connect(creator).approve(daix.address, ethers.constants.MaxInt256);
  await dai.connect(reader1).approve(daix.address, ethers.constants.MaxInt256);
  await dai.connect(reader2).approve(daix.address, ethers.constants.MaxInt256);
  // Upgrading all DAI to DAIx
  const ownerUpgrade = daix.upgrade({ amount: thousandEther });
  const creatorUpgrade = daix.upgrade({ amount: thousandEther });
  const reader1Upgrade = daix.upgrade({ amount: thousandEther });
  const reader2Upgrade = daix.upgrade({ amount: thousandEther });

  await ownerUpgrade.exec(owner);
  await creatorUpgrade.exec(creator);
  await reader1Upgrade.exec(reader1);
  await reader2Upgrade.exec(reader2);
  //
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
