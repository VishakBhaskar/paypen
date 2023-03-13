const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const frameworkDeployer = require("@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework");
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json");
const { Framework } = require("@superfluid-finance/sdk-core");

let sfDeployer;
let contractsFramework;
let sf;
let moneyRouter;
let dai;
let daix;

let owner;
let creator;
let reader1;
let reader2;

const TEN_K = ethers.utils.parseUnits("10000", 8);
const ONE_K = ethers.utils.parseUnits("1000", 8);
const thousandEther = ethers.utils.parseEther("10000");
const ONE_MATIC = ethers.utils.parseEther("2");

before(async function () {
  // get hardhat accounts
  [owner, creator, reader1, reader2] = await ethers.getSigners();

  sfDeployer = await frameworkDeployer.deployTestFramework();

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

  // DEPLOYING DAI and DAI wrapper super token
  tokenDeployment = await sfDeployer.deployWrapperSuperToken(
    "Fake DAI Token",
    "fDAI",
    18,
    ethers.utils.parseEther("100000000").toString()
  );

  daix = await sf.loadSuperToken("fDAIx");
  dai = new ethers.Contract(daix.underlyingToken.address, TestToken.abi, owner);

  //hardhat test address : 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E
  // minting test DAI
  await dai.mint(creator.address, thousandEther);
  await dai.mint(owner.address, thousandEther);
  await dai.mint(reader1.address, thousandEther);
  await dai.mint(reader2.address, thousandEther);

  // approving DAIx to spend DAI (Super Token object is not an ethers contract object and has different operation syntax)
  await dai.connect(creator).approve(daix.address, ethers.constants.MaxInt256);
  await dai.connect(owner).approve(daix.address, ethers.constants.MaxInt256);
  await dai.connect(reader1).approve(daix.address, ethers.constants.MaxInt256);
  await dai.connect(reader2).approve(daix.address, ethers.constants.MaxInt256);
  // Upgrading all DAI to DAIx
  const creatorUpgrade = daix.upgrade({ amount: thousandEther });
  const ownerUpgrade = daix.upgrade({ amount: thousandEther });
  const reader1Upgrade = daix.upgrade({ amount: thousandEther });
  const reader2Upgrade = daix.upgrade({ amount: thousandEther });

  await creatorUpgrade.exec(creator);
  await ownerUpgrade.exec(owner);
  await reader1Upgrade.exec(reader1);
  await reader2Upgrade.exec(reader2);

  let Blogs = await ethers.getContractFactory("Blogs", owner);

  blogs = await Blogs.deploy(
    "Blogs",
    "BLG",
    ONE_MATIC,
    sf.settings.config.hostAddress
  );
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
    await blogs.connect(reader1).read(0, daix.address);

    let flowrate = await sf.cfaV1.getFlow({
      superToken: daix.address,
      sender: reader1.address,
      receiver: creator.address,
      providerOrSigner: owner,
    });

    // expect(receiverContractFlowRate, "200000000000000");
    console.log("Flow rate : ", flowrate);
  });
  // it("Access Control #2 - Should allow you to add account to account list", async function () {
  //   await moneyRouter.allowAccount(account1.address);

  //   expect(await moneyRouter.accountList(account1.address), true);
  // });
  // it("Access Control #3 - Should allow for removing accounts from whitelist", async function () {
  //   await moneyRouter.removeAccount(account1.address);

  //   expect(await moneyRouter.accountList(account1.address), true);
  // });
  // it("Access Control #4 - Should allow for change in ownership", async function () {
  //   await moneyRouter.changeOwner(account1.address);

  //   expect(await moneyRouter.owner(), account1.address);
  // });
  // it("Contract Receives Funds #1 - lump sum is transferred to contract", async function () {
  //   //transfer ownership back to real owner...
  //   await moneyRouter.connect(account1).changeOwner(owner.address);

  //   await daix
  //     .approve({
  //       receiver: moneyRouter.address,
  //       amount: ethers.utils.parseEther("100"),
  //     })
  //     .exec(owner);

  //   await moneyRouter.sendLumpSumToContract(
  //     daix.address,
  //     ethers.utils.parseEther("100")
  //   );

  //   let contractDAIxBalance = await daix.balanceOf({
  //     account: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });
  //   expect(contractDAIxBalance, ethers.utils.parseEther("100"));
  // });
  // it("Contract Receives Funds #2 - a flow is created into the contract", async function () {
  //   let authorizeContractOperation = sf.cfaV1.updateFlowOperatorPermissions({
  //     superToken: daix.address,
  //     flowOperator: moneyRouter.address,
  //     permissions: "7", //full control
  //     flowRateAllowance: "1000000000000000", // ~2500 per month
  //   });
  //   await authorizeContractOperation.exec(owner);

  //   await moneyRouter.createFlowIntoContract(daix.address, "100000000000000"); //about 250 daix per month

  //   let ownerContractFlowRate = await sf.cfaV1.getFlow({
  //     superToken: daix.address,
  //     sender: owner.address,
  //     receiver: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   expect(ownerContractFlowRate, "100000000000000");
  // });
  // it("Contract recieves funds #3 - a flow into the contract is updated", async function () {
  //   await moneyRouter.updateFlowIntoContract(daix.address, "200000000000000"); // about 250 daix per month

  //   let ownerContractFlowRate = await sf.cfaV1.getFlow({
  //     superToken: daix.address,
  //     sender: owner.address,
  //     receiver: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   expect(ownerContractFlowRate, "200000000000000");
  // });
  // it("Contract receives funds #4 - a flow into the contract is deleted", async function () {
  //   await moneyRouter.deleteFlowIntoContract(daix.address);

  //   let ownerContractFlowRate = await sf.cfaV1.getFlow({
  //     superToken: daix.address,
  //     sender: owner.address,
  //     receiver: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   expect(ownerContractFlowRate, "0");
  // });
  // it("Contract sends funds #1 - withdrawing a lump sum from the contract", async function () {
  //   let contractStartingBalance = await daix.balanceOf({
  //     account: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   await moneyRouter.withdrawFunds(
  //     daix.address,
  //     ethers.utils.parseEther("10")
  //   );

  //   let contractFinishingBalance = await daix.balanceOf({
  //     account: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   expect(Number(contractStartingBalance) - 10, contractFinishingBalance);
  // });

  // it("Contract sends funds #2 - creating a flow from the contract", async function () {
  //   await moneyRouter.createFlowFromContract(
  //     daix.address,
  //     account1.address,
  //     "100000000000000"
  //   ); //about 250 per month

  //   let receiverContractFlowRate = await sf.cfaV1.getFlow({
  //     superToken: daix.address,
  //     sender: account1.address,
  //     receiver: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   expect(receiverContractFlowRate, "100000000000000");
  // });
  // it("Contract sends funds #3 - updating a flow from the contract", async function () {
  //   await moneyRouter.updateFlowFromContract(
  //     daix.address,
  //     account1.address,
  //     "200000000000000"
  //   ); //about 500 per month

  //   let receiverContractFlowRate = await sf.cfaV1.getFlow({
  //     superToken: daix.address,
  //     sender: account1.address,
  //     receiver: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   expect(receiverContractFlowRate, "200000000000000");
  // });
  // it("Contract sends funds #3 - deleting a flow from the contract", async function () {
  //   await moneyRouter.deleteFlowFromContract(daix.address, account1.address); //about 500 per month

  //   let receiverContractFlowRate = await sf.cfaV1.getFlow({
  //     superToken: daix.address,
  //     sender: account1.address,
  //     receiver: moneyRouter.address,
  //     providerOrSigner: owner,
  //   });

  //   expect(receiverContractFlowRate, "0");
  // });
});

// describe("Test the automation", () => {
//   let accounts;
//   let usdc;
//   let usdt;
//   let usdcwhale;
//   let usdtwhale;
//   let user;
//   let manageContract;
//   let swapcoin;

//   before(async () => {
//     const StreamBook = await hre.ethers.getContractFactory("StreamBook");
//     const streambook = await StreamBook.deploy();

//     await _swapcoin.deployed();

//     swapcoin = _swapcoin;

//     const Manage = await hre.ethers.getContractFactory("Manage");
//     const manage = await Manage.deploy(
//       positionManagerAddress,
//       swapcoin.address
//     );

//     await manage.deployed();

//     manageContract = manage;

//     accounts = await ethers.getSigners();
//     user = accounts[0];

//     await network.provider.request({
//       method: "hardhat_impersonateAccount",
//       params: [USDT_WHALE],
//     });

//     usdtwhale = await ethers.getSigner(USDT_WHALE);

//     await accounts[0].sendTransaction({
//       to: usdtwhale.address,
//       value: ethers.utils.parseEther("50.0"), // Sends exactly 50.0 ether
//     });

//     await network.provider.request({
//       method: "hardhat_impersonateAccount",
//       params: [USDC_WHALE],
//     });

//     usdcwhale = await ethers.getSigner(USDC_WHALE);

//     await accounts[0].sendTransaction({
//       to: usdcwhale.address,
//       value: ethers.utils.parseEther("50.0"), // Sends exactly 50.0 ether
//     });

//     await usdc.connect(usdcwhale).transfer(user.address, TEN_K);
//     await usdt.connect(usdtwhale).transfer(user.address, TEN_K);
//   });

//   it("Mint a position", async () => {
//     await usdc.connect(user).approve(manageContract.address, 100000);
//     await usdt.connect(user).approve(manageContract.address, 100000);

//     console.log("Initial User USDC Bal : ", await usdc.balanceOf(user.address));
//     console.log("initial User USDT Bal : ", await usdt.balanceOf(user.address));

//     await manageContract.connect(user).mintNewPosition();
//     const id = await manageContract.getLatestId();

//     console.log("Token Id : ", id);

//     console.log("Final User USDC Bal : ", await usdc.balanceOf(user.address));
//     console.log("Final User USDT Bal : ", await usdt.balanceOf(user.address));
//   });
// });
