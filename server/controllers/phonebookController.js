const Person = require('../models/person');

const getInfo = (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      response.send(
        `<p>Phonebook contains information about ${count} persons</p>\n` +
          `<p>${date}</p>`
      );
    })
    .catch((error) => next(error));
};

const getVersion = (request, response, next) => {
  response.send('1'); // change this string to ensure a new version deployed
};

const getAll = (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
    .catch((error) => next(error));
};

const getPerson = (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
};

const deletePerson = (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
};

const createPerson = (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({ name, number });
  console.log('createPerson', person);
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
};

const updatePerson = (request, response, next) => {
  const { name, number } = request.body;

  const person = { name, number };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).send({ error: 'resource not found' });
      }
    })
    .catch((error) => next(error));
};

const reset = (request, response, next) => {
  Person.deleteMany({}).then(response.status(204).end());
};

module.exports = {
  getInfo,
  getVersion,
  getAll,
  getPerson,
  deletePerson,
  createPerson,
  updatePerson,
  reset,
};
