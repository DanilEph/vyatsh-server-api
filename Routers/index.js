const Router = require('express');
const router = new Router();

const categoryRouter = require('./categoryRouter');
const customerRouter = require('./customerRouter');
const employeeRouter = require('./employeeRouter');
const productRouter = require('./productRouter');
const measureUnitRouter = require("./measureUnitRouter");
const supplierRouter = require('./supplierRouter');
const userRouter = require('./userRouter');

router.use('/customer', customerRouter);
router.use('/employee', employeeRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/measure-unit', measureUnitRouter);
router.use('/supplier', supplierRouter);
router.use('/login', userRouter);

module.exports = router;