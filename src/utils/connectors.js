import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";

const IS_MAINNET = process.env.REACT_APP_NETWORK === 'mainnet';
const NETWORK_NAME = IS_MAINNET ? "bsc mainnet": "bsc testnet ";
const chainId = IS_MAINNET? 56 : 97;
const rpcUrl = IS_MAINNET? "https://bsc-dataseed.binance.org/" : "https://data-seed-prebsc-1-s3.binance.org:8545/";
const scanUrl = IS_MAINNET? "https://bsc-dataseed.binance.org/" : "https://data-seed-prebsc-1-s3.binance.org:8545/";

const BINANCE_MAINNET_PARAMS = {
  chainId: chainId,
  chainName: "Ethereum",
  nativeCurrency: {
    name: "Ethereum Mainnet",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [rpcUrl],
  blockExplorerUrls: [scanUrl],
};

const injected = new InjectedConnector({ supportedChainIds: [chainId] });
const binance_wallet = new InjectedConnector({
  supportedChainIds: [Number(BINANCE_MAINNET_PARAMS.chainId)],
});
const trustWallet = new InjectedConnector({
  supportedChainIds: [Number(BINANCE_MAINNET_PARAMS.chainId)],
});

const walletConnect = new WalletConnectConnector({
  rpc: {
    1: "https://bsc-dataseed.binance.org/",
  },
  bridge: "https://bridge.walletconnect.org/",
  qrcode: true,
  pollingInterval: 12000,
});

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export { injected, trustWallet, walletConnect, binance_wallet, NETWORK_NAME, chainId };
