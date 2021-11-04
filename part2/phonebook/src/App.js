import React, { useState } from 'react'

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
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '0123456' }
  ]) 
  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [search, setSearch] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  


  const addSomething = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const isSameName = persons.some(person => person.name === newName);
    if (isSameName) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, {name: newName, phone: newPhone}])
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

console.log(persons)
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