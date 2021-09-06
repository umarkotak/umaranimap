import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

import PageHome from "./components/pages/PageHome"
import PageLogin from "./components/pages/PageLogin"
import PageTicTacToe from "./components/pages/PageTicTacToe"
import PageLearnReact from "./components/pages/PageLearnReact"
import PageAiringAnimeV6 from "./components/pages/PageAiringAnimeV6"
import PageWatchAnimeV2 from "./components/pages/PageWatchAnimeV2"
import PageSearchMangaV1 from "./components/pages/PageSearchMangaV1"
import PageTodaysMangaV1 from "./components/pages/PageTodaysMangaV1"
import PageGlobalClipboardV1 from "./components/pages/PageGlobalClipboardV1"
import PageChattoV1 from "./components/pages/PageChattoV1"
import PageStatisticsV1 from "./components/pages/PageStatisticsV1"
import PageMangaLibraryV1 from "./components/pages/PageMangaLibraryV1"
import PageReadMangaOnlyV1 from "./components/pages/PageReadMangaOnlyV1"
import PageMangaDetailV1 from "./components/pages/PageMangaDetailV1"
import PageSocketGameV1 from "./components/pages/PageSocketGameV1"
import PageTWBotV2 from "./components/pages/PageTWBotV2"
import PageRepackGamesV1 from "./components/pages/PageRepackGamesV1"
import PageRepackGamesV2 from "./components/pages/PageRepackGamesV2"

function App() {
  return (
    <Router>
      <div className="dark-mode sidebar-mini layout-fixed">
          <Navbar />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={PageHome} />
            <Route path="/home" exact component={PageHome} />
            <Route path="/login" exact component={PageLogin} />
            <Route path="/tic-tac-toe" exact component={PageTicTacToe} />
            <Route path="/global-clipboard-v1" exact component={PageGlobalClipboardV1} />
            <Route path="/chatto-v1" exact component={PageChattoV1} />
            <Route path="/statistics-v1" exact component={PageStatisticsV1} />
            <Route path="/learn-react" exact component={PageLearnReact} />
            <Route path="/airing-anime-v6" exact component={PageAiringAnimeV6} />
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
    </Router>
  )
}

export default App
