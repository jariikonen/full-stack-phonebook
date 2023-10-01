const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

let password = '';
let name = '';
let number = '';
let clear = false;

const printUsage = () => {
  console.log('usage: mongo.js <password> [<name> <number>]');
  console.log('       mongo.js <password> clear');
  console.log('       mongo.js <password> list');
  process.exit(1);
};

if (process.argv.length < 3) {
  printUsage();
}
if (process.argv.length > 2) {
  [, , password] = process.argv;
}
if (process.argv.length === 4 && process.argv[3] === 'clear') {
  clear = true;
} else if (process.argv.length === 4 && process.argv[3] !== 'list') {
  printUsage();
}
if (process.argv.length === 5) {
  [, , , name, number] = process.argv;
}

const url = `mongodb+srv://jikonen:${password}@cluster0.visrgh9.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: mongoose.Mixed,
});

const Person = mongoose.model('Person', personSchema);

const savePerson = () => {
  const person = new Person({ name, number });
  person.save().then((result) => {
    console.log(`new contact '${name} ${number}' saved!`);
    mongoose.connection.close();
  });
};

const listPersons = () => {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

const clearList = () => {
  Person.deleteMany({}).then((deleted) => {
    console.log(`deleted ${deleted.deletedCount} entries`);
    mongoose.connection.close();
  });
};

if (name && number) {
  savePerson();
} else if (clear) {
  clearList();
} else {
  listPersons();
}
