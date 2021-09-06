import React from "react"
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="#" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></Link>
          </li>
        </ul>

        <NavItems />
      </nav>
    </div>
  )

  function NavItems() {
    if (false) {
      return OnLoggedIn()
    } else {
      return OnPublic()
    }
  }

  function OnLoggedIn() {
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" id="nav-items-3">
          <button className="btn btn-sm btn-danger" onClick={() => console.log("logout")}><i className="fa fa-sign-out-alt"></i> logout</button>
        </li>
      </ul>
    )
  }

  function OnPublic() {
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a target="_blank" href="https://trakteer.id/marumaru" rel="noopener noreferrer" className="btn btn-sm btn-outline-success mr-2"><i className="fa fa-handshake"></i> Support</a>
        </li>
        <li className="nav-item">
          <Link to="/sign_up" className="btn btn-sm btn-outline-light mr-2"><i className="fa fa-user-plus"></i> Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="btn btn-sm btn-primary text-white"><i className="fa fa-sign-in-alt"></i> Login</Link>
        </li>
      </ul>
    )
  }
}

export default Navbar
