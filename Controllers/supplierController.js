const pool = require('../db');

class supplierController {
    async addNew( req, res) {
        try {
            const { company_name, company_status } = req.body.supplier;
            const { country, region, district, city, street, house, postcode } = req.body.address;

            let address = await pool.query("SELECT address_id FROM addresses WHERE country = $1 AND region = $2 AND district = $3 AND city = $4 AND street = $5 AND house = $6 AND postcode = $7", [country, region, district, city, street, house, postcode]).rows;

            if (address == null) {
                await pool.query("INSERT INTO addresses (country, region, district, city, street, house, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7)", [country, region, district, city, street, house, postcode]);

                console.log(address);

                await pool.query("INSERT INTO suppliers (address_id, company_name, company_status) VALUES ((SELECT address_id FROM addresses WHERE country = $1 AND region = $2 AND district = $3 AND city = $4 AND street = $5 AND house = $6 AND postcode = $7), $8, $9)", [country, region, district, city, street, house, postcode, company_name, company_status]);

                res.status(200).json({message: 'Новый поставщик успешно добавлен!'});

            } else if (address != null) {
                await pool.query("INSERT INTO suppliers VALUES($1, $2, $3)", [address.rows[0].address_id,company_name, company_status]);

                res.status(200).json({message: 'Новый поставщик успешно добавлен!'});
            }                 

        } catch (err) {
            console.log(err);
            res.json({message: 'Что-то пошло не так :('});
        }
    }
 
    async get(req, res) {
        try {
            const { id } = req.params;
            const queryResult = await pool.query("SELECT * FROM suppliers WHERE supplier_id = $1", [id]);
            res.status(200).json(queryResult.rows);

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }         
    }
 
    async getAll(req, res) {
        try {
            const queryResult = await pool.query("SELECT * FROM suppliers");
            res.status(200).json(queryResult.rows);

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }
    }
 
    async delete(req, res) {
        try {
            const { id } = req.params;

            await pool.query("DELETE FROM addresses WHERE address_id = (SELECT address_id FROM suppliers WHERE supplier_id = $1)", [id]);

            await pool.query("DELETE FROM suppliers WHERE supplier_id = $1", [id]);
            res.status(200).json({message: 'Данный поставщик был успешно удален!'});

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }
    }
 }
 
module.exports = new supplierController();