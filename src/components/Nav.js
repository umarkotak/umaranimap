import React from "react"
import {Link} from "react-router-dom"

function Nav() {
  return (
    <div>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <Link to="/" className="text-muted">UMARANIMAP</Link>
          </div>
          {/* <div className="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark">UMARANIMAP</Link>
          </div> */}
          <div className="col-4 d-flex justify-content-end align-items-center">
            <Link to="/" className="btn btn-sm btn-outline-secondary">Hello World!</Link>
          </div>
        </div>
      </header>
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link to="/" className="p-2 m-1 text-muted">Home</Link>
          <Link to="/tic-tac-toe" className="p-2 m-1 text-muted">Tic Tac Toe</Link>
          <Link to="/learn-react" className="p-2 m-1 text-muted">Learn React</Link>
          {/* <Link to="/airing-anime-v1" className="p-2 m-1 text-muted">Airing Anime V1</Link>
          <Link to="/airing-anime-v2" className="p-2 m-1 text-muted">Airing Anime V2</Link>
          <Link to="/airing-anime-v3" className="p-2 m-1 text-muted">Airing Anime V3</Link>
          <Link to="/airing-anime-v4" className="p-2 m-1 text-muted">Airing Anime V4</Link>
          <Link to="/airing-anime-v5" className="p-2 m-1 text-muted">Airing Anime V5</Link> */}
          <Link to="/airing-anime-v5" className="p-2 m-1 text-muted">Seasonal Animes</Link>
        </nav>
      </div>
    </div>
  )
}

export default Nav
