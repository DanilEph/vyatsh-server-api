const Router = require('express');
const router = new Router();
const measureUnitController = require('../Controllers/measureUnitController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', roleMiddleware(['employee']), measureUnitController.addNew);
router.get('/:id', measureUnitController.get);
router.get('/', measureUnitController.getAll);
router.delete('/:id', roleMiddleware(['employee']), measureUnitController.delete);

module.exports = router;