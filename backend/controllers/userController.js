
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
    keepLogin: async (req, res) => {
        console.log(req.user)
        try {
            //get user data
            const getUser = `select * from user
                            where id_user=${db.escape(req.user.id)}`

            const result = await asyncQuery(getUser)
            console.log(result)

            res.status(200).send(result[0])
        }
        catch (error) {
            return res.status(500).send(error)
        }
    },

    register: async (req, res) => {
        const { username, password, email } = req.body
        // NOTE error tertampung di validation result, ditampung krn nanti mau di cek
        // NOTE VALIDATION INPUT FROM USERS 
        const errors = validationResult(req)
        // console.log(errors)

        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        // REVIEW
        // NOTE ENCRYPT PASS WITH CRYPTO JS
        // NOTE data yg sudah di encrypt oleh crypto js tidak bisa didecrypt
        const hashpass = cryptoJS.HmacMD5(password, SECRET_KEY)

        // NOTE untuk lihat bentuknya hashpass
        // console.log('haspass', hashpass.toString())

        try {
            // NOTE kalau tidak ada error, baru proses penambahan data user baru berjalan
            const queryCheckReg = `select * from user 
                                where username=${db.escape(username)}
                                or email=${db.escape(email)}`

            const resultCheckReg = await asyncQuery(queryCheckReg)

            if (resultCheckReg.length !== 0) return res.status(400).send('USERNAME OR EMAIL ALREADY EXIST')

            const queryReg = `insert into user (username, email, password)
                            values (${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashpass.toString())})`

            const resultReg = await asyncQuery(queryReg)



            // NOTE create token kalo berhasil verify
            // NOTE insertId dapet dari postman pas register data baru
            const token = createToken({ id: resultReg.insertId, username: username })

            // sent email verification to user
            const option = {
                from: `admin <anjashardian59@gmail.com>`,
                to: `anjashardian@gmail.com`,
                subject: "FAT Verification",
                text: `Hello our precious customers,
        
                Click link below to verified your account
        
                Your PARCEL best provider,
                  FAT PARCEL.`,
                html: `
                <a href ="http://localhost:3000/verification/${token}">http://localhost:3000/verification/${token}</a>`,
            };
            const info = await transporter.sendMail(option);
            console.log(req.body);

            res.status(200).send(info.response)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }



        // db.query(queryCheckReg, (err, result) => {
        //     // NOTE cek error
        //     if (err) return res.status(500).send(err)

        //     // NOTE cek apakah di dlm database ada usernam atau email yang sama
        //     if (result.length !== 0) return res.status(400).send('USERNAME OR EMAIL ALREADY EXIST')

        //     const queryReg = `insert into users (username, email, password)
        //                      values (${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashpass.toString())})`

        //     db.query(queryReg, (err2, result2) => {
        //         // NOTE cek error
        //         if (err2) return res.status(500).send(err2)

        //         res.status(200).send(result2)
        //     })
        // })

        // NOTE ini buat ngetes haspass, si dbquery diatas di comment dulu trs jalanin si res.status test nya
        // res.status(200).send('test hashpassword')
    },

    emailVerification: async (req, res) => {
        try {
            // change status user in database
            const qUpdateStatus = `UPDATE user SET status = "verified" 
                                    WHERE id_user = ${req.user.id} `;
            const updateStatus = await asyncQuery(qUpdateStatus);
            console.log(updateStatus)

           

            res.status(200).send(`Congratulations! Your account has been verified`);
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
    


}