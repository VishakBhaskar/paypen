require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: `${process.env.ALCHEMY_URL}`,
        // url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      },
      chainId: 1337,
    },
    goerli: {
      url: `${process.env.ALCHEMY_URL}`,
      accounts: [process.env.PRIV_KEY],
    },
  },
};
