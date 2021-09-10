import React from "react"

function PageHome() {
  return (
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="position-relative">
          <img src="/dashboard.png" alt="welcome" className="img-fluid" style={{width: "100%"}} />
          <div className="ribbon-wrapper ribbon-lg">
            <div className="ribbon bg-success text-lg">
              ANIMAPU
            </div>
          </div>
        </div>

        <div className="text-white">
          <h1>Welcome To Animapu</h1>
          <small>This site is dedicated for learning purpose, please enjoy and give us your feedback!</small>
        </div>
      </div>

      <footer className="main-footer bg-dark">
        <div className="float-right">
          ANIMAPU 2021 | Version: 2.1
        </div>
      </footer>
    </div>
  )
}

export default PageHome