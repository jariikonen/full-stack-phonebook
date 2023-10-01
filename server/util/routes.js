const Router = require('express');
const phonebook = require('@controllers/phonebookController');

const router = Router();

router.get('/info', phonebook.getInfo);
router.get('/persons', phonebook.getAll);
router.get('/persons/:id', phonebook.getPerson);
router.delete('/persons/:id', phonebook.deletePerson);
router.post('/persons', phonebook.createPerson);
router.put('/persons/:id', phonebook.updatePerson);

module.exports = router;
