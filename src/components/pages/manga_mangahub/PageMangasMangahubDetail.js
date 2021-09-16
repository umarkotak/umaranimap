import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

import goAnimapuApi from "../../apis/GoAnimapuAPI"

function PageMangaDetailV1() {
  let { manga_id } = useParams()
  const [mangaDetail, setMangaDetail] = useState({})
  const [mangaChapters, setMangaChapters] = useState([])

  async function fetchMangaDetail() {
    try {
      var response = await goAnimapuApi.MangaupdatesSeriesDetail(manga_id)
      var status = await response.status
      var body = await response.json()

      console.log("DETAIL", status, body)

      if (status === 200) {
        setMangaDetail(body)
        var tempChapters = generateMangaChapters(body.last_chapter_int)
        tempChapters.concat(body.chapters_int)
        tempChapters = [...new Set(tempChapters)]
        setMangaChapters(tempChapters)
      }
    } catch(e) {
      console.log(e)
    }
  }

  function generateMangaChapters(max) {
    var chapters = []
    for (let i = 1; i <= max; i++) { chapters.push(i) }
    return chapters
  }

  useEffect(() => {
    fetchMangaDetail()
  // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <div className="row">
            <div className="col-12">
              <h1 className="text-white">{mangaDetail.compact_title ? mangaDetail.compact_title : "Loading"}</h1>
            </div>

            <div className="col-12 col-lg-3">
              <img
                src={mangaDetail.compact_title ? mangaDetail.image_url : "/default-book.png"}
                alt="cover"
                style={{width: "100%"}}
              ></img>
            </div>

            <div className="col-12 col-lg-9">
              <div className="row">
                {mangaChapters.map(((mangaChapter, index) => (
                  <div className="col-2 px-1" key={`MANGA-CHAPTER-${index}`}>
                    <Link
                      to={`/mangas/read/mangahub/${mangaDetail.title}/${mangaChapter}`}
                      className="btn btn-primary btn-block mb-1"
                    >
                      {mangaChapter}
                    </Link>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageMangaDetailV1
