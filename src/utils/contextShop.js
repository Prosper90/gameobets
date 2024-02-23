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

  // console.log(chain, "checking chain out");

  /* global BigInt */

  // States should be here
  const [userData, setUserdata] = useState();
  const [leaderboard, setLeaderBoard] = useState();
  const [gottenDdata, setGottendata] = useState();

  //notifiers
  const [notify, setNotify] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  //loader
  const [loader, setLoading] = useState(false);
  const [loaderActive, setloaderActive] = useState(false);
  const [confettiWin, setConfettiWin] = useState(false);
  const [confettiLoss, setConfettiLoss] = useState(false);
  const [gameResult, setGameResult] = useState(false);
  //logs
  const prevLog = useRef();
  //playing as
  const [playingas, SetPlayingas] = useState("regular");

  //handling chain
  const [selectedChainLocal, setSelectedChainLocal] = useState("");

  //games data
  const [selectedChoice, setSelectedChoice] = useState();
  const [amount, setAmount] = useState(0);
  const [winChance, setWinchance] = useState(0);
  const [gametype, setGameType] = useState("");

  /* global BigInt */

  const { contract } = useContract(ContractAddress, contractABI);
  // console.log(contract, "contract check");
  // const {
  //   data: dataUsers,
  //   isLoading: isLoadingself,
  //   error: selfError,
  // } = useContractRead(contract, "self");

  const {
    data: dataHistory,
    isLoading: isLoadingRecent,
    error: errorRecent,
  } = useContractRead(contract, "gameTracker");

  // const { data: dataLeaders } = useContractRead(contract, "leaders");

  // const {
  //   data: dataFlipstat,
  //   isLoading: Flipstatloading,
  //   isSuccess: Flipstatsuccess,
  //   write: GetFipStat,
  // } = useContractRead(contract, "getStatus");

  const {
    mutateAsync: PlaceBet,
    isLoading: Flipload,
    error: flipError,
  } = useContractWrite(contract, "placeBet");

  const handleEvent = (log) => {
    //console.log(log, log[0], log[0].args, "loggers checkers");
    prevLog.current = log;
    if (log[0]?.data?.player === address) {
      console.log(log[0]?.data, "checking if I got the data correctly");
      setGameResult(true);
      if (log[0]?.data.status === 1) {
        console.log("in in in here win");
        setNotify(true);
        setNotifyType("success");
        setNotifyMsg("Game Won");
        setloaderActive(false);
        setConfettiWin(true);
      } else {
        console.log("in in in in here loss");
        setNotify(true);
        setNotifyType("warn");
        setNotifyMsg("Game Lost");
        setloaderActive(false);
        setConfettiLoss(true);
      }
    }
  };

  const {
    data: log,
    isLoading: loadingEvent,
    error: errorEvent,
  } = useContractEvents(contract, "BetResolved");

  const play = async (searchParams) => {
    //check that user is registered
    console.log("Called buy", amount);
    if (!address) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("Connect wallet to proceed");
      return;
    }

    console.log(Math.round(selectedChoice), Math.round(winChance), "wiw wiw ");


    try {
      setloaderActive(true);
      //const contractInstance =  await getContract();

      //const fees = ethers.utils.parseEther(String(inputValue));
      const feepaid = (4 / 100) * parseFloat(amount);
      // console.log(
      //   feepaid,
      //   "Checking in me ",
      //   parseFloat(selectedAmount) + feepaid
      // );
      const fees = ethers.utils.parseEther(String(parseFloat(amount)));
      console.log(fees, "check oooooo in here");

      // const textEncoder = new TextEncoder();
      // const gameTypeencoded = textEncoder.encode(gametype);
      const gameTypeencoded = ethers.utils.formatBytes32String("dice")

      const refValue =
        searchParams.get("address") !== null
          ? searchParams.get("address")
          : "0x0000000000000000000000000000000000000000";

      await PlaceBet({
        args: [
          Math.round(selectedChoice),
          gameTypeencoded,
          Math.round(winChance),
          refValue,
        ],
        overrides: {
          gasLimit: 1000000,
          value: fees, // send 0.1 native token with the contract call
        },
      });
    } catch (error) {
      console.log(error, "error ini");
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("User cancelled transaction");
      setloaderActive(false);
    }
  };

  //Useeffect
  useEffect(() => {
    if (selectedChainLocal === "" && address) {
      setSelectedChainLocal(chain?.chain);
    }

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
  }, [notify, log]);

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
    // dataUsers,
    // dataLeaders,
    //dataFlipstat,
    //Flipstatloading,
    //Flipstatsuccess,
    //getstats,
    play,
    //for game populate data
    setSelectedChoice,
    setWinchance,
    setAmount,
    setGameType,
    //end of for game data
    confettiWin,
    setConfettiWin,
    confettiLoss,
    setConfettiLoss,
    gameResult,
    setGameResult,
    chain,
    dataHistory,
    playingas,
    SetPlayingas,
    selectedChainLocal,
    setSelectedChainLocal,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
