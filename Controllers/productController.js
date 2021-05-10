const pool = require('../db');
const db = require('../db');

class ProductController {
    async addNew(req, res) {
        try {
            const info = req.body;
            pool.query('iNSERT INTO Products()', [info.productName, info.available, info.description, info.storageConditions]);

        } catch (err) {
            console.error(err.message);
        }
    }

    get() {

    }

    getAll() {

    }

    delete() {

    }
}

module.exports = new ProductController();