const nodemailer= require('nodemailer')
const NODEMAILER= process.env.NODEMAILER

const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anjashardian59@gmail.com',
        pass: NODEMAILER
    },
    tls: {
        rejectUnauthorized: true
    }
})

module.exports = transporter