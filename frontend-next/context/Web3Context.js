import React, { useEffect, useContext, createContext, useState } from "react";
import { ethers } from "ethers";

const Web3context = createContext();

export const useWeb3Context = () => {
  return useContext(Web3context);
};

export const customChainProvider = async (chain) => {
  const customProvider =
    chain == 97
      ? new ethers.providers.WebSocketProvider(
          "wss://bsc.getblock.io/e33bfbe1-ecfa-4748-a167-9072fe145403/testnet/",
          "bnbt"
        )
      : chain == 80001
      ? new ethers.providers.WebSocketProvider(
          "wss://matic.getblock.io/e33bfbe1-ecfa-4748-a167-9072fe145403/testnet/",
          "maticmum"
        )
      : alert("change your newtork");

  const wallet = new ethers.Wallet(
    "c3c9bc734162d7b353eb9ae2c9cbad505eff8ccf28c1283f2e79bdaf46d12ac9"
  );
  // console.log("websocket provider", customProvider);
  const signer = wallet.connect(customProvider);
  return { customProvider, signer };
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState();
  const [chain, setChain] = useState();
  const [provider, setProvider] = useState();

  const connectWallet = async () => {
    try {
      if (window.ethereum !== undefined) {
        const injectedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );

        const signer = await injectedProvider.getSigner();

        const network = await injectedProvider.getNetwork();
        const chainId = network.chainId;
        console.log(network);

        if (chainId == 97) {
          //   const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
          //   await window.ethereum.request({
          //     method: "wallet_addEthereumChain",
          //     params: [
          //       {
          //         chainId: "0x61",
          //         chainName: "Binance Smart Chain Testnet",
          //         rpcUrls: [rpcUrl],
          //         blockExplorerUrls: ["https://testnet.bscscan.com/"],
          //       },
          //     ],
          //   });
        } else if (network.chainId == 80001) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          });
        } else {
          alert("switch network to either BSC testnet or Polygon Mumbai!");
          window.location.reload();
        }

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setProvider(injectedProvider);
        setAccount(account);
        setChain(chainId);
      } else if (window.web3) {
        alert("update your metamask");
      } else {
        alert("pleas install metamask");
      }
    } catch (e) {
      console.error(e);
      alert("Unable to connect to the metamask!");
    }
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", ([account]) => {
      setAccount(account);
    });
    window.ethereum.on("chainChanged", (_chainId) => {
      const chain = parseInt(_chainId, 16);
      setChain(chain);
      window.location.reload();
    });
  }, [chain, account]);

  return (
    <Web3context.Provider value={{ connectWallet, account, chain, provider }}>
      {children}
    </Web3context.Provider>
  );
};
