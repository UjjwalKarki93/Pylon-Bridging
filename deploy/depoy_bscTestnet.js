const { utils } = require("ethers");
const { deployments } = require("hardhat");

module.exports = async ({ getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  const initialSupply = utils.parseEther("100000");
  const { deploy } = deployments;

  const bscPetn = await deploy("bscPetn", {
    from: deployer,
    args: [deployer, initialSupply],
    log: true,
    autoMine: true,
  });

  const bscBridge = await deploy("bscBridge", {
    from: deployer,
    args: [bscPetn.address],
    log: true,
    autoMine: true,
  });

  const bscPetnContract = await ethers.getContractAt(
    "bscPetn",
    bscPetn.address
  );

  await bscPetnContract.connect(await ethers.getSigner(deployer));
  await bscPetnContract.setBridgeOwner(bscBridge.address);

  console.log("new bridge Owenr ", await bscPetnContract.bridge());
};

module.exports.tags = ["all", "bscPetn", "bscBrdige"];
