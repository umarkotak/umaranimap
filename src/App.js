import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"


import PageHome from "./components/pages/PageHome"

import PageLogin from "./components/pages/PageLogin"
import PageSignUp from "./components/pages/PageSignUp"

import PageTicTacToe from "./components/pages/PageTicTacToe"
import PageLearnReact from "./components/pages/PageLearnReact"
import PageAnimesSeasons from "./components/pages/PageAnimesSeasons"
import PageAnimesAnimepaheWatch from "./components/pages/PageAnimesAnimepaheWatch"
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

import PageNotFound from "./components/pages/PageNotFound"

function App() {
  return (
    <Router>
      <div className="sidebar-mini layout-fixed layout-footer-fixed">
        <div className="wrapper" style={{backgroundColor: "#454d55"}}>
          <Navbar />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={PageHome} />
            <Route path="/home" exact component={PageHome} />

            <Route path="/login" exact component={PageLogin} />
            <Route path="/sign_up" exact component={PageSignUp} />

            <Route path="/animes/seasons" exact component={PageAnimesSeasons} />
            <Route path="/animes/animepahe/watch" exact component={PageAnimesAnimepaheWatch} />

            <Route path="/mangas/latest/mangahub" exact component={PageTodaysMangaV1} />
            <Route path="/mangas/library/mangahub" exact component={PageMangaLibraryV1} />
            <Route path="/mangas/search/mangahub" exact component={PageSearchMangaV1} />
            <Route path="/mangas/read/mangahub/:path_title/:path_chapter" exact component={PageReadMangaOnlyV1} />
            <Route path="/mangas/detail/mangahub/:manga_title" exact component={PageMangaDetailV1} />

            <Route path="/statistics-v1" exact component={PageStatisticsV1} />

            <Route path="/tic-tac-toe" exact component={PageTicTacToe} />
            <Route path="/global-clipboard-v1" exact component={PageGlobalClipboardV1} />
            <Route path="/chatto-v1" exact component={PageChattoV1} />
            <Route path="/socket-game-v1" exact component={PageSocketGameV1} />
            <Route path="/tw-bot-v2" exact component={PageTWBotV2} />
            <Route path="/repack-games-v2" exact component={PageRepackGamesV2} />

            <Route path="/learn-react" exact component={PageLearnReact} />
            <Route path="/repack-games-v1" exact component={PageRepackGamesV1} />

            <Route path="/" component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
