// https://reactjs.org/docs/hooks-effect.html
// https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately

import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'

import mangaDB from "../../utils/MangaDB"
import helper from "../../utils/Helper"
import goAnimapuApi from "../../apis/GoAnimapuAPI"
import mangahubAPI from "../../apis/MangahubAPI"

const cookies = new Cookies()

function PageSearchManga() {
  var baseMangaDB = mangaDB.GetMangaDB()
  var baseMangaDBKeys = Array.from(baseMangaDB.keys())

  const [searching_state, set_searching_state] = useState("finished")
  const [search_query, set_search_query] = useState("")
  const [search_result_db, set_search_result_db] = useState(baseMangaDB)
  const [result_titles, set_result_titles] = useState(baseMangaDBKeys)
  const [searchLabel, setSearchLabel] = useState("Recomendations")

  function handleSearchManga(event) {
    event.preventDefault()

    set_searching_state("searching")
    execute_search_manga(search_query)
  }

  async function execute_search_manga(search_query) {
    const response = await goAnimapuApi.MangaupdatesSearch(search_query)
    const results = await response.json()
    var converted_search_result_db = new Map(Object.entries(results.manga_db))
    setSearchLabel("Results")
    set_search_result_db(converted_search_result_db)
    set_searching_state("finished")

    console.log("SEARCH RESULT", results)
  }

  function generateThumbnailFromTitle(title) {
    if (search_result_db.get(title).image_url !== "") {
      return `url(${search_result_db.get(title).image_url})`
    }
    return mangahubAPI.GenerateBackgroundThumbnailFromTitle(title)
  }

  useEffect(() => {
    var manga_title_list = []
    search_result_db.forEach((num, key) => {
      manga_title_list.push({title: key, order: num.new_added, weight: num.weight})
    })
    manga_title_list.sort((a, b) => b.weight - a.weight)

    set_result_titles(manga_title_list.map(val => val.title))
  }, [search_result_db])

  async function fetchTopMangaDB() {
    const response = await goAnimapuApi.GetGlobalMangaFromFirebase()
    const results = await response.json()
    var converted_manga_db = new Map(Object.entries(results.manga_db))
    console.log("fetchTopMangaDB", converted_manga_db)
    set_search_result_db(converted_manga_db)
    set_result_titles(converted_manga_db.keys())
    set_searching_state("finished")
  }
  useEffect(() => {
    fetchTopMangaDB()
  }, [])

  function findLatestReadChapter(title) {
    var key
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      key = `${title}/last_read_chapter`
    } else {
      key = `${title}/last_read_chapter_logged_in`
    }

    var chapter = localStorage.getItem(key)
    if (chapter) { return parseInt(chapter) }
    return 1
  }

  return (
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <h1 className="text-white">Search</h1>
        <div className="row">
          <div className="col-12"><input
            type="text" name="search_text" className="form-control"
            value={search_query}
            onChange={(e) => set_search_query(e.target.value)}
          ></input></div>
        </div>

        <div className="row mb-5">
          <RenderSearchSection />
        </div>
      </div>

      <Link
        to="#"
        className="bg-primary"
        onClick={(e) => handleSearchManga(e)}
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
        <i className="fa fa-search my-float" style={{marginTop:"17px"}}></i>
      </Link>
    </div>
  )

  function RenderSearchSection() {
    if (searching_state === "searching") {
      return(<RenderLoadingBar />)
    } else if (searching_state === "finished") {
      return(<div className="col-12"><RenderSearchResults /></div>)
    }
    return(<div></div>)
  }

  function RenderSearchResults() {
    return(
      <div>
        <hr/>
        <h1 className="text-white">{searchLabel}</h1>
        <div className="row">
          {result_titles && result_titles.map(((value, index) => (
            <div className="col-4 col-md-2 mb-4" key={index+value}>
              <div className="rounded">
                <div style={{
                    height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    justifyContent: "space-between",
                    display: "flex",
                    flexDirection: "column",
                    backgroundImage: `${generateThumbnailFromTitle(value)}`
                  }}
                >
                  <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{findLatestReadChapter(value)} / {search_result_db.get(value).manga_last_chapter || "-"}</small>
                    <Link
                      to={`/mangas/read/mangahub/${findLatestReadChapter(value)}`}
                      className="btn btn-sm btn-light float-right"
                      style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
                    >
                      <i className={`fa fa-share`}></i>
                    </Link>
                  </div>
                  <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{value}</small>
                  </div>
                </div>
                <table style={{width: "100%"}}>
                  <thead>
                    <tr>
                      <th width="10%">
                        <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangahub/${search_result_db.get(value).manga_updates_id}`}><i className={`fa fa-info-circle`}></i></Link>
                      </th>
                      <th width="35%">
                        <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${value}/1`}>1</Link>
                      </th>
                      <th width="55%">
                        <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${value}/${search_result_db.get(value).manga_last_chapter || 1}`}>{search_result_db.get(value).manga_last_chapter || "-"}</Link>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          )))}
        </div>
      </div>
    )
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

export default PageSearchManga
