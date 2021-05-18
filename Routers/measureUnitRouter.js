const Router = require('express');
const router = new Router();
const measureUnitController = require('../Controllers/measureUnitController');

router.post('/', measureUnitController.addNew);
router.get('/:id', measureUnitController.get);
router.get('/', measureUnitController.getAll);
router.delete('/:id', measureUnitController.delete);

module.exports = router;