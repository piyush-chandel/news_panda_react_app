import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Newscomponent from './components/Newscomponent'
import LoadingBar from 'react-top-loading-bar'

import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";



export default function App() {
  
  const apikey="799f7d92e06640df86678fc05d02e7e8"
  const c="piyush"
  const pagesize=15

   const [progress, setprogress] = useState(0);
   


  



    return (

     
      <div>
         <Router>
           <div >
        <Navbar />
        </div>
        <LoadingBar
        color='white'
        // progress={30}
        progress={progress}
      />
        <Routes>
          <Route exact path="/" element={<Newscomponent setprogress={setprogress}     apikey={apikey}  key="general" pageSize={pagesize} category="general" />}/> 
          <Route exact path="/sports"  element={<Newscomponent setprogress={setprogress}    apikey={apikey}  key="sports" pageSize={pagesize} category="sports"/>}/>  
          <Route exact path="/entertainment" element={<Newscomponent setprogress={setprogress}   pageSize={pagesize} apikey={apikey}  key="entertainment" category="entertainment" />}/>  
          <Route exact path="/science"  element={<Newscomponent setprogress={setprogress}   pageSize={pagesize}  apikey={apikey}  key="science" category="science" /> }/> 
          <Route exact path="/business" element={<Newscomponent setprogress={setprogress}   pageSize={pagesize}  apikey={apikey}  key="business"  category="business" />}/> 
          <Route exact path="/technology"  element={<Newscomponent setprogress={setprogress}   pageSize={pagesize}  apikey={apikey}  key="technology" category="technology" />}/>  
          <Route exact path="/health"  element={<Newscomponent setprogress={setprogress}    apikey={apikey}  key="health" pageSize={pagesize} category="health" />}/>  

          </Routes>
        
        </Router>
      </div>
    
    )
  }


