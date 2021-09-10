import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Sidebar() {
  const history = useHistory()
  useEffect(() => {
    history.listen(() => {
      setSideBarItems(RefreshSideBarItems())
    })
  }, [history])

  const [sideBarItems, setSideBarItems] = useState(RefreshSideBarItems())

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
    return tempSideBarItems
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
              <Link to="/dashboard" className="d-block">Hello, <b>{activeName}</b> !</Link>
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
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <a target="_blank" href="https://trakteer.id/marumaru" rel="noopener noreferrer" className="nav-link bg-success"><i className="nav-icon fa fa-handshake"></i> <p><b>Support</b></p></a>
        </li>
        <li className="nav-item">
          <Link to="/" className={`nav-link ${sideBarItems["home"] || ""}`}><i className="nav-icon fas fa-home"></i> <p>Home</p></Link>
        </li>

        <li className="nav-header py-2">ANIME</li>
        <li className="nav-item">
          <Link to="/animes/seasons" className={`nav-link ${sideBarItems["animes_seasons"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Seasons</p></Link>
        </li>
        <li className="nav-item">
          <Link to="/animes/animepahe/watch" className={`nav-link ${sideBarItems["animes_animepahe_watch"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Watch</p></Link>
        </li>

        <li className="nav-header py-2">MANGA</li>
        <li className="nav-item">
          <Link to={`/mangas/latest/${localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE") || "mangahub"}`} className={`nav-link ${sideBarItems["mangas_latest"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Latest</p></Link>
        </li>
        <li className="nav-item">
          <Link to={`/mangas/library/${localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE") || "mangahub"}`} className={`nav-link ${sideBarItems["mangas_library"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Library</p></Link>
        </li>
        <li className="nav-item">
          <Link to={`/mangas/search/${localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE") || "mangahub"}`} className={`nav-link ${sideBarItems["mangas_search"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Search</p></Link>
        </li>

        <li className="nav-header py-2">DEV</li>
        <li className="nav-item">
          <Link to="#" className="nav-link"><i className="nav-icon fas fa-circle"></i><p>STATS<i className="right fas fa-angle-left"></i></p></Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/statistics-v1" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Statistics</p></Link>
            </li>
            <li className="nav-item">
              <a href="https://app.panelbear.com/sites/2g1FkT5VVgY/overview" target="_blank" rel="noopener noreferrer" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Traffic</p></a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link to="#" className="nav-link"><i className="nav-icon fas fa-circle"></i><p>EXPERIMENTAL<i className="right fas fa-angle-left"></i></p></Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/tic-tac-toe" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Tic Tac Toe</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/global-clipboard-v1" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Online Clipboard</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/chatto-v1" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Chats</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/socket-game-v1" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>WebSocket Game</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/tw-bot-v2" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Tribal War 2 Bot</p></Link>
            </li>
            <li className="nav-item">
              <Link to="/repack-games-v2" className={`nav-link ${sideBarItems["transactions"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Repack Games</p></Link>
            </li>
          </ul>
        </li>

        <li className="nav-header py-2">ALTERNATIVE SERVER</li>
        <li className="nav-item">
          <a href="http://animapu.herokuapp.com/" className={`nav-link ${sideBarItems["server_heroku"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Heroku</p></a>
        </li>
        <li className="nav-item">
          <a href="https://animapu.netlify.app/" className={`nav-link ${sideBarItems["server_netlify"] || ""}`}><i className="nav-icon far fa-circle text-info"></i> <p>Netlify</p></a>
        </li>

        <li className="nav-header"></li>
        <li className="nav-header"></li>
      </ul>
    )
  }
}

export default Sidebar
