import React from "react";
import { UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons";

function Current({weather}) {
  const {feels_like, humidity, temp, temp_max, temp_min, sunrise, sunset, speed, main, icon} = weather
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{main}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img
          src={icon}
          className="w-20"
        />
        <p className="text-5xl ml-7">{temp}°</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{feels_like}°</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{humidity}%</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{speed}km/h</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center text-white space-x-2 text-sm py-3">
        <UilSun />
        <p className="font-light">
            Rise: <span className="font-medium">{sunrise}</span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
            Set: <span className="font-medium">{sunset}</span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light">
            High: <span className="font-medium">{temp_max}°</span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light">
            Low: <span className="font-medium">{temp_min}°</span>
        </p>
      </div>
    </div>
  );
}

export default Current;
