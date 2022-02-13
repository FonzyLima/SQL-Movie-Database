import "./App.css";
import React,{useEffect,useState} from 'react';
import Navbar from './component/Navbar'
import Create from './component/Create'

import Update from './component/Update'
import Delete from './component/Delete'
const axios = require('axios');

function App() {
  const [data,setData] = useState([])
  const getData = async () =>{
    try {
      const getMovieData = await axios({
        url: "http://localhost:3001/readAll",
        method: "get"
      });
      setData(getMovieData.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    //get all data from database
    // Axios.get("http://localhost:3001/readAll").then((response) =>{
    //   console.log("ANSWER")
    //   setData(response.data);
    //   console.log(response.data)
    // }).catch((err)=>{
    //   console.log(err);
    // });
    getData();
  },[]);
  console.log("HEY")
  console.log(data);
  return (
    <div className="page">

      {/* <div className="header">  
        <div className="headerContent">
          <span className="section">STADVDB S14</span>
          <span className="names">Berenguer, Camarillo, Lima</span>
        </div>
      </div> */}
      
      <Navbar/>
      <Create/>

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
            {data.map(item =>(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.year}</td>
                <td>{item.rank}</td>
                <Update/>
                <Delete/>
              </tr>
            ))}
            {/* <tr>
              <td>{data[0].id}</td>
              <td>{data[0].name}</td>
              <td>{data[0].year}</td>
              <td>{data[0].rank}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;