import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

import goAnimapuApi from "../../apis/GoAnimapuAPI"

function PageMangasDetailMaidMy() {
  let { manga_title } = useParams()

  const [mangaDetail, setMangaDetail] = useState({})
  const [mangaChapters, setMangaChapters] = useState([])

  async function fetchMangaDetail() {
    try {
      var response = await goAnimapuApi.MaidMyDetail(manga_title)
      var status = await response.status
      var body = await response.json()

      console.log("DETAIL", status, body)

      if (status === 200) {
        setMangaDetail(body)
        setMangaChapters(body.chapters_int)
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
              <h1 className="text-white">{mangaDetail.title ? mangaDetail.compact_title : "Loading"}</h1>
            </div>

            <div className="col-12 col-lg-3">
              <img
                src={mangaDetail.title ? mangaDetail.image_url : "/default-book.png"}
                alt="cover"
                style={{width: "100%"}}
              ></img>
              <div className="text-white text-justify">
                <p>{mangaDetail.genres}</p>
                <p style={{height: "450px"}} className="overflow-auto">{mangaDetail.description}</p>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="row">
                {mangaChapters.map(((chapter, index) => (
                  <div className="col-2 px-1" key={`MANGA-CHAPTER-${index}`}>
                    <Link
                      to={`/mangas/read/maid_my/${manga_title}/${mangaDetail.chapter_links[index]}`}
                      className="btn btn-primary btn-block mb-1"
                    >
                      {chapter}
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

export default PageMangasDetailMaidMy
