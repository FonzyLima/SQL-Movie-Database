import "./App.css";
function App() {
  return (
    <div className="page">
      <div className="header">
        <div className="headerContent">
          <span className="section">STADVDB S14</span>
          <span className="names">Berenguer, Camarillo, Lima</span>
        </div>
      </div>
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
            <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
