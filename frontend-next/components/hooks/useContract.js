import {
  ethBridgeABI,
  ethBridgeAddress,
  ethPetnABI,
  ethPetnAddress,
  bscBridgeABI,
  bscBridgeAddress,
  bscPetnABI,
  bscPetnAddress,
} from "../../constants/index";
import { Contract, ethers } from "ethers";

export const getContract = async (name, obj) => {
  const contracts = {
    ethBridge: {
      abi: ethBridgeABI,
      address: ethBridgeAddress,
    },

    ethPetn: {
      abi: ethPetnABI,
      address: ethPetnAddress,
    },

    bscBridge: {
      abi: bscBridgeABI,
      address: bscBridgeAddress,
    },
    bscPetn: {
      abi: bscPetnABI,
      address: bscPetnAddress,
    },
  };

  const contract = new ethers.Contract(
    `${contracts[name].address}`,
    contracts[name].abi,
    obj
  );

  return contract;
};
