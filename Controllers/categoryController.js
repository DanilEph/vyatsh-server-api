const pool = require('../db');

class categoryController {
    async addNew( req, res) {
        try {
            const { categoryName, description, features, parentCategory } = req.body;

            await pool.query("INSERT INTO category(category_name, description, features) VALUES ($1, $2, $3)", [categoryName, description, features]);

            if (parentCategory != null) {
                await pool.query("INSERT INTO category_hierarchy(category_hierarchy_id, subcategory_hierarchy_id) VALUES ((SELECT category_id FROM category WHERE category_name = $1), (SELECT category_id FROM category WHERE category_name = $2))", [parentCategory, categoryName]);
            }

            res.status(200).json({message: 'Новая категория была успешно добавлена!'});

        } catch (err) {
            console.log(err);
            res.json({message: 'Что-то пошло не так :('});
        }
    }
 
    async get(req, res) {
        try {
            const { id } = req.params;
            const queryResult = await pool.query("SELECT category.category_id, category.category_name, category.description, category.features, (SELECT category.category_name FROM category WHERE category_id = category_hierarchy.category_hierarchy_id) AS parent_category FROM category LEFT OUTER JOIN category_hierarchy ON category.category_id = category_hierarchy.subcategory_hierarchy_id WHERE category.category_id = $1", [id]);
            res.status(200).json(queryResult.rows);

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }         
    }
 
    async getAll(req, res) {
        try {
            const queryResult = await pool.query("SELECT category.category_id, category.category_name, category.description, category.features, (SELECT category.category_name FROM category WHERE category_id = category_hierarchy.category_hierarchy_id) AS parent_category FROM category LEFT OUTER JOIN category_hierarchy ON category.category_id = category_hierarchy.subcategory_hierarchy_id");
            res.status(200).json(queryResult.rows);

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }
    }
 
    async delete(req, res) {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM category WHERE category_id = $1", [id]);
            res.status(200).json({message: 'Данная единица измерения была успешно удалена!'});

        } catch (err) {
            console.log(err);
            res.status(404).json({message: 'Что-то пошло не так :('});
        }
    }
 }
 
module.exports = new categoryController();