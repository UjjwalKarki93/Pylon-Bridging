import React, { useEffect, useState } from "react";
import { Button, Menu, Modal } from "semantic-ui-react";
import { Contract, utils } from "ethers";
import { useWeb3Context, customChainProvider } from "../context/Web3Context";
import { getContract } from "./hooks/useContract";

const NavBar = () => {
  const { connectWallet, account, chain, provider } = useWeb3Context();

  // const [balance, setBalance] = useState();

  // const getDetails = async () => {
  //   const petn =
  //     chain == 97
  //       ? await getContract("bscPetn", await customChainProvider(97))
  //       : await getContract("ethPetn", await customChainProvider(5));

  //   const bl = await petn.balanceOf(`${account}`);
  //   setBalance(utils.formatEther(`${bl}`));
  // };
  // useEffect(() => {
  //   if (provider !== undefined) getDetails();
  // }, [chain, account]);
  return (
    <div>
      <Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            {/* <Modal
              trigger={<Button>Profile</Button>}
              header="  PETN BALANCE: "
              content={balance}
              actions={[{ key: "Quit", content: "Quit", positive: false }]}
            /> */}
          </Menu.Item>
          <Menu.Item>
            {(account || chain) != undefined ? (
              <div>
                <p>{account}</p>
              </div>
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default NavBar;
