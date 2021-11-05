import React, { useState } from 'react'
import axios from 'axios'

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
      <div>Capital {country.capital}</div>
      <div>Population {country.population}</div>
      <h2>languages</h2>
      <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <div><img src={country.flags.png} alt="flag" /></div>
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
