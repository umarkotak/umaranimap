import React, {useState} from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'
import dataStoreCommon from "./DataStoreCommon"

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
            <Link to="/" style={{color:dataStoreCommon.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>ANIMAPU</Link>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <ToggleDarkMode />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link to="/" className="p-2 m-1" style={{color:dataStoreCommon.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>Main Menu</Link>
          <Link to="/airing-anime-v6" className="p-2 m-1" style={{color:dataStoreCommon.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>Animes</Link>
          <Link to="/manga-library-v1" className="p-2 m-1" style={{color:dataStoreCommon.GetActiveTemplate("#bbe1fa", "#0f4c75")}}>Mangas</Link>
        </nav>
      </div>
    </div>
  )

  function UserNav() {
    if (logged_in === "true") {
      return(
        <div>
          <Link to="#" className={`btn btn-sm ${dataStoreCommon.GetActiveTemplate("btn-secondary", "btn-outline-secondary")} mx-2`}>
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
          <Link to="/login" className={`btn btn-sm ${dataStoreCommon.GetActiveTemplate("btn-primary", "btn-outline-secondary")} mx-2`}>
            Login
          </Link>
        </div>
      )
    }
  }

  function ToggleDarkMode() {
    if (dataStoreCommon.GetActiveTemplate("ON", "OFF") === "ON") {
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
