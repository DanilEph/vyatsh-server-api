const Router = require('express');
const router = new Router();
const supplierController = require('../Controllers/supplierController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', roleMiddleware(['employee']), supplierController.addNew);
router.get('/:id', supplierController.get);
router.get('/', supplierController.getAll);
router.delete('/:id', roleMiddleware(['employee']), supplierController.delete);

module.exports = router;