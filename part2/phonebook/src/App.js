import React, { useState } from 'react'

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
      <div>filter shown with <input value={search} onChange={handleSearchChange}/></div>
      <form onSubmit={addSomething}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <li key={person.name}>{person.name}{' '}{person.phone}</li>)}
    </div>
  )
}

export default App