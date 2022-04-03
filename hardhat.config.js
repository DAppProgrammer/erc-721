require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

const { PROJECT_ID, API_URL, PRIVATE_KEY } = process.env;

mmodule.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: { chainId: 1337 },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${PROJECT_ID}`,
      accounts: [PRIVATE_KEY]
    }
  },
  paths: {
    artifacts: "../client/src/artifacts"
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY
  }
};
