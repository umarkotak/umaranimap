import React, {useState, useEffect} from "react"
import mangaDB from "../utils/MangaDB"
import Cookies from 'universal-cookie'
import {Link} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

import helper from "../utils/Helper"
import dataStoreCommon from "../utils/DataStoreCommon"

const cookies = new Cookies()

function PageMangaLibraryV1() {
  const [manga_db, set_manga_db] = useState(mangaDB.GetMangaDB())
  const [new_mangas, set_new_mangas] = useState(mangaDB.GetNewManga())

  var manga_list = generateMangaListFromDB()

  const [page_loading_state, set_page_loading_state] = useState("true")
  const [new_manga_check_update, set_new_manga_check_update] = useState(" - finding new chapter . . .")
  // const [manga_histories, set_manga_histories] = useState(generateHistoriesSection())
  const manga_histories = generateHistoriesSection()
  const [logged_in_manga_histories, set_logged_in_manga_histories] = useState([])
  const [history_loading_state, set_history_loading_state] = useState("true")
  // const [manga_source, set_manga_source] = useState(localStorage.getItem("MANGA_SOURCE"))

  useEffect(() => {
    // console.log("RUN ONCE")
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchData() {
      var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/mangas/firebase")
      const response = await fetch(api)
      const results = await response.json()
      var converted_manga_db = new Map(Object.entries(results.manga_db))
      set_manga_db(converted_manga_db)

      var new_mangas = []
      converted_manga_db.forEach((num, key) => {
        if (num.new_added > 0) {
          new_mangas.push({title: key, order: num.new_added})
        }
      })
      new_mangas.sort((a, b) => a.order - b.order)

      set_new_mangas(new_mangas.map(val => val.title))
      set_page_loading_state("false")
    }
    getUserDetailFromFirebase()
    getMyReadLater()
    fetchData()
  }, [])

  useEffect(() => {
    async function updateData() {
      var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/mangas/firebase/update")
      const response = await fetch(api)
      const results = await response.json()
      var converted_manga_db = new Map(Object.entries(results.manga_db))
      set_manga_db(converted_manga_db)

      var new_mangas = []
      converted_manga_db.forEach((num, key) => {
        if (num.new_added > 0) {
          new_mangas.push({title: key, order: num.new_added})
        }
      })
      new_mangas.sort((a, b) => a.order - b.order)

      set_new_mangas(new_mangas.map(val => val.title))
      set_new_manga_check_update("")
    }
    updateData()
  }, [])

  async function getUserDetailFromFirebase() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/users/detail")
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
      }
    })
    const results = await response.json()

    var manga_title_histories = []

    if (!results.read_histories) {
      set_history_loading_state("false")
      return
    }

    const mapped_manga_histories = new Map(Object.entries(results.read_histories))
    mapped_manga_histories.forEach((manga, key) => {
      manga_title_histories.push(manga)
      var manga_firebase_title = manga.manga_title
      var cache_key = `${manga_firebase_title}/last_read_chapter_logged_in`
      var value = manga.last_chapter
      // let date = new Date(2030, 12)
      // cookies.set(cache_key, value, { path: "/", expires: date })

      cache_key = `${manga_firebase_title}/last_read_chapter_logged_in`
      value = manga.last_chapter
      localStorage.setItem(cache_key, value)
    })
    manga_title_histories.sort((a, b) => b.last_read_time_i - a.last_read_time_i)
    var mapped_title_histories = manga_title_histories.map(val => val.manga_title)
    set_logged_in_manga_histories(mapped_title_histories)
    set_history_loading_state("false")
  }

  async function getMyReadLater() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/users/manga_library")
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        }
      })
      const results = await response.json()

      if (!results.my_libraries) {
        return
      }

      var tmp_manga_histories_arr = []
      const tmp_manga_histories_map = new Map(Object.entries(results.my_libraries))

      tmp_manga_histories_map.forEach((manga, key) => {
        tmp_manga_histories_arr.push(manga)
      })

      // TODO SHORT BY DATE ADDED
      tmp_manga_histories_arr.sort((a, b) => b.weight - a.weight)


    } catch (error) {

    }

  }

  function findLatestMangaChapter(title) {
    var key = `${title}/last_read_chapter`
    var chapter = localStorage.getItem(key)

    if (chapter) {
      return parseInt(chapter)
    }

    return 1
  }

  function findLatestMangaChapterLoggedIn(title) {
    var key = `${title}/last_read_chapter_logged_in`
    var chapter = localStorage.getItem(key)

    if (chapter) {
      return parseInt(chapter)
    }

    return findLatestMangaChapter(title)
  }

  function findLastMangaChapter(title) {
    var last_chapter
    try {
      last_chapter = manga_db.get(title).manga_last_chapter

      if (typeof last_chapter === "undefined") {
        last_chapter = 150
      }

      if (last_chapter) {
        return last_chapter
      }

      last_chapter = 150
    } catch (error) {
      last_chapter = 150
    }
    return last_chapter
  }

  function generateMangaListFromDB() {
    var manga_title_list = []
    for (let manga_title of manga_db.keys()) {
      manga_title_list.push(manga_title)
    }
    return manga_title_list
  }

  function generateThumbnailFromTitle(title) {
    if (manga_db.get(title)) {
      if (manga_db.get(title).image_url !== "") {
        return manga_db.get(title).image_url
      } else {
        return `https://thumb.mghubcdn.com/mn/${title}.jpg`
      }
    }
    return `https://thumb.mghubcdn.com/mn/${title}.jpg`
  }

  function generateHistoriesSection() {
    var key = "last_manga_reads"
    var last_manga_reads = localStorage.getItem(key)

    try {
      last_manga_reads = JSON.parse(last_manga_reads)
    } catch (error) {
      return []
    }

    if (Array.isArray(last_manga_reads)) {
      return last_manga_reads
    } else {
      return []
    }
  }

  return (
    <div className="content-wrapper"  style={{backgroundColor: "#454d55"}}>
      <div className="px-2 py-2">

        <h2 className="text-white">History</h2>
        <RenderHistoriesSection />

        <hr className="my-2" />
        <h2 className="text-white">New Updates {new_manga_check_update}</h2>
        <RenderLatestUpdateSection />

        <hr className="my-2" />
        <h2 className="text-white">Top Picks</h2>
        <RenderTopPicksSection />

      </div>
    </div>
  )

  // title
  // beautified_title
  // detail_link
  // last_chapter
  // continue_chapter
  // util_icon
  // util_link
  // border_color
  function RenderMangaCardV2(props) {
    return(
      <div className={`${props.border_color}`}>
        <div
          style={{
            height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"),
            backgroundSize: '100% 100%',
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${generateThumbnailFromTitle(props.title)}), url(${'/default-book.png'})`
          }}
        >
          <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{`${props.continue_chapter}/${props.last_chapter}`}</small>
            <Link
              to={props.util_link}
              className="btn btn-sm btn-light float-right"
              style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
            >
              <i className={`fa ${props.util_icon}`}></i>
            </Link>
          </div>
          <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{props.beautified_title}</small>
          </div>
        </div>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th width="10%">
                <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={props.detail_link}><i className="fa fa-info-circle"></i></Link>
              </th>
              <th width="35%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${props.title}/1?last_chapter=${props.last_chapter}`}>1</Link>
              </th>
              <th width="55%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${props.title}/${props.last_chapter}?last_chapter=${props.last_chapter}`}>{props.last_chapter}</Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }

  function RenderHistoriesSection() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return(<div><RenderNonLoggedInHistory /></div>)
    }
    return(<div><RenderLoggedInHistory /></div>)
  }

  function RenderLatestUpdateSection() {
    if (page_loading_state === "false") {
      if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
        return(
          <div className="row flex-row flex-nowrap overflow-auto">
            {new_mangas.slice(0, 30).map(manga_title => (
              <div className="col-4 col-md-2" key={`${manga_title}-manga_title_history_list`}>
                <RenderMangaCardV2
                  title = {manga_title}
                  beautified_title = {manga_title.replaceAll("-", " ")}
                  detail_link = {`/mangas/detail/mangahub/${manga_title}`}
                  last_chapter = {findLastMangaChapter(manga_title)}
                  continue_chapter = {findLatestMangaChapter(manga_title)}
                  util_icon = "fa-share"
                  util_link = {`/mangas/read/mangahub/${manga_title}/1?last_chapter=${findLatestMangaChapterLoggedIn(manga_title)}`}
                  border_color = "border-primary"
                />
              </div>
            ))}
          </div>
        )
      }
      return(
        <div className="row flex-row flex-nowrap overflow-auto">
          {new_mangas.slice(0, 30).map(manga_title => (
            <div className="col-4 col-md-2" key={`${manga_title}-manga_title_history_list`}>
              <RenderMangaCardV2
                title = {manga_title}
                beautified_title = {manga_title.replaceAll("-", " ")}
                detail_link = {`/mangas/detail/mangahub/${manga_title}`}
                last_chapter = {findLastMangaChapter(manga_title)}
                continue_chapter = {findLatestMangaChapterLoggedIn(manga_title)}
                util_icon = "fa-share"
                util_link = {`/mangas/read/mangahub/${manga_title}/${findLatestMangaChapterLoggedIn(manga_title)}?last_chapter=${findLastMangaChapter(manga_title)}`}
                border_color = "border-primary"
              />
            </div>
          ))}
        </div>
      )
    }
    return(
      <div>
        <div className="row flex-row flex-nowrap overflow-auto">
          {[0,1,2,3,4,5,6].map(manga_title => (
            <RenderMangaCardLoading key={uuidv4()} />
          ))}
        </div>
      </div>
    )
  }

  function RenderNonLoggedInHistory() {
    return(
      <div>
        <div className="row flex-row flex-nowrap overflow-auto">
          {manga_histories.slice(0, 30).map(manga_title => (
            <div className="col-4 col-md-2" key={`${manga_title}-manga_title_history_list`}>
              <RenderMangaCardV2
                title = {manga_title}
                beautified_title = {manga_title.replaceAll("-", " ")}
                detail_link = {`/mangas/detail/mangahub/${manga_title}`}
                last_chapter = {findLastMangaChapter(manga_title)}
                continue_chapter = {findLatestMangaChapter(manga_title)}
                util_icon = "fa-share"
                util_link = {`/mangas/read/mangahub/${manga_title}/1?last_chapter=${findLatestMangaChapter(manga_title)}`}
                border_color = "border-primary"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  function RenderLoggedInHistory() {
    if (history_loading_state === "true") {
      return(
        <div>
          <div className="row flex-row flex-nowrap overflow-auto">
            {[0,1,2,3,4,5,6].map(manga_title => (
              <RenderMangaCardLoading key={uuidv4()} />
            ))}
          </div>
        </div>
      )
    }
    return(
      <div className="row flex-row flex-nowrap overflow-auto">
        {logged_in_manga_histories.slice(0, 50).map(manga_title => (
          <div className="col-4 col-md-2" key={`${manga_title}-manga_title_history_list`}>
            <RenderMangaCardV2
              title = {manga_title}
              beautified_title = {manga_title.replaceAll("-", " ")}
              detail_link = {`/mangas/detail/mangahub/${manga_title}`}
              last_chapter = {findLastMangaChapter(manga_title)}
              continue_chapter = {findLatestMangaChapterLoggedIn(manga_title)}
              util_icon = "fa-share"
              util_link = {`/mangas/read/mangahub/${manga_title}/${findLatestMangaChapterLoggedIn(manga_title)}?last_chapter=${findLastMangaChapter(manga_title)}`}
              border_color = "border-primary"
            />
          </div>
        ))}
      </div>
    )
  }

  function RenderTopPicksSection() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return(<div><RenderNonLoggedInTopPicks /></div>)
    }
    return(<div><RenderLoggedInTopPicks /></div>)
  }

  function RenderNonLoggedInTopPicks() {
    return(
      <div>
        <div className="row">
          {manga_list.slice(1, manga_list.length).map(manga_title => (
            <div className="col-4 col-md-2 mb-2" key={`${manga_title}-manga_title_history_list`}>
              <RenderMangaCardV2
                title = {manga_title}
                beautified_title = {manga_title.replaceAll("-", " ")}
                detail_link = {`/mangas/detail/mangahub/${manga_title}`}
                last_chapter = {findLastMangaChapter(manga_title)}
                continue_chapter = {findLatestMangaChapter(manga_title)}
                util_icon = "fa-share"
                util_link = {`/mangas/read/mangahub/${manga_title}/1?last_chapter=${findLatestMangaChapter(manga_title)}`}
                border_color = "border-primary"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  function RenderLoggedInTopPicks() {
    return(
      <div>
        <div className="row">
          {manga_list.slice(1, manga_list.length).map(manga_title => (
            <div className="col-4 col-md-2 pb-4" key={`${manga_title}-manga_title_history_list`}>
              <RenderMangaCardV2
                title = {manga_title}
                beautified_title = {manga_title.replaceAll("-", " ")}
                detail_link = {`/mangas/detail/mangahub/${manga_title}`}
                last_chapter = {findLastMangaChapter(manga_title)}
                continue_chapter = {findLatestMangaChapterLoggedIn(manga_title)}
                util_icon = "fa-share"
                util_link = {`/mangas/read/mangahub/${manga_title}/${findLatestMangaChapterLoggedIn(manga_title)}?last_chapter=${findLastMangaChapter(manga_title)}`}
                border_color = "border-primary"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  function RenderMangaCardLoading() {
    return(
      <div className="col-4 col-md-2">
        <div className={`card mb-4 box-shadow shadow border-4`}>
          <div style={{height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"), backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${window.location.origin + '/cool-loading-animated-gif-1.gif'})`}}>
            <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>0/0</small>
            </div>
            <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>Loading</small>
            </div>
          </div>
          <button className="btn btn-block btn-sm btn-outline-secondary" disabled>Read</button>
        </div>
      </div>
    )
  }

}

export default PageMangaLibraryV1
