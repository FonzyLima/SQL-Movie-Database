const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
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
//Node 3
const db3 = mysql.createPool({
  host: process.env.HOSTNODE3,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Read
app.post("/readAll", (req, res) => {
  let limit = req.body.lim;
  const sqlRead = `SELECT * FROM mco2.movies ORDER BY id DESC LIMIT ${limit}`;
  const sqlLogsRead1 = "SELECT * FROM mco2.logs_table WHERE status=1 AND node=1"
  const sqlLogsRead2 = "SELECT * FROM mco2.logs_table WHERE status=0 AND node=2"
  const sqlLogsRead3 = "SELECT * FROM mco2.logs_table WHERE status=0 AND node=3"
  const sqlChangeSuccess= "UPDATE mco2.logs_table SET status=1 WHERE log_id=?"
  try {
    db.query(sqlLogsRead2,(err,result)=>{
      if(err) console.log(err);
      else{
        console.log(result)
        for(let i=0;i<result.length;i++){
          let dataBody = {
            id:result[i].movie_id,
            name:result[i].movie_name,
            year:parseInt(result[i].movie_year),
            rank:parseInt(result[i].movie_rank)
          }
          db2.query(result[i].statement,dataBody,(err,result)=>{
            if(err) console.log(err);
            else{
              db2.query(sqlChangeSuccess,result[i].log_id,(err,result)=>{
                if(err) console.log(err);
                else{
                  console.log("LOG UPDATE SUCCESS")
                }
              })
            }
          })
        }

      }
    })
    db.query(sqlLogsRead3,(err,result)=>{
      if(err) console.log(err);
      else{
        console.log(result)
        for(let i=0;i<result.length;i++){
          let dataBody = {
            id:result[i].movie_id,
            name:result[i].movie_name,
            year:parseInt(result[i].movie_year),
            rank:parseInt(result[i].movie_rank)
          }
          db3.query(result[i].statement,dataBody,(err,result)=>{
            if(err) console.log(err);
            else{
              db3.query(sqlChangeSuccess,result[i].log_id,(err,result)=>{
                if(err) console.log(err);
                else{
                  console.log("LOG UPDATE SUCCESS")
                }
              })
            }
          })
        }

      }
    })
    db2.query(sqlLogsRead1,(err,result)=>{
      if(err) console.log(err);
      else{
        console.log(result)
        for(let i=0;i<result.length;i++){
          let dataBody = {
            id:result[i].movie_id,
            name:result[i].movie_name,
            year:parseInt(result[i].movie_year),
            rank:parseInt(result[i].movie_rank)
          }
          db.query(result[i].statement,dataBody,(err,result)=>{
            if(err) console.log(err);
            else{
              db.query(sqlChangeSuccess,result[i].log_id,(err,result)=>{
                if(err) console.log(err);
                else{
                  console.log("LOG UPDATE SUCCESS")
                }
              })
            }
          })
        }

      }
    })
    db3.query(sqlLogsRead1,(err,result)=>{
      if(err) console.log(err);
      else{
        console.log(result)
        for(let i=0;i<result.length;i++){
          let dataBody = {
            id:result[i].movie_id,
            name:result[i].movie_name,
            year:parseInt(result[i].movie_year),
            rank:parseInt(result[i].movie_rank)
          }
          db.query(result[i].statement,dataBody,(err,result)=>{
            if(err) console.log(err);
            else{
              db.query(sqlChangeSuccess,result[i].log_id,(err,result)=>{
                if(err) console.log(err);
                else{
                  console.log("LOG UPDATE SUCCESS")
                }
              })
            }
          })
        }

      }
    })
  } catch (error) {
    console.log("aaa")
  }
  try {
    console.log("CENTRAL NODE READ");
    // db.getConnection((err,connection)=>{
    //   connection.beginTransaction((err)=>{
    //     if(err){
    //       connection.rollback(()=>{
    //         console.log("HUHUHUssss"+err)
    //         connection.release()
    //       })
    //     }
    //     else{
    //       connection.query(sqlRead, (err, result) => {
    //         if (err){
    //           connection.rollback(()=>{
    //             console.log("HUHUHU")
    //             connection.release()
    //           })
    //         }
    //         else{
    //           connection.commit((err)=>{
    //             if(err){
    //               connection.rollback(()=>{
    //                 console.log("HUHUHUaaa")
    //                 connection.release();
    //               })
    //             }
    //             else{
    //               res.send(result);
    //             }
    //           })
    //         }
    //         // res.send(result);
    //       });

    //     }
    //   })
    // })
    db.query(sqlRead, (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
    
  } catch (error) {
  
    let movies = [];
    console.log("NOT CENTRAL NODE READ")
    db2.query(sqlRead, (err, result) => {
      if (err) console.log("NODE 2 ERROR: " + err);
      movies = movies.concat(result);
      
      db3.query(sqlRead, (err, result) => {
        if (err) console.log("NODE 3 ERROR: " + err);
        movies = movies.concat(result);
        movies.sort((a, b) => (a.id < b.id ? 1 : b.id < a.id ? -1 : 0));
        res.send(movies);
      });
    });
  }
});
//Create
app.post("/createNew", (req, res) => {

  const movieName = req.body.name;
  const movieYear = parseInt(req.body.year);
  const movieRank = parseInt(req.body.rank);
  const sqlMaxId = "SELECT MAX(id) AS maxId FROM mco2.movies";
  //const sqlInsert = "INSERT INTO mco2.movies (id, name, year, rank) VALUES(?,?,?,?)"
  const sqlInsert = "INSERT INTO movies SET ?";
  const sqlInsertLog = "INSERT INTO mco2.logs_table SET ?";
  try {
    console.log("CENTRAL NODE CREATE");
    db.query(sqlMaxId, (err, result) => {
      if (err){
        console.log(err);
      }
      else {
        let newId = result[0].maxId + 1;
        let newMovie = {
          id: newId,
          name: movieName,
          year: movieYear,
          rank: movieRank,
        };
        console.log("HERE")
        db.query(sqlInsert, newMovie, (err, result) => {
          if (err) console.log("Error: " + err);
          else console.log("Success2");
          
          if (movieYear < 1980) {
            db2.query(sqlInsert, newMovie, (err, result) => {
              if (err){
                let logBody = {
                  statement: sqlInsert,
                  movie_id: newId,
                  movie_name: movieName,
                  movie_year: movieYear,
                  movie_rank: movieRank,
                  status: 0,
                  node: 2,
                };
                db.query(sqlInsertLog,logBody,(err,result)=>{
                  if(err) console.log(err);
                  else console.log("Success");
                })
              
              }
              else{
                let logBody = {
                  statement: sqlInsert,
                  movie_id: newId,
                  movie_name: movieName,
                  movie_year: movieYear,
                  movie_rank: movieRank,
                  status: 1,
                  node: 2,
                };
                db2.query(sqlInsertLog,logBody,(err,result)=>{
                  if(err) console.log(err);
                  else console.log("Success");
                })
              }
            });
          } else {
            db3.query(sqlInsert, newMovie, (err, result) => {
              if (err){
                let logBody = {
                  statement: sqlInsert,
                  movie_id: newId,
                  movie_name: movieName,
                  movie_year: movieYear,
                  movie_rank: movieRank,
                  status: 0,
                  node: 3,
                };
                db.query(sqlInsertLog,logBody,(err,result)=>{
                  if(err) console.log(err);
                  else console.log("Success");
                })
              }
              else{
                let logBody = {
                  statement: sqlInsert,
                  movie_id: newId,
                  movie_name: movieName,
                  movie_year: movieYear,
                  movie_rank: movieRank,
                  status: 1,
                  node: 3,
                };
                db3.query(sqlInsertLog,logBody,(err,result)=>{
                  if(err) console.log(err);
                  else console.log("Success");
                })
              }
            });
          }
        });
      }
    });
  } catch (error) {

    db2.query(sqlMaxId, (err, result) => {
      if (err) console.log("Error: " + err);
      else {
        let node2Id = result[0].maxId + 1;
        db3.query(sqlMaxId, (err, result) => {
          if (err) console.log("Error: " + err);
          else {
            let node3Id = result[0].maxId + 1;
            let newId = Math.max(node2Id, node3Id);
            let newMovie = {
              id: newId,
              name: movieName,
              year: movieYear,
              rank: movieRank,
            };
            if (movieYear < 1980) {
              db2.query(sqlInsert, newMovie, (err, result) => {
                if (err) console.log("Error: " + err);
                else{
                  let logBody = {
                    statement: sqlInsert,
                    movie_id: newId,
                    movie_name: movieName,
                    movie_year: movieYear,
                    movie_rank: movieRank,
                    status: 0,
                    node: 1,
                  };
                  db2.query(sqlInsertLog,logBody,(err, result)=>{
                    if (err) console.log(err);
                    else console.log("Success")
                  })
                }
              });
            } else {
              db3.query(sqlInsert, newMovie, (err, result) => {
                if (err) console.log("Error: " + err);
                else{
                  let logBody = {
                    statement: sqlInsert,
                    movie_id: newId,
                    movie_name: movieName,
                    movie_year: movieYear,
                    movie_rank: movieRank,
                    status: 0,
                    node: 1,
                  };
                  db3.query(sqlInsertLog,logBody,(err, result)=>{
                    if (err) console.log(err);
                    else console.log("Success")
                  })
                }
              });
            }
          }
        });
      }
    });
  }
});
//Delete
app.delete("/delete", (req, res) => {
  const movieId = req.body.id;
  const movieYear = req.body.year;
  console.log(movieId);
  const sqlDelete = "DELETE FROM mco2.movies WHERE id=?";
  const sqlInsertLog = "INSERT INTO mco2.logs_table SET ?";

  try {
    db.query(sqlDelete, [movieId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let logBody = {
          statement: sqlDelete,
          movie_id: movieId,
          movie_name: null,
          movie_year: null,
          movie_rank: null,
          status: 1,
          node: 1,
        };
        db.query(sqlInsertLog, [logBody], (err, result) => {
          if (err) console.log("Error: " + err);
          else console.log("Success");
        });
      }
    });

    if (movieYear < 1980) {
      db2.query(sqlDelete, [movieId], (err, result) => {
        if (err){
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: null,
            movie_year: null,
            movie_rank: null,
            status: 0,
            node: 2,
          };
          db.query(sqlInsertLog, [logBody], (err, result) => {
            if (err) console.log("Error: " + err);
            else console.log("Success");
          });
        }
        else {
          
          db3.query(sqlInsertLog, [logBody], (err, result) => {
            if (err){
              let logBody = {
                statement: sqlDelete,
                movie_id: movieId,
                movie_name: null,
                movie_year: null,
                movie_rank: null,
                status: 0,
                node: 3,
              };
              db.query(sqlInsertLog, [logBody], (err, result) => {
                if (err) console.log("Error: " + err);
                else console.log("Success");
              });
            }
            else console.log("Success");
          });
        }
      });
    } else {
      db3.query(sqlDelete, [movieId], (err, result) => {
        if (err) console.log("Error: " + err);
        else {
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: null,
            movie_year: null,
            movie_rank: null,
            status: 1,
            node: 3,
          };
          db3.query(sqlInsertLog, [logBody], (err, result) => {
            if (err) console.log("Error: " + err);
            else console.log("Success");
          });
        }
      });
    }
  } catch (error) {
    if (movieYear < 1980) {
      let logBody = {
        statement: sqlDelete,
        movie_id: movieId,
        movie_name: null,
        movie_year: movieYear,
        movie_rank: null,
        status: 0,
        node: 1,
      };
      db2.query(sqlInsertLog, { logBody }, (err, result) => {
        if (err) console.log("Error: " + err);
        else console.log("Success");
      });
      db2.query(sqlDelete, [movieId], (err, result) => {
        if (err) console.log("Error: " + err);
        else {
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: null,
            movie_year: null,
            movie_rank: null,
            status: 1,
            node: 2,
          };
          db2.query(sqlInsertLog, [logBody], (err, result) => {
            if (err) console.log("Error: " + err);
            else console.log("Success");
          });
        }
      });
    } else {
      let logBody = {
        statement: sqlDelete,
        movie_id: movieId,
        movie_name: null,
        movie_year: movieYear,
        movie_rank: null,
        status: 0,
        node: 1,
      };
      db3.query(sqlInsertLog, { logBody }, (err, result) => {
        if (err) console.log("Error: " + err);
        else console.log("Success");
      });
      db3.query(sqlDelete, [movieId], (err, result) => {
        if (err) console.log("Error: " + err);
        else {
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: null,
            movie_year: null,
            movie_rank: null,
            status: 1,
            node: 3,
          };
          db3.query(sqlInsertLog, [logBody], (err, result) => {
            if (err) console.log("Error: " + err);
            else console.log("Success");
          });
        }
      });
    }
  }
});
//Update
app.patch("/update", (req, res) => {
  const movieId = req.body.id;
  const movieName = req.body.name;
  const movieYear = parseInt(req.body.year);
  const movieRank = parseInt(req.body.rank);
  const oldYear = parseInt(req.body.oldYear);
  const sqlUpdate = "UPDATE mco2.movies SET ? WHERE id=?";
  const sqlDelete = "DELETE FROM mco2.movies WHERE id=?";
  const sqlInsert = "INSERT INTO mco2.movies SET ?";
  const sqlInsertLog = "INSERT INTO mco2.logs_table SET ?"
  const body = { name: movieName, year: movieYear, rank: movieRank };
  const bodyInsert = {
    id: movieId,
    name: movieName,
    year: movieYear,
    rank: movieRank,
  };
  try {

    db.query(sqlUpdate, [body, movieId], (err, result) => {
      if (err){
        let logBody = {
          statement: sqlUpdate,
          movie_id: movieId,
          movie_name: movieName,
          movie_year: movieYear,
          movie_rank: movieRank,
          status: 1,
          node: 1,
        };
        db2.query(sqlInsertLog,logBody,(err, result)=>{
          if(err) console.log(err)
          else console.log("Log success");
        })
        throw(err)
      }
      else{
        let logBody = {
          statement: sqlUpdate,
          movie_id: movieId,
          movie_name: movieName,
          movie_year: movieYear,
          movie_rank: movieRank,
          status: 1,
          node: 1,
        };
        db.query(sqlInsertLog,logBody,(err, result)=>{
          if(err) console.log(err);
          else console.log("Log Success 1")
        })
      }
    });

    if (oldYear < 1980 && movieYear > 1980) {
      db2.query(sqlDelete, [movieId], (err, result) => {
        if (err){
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 0,
            node: 2,
          };
          db.query(sqlDelete,logBody,(err, result)=>{
            if(err) console.log(err);
            else console.log("SUCCESS LOG 2");
          })
        }
        else{
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 1,
            node: 2,
          };
          db2.query(sqlInsertLog,logBody,(err, result)=>{
            if(err) console.log(err);
            else console.log("SUCCESS LOG 2");
          })
        }
      });
      db3.query(sqlInsert, bodyInsert, (err, result) => {
        if (err){
          let logBody = {
            statement: sqlInsert,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 0,
            node: 3,
          };
          db.query(sqlInsertLog,logBody,(err, result)=>{
            if(err) console.log(err);
            else console.log("SUCCESS LOG 3");
          })
        }
        else{
          let logBody = {
            statement: sqlInsert,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 1,
            node: 3,
          };
          db3.query(sqlInsertLog,logBody,(err, result)=>{
            if(err) console.log(err);
            else console.log("SUCCESS LOG 3");
          })
        }
      });
    } else if (oldYear > 1980 && movieYear < 1980) {
      db3.query(sqlDelete, [movieId], (err, result) => {
        if(err){
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 0,
            node: 3,
          }
          db.query(sqlInsertLog,logBody,(err, result)=>{
            if(err) console.log(err)
            else console.log("Success log 3");
          })
        }
        else{
          let logBody = {
            statement: sqlDelete,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 1,
            node: 3,
          }
          db3.query(sqlInsertLog,logBody,(err, result)=>{
            if(err) console.log(err)
            else console.log("Success log 3");
          })
        }
      });
      db2.query(sqlInsert, bodyInsert, (err, result) => {
        if (err){
          let logBody = {
            statement: sqlInsert,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 0,
            node: 2,
          };
          db.query(sqlInsertLog,logBody,(err, result)=>{
            if(err) console.log(err);
            else console.log("SUCCESS LOG 3");
          })
        }
        else{
          let logBody = {
            statement: sqlInsert,
            movie_id: movieId,
            movie_name: movieName,
            movie_year: movieYear,
            movie_rank: movieRank,
            status: 1,
            node: 2,
          };
          db2.query(sqlInsertLog,logBody,(err, result)=>{
            if(err) console.log(err);
            else console.log("SUCCESS LOG 2");
          })
          
        }
      });
    } else {
      if (movieYear < 1980) {
        db2.query(sqlUpdate, [body, movieId], (err, result) => {
          if (err){
            let logBody = {
              statement: sqlUpdate,
              movie_id: movieId,
              movie_name: movieName,
              movie_year: movieYear,
              movie_rank: movieRank,
              status: 0,
              node: 2,
            };
            db.query(sqlInsertLog,logBody,(err, result)=>{
              if(err) console.log(err);
              else console.log("Success2")
            })
          }
          else{
            let logBody = {
              statement: sqlUpdate,
              movie_id: movieId,
              movie_name: movieName,
              movie_year: movieYear,
              movie_rank: movieRank,
              status: 1,
              node: 2,
            };
            db2.query(sqlInsertLog,logBody,(err, result)=>{
              if(err) console.log(err);
              else console.log("Success2")
            })

          }

        });
      } else {
        db3.query(sqlUpdate, [body, movieId], (err, result) => {
          if (err){
            let logBody = {
              statement: sqlUpdate,
              movie_id: movieId,
              movie_name: movieName,
              movie_year: movieYear,
              movie_rank: movieRank,
              status: 0,
              node: 3,
            };
            db.query(sqlInsertLog,logBody,(err, result)=>{
              if(err) console.log(err);
              else console.log("Success2")
            })
          }
          else{
            let logBody = {
              statement: sqlUpdate,
              movie_id: movieId,
              movie_name: movieName,
              movie_year: movieYear,
              movie_rank: movieRank,
              status: 1,
              node: 3,
            };
            db3.query(sqlInsertLog,logBody,(err, result)=>{
              if(err) console.log(err);
              else console.log("Success2")
            })
          }
        });
      }
    }
  } catch (error) {
    if (oldYear < 1980 && movieYear > 1980) {
      db2.query(sqlDelete, [movieId], (err, result) => {
        if (err) console.log("Error: " + err);
        console.log("Success 2");
      });
      db3.query(sqlInsert, bodyInsert, (err, result) => {
        if (err) console.log("Error: " + err);
        console.log("Success 3");
      });
    } else if (oldYear > 1980 && movieYear < 1980) {
      db3.query(sqlDelete, [movieId], (err, result) => {
        if (err) console.log("Error: " + err);
        console.log("Success 4");
      });
      db2.query(sqlInsert, bodyInsert, (err, result) => {
        if (err) console.log("Error: " + err);
        console.log("Success 5");
      });
    } else {
      if (movieYear < 1980) {
        db2.query(sqlUpdate, [body, movieId], (err, result) => {
          if (err) console.log("Error: " + err);
          console.log("Success");
        });
      } else {
        db3.query(sqlUpdate, [body, movieId], (err, result) => {
          if (err) console.log("Error: " + err);
          console.log("Success");
        });
      }
    }
  }
});
app.listen(port, () => {
  console.log("Running on port " + port);
});
