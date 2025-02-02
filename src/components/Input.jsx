import {useState} from "react";
import {UilSearch, UilLocationPoint} from "@iconscout/react-unicons"

function Input({setQuery, setUnit}) {
  const [city, setCity] = useState("")

  const handleSearchClick = () => {
    if(city !== "") {
      setQuery({q: city})
    }
  }

  const handleLocationClick = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        setQuery({lat: latitude, lon: longitude})
      })
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="search for city..."
          className="text-xl font-light p-2 w-full focus:outline-none capitalize"
          onChange={e => setCity(e.target.value)}
        />
        <UilSearch size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick} />
        <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick} />
        <div className="flex flex-row w-1/4 items-center justify-center">
            <button name="metric" className="text-xl text-white font-light" onClick={() => setUnit('metric')}>°C</button>
            <p className="text-xl text-white mx-1">|</p>
            <button name="imperial" className="text-xl text-white font-light" onClick={() => setUnit('imperial')}>°F</button>
        </div>
      </div>
    </div>
  );
}

export default Input;
