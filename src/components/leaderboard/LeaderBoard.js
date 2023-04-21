import React from 'react'
import Card from '../topgamercard/Card'

export default function LeaderBoard() {
    return (
        <section>
            <h1 className='game-font text-white text-2xl font-bold text-center mb-1'>Leaderboard</h1>
            <h3 className='game-font text-gray-400 text-sm font-bold text-center mb-6'>Our Top Gamers</h3>
            <div className='flex justify-center'>
                <div className="grid gap-5 scroll-m-0 overflow-y-scroll h-[80vh] pb-16 scroll-smooth px-4">

                 <Card walletId="fnkdsnkjsdnvs" totalEth="49.0" totalRound="299" positionNumber="1" positionAph="st"/>
                 <Card walletId="fnkdsnkjsdnvs" totalEth="43.0" totalRound="288" positionNumber="2" positionAph="nd"/>
                 <Card walletId="fnkdsnkjsdnvs" totalEth="42.0" totalRound="222" positionNumber="3" positionAph="rd"/>
                 <Card walletId="fnkdsnkjsdnvs" totalEth="40.0" totalRound="200" positionNumber="4" positionAph="th"/>

                </div>
            </div>
        </section>
    )
}
