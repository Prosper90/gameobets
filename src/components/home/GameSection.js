import React, { useState } from 'react'

function GameSection() {
    const [selectedMode, setSelectedMode] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSwitch = (event) => {
        setSelectedMode(event.target.value);
    };
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const ethData = [
        {
            id: 1,
            currency: 'ETH',
            eth: "0.1",
        },
        {
            id: 2,
            currency: 'ETH',
            eth: "0.5",
        },
        {
            id: 3,
            currency: 'ETH',
            eth: "0.10",
        },
        {
            id: 4,
            currency: 'ETH',
            eth: "0.50",
        },
        {
            id: 5,
            currency: 'ETH',
            eth: "0.75",
        },
        {
            id: 6,
            currency: 'ETH',
            eth: "1.00",
        },
    ]

    return (
        <div className=' flex flex-col items-center justify-center scroll-m-0 overflow-y-scroll h-[90vh] pt-16 scroll-smooth'>
            <img src="/WhatsApp Image 2023-04-20 at 23.21 1.png" className='h-36' alt=",ndsvnd" />

            <h1 className='game-font text-white text-base font-bold'>I Like</h1>
            <div className="flex md:my-5 mt-4 gap-10">

                <div className='w-full '>
                    <label className='containers '>
                        <input className='hidden'
                            type="checkbox"
                            name="mode"
                            value="heads"
                            checked={selectedMode === 'heads'}
                            onChange={handleSwitch}
                        />
                        <span className='checkmark text-lg md:text-base game-font'>
                            Heads
                        </span>
                    </label>
                </div>
                <div className='w-full mb-6 md:mb-0'>
                    <label className='containers '>
                        <input className='hidden'
                            type="checkbox"
                            name="mode"
                            value="tails"
                            checked={selectedMode === 'tails'}
                            onChange={handleSwitch}
                        />
                        <span className='checkmark text-center text-lg md:text-base game-font'>
                            Tails
                        </span>
                    </label>
                </div>

            </div>

            <h1 className='game-font text-white text-lg font-bold mb-4 md:mb-3'>For</h1>

            <div className="grid md:grid-cols-3 grid-cols-2">

                {
                    ethData.map(eth => (

                        <div key={eth.id} className=' px-3 mb-6 md:mb-5'>
                            <label className='containers '>
                                <input className='hidden'
                                    type="checkbox"
                                    name="optionEth"
                                    value={eth.eth}
                                    checked={selectedOption === eth.eth}
                                    onChange={handleOptionChange}
                                />
                                <span className='checkmark p-3 game-font text-xs md:text-xs'>
                                    {eth.eth} {eth.currency}
                                </span>
                            </label>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center">
                <div className=' px-3 mb-6 md:mb-5'>
                    <label className='containers '>
                        <input className='hidden'
                            type="checkbox"
                            name="optionEth"
                            value="all"
                            checked={selectedOption === "all"}
                            onChange={handleOptionChange}
                        />
                        <span className='checkmark w-100 p-3 game-font text-xs md:text-sm'>
                            DOUBLE OR NOTHING
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default GameSection