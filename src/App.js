import React, { useState, useEffect } from "react";
// import "../styles/App.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    try {
        setLoading(true);
        const response = await fetch('https://api.mfapi.in/mf');
        const data = await response.json();
            
        const matchingFunds = data.filter(fund => {
          const schemeName = fund.schemeName.toLowerCase();
          // console.log(schemeName)
          return schemeName.includes(search.toLowerCase());
        }).slice(0, 10);
        setData(matchingFunds);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
      }
  }
    useEffect(()=>{
        fetchData();
    }, [search])
  console.log(data)
  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text" 
          placeholder="Search for a mutual fund"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>
      <div className="funds-container">
        {loading && <div>Loading...</div>}
        <ul>
          {data.map((data,inx) =>
            <li key={inx}>
                <h3>{data.schemeName}</h3>
              <p>Scheme Code: { data.schemeCode }</p>
            </li>
          )}
              
            
          </ul>
        
      </div>
    </div>
  );
}

export default App;