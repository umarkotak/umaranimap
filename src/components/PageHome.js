import React from "react"
import {Link} from "react-router-dom"

function PageHome() {
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
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              Other Pages
            </div>
            <div className="card-body">
              <Link to="/tic-tac-toe" className="btn btn-block btn-primary">Tic Tac Toe</Link>
              <Link to="/watch-anime-v1" className="btn btn-block btn-primary">Watch Anime</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHome