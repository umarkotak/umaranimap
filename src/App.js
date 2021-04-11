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
import PageAiringAnimeV6 from "./components/PageAiringAnimeV6"
// import PageReadMangaV1 from "./components/PageReadMangaV1"
// import PageReadMangaV2 from "./components/PageReadMangaV2"
// import PageReadMangaV3 from "./components/PageReadMangaV3"
// import PageReadMangaV4 from "./components/PageReadMangaV4"
// import PageReadMangaV5 from "./components/PageReadMangaV5"
// import PageReadMangaV6 from "./components/PageReadMangaV6"
// import PageReadMangaV7 from "./components/PageReadMangaV7"
// import PageReadMangaV8 from "./components/PageReadMangaV8"
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
// import PageTWBot from "./components/PageTWBot"
import PageTWBotV2 from "./components/PageTWBotV2"

function App() {
  return (
    <Router>
      <div style={{backgroundColor: "#b3e7ff"}}>
        <div className="App container border border-secondary shadow-lg" style={{backgroundColor: "#ffffff"}}>
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
            {/* <Route path="/airing-anime-v1" exact component={PageAiringAnimeV1} />
            <Route path="/airing-anime-v2" exact component={PageAiringAnimeV2} />
            <Route path="/airing-anime-v3" exact component={PageAiringAnimeV3} />
            <Route path="/airing-anime-v4" exact component={PageAiringAnimeV4} /> */}
            <Route path="/airing-anime-v5" exact component={PageAiringAnimeV5} />
            <Route path="/airing-anime-v6" exact component={PageAiringAnimeV6} />
            {/* <Route path="/read-manga-v1" exact component={PageReadMangaV1} />
            <Route path="/read-manga-v2" exact component={PageReadMangaV2} />
            <Route path="/read-manga-v3" exact component={PageReadMangaV3} />
            <Route path="/read-manga-v4" exact component={PageReadMangaV4} />
            <Route path="/read-manga-v5" exact component={PageReadMangaV5} />
            <Route path="/read-manga-v6" exact component={PageReadMangaV6} />
            <Route path="/read-manga-v7" exact component={PageReadMangaV7} />
            <Route path="/read-manga-v8" exact component={PageReadMangaV8} /> */}
            <Route path="/watch-anime-v1" exact component={PageWatchAnimeV1} />
            <Route path="/watch-anime-v2" exact component={PageWatchAnimeV2} />
            <Route path="/search-manga-v1" exact component={PageSearchMangaV1} />
            <Route path="/todays-manga-v1" exact component={PageTodaysMangaV1} />
            <Route path="/manga-library-v1" exact component={PageMangaLibraryV1} />
            {/* <Route path="/read-manga-only-v1" exact component={PageReadMangaOnlyV1} /> */}
            <Route path="/read-manga-only-v1/:path_title/:path_chapter" exact component={PageReadMangaOnlyV1} />
            <Route path="/manga-detail-v1/:manga_title" exact component={PageMangaDetailV1} />

            <Route path="/socket-game-v1" exact component={PageSocketGameV1} />
            {/* <Route path="/tw-bot-v1" exact component={PageTWBot} /> */}
            <Route path="/tw-bot-v2" exact component={PageTWBotV2} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App