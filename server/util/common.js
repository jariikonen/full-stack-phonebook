const common = require('@root/config/common');

const PORT = process.env.PORT || 8000;
const testing = process.env.NODE_ENV === 'test';

module.exports = {
  ...common,
  PORT,
  testing,
};
