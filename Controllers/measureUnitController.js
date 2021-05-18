const pool = require('../db');

class measureUnitController {
    async addNew( req, res) {
        try {
            const { measureName } = req.body;
            await pool.query("INSERT INTO measure_units(measure_name) VALUES ($1)", [measureName]);
            res.status(200).json({message: 'Новая единица измерения была успешно добавлена!'});

        } catch (err) {
            console.log(err);
            res.json({message: 'Что-то пошло не так :('});
        }
    }
 
    async get(req, res) {
        try {
            const { id } = req.params;
            const queryResult = await pool.query("SELECT * FROM measure_units WHERE measure_unit_id = $1", [id]);
            res.status(200).json(queryResult.rows);

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }         
    }
 
    async getAll(req, res) {
        try {
            const queryResult = await pool.query("SELECT * FROM measure_units");
            res.status(200).json(queryResult.rows);

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }
    }
 
    async delete(req, res) {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM measure_units WHERE measure_unit_id = $1", [id]);
            res.status(200).json({message: 'Данная единица измерения была успешно удалена!'});

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }
    }
 }
 
module.exports = new measureUnitController();