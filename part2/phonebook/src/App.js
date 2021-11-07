import React, { useState } from 'react'
import axios from 'axios'



const Filter = (props) => {
  return (
    <div>
      filter shown with 
      <input value={props.search} onChange={props.handleSearchChange}/>
    </div>
  )
}

const Personform = (props) => {
  return (
    <form onSubmit={props.addSomething}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>number: <input value={props.newPhone} onChange={props.handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = (props) => {
  return(
    <div>
      {props.personsToShow.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}

const Person = (props) => {
  return (
    <li>{props.person.name}{' '}{props.person.phone}</li>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [search, setSearch] = useState('')

  React.useEffect(() => {
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(response => {
      console.log(response)
      setPersons(response.data)
    })
  }, []);


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  const addSomething = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const isSameName = persons.some(person => person.name === newName);
    if (isSameName) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const person = {name: newName, phone: newPhone}
      setPersons([...persons, person])
      
      const promise = axios.post('http://localhost:3001/persons', person)
      promise.then(response => {
        console.log(response)
      })

    }
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value) 
    setNewName(event.target.value)
  }

  const handleSearchChange =(event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <Personform 
        addSomething={addSomething}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}   
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App