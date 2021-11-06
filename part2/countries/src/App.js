import React, { useState } from 'react'
import axios from 'axios'

const Weather = (props) => {
  const [weatherInfo , setWeatherInfo] = useState(null)


  React.useEffect(async () => {
    const apiKey = "312663de61ddb53f7ab658c3941e8a59"
    const result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}`)
    setWeatherInfo(result.data)
  }, []);

  if(weatherInfo==null){
    return <div>It's loading...</div>
  } 

  console.log(weatherInfo)
  return (
    <>
      <h3>Weather in {props.city}</h3>
      <div>temperature: {Math.round(weatherInfo.main.temp-272.15)}</div>
      <div>weather: {weatherInfo.weather[0].description}</div>
      <div>wind: {weatherInfo.wind.speed} mph direction {weatherInfo.wind.deg} degree</div>
    </>
  )
}

const Results = (props) =>{
  if(props.countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if(props.countries.length === 1){
    const country = props.countries[0]
    console.log(country)
    return(
      <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Population {country.population}</div>
      <h2>languages</h2>
      <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <div><img src={country.flags.png} alt="flag" /></div>
      <Weather city={country.capital[0]} />
      </>
    )
  }

  return props.countries.map(con => (
    <div key={con.cca2}>
      {con.name.common}
      <button onClick={() => props.setSearch(con.name.common)}>
        show
      </button>
    </div>
  )
)}

function App() {

  const [search, setSearch] = useState('')
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const [countries, setCountries] = useState([])

  React.useEffect(() => {
    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(response => {
      setCountries(response.data)
    })
  }, []);

  
  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div>
        find countries <input value={search} onChange={handleSearchChange}/>
      </div>
      {/*countriesToShow.length > 9 && <div>Too many matches, specify another filter</div>*/}
      <Results countries={countriesToShow} setSearch={setSearch} />
    </>
  );
}

export default App;
