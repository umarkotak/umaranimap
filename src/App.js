import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Nav from "./components/Nav"
import PageHome from "./components/PageHome"
import PageTicTacToe from "./components/PageTicTacToe"
import PageLearnReact from "./components/PageLearnReact"
import PageTopAnimes from "./components/PageTopAnimes"
import PageAnimeWatcher from "./components/PageAnimeWatcher"
import PageAnimeWatcherV2 from "./components/PageAnimeWatcherV2"

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={PageHome} />
          <Route path="/tic-tac-toe" exact component={PageTicTacToe} />
          <Route path="/learn-react" exact component={PageLearnReact} />
          <Route path="/top-animes/:id" exact component={PageTopAnimes} />
          <Route path="/top-animes" exact component={PageTopAnimes} />
          <Route path="/anime-watcher" exact component={PageAnimeWatcher} />
          <Route path="/anime-watcher-v2" exact component={PageAnimeWatcherV2} />
        </Switch>
      </div>
    </Router>
  )
}

export default App