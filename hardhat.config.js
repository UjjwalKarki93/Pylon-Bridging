require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config({ path: "./.env" });

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  hardhat: {
    chainId: 31337,
  },

  networks: {
    bscTestnet: {
      url: process.env.BSCTESTNET_JSON_RPC_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      silent: false,
    },

    goerli: {
      url: process.env.GOERLI_JSON_RPC_URL,
      verify: {
        etherscan: {
          apiKey: "",
        },
      },
    },
  },

  namedAccounts: {
    deployer: {
      97: "0x49a6C1398c1BbA28089038E06FA8bE22a3417391",
      5: "0x49a6C1398c1BbA28089038E06FA8bE22a3417391",
    },
  },
};
