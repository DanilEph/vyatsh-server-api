const Router = require('express');
const router = new Router();
const userController = require('../Controllers/userController');

router.post('/', userController.login);


module.exports = router;