import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { shortenAddress } from '../utils/trauncate';
import { useContractRead, useAccount } from 'wagmi';
import { ContractAddress, contractABI, chainETH } from '../../components/utils/constants';

function Referrals({userData, setNotify, setNotifyType, setNotifyMsg, getuserStats, setUserdata}) {
    const [isCopied, setIsCopied] = useState(false);
    const [referralsData, setReferalsData] = useState(0);
    const [referralsWon, setreferralsWon] = useState(0);
    const [referralsLost, setreferralsLost] = useState(0);

    const navigate = useNavigate();
    const { isConnected, address } = useAccount();

    const { dataUsers, isErrorUsers, isLoadingUsers } = useContractRead({
        address: ContractAddress,
        abi: contractABI,
        functionName: 'self',
      })

    const handleCopyClick = (text) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
    };

    const refsdata = () => {
        let won = 0;
        let loss = 0;
        const dataget = userData?.filter((data) => {
            return data.player !== address ;
        })

        const filteredData = dataget?.filter((item, index, arr) => {
            // Check if there are any other objects with the same value
            const hasDuplicate = arr.some((otherItem, otherIndex) => {
              return (
                otherIndex !== index && otherItem.player === item.player
              );
            });
          
            // Return objects that don't have the same value as any other object
            return !hasDuplicate;
          });   

        dataget?.map((data) => {
            if(data.isWin == true) {
                won += (Math.round(data.amount/10) * 10 ) / 10**18;
            } else {
                loss += (Math.round(data.amount/10) * 10 ) / 10**18;
            }
        })
        setReferalsData(filteredData?.length);
        setreferralsWon(won);
        setreferralsLost(loss);
    }

    useEffect(() => {


        if(!address) {
            setNotify(true);
            setNotifyType("warn")
            setNotifyMsg("Please connect your wallet to proceed");
            navigate("/");
          }
      
        setTimeout(() => {
            setIsCopied(false) 
        }, 3000);
       
         if(userData?.length !== 0) {
            refsdata();
         }


         if (dataUsers) {
            setUserdata(Array.from(dataUsers).reverse())
          }

    }, [isCopied, dataUsers])
    

    return (
  <div className='flex justify-center items-center w-screen flex-col mt-9 px-4 md:px-16'>


       <div className=" p-5 flex items-center relative justify-between rounded-md w-full text-[#FDE047] h-28">
            <div className="flex flex-col items-center">
                <h1 className='text-[#FDE047] game-font text-[10px] md:text-[20px] '>Ref Link</h1>
            </div>
            <div className="flex md:w-2/4 justify-between">
                <div className="flex flex-col mr-8 items-center">
                    <h2 className='game-font text-[6px] md:text-[13px]'>Total Refs </h2>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className='game-font text-[6px] mr-8 md:text-[13px]'>Amount won</h2>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className='game-font text-[6px] md:text-[13px]'>Amount Lost</h2>
                </div>

            </div>
        </div>


        <div className="scroll-m-0 overflow-y-scroll h-[500px] w-full pb-24">
            <div className="border-2 border-[#FDE047]  to-[#0F0F0F] from-[#000] bg-gradient-to-br  px-5 mb-2 flex items-center relative justify-between rounded-md w-full text-white h-[100px]">
                <div className="flex items-center md:gap-8"> {/* http://localhost:3000/ */} {/* https://flipgamers.netlify.app */}
                    <button onClick={() => handleCopyClick(`https://flipgamers.netlify.app/?address=${address}`)} className='cursor-pointer' title="copy">
                        {isCopied ? 'Copied!' : <svg xmlns="http://www.w3.org/2000/svg" title="copy" width="24" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>}
                    </button>
                    <h1 className='text-white game-font text-[5px]  md:text-xs'>{shortenAddress(`https://flipgamers.netlify.app/?address=${address}`)}</h1>
                </div>
                <div className="flex justify-between w-2/4">
                    <div className="flex flex-col text-[9px] md:text-lg items-center w-1/5">
                        <b>
                        {
                          referralsData
                        }
                        </b>
                    </div>
                    <div className="flex flex-col text-[9px] md:text-lg items-center w-1/5">
                        <b>
                        {
                            referralsWon
                        }
                        </b>
                    </div>
                    <div className="flex flex-col text-[9px] md:text-lg  items-center w-1/5">
                        <b>
                          { 
                            referralsLost
                          }
                        </b>
                    </div>

                </div>
            </div>

        </div>


  </div>
    )
}

export default Referrals