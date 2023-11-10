import React, {useEffect} from 'react'
import FlipCard from './FlipCard'
import { useNavigate } from 'react-router-dom';
import { useContractRead, useAccount } from 'wagmi';
import { ContractAddress, contractABI, chainETH } from '../../components/utils/constants';

function AllFlips({ userData, setNotify, setNotifyType, setNotifyMsg, getuserStats, setUserdata}) {

    console.log(userData, "allflipps");
    const navigate = useNavigate();
    const { isConnected, address } = useAccount();

    const { dataUsers, isErrorUsers, isLoadingUsers } = useContractRead({
        address: ContractAddress,
        abi: contractABI,
        functionName: 'self',
      })

    useEffect(() => {
        /*
      if(!address) {
        setNotify(true);
        setNotifyType("warn")
        setNotifyMsg("Please connect your wallet to proceed");
        navigate("/");
      }
      */

      if (dataUsers) {
        setUserdata(Array.from(dataUsers).reverse())
      }
    }, [address, dataUsers])
    
    return (
   <>
     { userData?.length != 0 ? 
        <div className='flex justify-center items-center w-screen flex-col mt-9 px-4 md:px-16'>
            <div className=" p-5 flex items-center relative justify-between rounded-md w-full text-white h-28">
                <div className="flex flex-col items-center">
                    <h1 className='text-[#FDE047] game-font text-[10px] md:text-[20px] '>Game ID</h1>
                </div>
                <div className="flex md:w-2/4 justify-between">
                    <div className="flex flex-col mr-8 items-center">
                        <h2 className='game-font text-[#FDE047] text-[6px] md:text-[13px]'>Total BNB </h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className='game-font text-[#FDE047] text-[6px] mr-8 md:text-[13px]'>Predition</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className='game-font text-[#FDE047] text-[6px] md:text-[13px]'>Game Status</h2>
                    </div>

                </div>
            </div>
            <div className="scroll-m-0 overflow-y-scroll h-[80vh] w-full pb-24 scroll-smooth">

                    {
                        userData?.map((data) => (
                            <FlipCard data={data}  address={address} />
                        ))
                    }

            </div>
        </div>
        :
        <h3 className='pt-[140px] text-[#FDE047] text-center font-bold'>No data</h3>
        }
      </>
    )
}

export default AllFlips