import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Nav from "./components/Nav"
import PageHome from "./components/PageHome"
import PageLogin from "./components/PageLogin"
import PageTicTacToe from "./components/PageTicTacToe"
import PageLearnReact from "./components/PageLearnReact"
import PageAiringAnimeV1 from "./components/PageAiringAnimeV1"
// import PageAiringAnimeV2 from "./components/PageAiringAnimeV2"
// import PageAiringAnimeV3 from "./components/PageAiringAnimeV3"
// import PageAiringAnimeV4 from "./components/PageAiringAnimeV4"
import PageAiringAnimeV5 from "./components/PageAiringAnimeV5"
// import PageReadMangaV1 from "./components/PageReadMangaV1"
// import PageReadMangaV2 from "./components/PageReadMangaV2"
// import PageReadMangaV3 from "./components/PageReadMangaV3"
// import PageReadMangaV4 from "./components/PageReadMangaV4"
// import PageReadMangaV5 from "./components/PageReadMangaV5"
// import PageReadMangaV6 from "./components/PageReadMangaV6"
// import PageReadMangaV7 from "./components/PageReadMangaV7"
// import PageReadMangaV8 from "./components/PageReadMangaV8"
import PageWatchAnimeV1 from "./components/PageWatchAnimeV1"
import PageSearchMangaV1 from "./components/PageSearchMangaV1"
import PageTodaysMangaV1 from "./components/PageTodaysMangaV1"
import PageGlobalClipboardV1 from "./components/PageGlobalClipboardV1"
import PageChattoV1 from "./components/PageChattoV1"
import PageStatisticsV1 from "./components/PageStatisticsV1"
import PageMangaLibraryV1 from "./components/PageMangaLibraryV1"
import PageReadMangaOnlyV1 from "./components/PageReadMangaOnlyV1"
import PageSocketGameV1 from "./components/PageSocketGameV1"
import PageTWBot from "./components/PageTWBot"
import PageTWBotV2 from "./components/PageTWBotV2"

function App() {
  return (
    <Router>
      <div style={{backgroundColor: "#b3e7ff"}}>
        <div className="App container border border-secondary shadow-lg" style={{backgroundColor: "#ffffff"}}>
          <Nav />
          <Switch>
            <Route path="animapu/" exact component={PageHome} />
            <Route path="animapu/login" exact component={PageLogin} />
            <Route path="animapu/tic-tac-toe" exact component={PageTicTacToe} />
            <Route path="animapu/global-clipboard-v1" exact component={PageGlobalClipboardV1} />
            <Route path="animapu/chatto-v1" exact component={PageChattoV1} />
            <Route path="animapu/statistics-v1" exact component={PageStatisticsV1} />
            <Route path="animapu/learn-react" exact component={PageLearnReact} />
            <Route path="animapu/airing-anime-v1/:id" exact component={PageAiringAnimeV1} />
            {/* <Route path="animapu/airing-anime-v1" exact component={PageAiringAnimeV1} />
            <Route path="animapu/airing-anime-v2" exact component={PageAiringAnimeV2} />
            <Route path="animapu/airing-anime-v3" exact component={PageAiringAnimeV3} />
            <Route path="animapu/airing-anime-v4" exact component={PageAiringAnimeV4} /> */}
            <Route path="animapu/airing-anime-v5" exact component={PageAiringAnimeV5} />
            {/* <Route path="animapu/read-manga-v1" exact component={PageReadMangaV1} />
            <Route path="animapu/read-manga-v2" exact component={PageReadMangaV2} />
            <Route path="animapu/read-manga-v3" exact component={PageReadMangaV3} />
            <Route path="animapu/read-manga-v4" exact component={PageReadMangaV4} />
            <Route path="animapu/read-manga-v5" exact component={PageReadMangaV5} />
            <Route path="animapu/read-manga-v6" exact component={PageReadMangaV6} />
            <Route path="animapu/read-manga-v7" exact component={PageReadMangaV7} />
            <Route path="animapu/read-manga-v8" exact component={PageReadMangaV8} /> */}
            <Route path="animapu/watch-anime-v1" exact component={PageWatchAnimeV1} />
            <Route path="animapu/search-manga-v1" exact component={PageSearchMangaV1} />
            <Route path="animapu/todays-manga-v1" exact component={PageTodaysMangaV1} />
            <Route path="animapu/manga-library-v1" exact component={PageMangaLibraryV1} />
            {/* <Route path="animapu/read-manga-only-v1" exact component={PageReadMangaOnlyV1} /> */}
            <Route path="animapu/read-manga-only-v1/:path_title/:path_chapter" exact component={PageReadMangaOnlyV1} />
            <Route path="animapu/socket-game-v1" exact component={PageSocketGameV1} />
            <Route path="animapu/tw-bot-v1" exact component={PageTWBot} />
            <Route path="animapu/tw-bot-v2" exact component={PageTWBotV2} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App