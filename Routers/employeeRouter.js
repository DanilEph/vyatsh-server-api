const Router = require('express');
const router = new Router();
const employeeController = require('../Controllers/employeeController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', roleMiddleware(['employee']), employeeController.registration);
router.get('/', roleMiddleware(['employee']), employeeController.getAll);
router.put('/me', roleMiddleware(['employee']), employeeController.update);
router.get('/me', roleMiddleware(['employee']), employeeController.get);
router.delete('/me', roleMiddleware(['employee']), employeeController.delete);

module.exports = router;