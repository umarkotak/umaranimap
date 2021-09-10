import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

import mangadexApi from "../apis/MangadexAPI"

function PageMangasDetailMangadex() {
  let { manga_id } = useParams()

  const [mangaDetail, setMangaDetail] = useState({})
  const [mangaChapters, setMangaChapters] = useState([])

  async function fetchMangaDetail() {
    try {
      var response = await mangadexApi.GetMangaDetail(manga_id)
      var status = await response.status
      var body = await response.json()

      console.log("DETAIL", status, body)

      if (status === 200) {
        setMangaDetail(body.data)
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function fetchMangaChapters() {
    try {
      var response = await mangadexApi.GetMangaChapters(manga_id)
      var status = await response.status
      var body = await response.json()

      console.log("CHAPTERS", status, body)

      if (status === 200) {
        var tempResults = body.results
        tempResults = tempResults.sort((a,b) => (parseFloat(a.data.attributes.chapter) > parseFloat(b.data.attributes.chapter)) ? 1 : ((parseFloat(b.data.attributes.chapter) > parseFloat(a.data.attributes.chapter)) ? -1 : 0))
        setMangaChapters(tempResults)
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchMangaDetail()
    fetchMangaChapters()
  // eslint-disable-next-line
  }, [])

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <div className="row">
            <div className="col-12">
              <h1 className="text-white">{mangaDetail.id ? mangaDetail.attributes.title.en : "Loading"}</h1>
            </div>

            <div className="col-12 col-lg-3">
              <img
                src={mangaDetail.id ? mangadexApi.ConstructCoverArtOriginal(mangaDetail.id, mangaDetail.relationships.at(-1).attributes.fileName) : "/default-book.png"}
                alt="cover"
                style={{width: "100%"}}
              ></img>
            </div>

            <div className="col-12 col-lg-9">
              <div className="row">
                {mangaChapters.map(((mangaChapter, index) => (
                  <div className="col-2 px-1" key={`MANGA-CHAPTER-${index}`}>
                    <Link
                      to={`/mangas/read/mangadex/${mangaDetail.id}/${mangaChapter.data.id}/${mangaChapter.data.attributes.hash}`}
                      className="btn btn-primary btn-block mb-1"
                    >
                      {mangaChapter.data.attributes.chapter}
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

export default PageMangasDetailMangadex
