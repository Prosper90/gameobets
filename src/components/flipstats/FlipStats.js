import React from 'react'

function FlipStats() {
    return (
        <section className='h-[80vh] '>
         <div className="mt-36">
             <div className='flex mb-10 justify-center flex-col items-center '>
                <div className="flex border rounded-full md:w-2/5 w-96 py-3 md:py-4 relative  items-center">
                    <span> <svg stroke="#fff" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="ml-5  left-4 pointer-events-none" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                    <input type="text" className='bg-transparent text-center default-font font-bold w-full border-none outline-none text-white -ml-5' placeholder='Get Flip' />
                </div>
                <button class="w-32 sm:w-36 py-5 flex items-center text-xs justify-center text-center  h-9 rounded-full  hover:brightness-110 bg-opacity-0 shadow-sm  mt-4 bg-gradient-to-t from-[#2269B7] via-[#335296] default-font font-bold text-white to-[#2c84c25d]">Search</button>
            </div>
            <div className="flex  justify-center ">
                <div className="border p-5 flex flex-col md:flex-row items-center relative justify-between rounded-md md:w-2/5 w-96 text-white md:h-28">
                    <div className="flex flex-col items-center mb-6 md:mb-auto">
                        <img src="/ethlogo.png" className='rounded-full h-10' alt="jknfdkj" />
                        <h1 className='text-white game-font text-[8px] mt-4'>emsbfmsdbfmsanfband</h1>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col md:w-44 w-24 items-center">
                            <h2 className='game-font text-[8px]'>Total ETH </h2>
                            <b>4.00</b>
                        </div>
                        <div className="flex flex-col md:w-44 w-36 items-center">
                            <h2 className='game-font text-[8px]'>Predition</h2>
                            <b>Heads</b>
                        </div>

                    </div>
                </div>
            </div>
         </div>
        </section>
    )
}

export default FlipStats