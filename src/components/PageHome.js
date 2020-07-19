import React from "react"

function PageHome() {
  return (
    <div>
      <div className="carousel-item active">
        <img className="first-slide" src={process.env.PUBLIC_URL + '/wallpaper.jpg'} alt="First slide"
          style={{width: "100%"}}
        />
      </div>
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic text-dark">ANIMAPU</h1>
          <p className="lead my-3 text-dark font-weight-bold">Welcome to animapu! This website is dedicated for learning purpose</p>
          <p className="lead mb-0"><a href="/" class="text-dark font-weight-bold">Hello There Have a Good Day!</a></p>
        </div>
      </div>
    </div>
  )
}

export default PageHome