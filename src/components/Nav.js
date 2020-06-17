import React from "react"
import {Link} from "react-router-dom"

function Nav() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <h5 className="my-0 mr-md-auto font-weight-normal">UMARANIMAP</h5>
        <Link to="/" className="p-2 badge badge-primary">Home</Link>
        <Link to="/tic-tac-toe" className="p-2 m-1 badge badge-primary">Tic Tac Toe</Link>
        <Link to="/learn-react" className="p-2 m-1 badge badge-primary">Learn React</Link>
        <Link to="/top-animes" className="p-2 m-1 badge badge-primary">Top Animes</Link>
        <Link to="/anime-watcher" className="p-2 m-1 badge badge-primary">Anime Watcher</Link>
        <Link to="/anime-watcher-v2" className="p-2 m-1 badge badge-primary">Anime Watcher V2</Link>
      </nav>
    </div>
  )
}

export default Nav