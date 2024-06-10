import React from 'react'
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { LuDroplets } from "react-icons/lu";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";

const Temperature = ({ weather: { main, icon, temp, temp_min, temp_max, description, sunrise, sunset, speed, humidity, feels_like } }) => {

    const cards = [
        {
            id: 1,
            icon: <LiaTemperatureHighSolid size={25} />,
            title: "FEELS LIKE",
            value: feels_like,
            description
        },
        {
            id: 2,
            icon: <FaTemperatureArrowUp size={20} />,
            title: "TEMP MAX",
            value: temp_max,
        },
        {
            id: 3,
            icon: <FaTemperatureArrowDown size={20} />,
            title: "TEMP MIN",
            value: temp_min,

        },
        {
            id: 4,
            icon: <LuDroplets size={20} />,
            title: "HUMIDITY",
            value: humidity,

        },
    ]

    return (
        <div className='mx-auto bg-slate-500 leftBox w-[350px] lg:mt-9 mt-24 p-4 mb-5 text-white rounded-2xl'>
            <div className="weather_temp text-center">
                <h1 className='text-5xl font-bold pl-4 '>{temp.toFixed()}°</h1>
                <p className='text-lg mt-3'>{main}</p>
                <img src={icon} className='mx-auto my-0 p-0' />
                <div className='flex justify-between gap-10'>
                    <p className='flex items-center gap-1'> <WiSunrise size={30} /> Sunrise : {sunrise}</p>
                    <p className='flex items-center gap-1'><WiSunset size={30} /> Sunset: {sunset} </p>
                </div>
            </div>
            <div className="weather_details grid grid-cols-2 gap-4 text-sm mt-4 p-2">

                {
                    cards.map((card) => {
                        return (

                            <div className="h-[130px] p-4 py-5 bg-slate-800 flex flex-col gap-2 rounded-xl text-center card" key={card.title}>
                                <p className='flex items-center justify-center gap-1'> {card.icon} {card.title}</p>
                                <h1 className='text-xl font-semibold'>{card.value}°</h1>
                                <p>{card.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Temperature