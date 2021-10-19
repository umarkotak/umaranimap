import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import Cookies from 'universal-cookie'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

const cookies = new Cookies()

function Sidebar() {
  const history = useHistory()
  useEffect(() => {
    history.listen(() => {
      setSideBarItems(RefreshSideBarItems())
      setTreeSideBarItems(RefreshSideBarItems())
    })
  }, [history])

  const [sideBarItems, setSideBarItems] = useState(RefreshSideBarItems())
  const [treeSideBarItems, setTreeSideBarItems] = useState(RefreshSideBarItems())

  var activeName = cookies.get("GO_ANIMAPU_USERNAME") || "Guest"

  function RefreshSideBarItems() {
    let tempSideBarItems = {}

    if (window.location.href.includes("heroku")) { tempSideBarItems.server_heroku = "active" }
    else if (window.location.href.includes("netlify")) { tempSideBarItems.server_netlify = "active" }

    if (window.location.pathname === "/") { tempSideBarItems.home = "active" }

    if (window.location.pathname === "/home") { tempSideBarItems.home = "active" }
    else if (window.location.pathname.startsWith("/animes/seasons")) { tempSideBarItems.animes_seasons = "active" }
    else if (window.location.pathname.startsWith("/animes/animepahe/watch")) { tempSideBarItems.animes_animepahe_watch = "active" }
    else if (window.location.pathname.startsWith("/mangas/latest")) { tempSideBarItems.mangas_latest = "active" }
    else if (window.location.pathname.startsWith("/mangas/library")) { tempSideBarItems.mangas_library = "active" }
    else if (window.location.pathname.startsWith("/mangas/search")) { tempSideBarItems.mangas_search = "active" }
    else if (window.location.pathname.startsWith("/original_sources")) { tempSideBarItems.original_sources = "active" }
    else if (window.location.pathname.startsWith("/stats/manga_hit_counts")) { tempSideBarItems.stats_manga_hit_counts = "active" }
    else if (window.location.pathname.startsWith("/experiments/tic-tac-toe")) { tempSideBarItems.experiments_tic_tac_toe = "active" }
    else if (window.location.pathname.startsWith("/experiments/global-clipboard-v1")) { tempSideBarItems.experiments_global_clipboard = "active" }
    else if (window.location.pathname.startsWith("/experiments/chatto-v1")) { tempSideBarItems.experiments_chatto = "active" }
    else if (window.location.pathname.startsWith("/experiments/socket-game-v1")) { tempSideBarItems.experiments_socket_game = "active" }
    else if (window.location.pathname.startsWith("/experiments/tw-bot-v2")) { tempSideBarItems.experiments_tw_bot_v2 = "active" }
    else if (window.location.pathname.startsWith("/experiments/repack-games-v2")) { tempSideBarItems.experiments_repack_games = "active" }
    else if (window.location.pathname.startsWith("/experiments/playground")) { tempSideBarItems.experiments_playground = "active" }

    if (window.location.pathname.startsWith("/stats")) { tempSideBarItems.tree_stats = "menu-open" }
    if (window.location.pathname.startsWith("/experiments")) { tempSideBarItems.tree_experiments = "menu-open" }

    return tempSideBarItems
  }

  function handleGoogleCallback(response) {
    console.log("GOOGLE LOGIN", response)
  }

  function handleGoogleLogoutCallback(response) {
    console.log("GOOGLE LOGOUT", response)
  }

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <img src="/logo192.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: ".8"}} />
          <span className="brand-text font-weight-light"><b>ANIMAPU</b></span>
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/default_avatar.png" className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info">
              <Link to="/home" className="d-block">Hello, <b>{activeName}</b> !</Link>
            </div>
          </div>

          <nav className="mt-2">
            <SideBarItems />
          </nav>
        </div>
      </aside>
    </div>
  )

  function SideBarItems() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN")) {
      return OnLoggedIn()
    } else {
      return OnPublic()
    }
  }

  function OnLoggedIn() {
    return(OnPublic())
  }

  function OnPublic() {
    return(
      <ul className="nav nav-pills nav-sidebar flex-column nav-compact" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <a target="_blank" href="https://trakteer.id/marumaru" rel="noopener noreferrer" className="nav-link bg-success py-1"><i className="nav-icon fa fa-handshake"></i> <p><b>Support</b></p></a>
        </li>
        <li className="nav-item">
          <Link to="/" className={`nav-link ${sideBarItems["home"] || ""}`}><i className="nav-icon fas fa-home"></i> <p>Home</p></Link>
        </li>

        <li className="nav-header py-2">ANIME</li>
        <li className="nav-item">
          <Link to="/animes/seasons" className={`nav-link ${sideBarItems["animes_seasons"] || ""}`}><i className="nav-icon fa fa-apple-alt"></i> <p>Seasons</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/animes/animepahe/watch" className={`nav-link ${sideBarItems["animes_animepahe_watch"] || ""}`}><i className="nav-icon fa fa-video"></i> <p>Watch</p></Link>
        </li>

        <li className="nav-header py-2">MANGA</li>
        <li className="nav-item">
          <Link to={`/mangas/latest/${localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE") || "mangahub"}`} className={`nav-link ${sideBarItems["mangas_latest"] || ""}`}><i className="nav-icon fa fa-rss"></i> <p>Latest</p></Link>
        </li>
        <li className="nav-item">
          <Link to={`/mangas/library/${localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE") || "mangahub"}`} className={`nav-link ${sideBarItems["mangas_library"] || ""}`}><i className="nav-icon fa fa-book"></i> <p>Library</p></Link>
        </li>
        <li className="nav-item">
          <Link to={`/mangas/search/${localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE") || "mangahub"}`} className={`nav-link ${sideBarItems["mangas_search"] || ""}`}><i className="nav-icon fa fa-search"></i> <p>Search</p></Link>
        </li>

        <li className="nav-header py-2">DEV</li>

        <li className={`nav-item ${treeSideBarItems["tree_stats"] || ""}`}>
          <Link to="#" className="nav-link"><i className="nav-icon fa fa-chart-bar"></i><p>STATS<i className="right fas fa-angle-left"></i></p></Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/stats/manga_hit_counts" className={`nav-link ${sideBarItems["stats_manga_hit_counts"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Statistics</p></Link>
            </li>
            <li className="nav-item">
              <a href="https://app.panelbear.com/sites/2g1FkT5VVgY/overview" target="_blank" rel="noopener noreferrer" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Traffic</p></a>
            </li>
          </ul>
        </li>

        <li className={`nav-item ${treeSideBarItems["tree_experiments"] || ""}`}>
          <Link to="#" className="nav-link"><i className="nav-icon fa fa-flask"></i><p>EXPERIMENTAL<i className="right fas fa-angle-left"></i></p></Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/experiments/tic-tac-toe" className={`nav-link ${sideBarItems["experiments_tic_tac_toe"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Tic Tac Toe</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/experiments/global-clipboard-v1" className={`nav-link ${sideBarItems["experiments_global_clipboard"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Online Clipboard</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/experiments/chatto-v1" className={`nav-link ${sideBarItems["experiments_chatto"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Chats</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/experiments/socket-game-v1" className={`nav-link ${sideBarItems["experiments_socket_game"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>WebSocket Game</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/experiments/tw-bot-v2" className={`nav-link ${sideBarItems["experiments_tw_bot_v2"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Tribal War 2 Bot</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/experiments/repack-games-v2" className={`nav-link ${sideBarItems["experiments_repack_games"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Repack Games</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/experiments/playground" className={`nav-link ${sideBarItems["experiments_playground"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Playground</p></Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="/original_sources" className={`nav-link ${sideBarItems["original_sources"] || ""}`}><i className="nav-icon fa fa-folder"></i> <p>Original Sources</p></a>
        </li>

        <li className="nav-header py-2">ALTERNATIVE SERVER</li>
        <li className="nav-item">
          <a href="http://animapu.herokuapp.com/" className={`nav-link ${sideBarItems["server_heroku"] || ""}`}><i className="nav-icon fa fa-server"></i> <p>Heroku</p></a>
        </li>
        <li className="nav-item">
          <a href="https://animapu.netlify.app/" className={`nav-link ${sideBarItems["server_netlify"] || ""}`}><i className="nav-icon fa fa-server"></i> <p>Netlify</p></a>
        </li>
        <li className="nav-item">
          <GoogleLogin
            clientId="334886517586-djci4jil803sqjk042f6nne3016bngni.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleGoogleCallback}
            onFailure={handleGoogleCallback}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <a href="." className="nav-link" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <i className="nav-icon fab fa-google text-primary"></i> Login With Google
              </a>
            )}
          />
        </li>
        <li className="nav-item">
          <GoogleLogout
            clientId="334886517586-djci4jil803sqjk042f6nne3016bngni.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleGoogleLogoutCallback}
            onFailure={handleGoogleLogoutCallback}
            render={renderProps => (
              <a href="." className="nav-link" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <i className="nav-icon fab fa-google text-danger"></i> Logout From Google
              </a>
            )}
          >
          </GoogleLogout>
        </li>
        <li className="nav-header"></li>
        <li className="nav-header"></li>
      </ul>
    )
  }
}

export default Sidebar
