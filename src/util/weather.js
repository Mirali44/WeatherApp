import {DateTime} from 'luxon'

const API_KEY = "e72ea7cda98d2b4599ae21027dc27f7b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const fetchData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  const resData = await response.json();
  return resData;
};

const formatCurrentData = async (data) => {
  console.log(data)
  const { lat, lon } = data.coord;
  const name = data.name;
  const dt = data.dt;
  const timezone = data.timezone;
  const { feels_like, humidity, temp, temp_max, temp_min } = data.main;
  const { country, sunrise, sunset } = data.sys;
  const { speed } = data.wind;
  const { main, icon } = data.weather[0];
  const localTime = formatToLocalTime(dt, timezone)

  console.log(data.main)

  return {
    name,
    country,
    icon: iconUrlFromCode(icon),
    dt,
    lat,
    lon,
    localTime,
    timezone,
    feels_like: Math.round(feels_like),
    humidity,
    temp: Math.round(temp),
    temp_max: Math.round(temp_max),
    temp_min: Math.round(temp_min),
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    speed: Math.round(speed),
    main,
  };
};

const formatForecastData = (secs, offset, data) => {
  const hourly = data.filter(f => f.dt > secs).slice(0,5).map(f => ({
    temp: Math.round(f.main.temp),
    title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
    icon: iconUrlFromCode(f.weather[0].icon),
    date: f.dt_txt
  }))

  const daily = data.filter(f => f.dt_txt.slice(-8) === "15:00:00").map(f => ({
    temp: Math.round(f.main.temp),
    title: formatToLocalTime(f.dt, offset, 'ccc'),
    icon: iconUrlFromCode(f.weather[0].icon),
    date: f.dt_txt
  }))

  return {hourly, daily}
};

const getFormattedWeatherData = async (searchParams) => {
  const {query, unit} = searchParams
  const currentWeatherData  = await fetchData("weather", { ...query, units: unit });
  const formattedCurrentWeather = await formatCurrentData(currentWeatherData);

  const { lat, lon, dt, timezone } = formattedCurrentWeather;

  const formattedForecastWeather  = await fetchData("forecast", {
    lat,
    lon,
    units: searchParams.unit,
  }).then((d) => formatForecastData(dt, timezone, d.list));

 return {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, {zone: "utc"}).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode}
