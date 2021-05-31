const Router = require('express');
const router = new Router();
const userController = require('../Controllers/userController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', userController.login);
router.get('/', roleMiddleware(['customer', 'employee']), userController.check);


module.exports = router;