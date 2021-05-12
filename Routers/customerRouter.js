const Router = require('express');
const router = new Router();
const customerController = require('../Controllers/customerController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', customerController.registration);
router.post('/login', customerController.login);
router.get('/getAll', roleMiddleware(['employee']), customerController.getAll);
router.put('/update', roleMiddleware(['customer']), customerController.update);
router.get('/get', roleMiddleware(['customer']), customerController.get);
router.delete('/delete', roleMiddleware(['customer']), customerController.delete);

module.exports = router;