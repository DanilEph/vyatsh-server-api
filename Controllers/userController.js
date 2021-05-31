const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class userController {
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

    async check(req, res) {
        const data = req.user;
        const token = jwt.sign({
            userID: data.userID,
            login: data.login,
            role: data.role

        }, keys.jwt, {expiresIn: 60 * 60});

        res.json({
            token: `Bearer ${token}`,
            massage: 'Проверка прошла успешно!'
        });
    }
}

module.exports = new userController();