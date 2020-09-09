import React, {useState} from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Nav() {
  const [logged_in, set_logged_in] = useState(cookies.get("GO_ANIMAPU_LOGGED_IN"));
  const [username, set_username] = useState(cookies.get("GO_ANIMAPU_USERNAME"));

  return (
    <div>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <Link to="/" className="text-muted">ANIMAPU</Link>
          </div>
          {/* <div className="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark">ANIMAPU</Link>
          </div> */}
          <div className="col-8 d-flex justify-content-end align-items-center">
            <UserNav />

          </div>
        </div>
      </header>
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link to="/" className="p-2 m-1 text-muted">Home</Link>
          {/* <Link to="/tic-tac-toe" className="p-2 m-1 text-muted">Tic Tac Toe</Link>
          <Link to="/learn-react" className="p-2 m-1 text-muted">Learn React</Link>
          <Link to="/airing-anime-v1" className="p-2 m-1 text-muted">Airing Anime V1</Link>
          <Link to="/airing-anime-v2" className="p-2 m-1 text-muted">Airing Anime V2</Link>
          <Link to="/airing-anime-v3" className="p-2 m-1 text-muted">Airing Anime V3</Link>
          <Link to="/airing-anime-v4" className="p-2 m-1 text-muted">Airing Anime V4</Link>
          <Link to="/airing-anime-v5" className="p-2 m-1 text-muted">Airing Anime V5</Link> */}
          <Link to="/airing-anime-v5" className="p-2 m-1 text-muted">Seasonal Anime</Link>
          {/* <Link to="/read-manga-v1" className="p-2 m-1 text-muted">Read Manga</Link>
          <Link to="/read-manga-v2" className="p-2 m-1 text-muted">Read Manga</Link>
          <Link to="/read-manga-v3" className="p-2 m-1 text-muted">Read Manga</Link>
          <Link to="/read-manga-v4" className="p-2 m-1 text-muted">Read Manga</Link> */}
          <Link to="/read-manga-v5" className="p-2 m-1 text-muted">Read Manga</Link>
          {/* <Link to="/watch-anime-v1" className="p-2 m-1 text-muted">Watch Anime</Link> */}
        </nav>
      </div>
    </div>
  )

  function UserNav() {
    if (logged_in == "true") {
      return(
        <div>
          <Link to="#" className="btn btn-sm btn-outline-secondary mx-2">
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
          <Link to="/login" className="btn btn-sm btn-outline-secondary mx-2">
            Login
          </Link>
        </div>
      )
    }
  }

  function handleLogout() {
    alert("are you sure?")
    cookies.remove("GO_ANIMAPU_LOGGED_IN")
    cookies.remove("GO_ANIMAPU_USERNAME")
    cookies.remove("GO_ANIMAPU_LOGIN_TOKEN")
    set_logged_in("false")
  }
}

export default Nav
