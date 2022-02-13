const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")
require("dotenv").config();

const app = express();
const db = mysql.createPool({
  host: process.env.HOSTNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.get("/readAll", (req, res) => {
  const sqlRead = "SELECT * FROM mco2.movies LIMIT 10";
  db.query(sqlRead, (err, result) => {
    if (err) console.log("ERROR: "+err);
    res.send(result);
  });
});
app.listen(3001, () => {
  console.log("Running on port 3001");
});
