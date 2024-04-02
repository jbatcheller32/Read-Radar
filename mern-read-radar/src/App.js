import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ReadsList from "./components/reads-list.component";
import EditRead from "./components/edit-read.component";
import CreateRead from "./components/create-read.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className= "container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ReadsList} />
      <Route path="/edit/:id" component={EditRead} />
      <Route path="/create" component={CreateRead} /> 
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
