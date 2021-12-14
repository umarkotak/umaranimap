import React, {useState, useEffect} from "react"
import Cookies from 'universal-cookie'
import {Link} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

import mangaDB from "../../utils/MangaDB"
import helper from "../../utils/Helper"
import goAnimapuApi from "../../apis/GoAnimapuAPI"
import mangahubAPI from "../../apis/MangahubAPI"

const cookies = new Cookies()

function PageMangaLibraryV1() {
  var currentHistoryPage = 0
  const maxHistoriesCount = 240
  const [manga_db, set_manga_db] = useState(mangaDB.GetMangaDB())
  const [new_mangas, set_new_mangas] = useState(mangaDB.GetNewManga())

  const [currentHistoriesList, setCurrentHistoriesList] = useState([])

  const [page_loading_state, set_page_loading_state] = useState("true")
  const [new_manga_check_update, set_new_manga_check_update] = useState("block")
  // const [manga_histories, set_manga_histories] = useState(generateHistoriesSection())
  const manga_histories = generateHistoriesSection()
  const [logged_in_manga_histories, set_logged_in_manga_histories] = useState([])
  const [history_loading_state, set_history_loading_state] = useState("true")
  // const [manga_source, set_manga_source] = useState(localStorage.getItem("MANGA_SOURCE"))

  async function fetchData() {
    await goAnimapuApi.MangaupdatesReleasesV2()
    const response = await goAnimapuApi.GetGlobalMangaFromFirebase()
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

  async function updateData() {
    const response = await goAnimapuApi.UpdateGlobalMangaToFirebase()
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
    set_new_manga_check_update("none")
  }

  async function getUserDetailFromFirebase() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    const response = await goAnimapuApi.GetUserDetail(cookies.get("GO_ANIMAPU_LOGIN_TOKEN"))
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

    setCurrentHistoriesList(currentHistoriesList.concat(mapped_title_histories.slice(0, maxHistoriesCount)))

    set_logged_in_manga_histories(mapped_title_histories)
    set_history_loading_state("false")
  }

  async function getMyReadLater() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    try {
      const response = await goAnimapuApi.GetUserMangaLibrary(cookies.get("GO_ANIMAPU_LOGIN_TOKEN"))
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

  useEffect(() => {
    window.scrollTo(0, 0)

    fetchData()
    updateData()

    getUserDetailFromFirebase()
    getMyReadLater()
  // eslint-disable-next-line
  }, [])

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

  function generateThumbnailFromTitle(title) {
    if (manga_db.get(title)) {
      if (manga_db.get(title).image_url !== "") {
        return `url(${manga_db.get(title).image_url})`
      } else {
        return mangahubAPI.GenerateBackgroundThumbnailFromTitle(title)
      }
    }
    return mangahubAPI.GenerateBackgroundThumbnailFromTitle(title)
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

  function handleNextHistoryPage() {
    console.log("handleNextHistoryPage", logged_in_manga_histories)
    window.scrollTo(0,document.body.scrollHeight)
    currentHistoryPage = currentHistoryPage + maxHistoriesCount
    var next = currentHistoryPage + maxHistoriesCount
    setCurrentHistoriesList(currentHistoriesList.concat(logged_in_manga_histories.slice(currentHistoryPage, next)))
  }

  return (
    <div className="content-wrapper"  style={{backgroundColor: "#454d55"}}>
      <div className="px-2 py-2">
        <div className="row"><div className="col-6">
          <h2 className="text-white">New Updates</h2>
        </div><div className="col-6">
          <img src="/Iphone-spinner-2.gif" alt="spinner" className="float-right border rounded-circle" style={{display: new_manga_check_update, height: "36px"}}></img>
        </div></div>

        <RenderLatestUpdateSection />

        <hr className="my-2" />
        <h2 className="text-white">History</h2>
        <RenderHistoriesSection />

        {/* <hr className="my-2" />
        <h2 className="text-white">Top Picks</h2>
        <RenderTopPicksSection /> */}

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
            backgroundImage: `${generateThumbnailFromTitle(props.title)}`
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

        <Link
          to="#"
          className="bg-primary"
          onClick={() => handleNextHistoryPage()}
          style={{
            position:"fixed",
            width:"50px",
            height:"50px",
            bottom:"70px",
            right:"30px",
            color:"#FFF",
            borderRadius:"50px",
            textAlign:"center"
          }}
        >
          <i className="fa fa-angle-double-down my-float" style={{marginTop:"17px"}}></i>
        </Link>
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
            {new_mangas.slice(0, 90).map(manga_title => (
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
          {new_mangas.slice(0, 90).map(manga_title => (
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
        <div className="row">
          {manga_histories.slice(0, maxHistoriesCount).map(manga_title => (
            <div className="col-4 col-md-2 mb-4" key={`${manga_title}-manga_title_history_list`}>
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
          <div className="row">
            {[0,1,2,3,4,5,6].map(manga_title => (
              <RenderMangaCardLoading key={uuidv4()} />
            ))}
          </div>
        </div>
      )
    }
    return(
      <div className="row">
        {currentHistoriesList.map(manga_title => (
          <div className="col-4 col-md-2 mb-4" key={`${manga_title}-manga_title_history_list`}>
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

  function RenderMangaCardLoading() {
    return(
      <div className="col-4 col-md-2">
        <div className={`card mb-4 box-shadow shadow border-4`}>
          <div style={{height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"), backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${window.location.origin + '/images/cat_loading.gif'})`}}>
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
