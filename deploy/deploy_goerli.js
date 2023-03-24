const { utils } = require("ethers");
const { deployments } = require("hardhat");

module.exports = async ({ getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  const initialSupply = utils.parseEther("100000");
  const { deploy } = deployments;

  const ethPetn = await deploy("ethPetn", {
    from: deployer,
    args: [deployer, initialSupply],
    log: true,
  });

  const ethBridge = await deploy("ethBridge", {
    from: deployer,
    args: [ethPetn.address],
    log: true,
  });

  const ethPetnContract = await ethers.getContractAt(
    "ethPetn",
    ethPetn.address
  );

  await ethPetnContract.connect(await ethers.getSigner(deployer));
  await ethPetnContract.setBridgeOwner(ethBridge.address);

  console.log("new bridge Owenr ", await ethPetnContract.bridge());
};

module.exports.tags = ["all", "ethPetn", "bscBrdige"];
