const Router = require('express');
const router = new Router();
const categoryController = require('../Controllers/categoryController');

router.post('/', categoryController.addNew);
router.get('/', categoryController.get);
router.get('/:id', categoryController.getAll);
router.delete('/:id', categoryController.delete);

module.exports = router;