import React, { useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";


const SearchBar = ({ setQuery }) => {

    const [city, setCity] = useState("")


    const handleSearch = () => {
        console.log(city)
        setQuery({ q: city })

    }


    return (
        <div className='max-w-[700px] md:px-20 lg:px-0 px-0'>
            <div className='flex items-center gap-3 text-md bg-slate-700 text-white lg:w-[400px] w-full px-4 py-4 lg:py-0 my-4 lg:my-0 rounded-full'>
                <CiLocationOn />
                <input type='text' onChange={(e) => setCity(e.target.value)} value={city} placeholder='location name' className='bg-transparent outline-none py-[2px] md:w-[300px] w-full' />
                <button onClick={handleSearch}><IoIosSearch /></button>

            </div>

        </div>
    )
}


export default SearchBar


