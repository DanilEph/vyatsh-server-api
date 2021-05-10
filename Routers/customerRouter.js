const Router = require('express');
const router = new Router();
const customerController = require('../Controllers/customerController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', customerController.registration);
router.post('/login', customerController.login);
router.get('/getAll', roleMiddleware(['employee']), customerController.getAll);

module.exports = router;