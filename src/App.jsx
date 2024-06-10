import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import Temperature from './components/Temperature';
import getFormatedWeatherData from './utils/WeatherApis';

function App() {
  const [query, setQuery] = useState({ q: 'bangalore' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const data = await getFormatedWeatherData(query, units);
      setWeather(data);
      // console.log(data)
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div className='main_container'>
      <div className="md:px-10 px-2 py-5 flex gap-20 layer">
        <div className='md:mx-auto m-0'>
          <SearchBar setQuery={setQuery} />
          {error ? (
            <div className="text-red-500 text-center p-4 text-lg">
              Error: {error}
              <p> You have entered wrong city name please refresh <br/>the page once and enter correct City name</p>
            </div>
          ) : (
            weather && (
              <div className='flex lg:gap-20 p-2  flex-col lg:flex-row  relative' >
                <Temperature weather={weather} />
                <div className=' flex flex-col gap-4  '>
                  <div className=' md:-m-14 md:px-16 text-white py-4 text-lg md:flex justify-between items-center block mb-4 absolute top-0 '>
                    <p className='text-4xl'>{`${weather.name}, ${weather.country}`}</p>
                    <p>{weather.formatedLocatTime}</p>
                  </div>
                  <Forecast title="3 hours step forecast" data={weather.hourly} />
                  <Forecast title="Daily forecast" data={weather.daily} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

