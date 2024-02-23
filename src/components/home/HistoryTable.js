/** @format */

import { useContext, useState } from "react";
// import { ShopContext } from "../../utils/contextShop";

function HistoryTable() {
  const [data, setData] = useState([
    {
      date: "2023-12-15T21:50:46.753+00:00",
      game: "flip",
      user: "0x223546",
      betA: 0.0053,
      multiplier: 0.2201,
      payout: 0.0005,
    },
    {
      date: "2023-12-15T21:50:46.753+00:00",
      game: "flip",
      user: "0x223546",
      betA: 0.0053,
      multiplier: 0.2201,
      payout: 0.0005,
    },
  ]);

  //   const {
  //     paymentModal,
  //     successRedeem,
  //     pagination,
  //     setPagination,
  //     currentPage,
  //     setCurrentPage,
  //   } = useContext(ShopContext);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      // minute: '2-digit',
      // second: '2-digit',
      // timeZoneName: 'short',
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };
  return (
    <div className="relative w-full flex justify-center">
      <div className="m-5 border rounded-2xl overflow-hidden bg-[#130D25] w-[83%] md:w-[70%]">
        {data?.length !== 0 ? (
          <div className="overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-gray-500 hidden md:block">
              <thead>
                <tr className="text-xs uppercase bg-gray-50">
                  <th className="py-3 px-6 w-1/6">Time</th>
                  <th className="py-3 px-6 w-1/6">Game</th>
                  <th className="py-3 px-6 w-1/6">User</th>
                  <th className="py-3 px-6 w-1/6">Bet</th>
                  <th className="py-3 px-6 w-1/6">Multiplier</th>
                  <th className="py-3 px-6 w-1/6">Payout</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((item) => (
                  <tr key={item.id} className="bg-[#2A253A] hover:bg-[#333]">
                    <td className="py-4 px-6 w-1/6 text-center">
                      {formatDate(item.date)}
                    </td>
                    <td className="py-4 px-6 w-1/6 text-center">{item.game}</td>
                    <td className="py-4 px-6 w-1/6 text-center">{item.user}</td>
                    <td className="py-4 px-6 w-1/6 text-center">{item.betA}</td>
                    <td className="py-4 px-6 w-1/6 text-center">
                      {item.multiplier}
                    </td>
                    <td className="py-4 px-6 w-1/6 text-center">
                      {item.payout}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* mobile view table */}
            <div className="block md:hidden">
              <div className="flex w-[100%] justify-between px-5 pt-3 text-[#fff] font-semibold border-b border-[#fff]">
                <div className="">User/date</div>
                <div className="">Game/Payout</div>
              </div>
              {data?.map((item, idx) => (
                <div
                  className="justify-between  items-center w-full py-3  flex border-b border-[#fff]"
                  key={idx}
                >
                  <div className="flex justify-between items-center w-[100%] px-5">
                    <div className="flex flex-col text-[#fff]">
                      <div className="p-2">{item.user}</div>
                      <div className="font-meduim  ml-2 text-xs ">
                        {formatDate(item.date)}
                      </div>
                    </div>
                    <div className="text-[#fff] ">
                      <div className="font-semibold text-xs ml-2 text-[#fff]">
                        {item.game}
                      </div>
                      <div className="text-[#fff] text-xs ml-2 font-bold">
                        {item.payout}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col mt-20 items-center ">
            <img src="./empty.svg" className="w-28 h-28" alt="" />
            <p className="font-semibold text-xs text-black">
              You have no transactions
            </p>
            <p className="font-normal text-xs text-gray-600">
              Your payments would show up here after you have made a successful
              transaction
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryTable;
