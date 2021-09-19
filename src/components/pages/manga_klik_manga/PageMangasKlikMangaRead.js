import React, {useState, useEffect, useCallback} from "react"
import {useParams, useHistory, Link} from "react-router-dom"
import Select from 'react-select'
import Cookies from 'universal-cookie'

import goAnimapuApi from "../../apis/GoAnimapuAPI"
import ScrollToTop from "../../ui-components/ScrollToTop"

var y_pos = 0
const cookies = new Cookies()

function PageMangasReadKlikManga() {
  const history = useHistory()

  let { manga_title } = useParams()
  let { chapter_title } = useParams()

  const [currentChapterIDX, setCurrentChapterIDX] = useState(0)
  const [chapterPages, setChapterPages] = useState([])
  const [chapterOptions, setChapterOptions] = useState([
    { value: 'N/A', label: 'Loading...' }
  ])
  const [showMangaNav, setShowMangaNav] = useState(true)
  const [mangaDetail, setMangaDetail] = useState({})

  async function fetchMangaDetail() {
    try {
      var response = await goAnimapuApi.KlikMangaMangaDetail({manga_title: manga_title, manga_chapter: chapter_title})
      var status = await response.status
      var body = await response.json()

      console.log("DETAIL", status, body)

      if (status === 200) {
        var tempChapterOptions = body.chapters.map((chapter, idx) => {
          if (chapter === chapter_title) {
            setCurrentChapterIDX(idx)
          }
          return { value: `${chapter}`, label: body.chapters[idx] }
        })
        setChapterOptions(tempChapterOptions)
        setMangaDetail(body)
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function fetchChapterPages() {
    try {
      if (!chapter_title) {return}

      var response = await goAnimapuApi.KlikMangaChapterDetail({manga_title: manga_title, manga_chapter: chapter_title})
      var status = await response.status
      var body = await response.json()

      console.log("PAGES", status, body)

      if (status === 200) {
        setChapterPages(body.images)
      }
    } catch(e) {
      console.log(e)
    }
  }

  function handleSelectChapter(e) {
    history.push(`/mangas/read/klik_manga/${manga_title}/${e.value}`)
  }

  function toPrevChapter() {
    if (!chapterOptions[currentChapterIDX+1]) { return }
    history.push(`/mangas/read/klik_manga/${manga_title}/${chapterOptions[currentChapterIDX+1].value}`)
  }

  function toNextChapter() {
    if (!chapterOptions[currentChapterIDX-1]) { return }
    history.push(`/mangas/read/klik_manga/${manga_title}/${chapterOptions[currentChapterIDX-1].value}`)
  }

  useEffect(() => {
    fetchMangaDetail()
    fetchChapterPages()
  // eslint-disable-next-line
  }, [])

  async function setUserKlikMangaHistory() {
    try {
      if (!mangaDetail.title) { return }
      if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") { return }

      var params = {
        "title": manga_title,
        "compact_title": mangaDetail.compact_title,
        "image_url": mangaDetail.image_url,
        "last_read_chapter_int": mangaDetail.last_chapter_int - currentChapterIDX,
        "last_read_chapter_id": chapter_title,
        "last_chapter_int": mangaDetail.last_chapter_int,
        "last_chapter_id": mangaDetail.last_chapter
      }
      var response = await goAnimapuApi.SetUserKlikMangaHistory(cookies.get("GO_ANIMAPU_LOGIN_TOKEN"), params)
      var status = await response.status
      var body = await response.json()
      console.log("SAVING!", status, body)

    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setUserKlikMangaHistory()
  // eslint-disable-next-line
  }, [mangaDetail])

  useEffect(() => {
    history.listen(() => { history.go(0) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  // HIDING MANGA NAV START
  const escFunction = useCallback((event) => {
    if (window.scrollY === 0) {
      setShowMangaNav(true)
      // eslint-disable-next-line
      y_pos = window.scrollY
    } else if (window.scrollY > y_pos + 75) {
      setShowMangaNav(false)
      y_pos = window.scrollY
    } else if (window.scrollY <= y_pos) {
      setShowMangaNav(true)
      y_pos = window.scrollY
    }

    // eslint-disable-next-line
  }, [showMangaNav])

  useEffect(() => {
    document.addEventListener("scroll", escFunction, false)
    return () => {
      document.removeEventListener("scroll", escFunction, false)
    }
  }, [escFunction])
  // HIDING MANGA NAV END

  return(
    <div>
      <div className="content-wrapper py-2" style={{backgroundColor: "#454d55"}}>
        {chapterPages.map(((pageFileName, index) => (
          <div className="bg-dark border-left border-right border-dark rounded" key={`MANGA-CHAPTER-IMAGE-${index}`}>
            <img
              className="bd-placeholder-img mx-auto d-block img-fluid"
              src={pageFileName}
              alt={`page-${index}`}
            />
          </div>
        )))}

        <hr className="my-2" />
      </div>

      <RenderFooter />

      <ScrollToTop show={showMangaNav} />
      <Link
        to="/mangas/latest/klik_manga"
        className="bg-primary"
        onClick={() => history.push("/mangas/latest/klik_manga")}
        style={{
          display: (showMangaNav === false ? "none" : "block"),
          position:"fixed",
          width:"50px",
          height:"50px",
          bottom:"95px",
          right:"30px",
          color:"#FFF",
          borderRadius:"50px",
          textAlign:"center"
        }}
      >
        <i className="fa fa-home" style={{marginTop:"17px"}}></i>
      </Link>
    </div>
  )

  function RenderFooter() {
    if (showMangaNav === false) return(<div></div>)
    return(
      <footer className="main-footer bg-dark">
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th>
                <button className="btn btn-light btn-block btn-outline-secondary mx-1 my-1" onClick={() => toPrevChapter()}><i className="fa fa-reply"></i></button>
              </th>
              <th>
                <Select
                  options={chapterOptions}
                  menuPlacement={"top"}
                  className="text-black bg-white ml-3 mr-2 my-1"
                  defaultValue={chapterOptions[currentChapterIDX]}
                  onChange={(e) => handleSelectChapter(e)}
                />
              </th>
              <th>
                <button className="btn btn-light btn-block btn-outline-secondary mx-1 my-1" onClick={() => toNextChapter()}><i className="fa fa-share"></i></button>
              </th>
            </tr>
          </thead>
        </table>
      </footer>
    )
  }

}

export default PageMangasReadKlikManga
