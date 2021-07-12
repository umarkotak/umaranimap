import React from "react"
import {Link} from "react-router-dom"
import CompDailyMangaClick from "./CompDailyMangaClick"
// import CompDailyPageVisits from "./CompDailyPageVisits"

function PageHome() {
  // function set_to_dark_mode() {
  //   console.log("DARK!")
  //   localStorage.setItem("DARK_MODE", "ON")
  //   window.location.reload()
  // }

  // function set_to_light_mode() {
  //   console.log("LIGHT!")
  //   localStorage.setItem("DARK_MODE", "OFF")
  //   window.location.reload()
  // }

  return (
    <div>
      {/* <img src={window.location.origin + '/dashboard.png'} style={{width: "100%"}} /> */}
      <div className="jumbotron p-3 p-md-5 border rounded text-dark" style={{backgroundImage: `url(${window.location.origin + '/dashboard.png'})`, backgroundSize: 'cover'}}>
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic text-primary">ANIMAPU</h1>
          <p className="lead my-3 text-primary">Welcome to animapu! This website is dedicated for learning purpose</p>
          <p className="lead mb-0"><a href="/" className="font-weight-bold text-info">Hello There Have a Good Day!</a></p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <div className="border rounded" style={{backgroundColor: "white"}}>
            Animapu Alternative: <a href="http://47.254.247.135/" target="_blank" rel="noopener noreferrer">http://47.254.247.135</a> / <a href="http://bit.ly/animapu-bk" target="_blank" rel="noopener noreferrer">http://bit.ly/animapu-bk</a> / <a href="https://animapu.netlify.app" target="_blank" rel="noopener noreferrer">https://animapu.netlify.app</a>
          </div>
        </div>

        <div className="col-12 col-sm-4 my-1">
          <div className="card">
            <div className="card-header">
              Menu
            </div>
            <div className="card-body">
              <Link to="/tic-tac-toe" className="btn btn-block btn-primary">Tic Tac Toe</Link>
              <Link to="/global-clipboard-v1" className="btn btn-block btn-primary">Global Clipboard</Link>
              <Link to="/chatto-v1" className="btn btn-block btn-primary">Chatto</Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4 my-1">
          <div className="card">
            <div className="card-header">
              Menu - Anime
            </div>
            <div className="card-body">
              <Link to="/airing-anime-v6" className="btn btn-block btn-primary">Seasonal Animes</Link>
              <Link to="/watch-anime-v2" className="btn btn-block btn-primary">Watch Animes</Link>
              <Link to="#" className="btn btn-block btn-primary">Watch Light Novel Resume</Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4 my-1">
          <div className="card">
            <div className="card-header">
              Menu - Manga
            </div>
            <div className="card-body">
              <Link to="/manga-library-v1" className="btn btn-block btn-primary">Manga Library</Link>
              <Link to="/todays-manga-v1" className="btn btn-block btn-primary">Latest Manga</Link>
              <Link to="/search-manga-v1" className="btn btn-block btn-primary">Search Manga</Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4 my-1">
          <div className="card">
            <div className="card-header">
              Settings
            </div>
            <div className="card-body">
              {/* <div className="row">
                <div className="col-6">
                  <button className="btn btn-primary btn-block" onClick={() => set_to_dark_mode()}>Dark</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-primary btn-block" onClick={() => set_to_light_mode()}>Light</button>
                </div>
              </div> */}
              <Link to="/statistics-v1" className="btn btn-block btn-primary">Statistics</Link>
              <a href="https://app.panelbear.com/sites/2g1FkT5VVgY/overview" target="_blank" className="btn btn-block btn-primary" rel="noopener noreferrer">Panel Bear</a>
              <div className='onesignal-customlink-container'></div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4 my-1">
          <div className="card">
            <div className="card-header">
              Support Creator!
            </div>
            <div className="card-body">
              For supporting this website to always be updated, you can support with this link
              <hr />
              <a target="_blank" href="https://trakteer.id/marumaru" className="btn btn-block btn-success" rel="noopener noreferrer">Support!</a>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4 my-1">
          <div className="card">
            <div className="card-header">
              Dev
            </div>
            <div className="card-body">
              <Link to="/socket-game-v1" className="btn btn-block btn-primary">Socket Game</Link>
              {/* <Link to="/tw-bot-v1" className="btn btn-block btn-primary">Tribal War Bot</Link> */}
              <Link to="/tw-bot-v2" className="btn btn-block btn-primary">Tribal War Bot</Link>
              <Link to="/repack-games-v2" className="btn btn-block btn-primary">Repack Games</Link>
            </div>
          </div>
        </div>

        <div className="col-12 my-1">
          <div className="card">
            <div className="card-header">
              Daily Manga Clicks
            </div>
            <div className="card-body">
              <CompDailyMangaClick />
            </div>
          </div>
        </div>

        {/* <div className="col-12 my-1">
          <div className="card">
            <div className="card-header">
              Daily Page Visits
            </div>
            <div className="card-body">
              <CompDailyPageVisits />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default PageHome