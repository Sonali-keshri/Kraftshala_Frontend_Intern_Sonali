import React from 'react';

const Forecast = ({ title, data }) => {
    return (
        <div className='bg-slate-700 p-4 mb-4 mt-10 rounded-xl'>
            <div className='border-b-2 border-x-cyan-50'>
                <p className='text-white pb-2'>{title}</p>
            </div>
            <div className='forecast-container'>
                {data.map((d, index) => (
                    <div className="forecaste_card bg-slate-400" key={index}>
                        <p>{d.title}</p>
                        <h1 className='text-xl font-semibold'>{d.temp}°</h1>
                        <img src={d.icon} className='w-16' alt="weather icon" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
