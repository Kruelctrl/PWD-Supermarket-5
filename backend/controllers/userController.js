
const cryptoJS = require("crypto-js");
const { validationResult } = require("express-validator");
const { createToken } = require("../helpers/jwt");
const { generateQuery, asyncQuery } = require("../helpers/queryHelp");
const SECRET_KEY = process.env.SECRET_KEY;
const transporter = require("../helpers/nodemailer");
// NOTE import u/ handlebars
const handlebars = require('handlebars')

// NOTE import FS u/ baca file
const fs = require('fs')


//IMPORT DATABASE connection
const db = require('../database')




module.exports = {
    getAllUser: (req, res) => {
        const userQuery = 'SELECT * FROM USER'
        db.query(userQuery, (err, result) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        console.log("req.body", req.body);
        try {
            const getDataUsername = `SELECT * FROM user 
                                WHERE username = '${username}'`;
            const resultUsername = await asyncQuery(getDataUsername);

            //if username doesn't exist
            if (resultUsername.length === 0) {
                return res.status(404).send(`Username doesn't exist`);
            }

            //check password: password from user vs password from database
            const hashpass = cryptoJS.HmacMD5(password, SECRET_KEY);
            if (hashpass.toString() !== resultUsername[0].password) {
                return res.status(400).send(`Invalid password!`);
            }

            //filter user's data
            delete resultUsername[0].password;

            //create token
            const token = createToken({
                id: resultUsername[0].id_user,
            });
            resultUsername[0].token = token;

            res.status(200).send(resultUsername[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },


}