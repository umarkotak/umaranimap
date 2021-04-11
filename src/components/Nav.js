import React, {useState} from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'
import configDB from "./ConfigDB"

const cookies = new Cookies()

function Nav() {
  const [logged_in, set_logged_in] = useState(cookies.get("GO_ANIMAPU_LOGGED_IN"))
  const [username, set_username] = useState(cookies.get("GO_ANIMAPU_USERNAME"))

  function set_to_dark_mode() {
    console.log("DARK!")
    localStorage.setItem("DARK_MODE", "ON")
    window.location.reload()
  }

  function set_to_light_mode() {
    console.log("LIGHT!")
    localStorage.setItem("DARK_MODE", "OFF")
    window.location.reload()
  }

  return (
    <div>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <Link to="/" style={{color:configDB.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>ANIMAPU</Link>
          </div>
          {/* <div className="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark">ANIMAPU</Link>
          </div> */}
          <div className="col-8 d-flex justify-content-end align-items-center">
            <ToggleDarkMode />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link to="/" className="p-2 m-1" style={{color:configDB.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>Main Menu</Link>
          {/* <Link to="/tic-tac-toe" className="p-2 m-1">Tic Tac Toe</Link>
          <Link to="/learn-react" className="p-2 m-1">Learn React</Link>
          <Link to="/airing-anime-v1" className="p-2 m-1">Airing Anime V1</Link>
          <Link to="/airing-anime-v2" className="p-2 m-1">Airing Anime V2</Link>
          <Link to="/airing-anime-v3" className="p-2 m-1">Airing Anime V3</Link>
          <Link to="/airing-anime-v4" className="p-2 m-1">Airing Anime V4</Link>
          <Link to="/airing-anime-v5" className="p-2 m-1">Airing Anime V5</Link> */}
          <Link to="/airing-anime-v6" className="p-2 m-1" style={{color:configDB.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>Animes</Link>
          {/* <Link to="/read-manga-v1" className="p-2 m-1">Read Manga</Link>
          <Link to="/read-manga-v2" className="p-2 m-1">Read Manga</Link>
          <Link to="/read-manga-v3" className="p-2 m-1">Read Manga</Link>
          <Link to="/read-manga-v4" className="p-2 m-1">Read Manga</Link>
          <Link to="/read-manga-v5" className="p-2 m-1">Read Manga</Link>
          <Link to="/read-manga-v6" className="p-2 m-1">Read Manga</Link> */}
          {/* <Link to="/read-manga-v7" className="p-2 m-1">Read Manga</Link> */}
          {/* <Link to="/read-manga-v8" className="p-2 m-1">Mangas</Link> */}
          <Link to="/manga-library-v1" className="p-2 m-1" style={{color:configDB.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>Mangas</Link>
          {/* <Link to="/search-manga-v1" className="p-2 m-1">Search Manga</Link> */}
          {/* <Link to="/watch-anime-v1" className="p-2 m-1">Watch Anime</Link> */}
        </nav>
      </div>
    </div>
  )

  function UserNav() {
    if (logged_in === "true") {
      return(
        <div>
          <Link to="#" className={`btn btn-sm ${configDB.GetActiveTemplate("btn-secondary", "btn-outline-secondary")} mx-2`}>
            Hello {username}
          </Link>
          <Link to="#" className="btn btn-sm btn-danger mx-2" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      )
    } else {
      return(
        <div>
          <Link to="/login" className={`btn btn-sm ${configDB.GetActiveTemplate("btn-primary", "btn-outline-secondary")} mx-2`}>
            Login
          </Link>
        </div>
      )
    }
  }

  function ToggleDarkMode() {
    if (configDB.GetActiveTemplate("ON", "OFF") === "ON") {
      return(
        <div>
          <button className="btn btn-sm btn-secondary" onClick={() => set_to_light_mode()}>Light</button>
        </div>
      )
    }
    return(
      <div>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => set_to_dark_mode()}>Dark</button>
      </div>
    )
  }

  function handleLogout() {
    alert("are you sure?")
    cookies.remove("GO_ANIMAPU_LOGGED_IN")
    cookies.remove("GO_ANIMAPU_USERNAME")
    cookies.remove("GO_ANIMAPU_LOGIN_TOKEN")
    set_logged_in("false")
    set_username("")
    window.location.reload(false)
  }
}

export default Nav
