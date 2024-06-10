
// import { DateTime } from "luxon";

// const API_KEY = 'fa38549830a85d1f7c54ee1376b9b4b5';
// const Base_URL = 'https://api.openweathermap.org/data/2.5/'

// const getWeatherData = (infoType, searchParams) => {
//     const url = new URL(Base_URL + infoType);
//     url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

//     // console.log(url)
//     return fetch(url).then((res) => res.json())
// }

// const iconURLFromCode = (icon) => `http://openweather.org/img/wn/${icon}@2x.png`;

// const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time : 'hh:mm a") => DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);

// const formatCurrent = (data) => {
//     const { coord: { lat, lon },
//         main: { temp, feels_like, temp_min, temp_max, humidity },
//         dt, name, sys: { country, sunrise, sunset },
//         weather, wind: { speed }, timezone } = data

//     const { main , icon }  = weather[0]
//     const formatedLocatTime = formatToLocalTime(dt, timezone)

//     return {
//         temp,
//         feels_like,
//         temp_max,
//         temp_min,
//         humidity,
//         name,
//         country,
//         sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
//         sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
//         speed,
//         main,
//         formatedLocatTime,
//         icon: iconURLFromCode(icon),
//         dt,
//         timezone,
//         lat, lon
//     }

// }

// const formatForecastWeather =(secs, offset, data)=>{

//     //hourly
//     const hourly = data.filter((d) => d.dt > secs).slice(0, 5).map((f)=>({
//         temp: f.main.temp,
//         title: formatToLocalTime(f.dt, offset, 'hh:mm a' ),
//         icon: iconURLFromCode(f.weather[0].icon),
//         data: f.dt_txt,
//     }))


//     //daily
//     const daily = data.filter((d) => d.dt_txt.slice(-8) === '00:00:00').map((f)=>({
//         temp: f.main.temp,
//         title: formatToLocalTime(f.dt, offset, 'ccc' ),
//         icon: iconURLFromCode(f.weather[0].icon),
//         data: f.dt_txt,
//     }))
//     return { hourly, daily}

// }

// const getFormatedWeatherData = async (searchParams) => {
//     const formatedCurrentWeather = await getWeatherData('weather', searchParams)
//         .then(data => formatCurrent(data))  

//     const { dt, timezone, lat,lon} = formatedCurrentWeather;

//     const formatedForecastWeather = await getWeatherData('forecast',
//         {lat, lon, units:searchParams.units}).then((d)=> formatForecastWeather(dt, timezone, d.list))

//     return { ...formatedCurrentWeather , ...formatedForecastWeather}
// }

// export default getFormatedWeatherData



import { DateTime } from "luxon";

const API_KEY = 'fa38549830a85d1f7c54ee1376b9b4b5';
const Base_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(Base_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
};

const kelvinToCelsius = (tempK) => {
    const celc = parseFloat((tempK - 273.15).toFixed())
    return celc;
  };

const iconURLFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time : 'hh:mm a") => DateTime.fromSeconds(secs, { zone: 'utc' }).plus({ seconds: offset }).toFormat(format);

const formatCurrent = (data) => {
    const { coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        dt, name, sys: { country, sunrise, sunset },
        weather, wind: { speed }, timezone } = data;

    const { main, icon, description } = weather[0];
    const formatedLocatTime = formatToLocalTime(dt, timezone);

    return {
        temp: kelvinToCelsius(temp),
        feels_like:kelvinToCelsius(feels_like),
        temp_max: kelvinToCelsius(temp_max),
        temp_min: kelvinToCelsius(temp_min),
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        main,
        description,
        formatedLocatTime,
        icon: iconURLFromCode(icon),
        dt,
        timezone,
        lat,
        lon
    };
};

const formatForecastWeather = (secs, offset, data) => {
    const hourly = data.filter((d) => d.dt > secs).slice(0, 5).map((f) => ({
        temp: kelvinToCelsius(f.main.temp),
        title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
        icon: iconURLFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }));

    const daily = data.filter((d) => d.dt_txt.slice(-8) === '00:00:00').map((f) => ({
        temp: kelvinToCelsius(f.main.temp),
        title: formatToLocalTime(f.dt, offset, 'ccc'),
        icon: iconURLFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }));

    return { hourly, daily };
};

const getFormatedWeatherData = async (searchParams) => {
    const formatedCurrentWeather = await getWeatherData('weather', searchParams)
        .then(data => formatCurrent(data));

    const { dt, timezone, lat, lon } = formatedCurrentWeather;

    const formatedForecastWeather = await getWeatherData('forecast', { lat, lon, units: searchParams.units })
        .then((d) => formatForecastWeather(dt, timezone, d.list));

    return { ...formatedCurrentWeather, ...formatedForecastWeather };
};

export default getFormatedWeatherData;
