const Router = require('express');
const router = new Router();

const categoryRouter = require('./categoryRouter');
const customerRouter = require('./customerRouter');
const employeeRouter = require('./employeeRouter');
const productRouter = require('./productRouter');

router.use('/customer', customerRouter);
router.use('/employee', employeeRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);


module.exports = router;