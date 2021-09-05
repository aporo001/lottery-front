import { ethers } from "ethers";

let provider;
let signer;

const login = async () => {
  await window.ethereum.enable();
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  return window.ethereum.selectedAddress;
};

export default { login, provider, signer };
