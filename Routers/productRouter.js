const Router = require('express');
const router = new Router();
const productController = require('../Controllers/productController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', roleMiddleware(['employee']), productController.addNew);
router.get('/', productController.getAll);
router.get('/:id', productController.get);
router.delete('/:id', roleMiddleware(['employee']), productController.delete);

module.exports = router;