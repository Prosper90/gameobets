import React from 'react'

function Card({walletId, totalEth, totalRound, positionNumber, positionAph}) {
    return (
        <div className="border p-5 flex items-center relative justify-between rounded-md w-full text-white h-28">
            <div className="absolute -bottom-2 bg-[#2469b7] game-font border px-3 -right-2 py-1">{positionNumber}<sup>{positionAph}</sup> </div>
            <div className="flex flex-col items-center">
                <img src="/DALL·E 2023-04-21 01.15.47 - 2d Ethereum logo.png" className='rounded-full h-10' alt="jknfdkj" />
                <h1 className='text-white game-font text-[8px] mt-4'>{walletId}</h1>
            </div>
            <div className="flex">
                <div className="flex flex-col md:w-44 w-28 items-center">
                    <h2 className='game-font text-[8px]'>Total ETH </h2>
                    <b>{totalEth}</b>
                </div>
                <div className="flex flex-col md:w-44 w-36 items-center">
                    <h2 className='game-font text-[8px]'>Total Round Played</h2>
                    <b>{totalRound}</b>
                </div>

            </div>
        </div>
    )
}

export default Card