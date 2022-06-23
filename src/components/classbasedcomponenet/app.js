import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newscomponent from './components/Newscomponent'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  
  Routes,
  Route,
  
} from "react-router-dom";


export default class App extends Component {
  
  apikey="799f7d92e06640df86678fc05d02e7e8"
  c="piyush"
  pagesize=15

   state={
     progress:0,
   }

   setprogress=(progress)=>{
    this.setState({progress:progress})
   }


  render() {



    return (

     
      <div>
         <Router>
        <Navbar />
        <LoadingBar
        color='white'
        // progress={30}
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/" element={<Newscomponent setprogress={this.setprogress}     apikey={this.apikey}  key="general" pageSize={this.pagesize} category="general" />}/> 
          <Route exact path="/sports"  element={<Newscomponent setprogress={this.setprogress}    apikey={this.apikey}  key="sports" pageSize={this.pagesize} category="sports"/>}/>  
          <Route exact path="/entertainment" element={<Newscomponent setprogress={this.setprogress}   pageSize={this.pagesize} apikey={this.apikey}  key="entertainment" category="entertainment" />}/>  
          <Route exact path="/science"  element={<Newscomponent setprogress={this.setprogress}   pageSize={this.pagesize}  apikey={this.apikey}  key="science" category="science" /> }/> 
          <Route exact path="/business" element={<Newscomponent setprogress={this.setprogress}   pageSize={this.pagesize}  apikey={this.apikey}  key="business"  category="business" />}/> 
          <Route exact path="/technology"  element={<Newscomponent setprogress={this.setprogress}   pageSize={this.pagesize}  apikey={this.apikey}  key="technology" category="technology" />}/>  
          <Route exact path="/health"  element={<Newscomponent setprogress={this.setprogress}    apikey={this.apikey}  key="health" pageSize={this.pagesize} category="health" />}/>  

          </Routes>
        
        </Router>
      </div>
    
    )
  }
}

