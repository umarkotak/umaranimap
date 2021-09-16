import React from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Navbar() {
  function handleChangeSource(source) {
    if (source === "maid_my") {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "maid_my")
    } else if (source === "mangahub") {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "mangahub")
    } else if (source === "klik_manga") {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "klik_manga")
    } else if (source === "mangadex") {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "mangadex")
      localStorage.setItem("ANIMAPU_MANGADEX_LANG", "en")
    } else if (source === "mangadex_id") {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "mangadex")
      localStorage.setItem("ANIMAPU_MANGADEX_LANG", "id")
    } else {
      localStorage.setItem("ANIMAPU_ACTIVE_MANGA_SOURCE", "mangahub")
    }
    window.location.href = "/"
  }

  function handleLogout() {
    cookies.remove("GO_ANIMAPU_LOGGED_IN")
    cookies.remove("GO_ANIMAPU_USERNAME")
    cookies.remove("GO_ANIMAPU_LOGIN_TOKEN")
    window.location.href = "/"
  }

  function mangaSourceDefaultValueDecider() {
    var mangaSource = localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE")
    var mangadexLang = localStorage.getItem("ANIMAPU_MANGADEX_LANG")

    if (!mangaSource) { return "mangahub" }
    if (mangaSource === "mangadex") {
      if (!mangadexLang) { return "mangadex" }
      if (mangadexLang === "id") { return "mangadex_id" }
      return "mangadex"
    }
    return localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE")
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
    if (cookies.get("GO_ANIMAPU_USERNAME")) {
      return OnLoggedIn()
    } else {
      return OnPublic()
    }
  }

  function OnLoggedIn() {
    return(
      <ul className="navbar-nav ml-auto">
        <MangaSources />
        <li className="nav-item" id="nav-items-3">
          <button className="btn btn-sm btn-danger" onClick={() => handleLogout()}><i className="fa fa-sign-out-alt"></i> logout</button>
        </li>
      </ul>
    )
  }

  function OnPublic() {
    return(
      <ul className="navbar-nav ml-auto">
        <MangaSources />
        <li className="nav-item">
          <Link to="/sign_up" className="btn btn-sm btn-outline-light mr-2"><i className="fa fa-user-plus"></i> Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="btn btn-sm btn-primary text-white"><i className="fa fa-sign-in-alt"></i> Login</Link>
        </li>
      </ul>
    )
  }

  function MangaSources() {
    return(
      <select
        className="form-select float-left mr-2"
        name="selectedMangaTitle"
        onChange={(e) => handleChangeSource(e.target.value)}
        defaultValue={mangaSourceDefaultValueDecider()}
      >
        <option key="mangadex" value="mangadex"> (EN) MangaDex </option>
        <option key="mangahub" value="mangahub"> (EN) MangaHub </option>
        <option key="mangadex_id" value="mangadex_id"> (ID) MangaDex </option>
        <option key="maid_my" value="maid_my"> (ID) Maid My </option>
        <option key="klik_manga" value="klik_manga"> (ID) Klik Manga </option>
      </select>
    )
  }
}

export default Navbar
