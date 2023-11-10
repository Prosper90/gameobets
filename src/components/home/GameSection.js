import React, { useState, useEffect } from "react";
import { ContractAddress, contractABI, chainETH } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import Svgloader from "../preloader/Svgloader";
import { useContractRead, useContractWrite, useAccount } from "wagmi";
import { ethDataRegular, ethDataWhales } from "../utils/data";
import Switch from "../switchplayer/Switch";

function GameSection({ setNotify, setNotifyType, setNotifyMsg, setLoading }) {
  const { isConnected, address } = useAccount();
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loaderActive, setloaderActive] = useState(false);
  const [playingas, SetPlayingas] = useState("regular");
  const [toMap, SetTomap] = useState([]);

  const [searchParams] = useSearchParams();
  console.log(searchParams.get("address"), "getting query for referrals"); // ▶ URLSearchParams {}

  const handleSwitch = (event) => {
    setSelectedMode(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  /* global BigInt */
  /*
   const getContract = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(ContractAddress, contractABI, signer);
  }
  */

  const { dataFlip, isLoadingFlip, isSuccessFlip, write } = useContractWrite({
    address: ContractAddress,
    abi: contractABI,
    functionName: "flipTheCoin",
  });

  const { dataPool, isLoadingPool, isErrorPol } = useContractRead({
    address: ContractAddress,
    abi: contractABI,
    functionName: "getStatus",
    args: [dataFlip], // Pass the dataId as an argument to the contract function
  });

  //delay function
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const flip = async (choice) => {
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
      const feepaid = (4 / 100) * parseFloat(selectedOption);
      const fees = ethers.utils.parseEther(
        String(parseFloat(selectedOption) + feepaid)
      );
      const refValue =
        searchParams.get("address") !== null
          ? searchParams.get("address")
          : "0x0000000000000000000000000000000000000000";

      /*
        const flip = await contractInstance.flipTheCoin(parseFloat(choice), refValue, {
          value: fees,
          gasLimit: 1000000
        });
        await flip.wait();
        */
      const tx = await write({
        args: [parseFloat(choice), refValue],
        value: fees,
        gasLimit: 1000000,
      });
      await tx.wait();

      /*
            const dataId = await contractInstance.pool(address);
            console.log(dataId)
            loop(dataId);
         */
    } catch (error) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("User cancelled transaction");
      setloaderActive(false);
    }
  };

  //start polling data
  const loop = async (dataId) => {
    /*
        const contractInstance =  await getContract();
        console.log("error happened after here");
        const checking = await contractInstance.getStatus(dataId);
        //console.log(checking, "checking returned data");
        */

    if (dataPool.fullFilled == true) {
      if (dataPool.isWin == true) {
        setNotify(true);
        setNotifyType("success");
        setNotifyMsg("Won the Flip");
        setloaderActive(false);
      } else {
        setNotify(true);
        setNotifyType("warn");
        setNotifyMsg("Lost the Flip");
        setloaderActive(false);
      }
    } else {
      console.log("this will then run over again");
      delay(3000);
      return loop(dataId);
    }
  };

  useEffect(() => {
    // Call the loop function when the data changes
    if (dataFlip) {
      loop(dataFlip);
    }

    if (playingas === "regular") {
      SetTomap(ethDataRegular);
    } else {
      SetTomap(ethDataWhales);
    }
  }, [dataFlip, playingas]);

  return (
    <div className="flex justify-center items-center pb-10  flex-col scroll-m-0 overflow-y-scroll h-screen scroll-smooth">
      <div className=" flex flex-col items-center border-2 mt-10 py-10 rounded-md border-[#FDE047] to-[#0F0F0F] from-[#000] bg-gradient-to-br w-[90%] md:w-[28%] justify-center scroll-m-0 overflow-y-scroll  scroll-smooth">
        <h1 className="game-font text-[#FDE047] text-2xl md:text-3xl pb-5 font-extrabold">
          Eth waggers
        </h1>
        {/*<img src="/casino-logo.webp" className='h-36' alt=",ndsvnd" />*/}
        <Svgloader loaderActive={loaderActive} />

        <div className="flex md:my-5 mt-5 gap-3">
          <div className=" ">
            <label className="containers ">
              <input
                className="hidden"
                type="checkbox"
                name="mode"
                value="heads"
                checked={selectedMode === "heads"}
                onChange={handleSwitch}
              />
              <span className="checkmark text-xl font-extrabold  md:text-base game-font">
                Heads
              </span>
            </label>
          </div>
          <div className=" mb-6 md:mb-0">
            <label className="containers ">
              <input
                className="hidden"
                type="checkbox"
                name="mode"
                value="tails"
                checked={selectedMode === "tails"}
                onChange={handleSwitch}
              />
              <span className="checkmark text-center text-xl font-extrabold md:text-base game-font">
                Tails
              </span>
            </label>
          </div>
        </div>
        <div className="border-b mb-5 w-4/5 border-[#ffffff1d]"></div>

        <h1 className="game-font text-[#FDE047] text-2xl font-bold mb-4 md:mb-5">
          Choose bet
        </h1>

        <div className="grid grid-cols-3 gap-2 ">
          {toMap?.map((eth) => (
            <div key={eth.id} className=" mb-6 md:mb-5">
              <label className="containers">
                <input
                  className="hidden"
                  type="checkbox"
                  name="optionEth"
                  value={eth.eth}
                  checked={selectedOption === eth.eth}
                  onChange={handleOptionChange}
                />
                <span className="checkmark p-3 game-font text-sm font-extrabold md:text-xs">
                  {eth.eth} {eth.currency}
                </span>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className=" px-3 mb-6 md:mb-5 flex flex-col justify-center items-center">
            <label className="containers">
              <input
                className="hidden"
                type="checkbox"
                name="optionEth"
                value="all"
                checked={selectedOption === "all"}
                onChange={handleOptionChange}
              />
              <div className="border-b mb-5 w-full my-5 border-[#ffffff1d]"></div>
              <span
                className="checkmark w-[17rem]  border-2 border-[#FDE047] w-100  font-extrabold p-3 game-font text-sm md:text-sm"
                onClick={() => flip(`${selectedMode === "heads" ? 1 : 0}`)}
              >
                Flip
              </span>
            </label>

            <Switch playingas={playingas} SetPlayingas={SetPlayingas} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSection;
