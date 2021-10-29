import React from "react"
import {Link} from "react-router-dom"

function PagePlayground() {
  var version = 2.7

  return (
    <div>
      <div className="content-wrapper pt-2 px-2" style={{backgroundColor: "#454d55"}}>
        <h2 className="text-white">Playground</h2>
        <div className="row">
          <div className="col-3">
            <Link to="/?panelbear_disable" className="btn btn-block btn-primary">Disable Panel Bear</Link>
          </div>
        </div>
      </div>

      <footer className="main-footer bg-dark">
        <div className="float-right">
          <span className="badge badge-pill badge-primary mr-2">ANIMAPU 2021</span>
          <span className="badge badge-pill badge-primary">Version: {version}</span>
        </div>
      </footer>
    </div>
  )

}

export default PagePlayground