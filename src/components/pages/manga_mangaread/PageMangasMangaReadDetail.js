import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

import mangameeApi from "../../apis/MangameeAPI"

function PageMangasDetailMangaRead() {
  let { manga_title } = useParams()

  const [mangaDetail, setMangaDetail] = useState({})
  const [mangaChapters, setMangaChapters] = useState([])

  async function fetchMangaDetail() {
    try {
      var response = await mangameeApi.MangareadGetMangaDetail("en", manga_title)
      var status = await response.status
      var body = await response.json()

      console.log("DETAIL", status, body)

      if (status === 200) {
        setMangaDetail(body.MangaData)
        setMangaChapters(body.MangaData.Chapter)
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchMangaDetail()
  // eslint-disable-next-line
  }, [])

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <div className="row">
            <div className="col-12">
              <h1 className="text-white">{mangaDetail.MangaTitle ? mangaDetail.MangaTitle : "Loading"}</h1>
            </div>

            <div className="col-12 col-lg-3">
              <img
                src={mangaDetail.MangaCover ? mangaDetail.MangaCover : "/default-book.png"}
                alt="cover"
                style={{width: "100%"}}
              ></img>
              <div className="text-white text-justify">
                <p>{mangaDetail.MangaStatus}</p>
                <p style={{maxHeight: "450px"}} className="overflow-auto">{mangaDetail.MangaSummary}</p>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="row">
                {mangaChapters.map(((mangaChapter, index) => (
                  <div className="col-2 px-1" key={`MANGA-CHAPTER-${index}`}>
                    <Link
                      to={`/mangas/read/mangaread/${manga_title}/${mangaChapter.ChapterLink}`}
                      className="btn btn-primary btn-block mb-1 p-1"
                    >
                      {mangaChapter.ChapterName}
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

export default PageMangasDetailMangaRead
