import React, {useState, useEffect, useCallback} from "react"
import {useParams, useHistory} from "react-router-dom"
import Select from 'react-select'

import goAnimapuApi from "../../apis/GoAnimapuAPI"

var y_pos = 0

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
