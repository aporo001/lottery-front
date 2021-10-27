import { ethers } from "ethers";
import minichefConfig from "../config/MiniChef.json";

const getContract = (provider) =>
  new ethers.Contract(minichefConfig.address, minichefConfig.abi, provider);

export const getBalance = async (address, provider) => {
  const contract = getContract(provider);
  const res = await contract.depositBalance(address);
  return Number(ethers.utils.formatEther(res));
};

export const deposit = async (amount, provider) => {
  const contract = getContract(provider);
  const contractSigner = contract.connect(provider.getSigner());

  const tx = await contractSigner.deposit(
    ethers.utils.parseEther(String(amount))
  );

  await tx.wait();
};

export const withdrawal = async (amount, provider) => {
  const contract = getContract(provider);
  const contractSigner = contract.connect(provider.getSigner());
  const tx = await contractSigner.withdrawal(
    ethers.utils.parseEther(String(amount))
  );
  await tx.wait();
};
