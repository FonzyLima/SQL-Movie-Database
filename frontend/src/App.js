import "./App.css";
import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import Navbar from './component/Navbar'
import Create from './component/Create'

function App() {
  const [data,setData] = useState([])
  useEffect(()=>{
    //get all data from database
    Axios.get("http://localhost:3001/readAll").then((response) =>{
      console.log("ANSWER")
      setData(response.data);
      console.log(response.data)
    }).catch((err)=>{
      console.log(err);
    });
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
          className="table table-striped table-bordered table-sm"
          cellspacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th className="th-sm">ID</th>
              <th className="th-sm">Name</th>
              <th className="th-sm">Year</th>
              <th className="th-sm">Rank</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item =>(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.year}</td>
                <td>{item.rank}</td>
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