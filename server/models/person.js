/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const { testing } = require('@util/common');

const url = testing ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;
const testingStr = testing ? ' (test database)' : '';
console.log(`connecting to MongoDB${testingStr} ...`);

mongoose
  .connect(url)
  .then((result) => {
    console.log(`connected to MongoDB${testingStr}`);
  })
  .catch((error) => {
    console.log(`error connecting to MongoDB${testingStr}:`, error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: mongoose.Mixed,
    validate: {
      validator: (v) => /^(\d{2}-\d{5,})|(\d{3}-\d{4,})$/.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
