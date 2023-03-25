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

const { ETH_MAIN_KEY, ETH_TEST_KEY, ETHERSCAN_KEY } = process.env;

const pkeyMainnet =
  ETH_MAIN_KEY == undefined || ETH_MAIN_KEY.length == 0
    ? 'f'.repeat(64)
    : ETH_MAIN_KEY;
const pkeyTestnet =
  ETH_TEST_KEY == undefined || ETH_TEST_KEY.length == 0
    ? 'f'.repeat(64)
    : ETH_TEST_KEY;

export default {
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          viaIR: true,
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
      accounts: [pkeyMainnet],
      timeout: 100000,
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [pkeyTestnet],
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
