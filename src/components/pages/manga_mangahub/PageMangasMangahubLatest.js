// https://reactjs.org/docs/hooks-effect.html
// https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately

import React, {useState, useEffect} from "react"
import Cookies from 'universal-cookie'
import {Link} from "react-router-dom"

import helper from "../../utils/Helper"
import goAnimapuApi from "../../apis/GoAnimapuAPI"
// import mangahubAPI from "../../apis/MangahubAPI"
import ScrollToTop from "../../ui-components/ScrollToTop"

function PageMangasLatestMangahub() {
  const cookies = new Cookies()
  const [fetch_todays_manga_state, set_fetch_todays_manga_state] = useState("finding")
  const [todays_manga_db, set_todays_manga_db] = useState(new Map())
  const [todays_manga_titles, set_todays_manga_titles] = useState([])

  // function generateThumbnailFromTitle(title) {
  //   try {
  //     if (todays_manga_db.get(title).image_url !== "") {
  //       return todays_manga_db.get(title).image_url
  //     } else {
  //       return mangahubAPI.GenerateBackgroundThumbnailFromTitle(title)
  //     }
  //   } catch {
  //     return mangahubAPI.GenerateBackgroundThumbnailFromTitle(title)
  //   }
  // }

  async function fetchTodayMangaData() {
    try {
      const response = await goAnimapuApi.MangaupdatesReleases()
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
    } catch (e) {
      console.log("fetchTodayMangaData", e)
      set_fetch_todays_manga_state("failed")
    }
  }

  useEffect(() => {
    fetchTodayMangaData()
  // eslint-disable-next-line
  }, [])

  // async function putToMyLibrary(manga_title, manga_last_chapter) {
  //   if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
  //     return
  //   }

  //   try {
  //     const response = await goAnimapuApi.UserAddMangaToLibrary(cookies.get("GO_ANIMAPU_LOGIN_TOKEN"), {
  //       manga_title: manga_title,
  //       manga_last_chapter: manga_last_chapter,
  //       image_url: ''
  //     })
  //     const results = await response.json()
  //     const status = await response.status

  //     if (status === 200) {
  //       alert("manga successfully added to library!")
  //     } else {
  //       alert(results.message)
  //     }

  //     console.log("PUT MANGA TO MY LIBRARY", status, results)

  //   } catch (e) {
  //     alert(e.message)
  //   }
  // }

  function nextPageDecider(mangaTitle) {
    var key, chapter

    if (cookies.get("GO_ANIMAPU_LOGGED_IN") === "true") {
      key = `${mangaTitle}/last_read_chapter_logged_in`
      chapter = localStorage.getItem(key)

      if (chapter) {
        return parseInt(chapter)
      }
    }

    key = `${mangaTitle}/last_read_chapter`
    chapter = localStorage.getItem(key)

    if (chapter) {
      return parseInt(chapter)
    }

    return 1
  }

  var hist = {}
  var unsupportedTitles = []
  function handleImageFallback(val, e) {
    if (!hist[val]) { hist[val] = {} }

    if (hist[val] && !hist[val]["mn"]) {
      hist[val]["mn"] = "tried"
      e.target.src = `https://thumb.mghubcdn.com/mn/${val}.jpg`
    } else if (hist[val] && !hist[val]["md"]) {
      hist[val]["md"] = "tried"
      e.target.src = `https://thumb.mghubcdn.com/md/${val}.jpg`
    } else if (hist[val] && !hist[val]["m4l"]) {
      hist[val]["m4l"] = "tried"
      e.target.src = `https://thumb.mghubcdn.com/m4l/${val}.jpg`
    } else {
      e.target.src = window.location.origin + "/default-image.png"
      unsupportedTitles.push(val)
      localStorage.setItem(`unsupported-titles-${val}`, "true")
    }
  }

  return (
    <div>
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <RenderTodaysMangaSection />
        </div>
      </div>

      <ScrollToTop show={true} />
    </div>
  )

  function RenderTodaysMangaSection() {
    if (fetch_todays_manga_state === "finished") {
      return(
        <div className="row">
          {todays_manga_titles && todays_manga_titles.slice(0, 6*80).map(((value, index) => (
            <div
              className="col-4 col-md-2 mb-4"
              key={index+value}
              id={`manga-card-${value}`}
              style={{
                display: (localStorage.getItem(`unsupported-titles-${value}`) ? "none" : "block")
              }}
            >
              <div className="rounded">
                <div
                  style={{
                    height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    justifyContent: "space-between",
                    display: "flex",
                    flexDirection: "column",
                    // backgroundImage: `${generateThumbnailFromTitle(value)}`
                  }}
                >
                  <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{`${nextPageDecider(value)} / ${todays_manga_db.get(value).manga_last_chapter}`}</small>
                    <Link
                      to={`/mangas/read/mangahub/${value}/${nextPageDecider(value)}?last_chapter=${todays_manga_db.get(value).manga_last_chapter}`}
                      className={`btn btn-sm float-right ${(nextPageDecider(value) === 1 ? "btn-light" : "btn-success")}`}
                      style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
                    >
                      <i className={`fa fa-share`}></i>
                    </Link>
                  </div>
                  <img
                    src={`https://thumb.mghubcdn.com/none/${value}.jpg`}
                    style={{
                      width: "100%",
                      height: ((helper.GenerateImageCardHeightByWidth(window.innerWidth)-30) + "px"),
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      zIndex: "0"
                    }}
                    onError={(e) => handleImageFallback(value, e)}
                    alt="thumb"
                  />
                  <div
                    className="text-white card-text overflow-auto"
                    style={{
                      "height": "55px",
                      "width": "100%",
                      "backgroundColor": "rgba(0, 0, 0, 0.7)",
                      "marginTop": "-35px",
                      "zIndex": "1"
                    }}
                  >
                    <small>{todays_manga_db.get(value).compact_title}</small>
                  </div>
                </div>
                <table style={{width: "100%"}}>
                  <thead>
                    <tr>
                      <th width="10%">
                        <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangahub/${todays_manga_db.get(value).manga_updates_id}`}><i className={`fa fa-info-circle`}></i></Link>
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
    if (fetch_todays_manga_state === "failed") {
      return(<div><h2 className="text-white">Failed to load</h2></div>)
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

export default PageMangasLatestMangahub
