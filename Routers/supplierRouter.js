const Router = require('express');
const router = new Router();
const supplierController = require('../Controllers/supplierController');

router.post('/', supplierController.addNew);
router.get('/:id', supplierController.get);
router.get('/', supplierController.getAll);
router.delete('/:id', supplierController.delete);

module.exports = router;