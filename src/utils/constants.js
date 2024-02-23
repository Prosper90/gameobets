import abi from "./abi.json";
// import BigNumber from "bignumber.js";

//localhost
//testnet 0x14f0773Bc70ab7a750e192cD26Dde90c4Cc0428C
//main 0x94e9f21750d3faF9341C6Ab74602CFe48d723b3c
export const ContractAddress = "0x403b5534aeA9fcB966B499BF63749ef0Eac2f9b8";

export const contractABI = abi;

export const chainETH = 97;

export const convertTime = (timestamp) => {
  const currentDate = new Date();
  const targetDate = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const timeDifference = currentDate - targetDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};
