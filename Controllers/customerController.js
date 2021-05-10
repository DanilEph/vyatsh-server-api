const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


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
}

module.exports = new CustomerController();