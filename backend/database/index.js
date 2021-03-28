const mysql = require('mysql')

// set up my sql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'rakhadhi',
    password: 'Kmzway87aa',
    database: 'pwd-supermarket-5'
});

module.exports = connection