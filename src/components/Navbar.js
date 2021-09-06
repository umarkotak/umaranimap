import React, {useState} from "react"
import {Link} from "react-router-dom"

function Navbar() {
  const [manga_source, set_manga_source] = useState(localStorage.getItem("MANGA_SOURCE"))

  function handleChangeSource(source) {
    if (source === "maid_my") {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "maid_my")
      set_manga_source("maid_my")
    } else {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "mangahub")
      set_manga_source("mangahub")
    }
    window.location.reload()
  }

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
        <select className="form-select float-left mr-2" name="selectedMangaTitle" onChange={(e) => handleChangeSource(e.target.value)} defaultValue={localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE")}>
          <option key="mangahub" value="mangahub"> mangahub (ENG) </option>
          <option key="maid_my" value="maid_my"> maid_my (INDO) </option>
        </select>
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
