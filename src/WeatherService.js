const API_KEY = '59e5a986047fc098023aa2ec9def4500'
const makeIconURL = (iconId) => `https://api.openweathermap.org/img/wn${iconId}@2x.png`

const getFormattedWeatherData = async (city, units = 'metric') => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data)

    const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
    } = data;
    const { description, icon} = weather[0];

    return {
        description, 
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min, 
        temp_max, 
        pressure, 
        humidity,
        speed,
        country,
        name,
    }

}

export { getFormattedWeatherData };