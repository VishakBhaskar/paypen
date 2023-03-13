const { expect } = require("chai");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, network } = require("hardhat");
const {
  deployTestFramework,
} = require("@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework");
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json");
const {
  waitUntilSymbol,
} = require("next/dist/server/web/spec-extension/fetch-event");

let sfDeployer;
let contractsFramework;
let sf;
let moneyRouter;
let dai;
let daix;

// Test Accounts
let owner;
let account1;
let account2;

const thousandEther = ethers.utils.parseEther("10000");
const ONE_MATIC = ethers.utils.parseEther("1");

before(async function () {
  // get hardhat accounts
  [owner, creator, reader1, reader2] = await ethers.getSigners();
  sfDeployer = await deployTestFramework();

  // GETTING SUPERFLUID FRAMEWORK SET UP

  // deploy the framework locally
  contractsFramework = await sfDeployer.getFramework();

  // initialize framework
  sf = await Framework.create({
    chainId: 31337,
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

  let Blogs = await ethers.getContractFactory("Blogs", owner);

  blogs = await Blogs.deploy("Blogs", "BLG", ONE_MATIC);
  await blogs.deployed();
});

describe("Blogs", function () {
  it("Should Mint an NFT", async function () {
    const initialBal = await ethers.provider.getBalance(owner.address);

    await blogs
      .connect(creator)
      .safeMint(
        creator.address,
        "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        { value: ONE_MATIC }
      );

    const finalBal = await ethers.provider.getBalance(owner.address);

    expect(finalBal).to.equal(initialBal.add(ONE_MATIC));

    const mintedCreator = await blogs.ownerOf(0);

    expect(mintedCreator, creator.address);
  });

  it("Reader sends funds", async function () {
    let authorizeContractOperation = daix.updateFlowOperatorPermissions({
      flowOperator: blogs.address,
      permissions: "7", //full control
      flowRateAllowance: "10000000000000000", // ~2500 per month
    });
    await authorizeContractOperation.exec(reader1);

    await blogs.connect(reader1).read(0, daix.address);

    let readerContractFlowRate = await daix.getFlow({
      sender: reader1.address,
      receiver: creator.address,
      providerOrSigner: owner,
    });

    console.log("Reader Flow rate : ", readerContractFlowRate);
    expect(readerContractFlowRate.flowRate).to.equal("1000000000000000");
  });

  it("Reader stops reading", async function () {
    await blogs.connect(reader1).stop(0, daix.address);

    let readerContractFlowRate = await daix.getFlow({
      sender: reader1.address,
      receiver: creator.address,
      providerOrSigner: owner,
    });

    expect(readerContractFlowRate.flowRate).to.equal("0");
  });

  it("An account mints multiple tokens and the tokens owned by account is listed", async function () {
    await blogs
      .connect(creator)
      .safeMint(
        creator.address,
        "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        { value: ONE_MATIC }
      );

    await blogs
      .connect(creator)
      .safeMint(
        creator.address,
        "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        { value: ONE_MATIC }
      );

    await blogs
      .connect(creator)
      .safeMint(
        creator.address,
        "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        { value: ONE_MATIC }
      );

    await blogs
      .connect(reader1)
      .safeMint(
        reader1.address,
        "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        { value: ONE_MATIC }
      );

    await blogs
      .connect(reader1)
      .safeMint(
        reader1.address,
        "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        { value: ONE_MATIC }
      );

    const creatorBal = await blogs.balanceOf(creator.address);
    const readerBal = await blogs.balanceOf(reader1.address);

    const creatorOwned = [];

    for (let i = 0; i < creatorBal; i++) {
      creatorOwned[i] = await blogs.tokenOfOwnerByIndex(creator.address, i);
    }

    const readerOwned = [];

    for (let i = 0; i < readerBal; i++) {
      readerOwned[i] = await blogs.tokenOfOwnerByIndex(reader1.address, i);
    }

    console.log("Creator Owned : ", creatorOwned);
    console.log("Reader Owned : ", readerOwned);
  });
});
