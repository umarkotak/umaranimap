import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import configDB from "./ConfigDB"

var go_animapu_host = configDB.GetConf().GO_ANIMAPU_HOST

function PageMangaDetailV1() {
  let { manga_title } = useParams();
  const [manga_detail, set_manga_detail] = useState({
    chapters: []
  })
  const [last_chapter, set_last_chapter] = useState("0")

  console.log("HEHE", go_animapu_host)

  useEffect(() => {
    async function fetchData() {
      var api = `${go_animapu_host}/mangas_detail?manga_title=${manga_title}`
      const response = await fetch(api)
      const results = await response.json()
      console.log(results)

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
    <div>
      <div className="row">
        <div className="col-12 col-md-3">
          <img src={manga_detail.image_url} style={{width: "100%"}} alt="immage" className="img border rounded"></img>
        </div>

        <div className="col-12 col-md-9">
          <h1>{manga_title.replace(/-/g, " ")}</h1>
          <table className="table table-bordered">
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
              <div className="col-4 col-md-2">
                <Link className="btn btn-outline-info btn-block" to={`/read-manga-only-v1/${manga_title}/${chapter_no}?last_chapter=${last_chapter}&chapter_size=150`}>{chapter_no}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageMangaDetailV1
