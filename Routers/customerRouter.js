const Router = require('express');
const router = new Router();
const customerController = require('../Controllers/customerController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', customerController.registration);
router.get('/', roleMiddleware(['employee']), customerController.getAll);
router.put('/me', roleMiddleware(['customer']), customerController.update);
router.get('/me', roleMiddleware(['customer']), customerController.get);
router.delete('/me', roleMiddleware(['customer']), customerController.delete);

module.exports = router;