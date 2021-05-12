const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { json } = require('express');

class CustomerController {
    async registration(req, res) {
        try {
            const { login, pass, position } = req.body;    

            const salt = bcrypt.genSaltSync(10);
            const hashpass = bcrypt.hashSync(pass, salt);
            const role = 'customer';
           
            await pool.query("INSERT INTO authorization_data (login, hashpass, salt, role, registration_date) VALUES ($1, $2, $3, $4, current_timestamp)", [login, hashpass, salt, role]);

            if (role === 'customer') {
                await pool.query("INSERT INTO customers(authorization_data_id) VALUES ((SELECT authorization_data_id FROM authorization_data WHERE login = $1 AND hashpass = $2))", [login, hashpass]);
            } else if (role === 'employee') {
                await pool.query("INSERT INTO employees(authorization_data_id, position_id) VALUES ((SELECT authorization_data_id FROM authorization_data WHERE login = $1 AND hashpass = $2), (SELECT position_id FROM positions WHERE position_name = $3))", [login, hashpass, position]);
            }

            res.json({
                massage: 'Поздравляем, вы зарегистированы!'
            });

        } catch (err) {
            console.error(err);
            res.json({
                massage: 'К сожалению, регистрация не прошла...'
            });
        }
    }

    async login(req, res) {
        try {
            const { login, pass } = req.body;

            const personData = await pool.query("SELECT authorization_data_id, salt, hashpass, role FROM authorization_data WHERE login = $1", [login]);            
            const { authorization_data_id: authId, salt, hashpass: hashpassDB, role } = personData.rows[0];            
            const passTrue = bcrypt.compareSync(pass, hashpassDB);

            if (passTrue) {
                const token = jwt.sign({
                    userID: authId,
                    login: login,
                    role: role

                }, keys.jwt, {expiresIn: 60 * 60});

                res.json({
                    token: `Bearer ${token}`,
                    massage: 'Авротризация прошла успешно!'
                });
            } else {                
                throw 'error';
            }

        } catch (err) {
            res.json({
                massage: 'Не правильный логин или пароль...'
            });
            console.log(err);
        }

    }

    async getAll(req, res) {
        const allData = await pool.query("SELECT customers.customer_id, customers.first_name, customers.last_name, customers.patronymic, customers.gender, customers.email, customers.phone, authorization_data.login, authorization_data.hashpass, authorization_data.salt, authorization_data.role, authorization_data.registration_date, authorization_data.last_authorization_date FROM customers INNER JOIN authorization_data ON customers.authorization_data_id = authorization_data.authorization_data_id;");

        res.json(allData.rows);      
        
    }

    async update(req, res) {
        try {
            const { country, region, disrict, city, street, house, postcode } = req.body.address;
            const { first_name, last_name, patronymic, gender, email, phone } = req.body.personData;
            const userID = req.user;

            const resulQuery = await pool.query("SELECT address_id FROM customers WHERE authorization_data_id = $1", [userID]);
            const { address_id } = resulQuery.rows[0];
            
            if (address_id === null) {
                await pool.query("INSERT INTO addresses (country, region, district, city, street, house, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7);", [country, region, disrict, city, street, house, postcode]);

                await pool.query("UPDATE customers SET address_id = (SELECT address_id FROM addresses WHERE country = $1 AND region = $2 AND district = $3 AND city = $4 AND street = $5 AND house = $6 AND postcode = $7), first_name = $8, last_name = $9,    patronymic = $10, gender = $11, email = $12, phone = $13 WHERE authorization_data_id = $14;", [country, region, disrict, city, street, house, postcode, first_name, last_name, patronymic, gender, email, phone, userID]);
                
            } else if (address_id !== null) {
                await pool.query("UPDATE addresses SET country = $1, region = $2, district = $3, city = $4, street = $5, house = $6, postcode = $7 WHERE address_id = $8", [country, region, disrict, city, street, house, postcode, address_id]);

                await pool.query("UPDATE customers SET first_name = $1, last_name = $2, patronymic = $3, gender = $4, email = $5, phone = $6 WHERE authorization_data_id = $7", [first_name, last_name, patronymic, gender, email, phone, userID]);
            }
            res.json({massage: 'Ваши данные были успешно заменены'});
        } catch (err) {
            console.log(err);
            res.json({

                massage: 'Что-то пошло не так :('
            });
        }
    }
    async get(req, res) {
        try {
            const userID = req.user;

            const resultQuery = await pool.query("SELECT customers.customer_id, customers.first_name, customers.last_name, customers.patronymic, customers.gender, customers.email, customers.phone, authorization_data.login, authorization_data.hashpass, authorization_data.salt, authorization_data.role, authorization_data.registration_date, authorization_data.last_authorization_date FROM customers INNER JOIN authorization_data ON customers.authorization_data_id = authorization_data.authorization_data_id WHERE customers.authorization_data_id = $1", [userID]);

            res.json(resultQuery.rows);

        } catch (err) {
            console.log(err);
            req.json({massage: 'Что-то пошло не так :('});
        }
    }
}

module.exports = new CustomerController();