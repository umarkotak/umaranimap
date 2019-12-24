import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import "./style.css"

import Nav from "./components/Nav"
import Home from "./components/Home"
import About from "./components/About"
import AboutDetail from "./components/AboutDetail"
import Profile from "./components/Profile"

function App() {
  return (
    <Router>
      <div className="App">
        <h1>App</h1>

        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/about/:id" component={AboutDetail} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  )
}

export default App