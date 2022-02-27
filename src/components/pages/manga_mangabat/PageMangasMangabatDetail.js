import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

import goAnimapuApi from "../../apis/GoAnimapuAPI"

function PageMangasDetailMangabat() {
  let { manga_id } = useParams()

  const [mangaDetail, setMangaDetail] = useState({})
  const [mangaChapters, setMangaChapters] = useState([])

  async function fetchMangaDetail() {
    try {
      var response = await goAnimapuApi.MangabatMangaDetail({manga_id: manga_id})
      var status = await response.status
      var body = await response.json()

      console.log("DETAIL", status, body)

      if (status === 200) {
        setMangaDetail(body)
        setMangaChapters(body.chapter_objs)
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
              <h1 className="text-white">{mangaDetail.title ? mangaDetail.title : "Loading"}</h1>
            </div>

            <div className="col-12 col-lg-3">
              <img
                src={mangaDetail.image_url ? mangaDetail.image_url : "/default-book.png"}
                alt="cover"
                style={{width: "100%"}}
              ></img>
              <div className="text-white text-justify">
                <p>{mangaDetail.genres}</p>
                <p style={{maxHeight: "450px"}} className="overflow-auto">{mangaDetail.description}</p>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="row">
                {mangaChapters.map(((mangaChapter, index) => (
                  <div className="col-12 px-1" key={`MANGA-CHAPTER-${index}`}>
                    <Link
                      to={`/mangas/read/mangabat/${manga_id}/${mangaChapter.link}`}
                      className="btn btn-primary btn-block mb-1 p-1"
                    >
                      {mangaChapter.title}
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

export default PageMangasDetailMangabat
