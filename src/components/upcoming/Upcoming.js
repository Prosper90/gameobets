import React, { useState, useEffect } from "react";
import { Crash, Dice, Roulette, Sports } from "./svgs";

export default function Upcoming() {
  const [openMore, setOpenMore] = useState(false);

  const switchMore = () => {
    setOpenMore(!openMore);
  };

  useEffect(() => {}, [openMore]);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-1 md:gap-10 items-center p-[1px] pb-5 scroll-m-0 overflow-y-scroll mt-5 h-[100%] md:h-screen scroll-smooth">
      {/* Roulette */}
      <div className="card">
        <div className="image-container">
          <div className="flex justify-center items-center p-10 rounded-[10px] rounded-tr-[55px] bg-[#DBDBDB]">
            <Roulette />
          </div>
        </div>
        <div className="content">
          <div className="brand">Roulette</div>
          <div className="product-name">A famous game</div>

          <div className="rating">Coming Soon...</div>
        </div>
        <div className="button-container">
          <button className="buy-button button">Details</button>
        </div>
      </div>
      {/* Crash */}
      <div className="card">
        <div className="image-container">
          <div className="flex justify-center items-center p-10 rounded-[10px] rounded-tr-[55px] bg-[#DBDBDB]">
            <Crash />
          </div>
        </div>
        <div className="content">
          <div className="brand">Crash</div>
          <div className="product-name">A famous game</div>

          <div className="rating">Coming Soon...</div>
        </div>
        <div className="button-container">
          <button className="buy-button button">Details</button>
        </div>
      </div>
      {/* Dice */}
      <div className="card">
        <div className="image-container">
          <div className="flex justify-center items-center p-10 rounded-[10px] rounded-tr-[55px] bg-[#DBDBDB]">
            <Dice />
          </div>
        </div>
        <div className="content">
          <div className="brand">Crash</div>
          <div className="product-name">A famous game</div>

          <div className="rating">Coming Soon...</div>
        </div>
        <div className="button-container">
          <button className="buy-button button">Details</button>
        </div>
      </div>
      {/* Sport */}
      <div className="card">
        <div className="image-container">
          <div className="flex justify-center items-center p-10 rounded-[10px] rounded-tr-[55px] bg-[#DBDBDB]">
            <Sports />
          </div>
        </div>
        <div className="content">
          <div className="brand">Crash</div>
          <div className="product-name">A famous game</div>

          <div className="rating">Coming Soon...</div>
        </div>
        <div className="button-container">
          <button className="buy-button button">Details</button>
        </div>
      </div>
    </div>
  );
}
