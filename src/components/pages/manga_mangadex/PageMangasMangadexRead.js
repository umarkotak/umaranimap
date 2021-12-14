import React, {useState, useEffect, useCallback} from "react"
import {useParams, useHistory} from "react-router-dom"
import Select from 'react-select'

import mangadexApi from "../../apis/MangadexAPI"
import ScrollToTop from "../../ui-components/ScrollToTop"

var y_pos = 0

function PageMangasReadMangadex() {
  const history = useHistory()

  let { manga_id } = useParams()
  let { chapter_id } = useParams()
  let { chapter_hash } = useParams()

  const [currentChapterIDX, setCurrentChapterIDX] = useState(0)
  const [chapterPages, setChapterPages] = useState([])
  const [chapterOptions, setChapterOptions] = useState([
    { value: 'N/A', label: 'Loading...' }
  ])
  const [showMangaNav, setShowMangaNav] = useState(true)

  async function fetchMangaChapters() {
    try {
      var response = await mangadexApi.GetMangaChapters(manga_id)
      var status = await response.status
      var body = await response.json()

      console.log("CHAPTERS", status, body)

      if (status === 200) {
        var tempResults = body.data
        tempResults = tempResults.sort((a,b) => (parseFloat(a.attributes.chapter) > parseFloat(b.attributes.chapter)) ? 1 : ((parseFloat(b.attributes.chapter) > parseFloat(a.attributes.chapter)) ? -1 : 0))

        tempResults = tempResults.map((val, idx) => {
          if (val.id === chapter_id) {
            setCurrentChapterIDX(idx)
          }
          return { value: `${val.id}/${val.attributes.hash}`, label: val.attributes.chapter }
        })
        setChapterOptions(tempResults)
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function fetchChapterPages() {
    try {
      if (!chapter_id) {return}

      var params = {
        chapterID: chapter_id
      }
      var response = await mangadexApi.GetMangaChapterDetail(params)
      var status = await response.status
      var body = await response.json()

      console.log("PAGES", status, body)

      if (status === 200) {
        setChapterPages(body.data.attributes.data)
      }
    } catch(e) {
      console.log(e)
    }
  }

  function handleSelectChapter(e) {
    history.push(`/mangas/read/mangadex/${manga_id}/${e.value}`)
  }

  function toPrevChapter() {
    if (!chapterOptions[currentChapterIDX-1]) { return }
    history.push(`/mangas/read/mangadex/${manga_id}/${chapterOptions[currentChapterIDX-1].value}`)
  }

  function toNextChapter() {
    if (!chapterOptions[currentChapterIDX+1]) { return }
    history.push(`/mangas/read/mangadex/${manga_id}/${chapterOptions[currentChapterIDX+1].value}`)
  }

  useEffect(() => {
    fetchMangaChapters()
    fetchChapterPages()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    history.listen(() => { history.go(0) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  // HIDING MANGA NAV START
  const escFunction = useCallback((event) => {
    // console.log("SCROLLER START", window.scrollY, y_pos)

    if (window.scrollY === 0) {
      // console.log("SCROLLER-1")
      setShowMangaNav(true)
      // eslint-disable-next-line
      y_pos = window.scrollY
    } else if (window.scrollY > y_pos + 75) {
      // console.log("SCROLLER-2")
      setShowMangaNav(false)
      y_pos = window.scrollY
    } else if (window.scrollY <= y_pos) {
      // console.log("SCROLLER-3")
      setShowMangaNav(true)
      y_pos = window.scrollY
    }
    // console.log("SCROLLER END", window.scrollY, y_pos)

    // eslint-disable-next-line
  }, [showMangaNav])

  useEffect(() => {
    document.addEventListener("scroll", escFunction, false)
    return () => {
      document.removeEventListener("scroll", escFunction, false)
    }
  }, [escFunction])
  // HIDING MANGA NAV END

  function handleImageFallback(pageFileName, e) {
    e.target.src = mangadexApi.ConstructChapterPage("", "", chapter_hash, pageFileName)
  }

  return(
    <div>
      <div className="content-wrapper py-2" style={{backgroundColor: "#454d55"}}>
        {chapterPages.map(((pageFileName, index) => (
          <div className="bg-dark border-left border-right border-dark rounded" key={`MANGA-CHAPTER-IMAGE-${index}`}>
            <img
              className="bd-placeholder-img mx-auto d-block img-fluid"
              src={mangadexApi.ConstructChapterPage("", "", chapter_hash, pageFileName)}
              alt={`page-${index}`}
              onError={(e) => handleImageFallback(pageFileName, e)}
            />
          </div>
        )))}

        <hr className="my-2" />
      </div>

      <ScrollToTop show={showMangaNav} />
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

export default PageMangasReadMangadex
