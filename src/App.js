import React,{useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import GameSection from "./components/home/GameSection";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import FlipStats from "./components/flipstats/FlipStats";
import AllFlips from "./components/allflips/AllFlips";
import Referrals from "./components/referrals/Referrals";
import Contest from "./components/contests/Contest";
import { ethers } from 'ethers';
import { ContractAddress, contractABI, chainETH } from './components/utils/constants';
import { shortenAddress } from "./components/utils/trauncate";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bscTestnet, bsc, } from 'wagmi/chains'
import { useContractRead } from 'wagmi'



function App() {


  const chains = [bscTestnet, bsc]
  const projectId = '094f792bdb976987a70ebccdc0f7f7d1'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)


    //web 3 states
    const [provider, setProvider] = useState(undefined);
    const [signer, setSigner] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [chain, setChain] = useState();
    const [userData, setUserdata] = useState();
    const [leaderboard, setLeaderBoard] = useState()
    //motifiers
    const [notify, setNotify] = useState(false);
    const [notifyType, setNotifyType] = useState();
    const [notifyMsg, setNotifyMsg] = useState();
    //loader
    const [loader, setLoading] = useState(false);
    //contests
    const [isRaffleOpen, setisRaffleOpen] = useState(false);
    const [round, setRound] = useState();
    const [ticketPrice, setTicketPrice] = useState();
    const [currentPot, setCurrentPot] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [ticketBought, setTicketBought] = useState();

    const [contestHistory, setContestHistory] = useState();


   /* global BigInt */
   /*
   const getContract = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(ContractAddress, contractABI, signer);
  }
  */
 
  /*
  
  const { dataLeaders, isErrorLeaders, isLoadingLeaders } = useContractRead({
    address: ContractAddress,
    abi: contractABI,
    functionName: 'leaders',
  })
  

  const { dataUsers, isErrorUsers, isLoadingUsers } = useContractRead({
    address: ContractAddress,
    abi: contractABI,
    functionName: 'self',
  })
  
*/


  //connect
  /*
  const connect = async (providerarg) => {


      if(window.ethereum) {
        await providerarg?.send("eth_requestAccounts", []);
      }
        const another = await new ethers.providers.Web3Provider(window.ethereum);
        const tempChain =  await another.getNetwork();
        //switch if chain is not correct
        if(tempChain !== chainETH) {
          correctChain();
        }

        //set and get signer
        const signer = await another.getSigner();
        setSigner(signer);
        //get and set address
        const address = await signer.getAddress();
        setAddress(address)
        //set chain
        setChain(await signer.getChainId());
        //setModalWallet(false);
          
          setNotify(true);
          setNotifyType("Success")
          setNotifyMsg(`Welcome ${shortenAddress(address)}`);            
        
    }
    */





        //check for correct chain
        /*
        const correctChain = async () => {

          try {
            //switch chain
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: `0x${Number(chainETH).toString(16)}`,
                }],
            });
            return;
          } catch (error) {
            if (error === 4902) {
              //add the token or currency to metamask
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${Number(chainETH).toString(16)}`,
                    rpcUrls: [
                      " https://data-seed-prebsc-1-s1.binance.org:8545",
                    ],
                    chainName: "BSC testnet",
                    nativeCurrency: {
                      name: "BSC",
                      symbol: "BNB",
                      decimals: 18,
                    },
                    blockExplorerUrls: [
                      "https://explorer.binance.org/smart-testnet",
                    ],
                  },
                ],
              });
              return;
            }
          }
        
      };
      */


    //onload with metamask
    /*
    const onLoad = async (data) => {
      const provider = await new ethers.providers.Web3Provider(data);
      setProvider(provider);
   }
   */




   const sorted = (val) => {
    let miniSort = Array.from(val).sort(function(a, b) {
      console.log(parseInt(a.amount, 10))
        return parseInt(a.amount, 10) - parseInt(b.amount, 10);
    });

    setLeaderBoard(miniSort)
  } 


    //leaderboard
    /*
    const getleaderBoard = async () => {
      /*
        const Contract = await getContract();
        const Infol = await Contract.leaders();
        console.log(Infol, "normal")
      const sorted =  Array.from(Infol).sort(function(a, b) {
        console.log(parseInt(a.amount, "parse"))
          return parseInt(a.amount) - parseInt(b.amount);
      });
      console.log(sorted, "sorted");
        setLeaderBoard(sorted);
        



        //ContractAddress, contractABI

         //const action = data ? sorted(data) : isError ? "Error Loading leaderboard" : isLoading && "Loading";
         //return action;
    }
    */


    //user stats
    /*
    const getuserStats = async () => {
      /*
        const Contract = await getContract();
        const Info = await Contract.self();
        //console.log(Info[0].player, address, Info[0].player == address);
        const revertArr = Array.from(Info).reverse();
        setUserdata(revertArr);
        
          //ContractAddress, contractABI


        const action = data ? setUserdata(Array.from(data).reverse()) : isError ? "Error Loading self data" : isLoading && "Loading";
        return action
    }
    */

    //Contest Info
    /*
    const contestInfo = async () => {
        const Contract = await getContract();
        const Info = await Contract.onGoingRaffle();
        console.log(Info, "contest");
        const ContesHistory = await Contract.raffleHistory();
        const myOwn = ContesHistory.filter((data) => {
          return data.player == address;
        })
        setContestHistory(myOwn);
        //console.log(Info[0].player, address, Info[0].player == address);
        setisRaffleOpen(Info[0]);
        setRound(parseInt(Info[1]));
        setTicketPrice((Math.round(Info[2]/10) * 10 ) / 10**18);
        setCurrentPot((Math.round(Info[3]/10) * 10 ) / 10**18);
        setDateEnd(parseInt(Info[4]));
        setTicketBought(parseInt(Info[5]));
    }
    */


    //useEffect
    useEffect(() => {

      if(notify) {
        setTimeout(() => {
          setNotify(false);
          setNotifyType("");
          setNotifyMsg("");
        }, 5000);
       }
  
  
      }, [address, chain, notify]);

      /*
      useEffect(() => {
        if(address) {
          if (dataLeaders) {
            sorted(dataLeaders);
          }
          if (dataUsers) {
            setUserdata(Array.from(dataUsers).reverse())
          }
          //contestInfo()
        }
      }, [address, dataLeaders, dataUsers])
      */
      

        //on account changed
        /*
        if(window.ethereum){

          window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
            setAddress(accounts[0]);
          });
        
        }
        */
        
        

  return (
    <>
    <WagmiConfig config={wagmiConfig}>
    <Layout
      notify={notify}
      notifyType={notifyType}
      notifyMsg={notifyMsg}
      provider={provider}
      address={address}
      loader={loader}
      setLoading={setLoading}
    > 
      <Routes>
        <Route path="/" element={<GameSection 
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifyMsg={setNotifyMsg}
          setLoading={setLoading}
        />} />

        <Route path="/leaderboard" element={<LeaderBoard 
          leaderboard={leaderboard}
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifyMsg={setNotifyMsg}
          setLoading={setLoading}
          setLeaderBoard={setLeaderBoard}
        />} />
        <Route path="/stats" element={<FlipStats 
          setLoading={setLoading}
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifyMsg={setNotifyMsg}
        />} />
        <Route path="/all" element={<AllFlips
          userData={userData}
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifyMsg={setNotifyMsg}
          setUserdata={setUserdata}
        />} />

        <Route path="/referrals" element={<Referrals
          userData={userData}
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifyMsg={setNotifyMsg}
          setUserdata={setUserdata}
        />} />
        {/*
        <Route path="/contest" element={<Contest 
          provider={provider}
          address={address}
          signer={signer}
          setLoading={setLoading}
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifyMsg={setNotifyMsg}
          isRaffleOpen={isRaffleOpen}
          round={round}
          ticketPrice={ticketPrice}
          currentPot={currentPot}
          dateEnd={dateEnd}
          ticketBought={ticketBought}
          contestHistory={contestHistory}
          contestInfo={contestInfo}
        />} />
        */}

      </Routes>
    </Layout>
    </WagmiConfig>


    <Web3Modal 
      projectId={projectId} 
      ethereumClient={ethereumClient}
      themeVariables={{
      '--w3m-font-family': 'Jost, sans-serif',
      '--w3m-accent-color': '#000',
      '--w3m-background-color': '#FDC300',
      '--w3m-background-border-radius': '10px',
      '--w3m-container-border-radius': '10px',
      '--w3m-wallet-icon-border-radius': '10px'
      }}
    />
    
</>
  );
}

export default App;
