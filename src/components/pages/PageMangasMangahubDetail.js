import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import dataStoreCommon from "../utils/DataStoreCommon"

var go_animapu_host = dataStoreCommon.GetConf().GO_ANIMAPU_HOST

function PageMangaDetailV1() {
  let { manga_title } = useParams();
  const [manga_detail, set_manga_detail] = useState({
    chapters: []
  })
  const [last_chapter, set_last_chapter] = useState("0")

  useEffect(() => {
    async function fetchData() {
      var api
      if (localStorage.getItem("MANGA_SOURCE") === "maid_my") {
        api = `${go_animapu_host}/mangas/maid_my/manga_detail?manga_title=${manga_title}`
      } else {
        api = `${go_animapu_host}/mangas_detail?manga_title=${manga_title}`
      }
      const response = await fetch(api)
      const results = await response.json()

      if (!Array.isArray(results.chapters)) {
        results.chapters=[]
      }

      var temp_last_chapter = results.chapters[0]
      set_manga_detail(results)
      set_last_chapter(temp_last_chapter)

    }
    fetchData()
  }, [manga_title])

  return (
    <div className="content-wrapper wrapper">
      <div className="row">
        <div className="col-12 col-md-3 border">
          <img src={manga_detail.image_url} style={{width: "100%"}} alt="immage" className="img border rounded"></img>
        </div>

        <div className="col-12 col-md-9 border">
          <h1 style={{color: dataStoreCommon.GetActiveTemplate("white", "black")}}>{manga_title.replace(/-/g, " ")}</h1>
          <table className="table table-bordered" style={{color: dataStoreCommon.GetActiveTemplate("white", "black")}}>
            <thead>
              <tr>
                <td>Genres</td>
                <td>{manga_detail.genres}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{manga_detail.description}</td>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>

          <div className="row">
            {manga_detail.chapters.map(chapter_no => (
              <div className="col-4 col-md-2 px-1">
                <Link className={`btn btn-block my-1 ${dataStoreCommon.GetActiveTemplate("btn-info", "btn-outline-info")}`} to={`/read-manga-only-v1/${manga_title}/${chapter_no}?last_chapter=${last_chapter}&chapter_size=150`}>{chapter_no}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageMangaDetailV1
