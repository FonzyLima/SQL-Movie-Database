const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")
require("dotenv").config();

const app = express();
//Central Node
const db = mysql.createPool({
  host: process.env.HOSTCENTRAL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});
//Node 2
const db2 = mysql.createPool({
  host: process.env.HOSTNODE2,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});
const db3 = mysql.createPool({
  host: process.env.HOSTNODE3,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
//Read
app.post("/readAll", (req, res) => {
  let limit = req.body.lim;
  const sqlRead = `SELECT * FROM mco2.movies ORDER BY id DESC LIMIT ${limit}`;
  db.query(sqlRead, (err, result) => {
    if (err) console.log("ERROR: "+err);
    res.send(result);
  });
});
//Create
app.post("/createNew",(req,res)=>{
    const movieName = req.body.name;
    const movieYear = parseInt(req.body.year);
    const movieRank = parseInt(req.body.rank);
    const sqlMaxId = "SELECT MAX(id) AS maxId FROM mco2.movies"
    //const sqlInsert = "INSERT INTO mco2.movies (id, name, year, rank) VALUES(?,?,?,?)"
    const sqlInsert = "INSERT INTO movies SET ?"
    
    db.query(sqlMaxId,(err, result)=>{
        if (err) console.log("Error: "+err);
        else{
          let newId = result[0].maxId +1;
          let newMovie = {id:newId,name:movieName,year:movieYear,rank:movieRank}
          db.query(sqlInsert,newMovie,(err, result)=>{
          if (err) console.log("Error: "+err);
          console.log("Success")
      })
        }
        
    })
    if(movieYear<1980){
      db2.query(sqlMaxId,(err, result)=>{
        if (err) console.log("Error: "+err);
        else{
          let newId = result[0].maxId +1;
          let newMovie = {id:newId,name:movieName,year:movieYear,rank:movieRank}
          db2.query(sqlInsert,newMovie,(err, result)=>{
          if (err) console.log("Error: "+err);
          console.log("Success")
      })
        }
        
    })
    }
    else{
      db3.query(sqlMaxId,(err, result)=>{
        if (err) console.log("Error: "+err);
        else{
          let newId = result[0].maxId +1;
          let newMovie = {id:newId,name:movieName,year:movieYear,rank:movieRank}
          db3.query(sqlInsert,newMovie,(err, result)=>{
          if (err) console.log("Error: "+err);
          console.log("Success")
      })
        }
        
    })
    }
});
//Delete
app.delete("/delete",(req,res)=>{
    const movieId = req.body.id;
    const movieYear = req.body.year;
    console.log(movieId)
    const sqlDelete = "DELETE FROM mco2.movies WHERE id=?"
    db.query(sqlDelete,[movieId],(err, result)=>{
        if (err) console.log("Error: "+err);
        console.log("Success");
    })
    if(movieYear < 1980){
      db2.query(sqlDelete,[movieId],(err, result)=>{
        if (err) console.log("Error: "+err);
        console.log("Success");
    })
    }
    else{
      db3.query(sqlDelete,[movieId],(err, result)=>{
        if (err) console.log("Error: "+err);
        console.log("Success");
    })
    }
});
//Update
app.patch("/update",(req,res)=>{
    const movieId = req.body.id;
    const movieName = req.body.name;
    const movieYear = parseInt(req.body.year);
    const movieRank = parseInt(req.body.rank);
    const sqlUpdate = "UPDATE mco2.movies SET ? WHERE id=?"
    const body = {name:movieName,year:movieYear,rank:movieRank}
    console.log(body)
    db.query(sqlUpdate,[body,movieId],(err, result)=>{
        if(err)console.log("Error: "+err);
        console.log("Success");
    })
    if(movieYear <1980){
      db2.query(sqlUpdate,[body,movieId],(err, result)=>{
        if(err)console.log("Error: "+err);
        console.log("Success");
    })
    }
    else{
      db3.query(sqlUpdate,[body,movieId],(err, result)=>{
        if(err)console.log("Error: "+err);
        console.log("Success");
    })
    }
});
app.listen(3001, () => {
  console.log("Running on port 3001");
});
