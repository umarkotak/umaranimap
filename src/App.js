import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Nav from "./components/Nav"
import configDB from "./components/ConfigDB"
import PageHome from "./components/PageHome"
import PageLogin from "./components/PageLogin"
import PageTicTacToe from "./components/PageTicTacToe"
import PageLearnReact from "./components/PageLearnReact"
import PageAiringAnimeV1 from "./components/PageAiringAnimeV1"
import PageAiringAnimeV5 from "./components/PageAiringAnimeV5"
import PageAiringAnimeV6 from "./components/PageAiringAnimeV6"
import PageWatchAnimeV1 from "./components/PageWatchAnimeV1"
import PageWatchAnimeV2 from "./components/PageWatchAnimeV2"
import PageSearchMangaV1 from "./components/PageSearchMangaV1"
import PageTodaysMangaV1 from "./components/PageTodaysMangaV1"
import PageGlobalClipboardV1 from "./components/PageGlobalClipboardV1"
import PageChattoV1 from "./components/PageChattoV1"
import PageStatisticsV1 from "./components/PageStatisticsV1"
import PageMangaLibraryV1 from "./components/PageMangaLibraryV1"
import PageReadMangaOnlyV1 from "./components/PageReadMangaOnlyV1"
import PageMangaDetailV1 from "./components/PageMangaDetailV1"
import PageSocketGameV1 from "./components/PageSocketGameV1"
import PageTWBotV2 from "./components/PageTWBotV2"
import PageRepackGamesV1 from "./components/PageRepackGamesV1"
import PageRepackGamesV2 from "./components/PageRepackGamesV2"

function App() {
  return (
    <Router>
      <div style={{backgroundColor: `${configDB.GetActiveTemplate("#1b262c", "#b3e7ff")}`}}>
        <div className="App container border border-secondary shadow-lg" style={{backgroundColor: `${configDB.GetActiveTemplate("#0f4a71", "#ffffff")}`}}>
          <Nav />
          <Switch>
            <Route path="/" exact component={PageHome} />
            <Route path="/login" exact component={PageLogin} />
            <Route path="/tic-tac-toe" exact component={PageTicTacToe} />
            <Route path="/global-clipboard-v1" exact component={PageGlobalClipboardV1} />
            <Route path="/chatto-v1" exact component={PageChattoV1} />
            <Route path="/statistics-v1" exact component={PageStatisticsV1} />
            <Route path="/learn-react" exact component={PageLearnReact} />
            <Route path="/airing-anime-v1/:id" exact component={PageAiringAnimeV1} />
            <Route path="/airing-anime-v5" exact component={PageAiringAnimeV5} />
            <Route path="/airing-anime-v6" exact component={PageAiringAnimeV6} />
            <Route path="/watch-anime-v1" exact component={PageWatchAnimeV1} />
            <Route path="/watch-anime-v2" exact component={PageWatchAnimeV2} />
            <Route path="/search-manga-v1" exact component={PageSearchMangaV1} />
            <Route path="/todays-manga-v1" exact component={PageTodaysMangaV1} />
            <Route path="/manga-library-v1" exact component={PageMangaLibraryV1} />
            <Route path="/read-manga-only-v1/:path_title/:path_chapter" exact component={PageReadMangaOnlyV1} />
            <Route path="/manga-detail-v1/:manga_title" exact component={PageMangaDetailV1} />
            <Route path="/socket-game-v1" exact component={PageSocketGameV1} />
            <Route path="/tw-bot-v2" exact component={PageTWBotV2} />
            <Route path="/repack-games-v1" exact component={PageRepackGamesV1} />
            <Route path="/repack-games-v2" exact component={PageRepackGamesV2} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App