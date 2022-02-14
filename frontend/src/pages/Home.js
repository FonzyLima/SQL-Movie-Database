import "../styles/home.css";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Create from "../component/Create";
import Update from "../component/Update";
import Delete from "../component/Delete";
const axios = require("axios");

const Home = () =>{
    const [data, setData] = useState([]);
    const getData = async () => {
    try {
      const getMovieData = await axios({
        url: "http://localhost:3001/readAll",
        method: "get",
      });
      setData(getMovieData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log("HEY");
  console.log(data);
    return(
        <div>
            <Navbar />
            <div className="title">
              <h1>MCO2: Transaction Management</h1>
              <hr></hr>
            </div>
            <Create />
            <div className="body">
              <table
                id="dtBasicExample"
                className="tableproper"
                // cellpadding="10px"
                // cellspacing="0"
                // width="100%"
              >
                <thead>
                  <tr>
                    <th className="tablecell">ID</th>
                    <th className="tablecell">Name</th>
                    <th className="tablecell">Year</th>
                    <th className="tablecell">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.year}</td>
                      <td>{item.rank}</td>
                      <td>
                        <Update id={item.id} name={item.name} year={item.year} rank={item.rank}/>
                      </td>
                      <td>
                        <Delete id={item.id} year={item.year}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    )
}

export default Home;