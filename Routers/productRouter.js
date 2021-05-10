const Router = require('express');
const router = new Router();
const productController = require('../Controllers/productController');

router.post('/', productController.addNew);
router.get('/', productController.getAll);
router.get('/:id', productController.get);
router.delete('/:id', productController.delete);

module.exports = router;