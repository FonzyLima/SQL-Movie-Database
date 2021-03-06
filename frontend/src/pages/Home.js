import "../styles/home.css";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Create from "../component/Create";
import Update from "../component/Update";
import Delete from "../component/Delete";
const axios = require("axios");

const Home = () =>{
    const [data, setData] = useState([]);
    const [limit,setLimit] = useState(10);
    console.log(process.env.REACT_APP_HOSTNAME)
    const getData = async () => {
    try {
      let lim = limit;
      console.log("LIMIT: "+lim)
      const getMovieData = await axios({
        url: `${process.env.REACT_APP_HOSTNAME}/readAll`,
        method: "post",
        data: {lim}
      });
      setData(getMovieData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [limit]);
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
              <button className="btnproper" id="createbutton" onClick={()=>setLimit(limit+10)}>Load More</button>
            </div>

            <footer>
                <p> STADVDB S14 <br></br> </p>
                <p> BERENGUER, Beatrice A. <br></br></p> 
                <p> CAMARILLO, Bryan Daniel B. <br></br></p> 
                <p> LIMA, Alfonso Gabriel V. </p>
            </footer>
          </div>
    )
}

export default Home;