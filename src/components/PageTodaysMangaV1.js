// https://reactjs.org/docs/hooks-effect.html
// https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately

import React, {useState, useEffect} from "react"
import Cookies from 'universal-cookie'
import {Link} from "react-router-dom"

function PageTodaysMangaV1() {
  const cookies = new Cookies()
  const [fetch_todays_manga_state, set_fetch_todays_manga_state] = useState("finding")
  const [todays_manga_db, set_todays_manga_db] = useState(new Map())
  const [todays_manga_titles, set_todays_manga_titles] = useState([])

  function generateThumbnailFromTitle(title) {
    try {
      if (todays_manga_db.get(title).image_url !== "") {
        return todays_manga_db.get(title).image_url
      } else {
        return `https://thumb.mghubcdn.com/mn/${title}.jpg`
      }
    } catch {
      return `https://thumb.mghubcdn.com/mn/${title}.jpg`
    }
  }

  function generate_manga_airing_status(manga_title) {
    try {
      return (todays_manga_db.get(manga_title).status === "ongoing") ? "border-primary" : "border-success"
    } catch (error) {
      return "border-primary"
    }
  }

  useEffect(() => {
    async function fetchTodayMangaData() {
      var api = "http://go-animapu.herokuapp.com/mangas/todays_v1"
      const response = await fetch(api)
      const results = await response.json()
      var converted_manga_db = new Map(Object.entries(results.manga_db))
      set_todays_manga_db(converted_manga_db)
      // console.log(converted_manga_db)

      var new_mangas = []
      converted_manga_db.forEach((num, key) => {
        new_mangas.push({title: key, order: num.new_added, weight: num.weight})
      })
      new_mangas.sort((a, b) => b.weight - a.weight)

      set_todays_manga_titles(new_mangas.map(val => val.title))
      set_fetch_todays_manga_state("finished")
    }
    fetchTodayMangaData()
  }, []);

  async function putToMyLibrary(manga_title, manga_last_chapter) {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    try {
      const response = await fetch('http://go-animapu.herokuapp.com/users/add_manga_library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        },
        body: JSON.stringify({
          manga_title: manga_title,
          manga_last_chapter: manga_last_chapter,
          image_url: ''
        })
      })
      const results = await response.json()
      const status = await response.status

      if (status === 200) {
        alert("manga successfully added to library!")
      } else {
        alert(results.message);
      }

      console.log("PUT MANGA TO MY LIBRARY", status, results)

    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <hr/>
      <div className="row">
        <div className="col-12">
          <Link to="/manga-library-v1" className="btn btn-outline-success btn-sm float-right"><span role="img" aria-label="library">📘</span> Library</Link>
          <Link to="/search-manga-v1" className="btn btn-outline-success btn-sm float-right mx-3"><span role="img" aria-label="search">🔍</span> Search</Link>
        </div>
        <div className="col-12">
          <h4>Today's Manga</h4>
          <hr/>
        </div>
        <RenderTodaysMangaSection />
      </div>
    </div>
  )

  function RenderTodaysMangaSection() {
    if (fetch_todays_manga_state === "finished") {
      return(
        <div className="col-12">
          <div className="row">
            {todays_manga_titles.map(value => (
              <div className="col-4 col-md-2" key={value}>
                <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(value)}`}>
                  <div style={{height: "170px", backgroundSize: 'cover', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(value)})`}}>
                    <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                      <small>{`( ${todays_manga_db.get(value).manga_last_chapter} / ${todays_manga_db.get(value).manga_last_chapter} )`}</small>
                      <button
                        className="btn btn-xs btn-outline-danger float-right"
                        style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
                        onClick={(e) => putToMyLibrary(value, todays_manga_db.get(value).manga_last_chapter)}
                      >
                        ♥︎
                      </button>
                    </div>
                    <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                      <small>{value}</small>
                    </div>
                  </div>
                  {/* <Link to={`/read-manga-v8?title=${value}&chapter=1&custom_last_chapter=${todays_manga_db.get(value).manga_last_chapter}`} className="btn btn-sm btn-outline-secondary">First Ch</Link>
                  <Link to={`/read-manga-v8?title=${value}&chapter=${todays_manga_db.get(value).manga_last_chapter}&custom_last_chapter=${todays_manga_db.get(value).manga_last_chapter}`} className="btn btn-sm btn-outline-secondary">Latest Ch</Link> */}
                  <Link className="btn btn-block btn-sm btn-outline-secondary" to={`/read-manga-only-v1/${value}/1?last_chapter=${todays_manga_db.get(value).manga_last_chapter}&chapter_size=75`}>First Ch</Link>
                  <Link className="btn btn-block btn-sm btn-outline-secondary" to={`/read-manga-only-v1/${value}/${todays_manga_db.get(value).manga_last_chapter}?last_chapter=${todays_manga_db.get(value).manga_last_chapter}&chapter_size=75`}>Latest Ch</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return(<RenderLoadingBar />)
  }

  function RenderLoadingBar() {
    return(
      <div className="col-12">
        <br/>
        <div
          className="progress progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{width: "100%"}}></div>
        <br/>
      </div>
    )
  }
}

export default PageTodaysMangaV1
