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
  const sqlRead = "SELECT * FROM mco2.movies LIMIT 12";
  db.query(sqlRead, (err, result) => {
    if (err) console.log("ERROR: "+err);
    res.send(result);
  });
});
app.post("/createNew",(req,res)=>{
    const movieName = req.body.name;
    const movieYear = req.body.year;
    const movieRank = req.body.rank;
    const sqlInsert = "INSERT INTO mco2.movies (name, year, rank) VALUES (?,?,?)"
    db.query(sqlInsert,[movieName,movieYear,movieRank],(err, result)=>{
        if (err) console.log("Error: "+err);
        console.log("Success")
    })
});
app.delete("/delete/:id",(req,res)=>{
    const movieId = req.body.id;
    const sqlDelete = "DELETE FROM mco2.movies WHERE id=?"
    db.query(sqlDelete,[movieId],(err, result)=>{
        if (err) console.log("Error: "+err);
        console.log("Success");
    })
})
app.patch("/update/:id",(req,res)=>{
    const movieId = req.body.id;
    const movieName = req.body.name;
    const movieYear = req.body.year;
    const movieRank = req.body.rank;
    const sqlUpdate = "UPDATE mco2.movies SET name=?, year=?,rank=? WHERE id=?"
    db.query(sqlUpdate,[movieName,movieYear,movieRank,movieId],(err, result)=>{
        if(err)console.log("Error: "+err);
        console.log("Success");
    })
})
app.listen(3001, () => {
  console.log("Running on port 3001");
});
