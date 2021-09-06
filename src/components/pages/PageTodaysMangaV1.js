// https://reactjs.org/docs/hooks-effect.html
// https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately

import React, {useState, useEffect, useRef} from "react"
import Cookies from 'universal-cookie'
import {Link} from "react-router-dom"

import dataStoreCommon from "../utils/DataStoreCommon"
import helper from "../utils/Helper"

function PageTodaysMangaV1() {
  const cookies = new Cookies()
  const [fetch_todays_manga_state, set_fetch_todays_manga_state] = useState("finding")
  const [todays_manga_db, set_todays_manga_db] = useState(new Map())
  const [todays_manga_titles, set_todays_manga_titles] = useState([])
  const manga_source = localStorage.getItem("ANIMAPU_ACTIVE_MANGA_SOURCE")

  function generateThumbnailFromTitle(title) {
    try {
      if (todays_manga_db.get(title).image_url !== "") {
        return todays_manga_db.get(title).image_url
      } else {
        return dataStoreCommon.ConstructURI("MANGAHUB_CDN_HOST", `/mn/${title}.jpg`)
      }
    } catch {
      return dataStoreCommon.ConstructURI("MANGAHUB_CDN_HOST", `/mn/${title}.jpg`)
    }
  }

  function generate_manga_airing_status(manga_title) {
    try {
      return (todays_manga_db.get(manga_title).status === "ongoing") ? "border-primary" : "border-success"
    } catch (error) {
      return "border-primary"
    }
  }

  async function fetchTodayMangaData() {
    var api
    if (manga_source === "maid_my") {
      api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/mangas/maid_my/home")
    } else {
      api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/mangas/todays_v1")
    }

    const response = await fetch(api)
    const results = await response.json()
    var converted_manga_db = new Map(Object.entries(results.manga_db))
    console.log("INCOMING DATA", converted_manga_db)
    set_todays_manga_db(converted_manga_db)

    var new_mangas = []
    converted_manga_db.forEach((num, key) => {
      new_mangas.push({title: key, order: num.new_added, weight: num.weight})
    })
    new_mangas.sort((a, b) => b.weight - a.weight)

    set_todays_manga_titles(new_mangas.map(val => val.title))
    set_fetch_todays_manga_state("finished")
  }

  useEffect(() => {
    fetchTodayMangaData()
  // eslint-disable-next-line
  }, []);

  async function putToMyLibrary(manga_title, manga_last_chapter) {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    try {
      var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/users/add_manga_library")
      const response = await fetch(api, {
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
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <RenderTodaysMangaSection />
        </div>
      </div>
      <footer className="main-footer bg-dark">
        ...
      </footer>
    </div>
  )

  function RenderTodaysMangaSection() {
    if (fetch_todays_manga_state === "finished") {
      return(
        <div className="row">
          {todays_manga_titles && todays_manga_titles.slice(0, 240).map(((value, index) => (
            <div className="col-4 col-md-2 mb-4" key={index+value}>
              <div className="rounded">
                <div style={{height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"), backgroundSize: 'cover', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(value)})`}}>
                  <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{`${todays_manga_db.get(value).manga_last_chapter} / ${todays_manga_db.get(value).manga_last_chapter}`}</small>
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
                <table style={{width: "100%"}}>
                  <thead>
                    <tr>
                      <th width="10%">
                        <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangahub/${value}`}>ℹ</Link>
                      </th>
                      <th width="35%">
                        <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${value}/1?last_chapter=${todays_manga_db.get(value).manga_last_chapter}&chapter_size=75`}>1</Link>
                      </th>
                      <th width="55%">
                        <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${value}/${todays_manga_db.get(value).manga_last_chapter}?last_chapter=${todays_manga_db.get(value).manga_last_chapter}&chapter_size=75`}>{todays_manga_db.get(value).manga_last_chapter}</Link>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          )))}
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
