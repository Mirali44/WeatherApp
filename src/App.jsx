import { useState, useEffect } from "react";
import "./App.css";
import getFormattedWeatherData from "./util/weather";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import Current from "./components/Current";
import ForeCast from "./components/ForeCast";

function App() {
  const [query, setQuery] = useState({ q: "baku" });
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ query, unit });
      setWeather(data);
    };
    
    fetchWeather()
  }, [query, unit]);

  
  

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 md:px-32 px-1 ">
      <Input setQuery={setQuery} setUnit={setUnit} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <Current weather={weather} />
          <ForeCast title={"3 hour step forecast"} data={weather.hourly} />
          <ForeCast title={"daily forecast"} data={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;
