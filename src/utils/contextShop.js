import React, { createContext, useEffect, useRef, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useContractEvents,
  useAddress,
  useContract,
  useChain,
} from "@thirdweb-dev/react";
import { ContractAddress, contractABI } from "../utils/constants";
import { ethers, utils } from "ethers";

export const ShopContext = createContext("context");

export const ShopContextProvider = (props) => {
  const address = useAddress();
  const chain = useChain();

  //console.log(chain, "checking chain out");

  /* global BigInt */

  // States should be here
  const [userData, setUserdata] = useState();
  const [leaderboard, setLeaderBoard] = useState();
  const [gottenDdata, setGottendata] = useState();

  //motifiers
  const [notify, setNotify] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  //loader
  const [loader, setLoading] = useState(false);
  const [loaderActive, setloaderActive] = useState(false);
  const [confettiWin, setConfettiWin] = useState(false);
  const [confettiLoss, setConfettiLoss] = useState(false);
  const [flipResult, setFlipResult] = useState(false);
  //logs
  const prevLog = useRef();

  /* global BigInt */

  const { contract } = useContract(ContractAddress);
  const {
    data: dataUsers,
    isLoading: isLoadingself,
    error: selfError,
  } = useContractRead(contract, "self");

  const {
    data: dataRecent,
    isLoading: isLoadingRecent,
    error: errorRecent,
  } = useContractRead(contract, "gameTracker");

  const { data: dataLeaders } = useContractRead(contract, "leaders");

  // const {
  //   data: dataFlipstat,
  //   isLoading: Flipstatloading,
  //   isSuccess: Flipstatsuccess,
  //   write: GetFipStat,
  // } = useContractRead(contract, "getStatus");

  const {
    mutateAsync: flipCoin,
    isLoading: Flipload,
    error: flipError,
  } = useContractWrite(contract, "flipTheCoin");

  const handleEvent = (log) => {
    //console.log(log, log[0], log[0].args, "loggers checkers");
    prevLog.current = log;
    if (log[0]?.data?.player === address) {
      setFlipResult(true);
      if (log[0].data.isWin == true) {
        console.log("in in in here win");
        setNotify(true);
        setNotifyType("success");
        setNotifyMsg("Won the Flip");
        setloaderActive(false);
        setConfettiWin(true);
      } else {
        console.log("in in in in here loss");
        setNotify(true);
        setNotifyType("warn");
        setNotifyMsg("Lost the Flip");
        setloaderActive(false);
        setConfettiLoss(true);
      }
    }
  };

  const {
    data: log,
    isLoading: loadingEvent,
    error: errorEvent,
  } = useContractEvents(contract, "FlipCoinResult");

  const flip = async (choice, selectedAmount, searchParams) => {
    //check that user is registered
    //console.log("Called buy");
    if (!address) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("Connect wallet to proceed");
      return;
    }

    try {
      setloaderActive(true);
      //const contractInstance =  await getContract();

      //const fees = ethers.utils.parseEther(String(inputValue));
      const feepaid = (4 / 100) * parseFloat(selectedAmount);
      // console.log(
      //   feepaid,
      //   "Checking in me ",
      //   parseFloat(selectedAmount) + feepaid
      // );
      const fees = ethers.utils.parseEther(String(parseFloat(selectedAmount)));
      console.log(fees, "check oooooo in here");
      const refValue =
        searchParams.get("address") !== null
          ? searchParams.get("address")
          : "0x0000000000000000000000000000000000000000";

      await flipCoin({
        args: [parseFloat(choice), refValue],
        overrides: {
          gasLimit: 1000000,
          value: fees, // send 0.1 native token with the contract call
        },
      });
    } catch (error) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("User cancelled transaction");
      setloaderActive(false);
    }
  };

  //Useeffect
  useEffect(() => {
    console.log(dataRecent, "datausers jjk dhjdjd");

    if (notify) {
      setTimeout(() => {
        setNotify(false);
        setNotifyType("");
        setNotifyMsg("");
      }, 5000);
    }

    if (log && log !== prevLog.current) {
      handleEvent(log);
    }
  }, [notify, address, log]);

  const contextValue = {
    userData,
    setUserdata,
    leaderboard,
    setLeaderBoard,
    gottenDdata,
    setGottendata,
    notify,
    setNotify,
    notifyType,
    setNotifyType,
    notifyMsg,
    setNotifyMsg,
    loader,
    setLoading,
    loaderActive,
    setloaderActive,
    dataUsers,
    dataLeaders,
    //dataFlipstat,
    //Flipstatloading,
    //Flipstatsuccess,
    //getstats,
    flip,
    confettiWin,
    setConfettiWin,
    confettiLoss,
    setConfettiLoss,
    flipResult,
    setFlipResult,
    chain,
    dataRecent,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
