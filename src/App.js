import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Nav from "./components/Nav"
import PageHome from "./components/PageHome"
import PageTicTacToe from "./components/PageTicTacToe"
import PageLearnReact from "./components/PageLearnReact"
import PageAiringAnimeV1 from "./components/PageAiringAnimeV1"
import PageAiringAnimeV2 from "./components/PageAiringAnimeV2"
import PageAiringAnimeV3 from "./components/PageAiringAnimeV3"
import PageAiringAnimeV4 from "./components/PageAiringAnimeV4"
import PageAiringAnimeV5 from "./components/PageAiringAnimeV5"

function App() {
  return (
    <Router>
      <div className="App container">
        <Nav />
        <Switch>
          <Route path="/" exact component={PageHome} />
          <Route path="/tic-tac-toe" exact component={PageTicTacToe} />
          <Route path="/learn-react" exact component={PageLearnReact} />
          <Route path="/airing-anime-v1/:id" exact component={PageAiringAnimeV1} />
          <Route path="/airing-anime-v1" exact component={PageAiringAnimeV1} />
          <Route path="/airing-anime-v2" exact component={PageAiringAnimeV2} />
          <Route path="/airing-anime-v3" exact component={PageAiringAnimeV3} />
          <Route path="/airing-anime-v4" exact component={PageAiringAnimeV4} />
          <Route path="/airing-anime-v5" exact component={PageAiringAnimeV5} />
        </Switch>
      </div>
    </Router>
  )
}

export default App