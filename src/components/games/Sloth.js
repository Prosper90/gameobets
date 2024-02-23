import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Svgloader from "../preloader/Svgloader";
import { ShopContext } from "../../utils/contextShop";

export default function Sloth({ setSelectedGame }) {
  const { 
     loaderActive,
     play,
     //for game data
     setSelectedChoice,
     setWinchance,
     setAmount,
     setGameType,
     //end of for game data
    chain, 
    playingas, 
    SetPlayingas 
  } =  useContext(ShopContext);
  const [searchParams] = useSearchParams();


  // const images = ["😎", "🤑", "🎁", "🎉", "🍎", "🍇", "🔔", "💰"];

  // const loserMessages = [
  //   "Not quite",
  //   "Stop gambling",
  //   "Hey, you lost!",
  //   "Ouch! I felt that",
  //   "Don't beat yourself up",
  //   "There goes the college fund",
  //   "I have a cat. You have a loss",
  //   "You're awesome at losing",
  //   "Coding is hard",
  //   "Don't hate the coder",
  // ];

  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [winning, setWinning] = useState(true); // Initial winning state set to false
  const num_icons = 9;
  const icon_height = 79;
  const time_per_icon = 100;
  const iconMap = [
    "banana",
    "seven",
    "cherry",
    "plum",
    "orange",
    "bell",
    "bar",
    "lemon",
    "melon",
  ];

  useEffect(() => {
    // if (indexes[0] === indexes[1] || indexes[1] === indexes[2]) {
    //   const winCls = indexes[0] === indexes[2] ? "win2" : "win1";
    //   document.querySelector(".slots").classList.add(winCls);
    //   setTimeout(() => {
    //     document.querySelector(".slots").classList.remove(winCls);
    //     setWinning(true); // Set winning state to true on a win
    //   }, 2000);
    // } else {
    //   setWinning(false); // Set winning state to false on a loss
    // }
  }, []);

  const roll = (reel, offset = 0) => {
    // Minimum of 2 + the reel offset rounds
    const delta =
      (offset + 2) * num_icons + Math.round(Math.random() * num_icons);

    // Return promise so we can wait for all reels to finish
    return new Promise((resolve, reject) => {
      const style = getComputedStyle(reel),
        // Current background position
        backgroundPositionY = parseFloat(style["background-position-y"]),
        // Target background position
        targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
        // Normalized background position, for reset
        normTargetBackgroundPositionY =
          targetBackgroundPositionY % (num_icons * icon_height);

      // Delay animation with timeout, for some reason a delay in the animation property causes stutter
      setTimeout(() => {
        // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
        reel.style.transition = `background-position-y ${
          (8 + 1 * delta) * time_per_icon
        }ms cubic-bezier(.41,-0.01,.63,1.09)`;
        // Set background position
        reel.style.backgroundPositionY = `${
          backgroundPositionY + delta * icon_height
        }px`;
      }, offset * 150);

      // After animation
      setTimeout(() => {
        // Reset position, so that it doesn't get higher without limit
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        // Resolve this promise
        resolve(delta % num_icons);
      }, (8 + 1 * delta) * time_per_icon + offset * 150);
    });
  };

  const rollAll = () => {
    setWinning(false); // Reset winning state before rolling
    const reelsList = document.querySelectorAll(".slots > .reel");
    Promise.all([...reelsList].map((reel, i) => roll(reel, i))).then(
      (deltas) => {
        setIndexes(deltas.map((delta, i) => (indexes[i] + delta) % num_icons));

        // Determine the outcome based on the winning state
        if (winning) {
          console.log("You won!");
          // Handle win logic here
        } else {
          console.log("Better luck next time!");
          // Handle loss logic here
        }
      }
    );

    play(searchParams);
  };

  useEffect(() => {
    setGameType("slot");
  }, []); // Empty dependency array to run only once

  return (
    <div
      className="flex justify-center items-center p-5 md:p-10  flex-col scroll-m-0 overflow-y-scroll h-[100dvh] scroll-smooth relative"
      style={{
        background: `linear-gradient(90deg, rgba(6, 0, 24, 0.80) 7.11%, rgba(0, 0, 0, 0.00) 100%), url(${"/background.svg"}), lightgray -0.002px 6px / 98.451% 141.25% no-repeat`,
      }}
    >
      <div
        className="absolute z-[99999] text-[#fff] left-5 top-7 cursor-pointer bg-[#000] p-1 rounded"
        onClick={() => setSelectedGame("")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FFF"
            d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center rounded-2xl bg-[#130D25] w-[90%] md:w-[28%] justify-start scroll-m-0 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] text-white text-opacity-60 p-2">
        <div className="flex flex-col mt-3">
          <h5 className="game-font text-[#FFF] text-2xl md:text-3xl pb-5 font-extrabold text-center p-3">
            #Slot
          </h5>
          <div className="w-100 flex justify-center items-center">
            {/* {winner === null
              ? "Waiting…"
              : winner
              ? "🤑 Pure skill! 🤑"
              : loserMessages[Math.floor(Math.random() * loserMessages.length)]} */}
            Hi messages
          </div>
        </div>
        <div className="border-b mb-5 w-4/5 border-[#ffffff1d]"></div>

        <div className="slots">
          {[0, 1, 2].map((index) => (
            <div key={index} className="reel" />
          ))}
        </div>

        <div className="border-b mb-5 w-full my-5 border-[#ffffff1d]"></div>

        <div className="flex justify-center mt-5">
          <div className="px-3 mb-6 md:mb-5 flex flex-col justify-center items-center">
            <label className="border-2 border-[#1cba6b] rounded pl-5 py-5 h-10 flex justify-center items-center">
              <input
                className="w-[100%] bg-transparent outline-none text-[#fff] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder="Input bet amount"
                defaultValue={0.05}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={() => rollAll()}
                className="w-[100px] text-[#fff] border-l-2 border-[#1cba6b] font-extrabold p-3 game-font text-sm md:text-sm cursor-pointer text-center hover:bg-[#1cba6b] hover:text-[#fff]"
              >
                Spin
              </button>
            </label>

            {/* <Switch playingas={playingas} SetPlayingas={SetPlayingas} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const Reel = ({ onFinish, spinning, timer }) => {
  // const images = ["😎", "🤑", "🎁", "🎉", "🍎", "🍇", "🔔", "💰"];

  return (
    <div
      className="reel border-1 border-[#000] w-[79px] h-100 "
      style={{
        backgroundImage: "url(https://assets.codepen.io/439000/slotreel.webp)",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "0 0",
      }}
    />
  );
};
