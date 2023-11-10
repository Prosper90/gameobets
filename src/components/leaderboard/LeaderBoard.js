import React, {useEffect} from 'react'
import Card from '../topgamercard/Card'
import { useNavigate } from 'react-router-dom'
import { shortenAddress } from '../utils/trauncate'
import { useContractRead, useAccount } from 'wagmi'
import { ContractAddress, contractABI, chainETH } from '../../components/utils/constants';

export default function LeaderBoard({leaderboard, getleaderBoard, setNotify, setNotifyType, setNotifyMsg, setLeaderBoard}) {

   const navigate = useNavigate();
   const { isConnected, address } = useAccount();

   const { dataLeaders, isErrorLeaders, isLoadingLeaders } = useContractRead({
    address: ContractAddress,
    abi: contractABI,
    functionName: 'leaders',
  })


  const sorted = (val) => {
    let miniSort = Array.from(val).sort(function(a, b) {
      console.log(parseInt(a.amount, 10))
        return parseInt(a.amount, 10) - parseInt(b.amount, 10);
    });

    setLeaderBoard(miniSort)
  } 

    useEffect(() => {
        if(!address) {
          setNotify(true);
          setNotifyType("warn")
          setNotifyMsg("Please connect your wallet to proceed");
          navigate("/");
        }

        if (dataLeaders) {
          sorted(dataLeaders);
        }
  
        //getleaderBoard();
      }, [address])
      
    return (
        <section>
            <h1 className='game-font text-white text-2xl mt-4 font-bold text-center mb-1'>Leaderboard</h1>
            <h3 className='game-font text-gray-400 text-sm font-bold text-center mb-6'>Our Top Gamers</h3>
            <div className='flex justify-center'>
                <div className="grid gap-5 scroll-m-0 overflow-y-scroll h-[80vh] pb-16 scroll-smooth px-4">
                { leaderboard?.lenght !== 0 ? 
                  <>
                    {
                        leaderboard?.map((data, index) => (
                            <Card walletId={shortenAddress(String(data.player))} totalEth={ ((Math.round(data.amount/10) * 10 ) / 10**18) * 2 } chosenText={parseInt(data.input)  == 1 ? "Heads" : "Tails"} positionNumber={index + 1} positionAph="st"/>
                        ))
                    }
                  </>
                  :

                  <h3>Empty</h3>
                }
                </div>
            </div>
        </section>
    )
}
