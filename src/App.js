import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Nav from "./components/Nav"
import PageHome from "./components/PageHome"
import PageLogin from "./components/PageLogin"
import PageTicTacToe from "./components/PageTicTacToe"
import PageLearnReact from "./components/PageLearnReact"
import PageAiringAnimeV1 from "./components/PageAiringAnimeV1"
import PageAiringAnimeV2 from "./components/PageAiringAnimeV2"
import PageAiringAnimeV3 from "./components/PageAiringAnimeV3"
import PageAiringAnimeV4 from "./components/PageAiringAnimeV4"
import PageAiringAnimeV5 from "./components/PageAiringAnimeV5"
import PageReadMangaV1 from "./components/PageReadMangaV1"
import PageReadMangaV2 from "./components/PageReadMangaV2"
import PageReadMangaV3 from "./components/PageReadMangaV3"
import PageReadMangaV4 from "./components/PageReadMangaV4"
import PageReadMangaV5 from "./components/PageReadMangaV5"
import PageReadMangaV6 from "./components/PageReadMangaV6"
import PageReadMangaV7 from "./components/PageReadMangaV7"
import PageWatchAnimeV1 from "./components/PageWatchAnimeV1"

function App() {
  return (
    <Router>
      <div className="App container">
        <Nav />
        <Switch>
          <Route path="/" exact component={PageHome} />
          <Route path="/login" exact component={PageLogin} />
          <Route path="/tic-tac-toe" exact component={PageTicTacToe} />
          <Route path="/learn-react" exact component={PageLearnReact} />
          <Route path="/airing-anime-v1/:id" exact component={PageAiringAnimeV1} />
          <Route path="/airing-anime-v1" exact component={PageAiringAnimeV1} />
          <Route path="/airing-anime-v2" exact component={PageAiringAnimeV2} />
          <Route path="/airing-anime-v3" exact component={PageAiringAnimeV3} />
          <Route path="/airing-anime-v4" exact component={PageAiringAnimeV4} />
          <Route path="/airing-anime-v5" exact component={PageAiringAnimeV5} />
          <Route path="/read-manga-v1" exact component={PageReadMangaV1} />
          <Route path="/read-manga-v2" exact component={PageReadMangaV2} />
          <Route path="/read-manga-v3" exact component={PageReadMangaV3} />
          <Route path="/read-manga-v4" exact component={PageReadMangaV4} />
          <Route path="/read-manga-v5" exact component={PageReadMangaV5} />
          <Route path="/read-manga-v6" exact component={PageReadMangaV6} />
          <Route path="/read-manga-v7" exact component={PageReadMangaV7} />
          <Route path="/watch-anime-v1" exact component={PageWatchAnimeV1} />
        </Switch>
      </div>
    </Router>
  )
}

export default App