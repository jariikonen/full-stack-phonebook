const phonebook = require('@controllers/phonebookController');
const router = require('./routes');

router.post('/testing/reset', phonebook.reset);

module.exports = router;
