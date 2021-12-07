const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    const password = process.argv[2]
    const url =
    `mongodb+srv://lily:${password}@cluster0.tyufc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    mongoose.connect(url)

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length == 5) {

    const password = process.argv[2]
    const name = process.argv[3]
    const phone = process.argv[4]
  
    const url =
    `mongodb+srv://lily:${password}@cluster0.tyufc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  
    mongoose.connect(url)
  
    const person = new Person({
        name: name,
        number: phone
    })
   
    person.save().then(() => {
        console.log(`added ${name} number ${phone} to phonebook`)
        mongoose.connection.close()
    })

} else {
    console.log('Please provide arguments: node mongo.js <password> <name> <phonenumber>')
    process.exit(1)
}
