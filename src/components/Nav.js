import React from "react"
import {Link} from "react-router-dom"

function Nav() {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal">UMARANIMAP</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link to="/" className="p-2 text-dark">Home</Link>
        <Link to="/tic-tac-toe" className="p-2 text-dark">Tic Tac Toe</Link>
        <Link to="/learn-react" className="p-2 text-dark">Learn React</Link>
        <Link to="/top-animes" className="p-2 text-dark">Top Animes</Link>
      </nav>
    </div>
  )
}

export default Nav