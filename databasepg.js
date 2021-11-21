const Pool = require('pg').Pool
const dotenv = require('dotenv').config();


console.log("db env config çalıştı");
const pool = new Pool({
    //connectionString:process.env.DB_CONNECTION_STRING
       user:"postgres",
       host:'localhost',
       port:5432,
       database:'dbshop',
       password:'1234'
})

module.exports={pool}