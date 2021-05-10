const Router = require('express');
const router = new Router();
const employeeController = require('../Controllers/employeeController');

router.post('/registration', employeeController.registration);
router.post('/login', employeeController.login);
router.get('/autho', employeeController.check);

module.exports = router;