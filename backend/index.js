const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const db = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306
})

app.listen(3001, () =>{
    console.log("Running on port 3001");
})