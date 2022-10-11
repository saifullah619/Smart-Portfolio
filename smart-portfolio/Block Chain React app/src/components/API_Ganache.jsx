import Web3 from "web3";
import { CV_Storage_ABI } from "../abi/config";

export const AllAccounts = async () => {
  try {
    const web3 = new Web3("http://localhost:7545");
    var resp = await web3.eth.getAccounts();
    return resp;
  } catch {
    return Promise.reject;
  }
};

export const AllBlocks = async () => {
  try {
    const web3 = new Web3("http://localhost:7545");
    const totalBlocks = await web3.eth.getBlockNumber();
    var tempBlocks = [];
    for (let index = 0; index < totalBlocks; index++) {
      tempBlocks.push(await web3.eth.getBlock(index));
    }
    return tempBlocks;
  } catch {
    return Promise.reject;
  }
};

export const AllTransactions = async () => {
  try {
    const web3 = new Web3("http://localhost:7545");
    const totalBlocks = (await web3.eth.getBlockNumber()) + 1;
    var tempBlocks = [];
    for (let index = 0; index < totalBlocks; index++) {
      tempBlocks.push(await web3.eth.getBlock(index));
    }

    for (let index = 1; index < totalBlocks; index++) {
      tempBlocks[index] = await web3.eth.getTransactionFromBlock(
        tempBlocks[index].hash,
        0
      );
    }

    return tempBlocks.slice(1);
  } catch {
    return Promise.reject;
  }
};

export const AllContracts = async () => {
  try {
    const web3 = new Web3("http://localhost:7545");
    const totalBlocks = (await web3.eth.getBlockNumber()) + 1;
    var tempBlocks = [];
    for (let index = 0; index < totalBlocks; index++) {
      tempBlocks.push(await web3.eth.getBlock(index));
    }

    for (let index = 1; index < totalBlocks; index++) {
      tempBlocks[index] = await web3.eth.getTransactionFromBlock(
        tempBlocks[index].hash,
        0
      );
    }

    var contracts = [];

    for (let index = 1; index < tempBlocks.length; index++) {
      const element = tempBlocks[index];
      if (element.to === null) contracts.push(element);
    }

    var contractHash = [];
    for (let index = 0; index < contracts.length; index++) {
      const element = contracts[index];

      contractHash.push(
        (await web3.eth.getTransactionReceipt(element.hash)).contractAddress
      );
    }

    return contractHash;
  } catch {
    return Promise.reject;
  }
};

export const getContractInfo = async () => {
  try {
    const allHashes = AllContracts().then((value) => {
      return value;
    });

    const hashes = await allHashes;

    let result = {};
    const web3 = new Web3("http://localhost:7545");

    for (let index = 0; index < hashes.length; index++) {
      const element = hashes[index];
      const CV = new web3.eth.Contract(CV_Storage_ABI, element);
      result[element] = await CV.methods.viewCV().call();
    }

    return result;
  } catch {
    return Promise.reject;
  }
};

// Given a contract id, find the cv id to it
export const getConnectedCV = async (cvID, ownerAddress) => {
  try {
    const web3 = new Web3("http://localhost:7545");

    const contract = new web3.eth.Contract(CV_Storage_ABI, cvID, {
      from: ownerAddress,
    });

    const result = await contract.methods.prevCV().call();
    return result;
  } catch {
    return Promise.reject;
  }
};

// Function to find all cv's uploaded by a person with a given id
export const getPersonCVs = async (ownerAddress) => {
  try {
    const allContracts = AllContracts().then((value) => {
      return value;
    });

    const web3 = new Web3("http://localhost:7545");
    const allContract = await allContracts;
    let result = [];

    for (let index = 0; index < allContract.length; index++) {
      const element = allContract[index];
      const CV = new web3.eth.Contract(CV_Storage_ABI, element);
      const owner = await CV.methods.owner().call();
      if (owner === ownerAddress) result.push(element);
    }

    return result;
  } catch {
    return "Promise Failed";
  }
};

// Given two contract addresses and owner address, link the first contract with the second
export const addLink = async (sourceAddress, targetAddress, ownerAddress) => {
  try {
    const web3 = new Web3("http://localhost:7545");

    const contract = new web3.eth.Contract(CV_Storage_ABI, sourceAddress, {
      from: ownerAddress,
    });

    await contract.methods.linkToPrev(targetAddress).send({
      from: ownerAddress,
      gas: 6721975,
      gasPrice: "20000000000",
    });

    return "Linked CV";
  } catch {
    return "rejected";
  }
};

//Function to check ganache connection
export const checkConnection = async () => {
  try {
    const web3 = new Web3("http://localhost:7545");

    return await web3.eth.net.isListening();
  } catch {
    return false;
  }
};
