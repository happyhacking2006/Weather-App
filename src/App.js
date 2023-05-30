import './App.css';
import ColdBg from './assets/cold.jpg'
import HotBg from './assets/hot.jpg'
import Discription from './components/discriptions/discription';
import { useEffect, useState } from 'react'
import { getFormattedWeatherData } from './WeatherService';
import { icons } from 'react-icons';

function App() {
  const [city, setCity] = useState("Paris")
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState("metric")
  const [bg, setBg] = useState(HotBg)
  const [icon, setIcon] = useState(true)

  const ChangeUnit = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits( isCelsius ? 'metric' : 'imperial');
  }

  const enterKeyPressed = (e) => {
    if( e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data)

      // dynamic bg
      const threshold = units === 'metric' ? 20 : 60;
      if( data.temp <= threshold) setBg(ColdBg)
      else setBg(HotBg)

      if( data.temp < 20){
        setIcon(true)
      }else{
        setIcon(false)
      }
      console.log(icon);
    };

    fetchWeatherData();
    
  }, [units, city])

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})`}}>
      <div className='overlay'>
       {weather && (
         <div className='container'>
         <div className='section input_section'>
           <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city..."/>

           <button onClick={(e) => ChangeUnit(e)}>
            °F
           </button>
         </div>

         <div className='section section-temperature'>

          <div className='icon'>
           <h4>
             {`${weather.name} ${weather.country}`}
           </h4>

           <div className={icon ? 'icon_cold weather-icon' : 'icon_hot weather-icon'} >
             
           </div>

           <h4>
             {weather.description}
           </h4>
          </div>

           <div className='temperature'>
             <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`
             }</h1>

           </div>
         </div>

         <Discription weather={weather} units={units}/>
       </div>
       )}
      </div>
    </div>
  );
}

export default App;
