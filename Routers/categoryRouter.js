const Router = require('express');
const router = new Router();
const categoryController = require('../Controllers/categoryController');
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/', roleMiddleware(['employee']), categoryController.addNew);
router.get('/:id', categoryController.get);
router.get('/', categoryController.getAll);
router.delete('/:id', roleMiddleware(['employee']), categoryController.delete);

module.exports = router;