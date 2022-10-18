import Dotenv from 'dotenv';
// Hardhat plugins
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
import 'hardhat-spdx-license-identifier';

Dotenv.config();

const ETH_TEST_KEY = process.env.ETH_TEST_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const ETH_MAIN_KEY = process.env.ETH_MAIN_KEY;

export default {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    mainnet: {
      url: `https://rpc.ankr.com/eth`,
      accounts: [ETH_MAIN_KEY],
      timeout: 100000,
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [ETH_TEST_KEY],
      blockGasLimit: 120000000000,
      timeout: 300000,
    },
  },

  abiExporter: {
    runOnCompile: true,
    path: './abi',
    clear: true,
    flat: true,
  },

  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },

  typechain: {
    alwaysGenerateOverloads: true,
    outDir: 'typechain',
  },

  mocha: {
    timeout: 60000,
  },
};
