import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import Select from 'react-select'

import mangadexApi from "../apis/MangadexAPI"

function PageMangasDetailMangadex() {
  const history = useHistory()

  let { manga_id } = useParams()
  let { chapter_id } = useParams()
  let { chapter_hash } = useParams()

  const [currentChapterIDX, setCurrentChapterIDX] = useState(0)
  const [chapterPages, setChapterPages] = useState([])
  const [chapterOptions, setChapterOptions] = useState([
    { value: 'N/A', label: 'Loading...' }
  ])

  async function fetchMangaChapters() {
    try {
      var response = await mangadexApi.GetMangaChapters(manga_id)
      var status = await response.status
      var body = await response.json()

      console.log("CHAPTERS", status, body)

      if (status === 200) {
        var tempResults = body.results
        tempResults = tempResults.sort((a,b) => (parseFloat(a.data.attributes.chapter) > parseFloat(b.data.attributes.chapter)) ? 1 : ((parseFloat(b.data.attributes.chapter) > parseFloat(a.data.attributes.chapter)) ? -1 : 0))

        tempResults = tempResults.map((val, idx) => {
          if (val.data.id === chapter_id) {
            setCurrentChapterIDX(idx)
          }
          return { value: `${val.data.id}/${val.data.attributes.hash}`, label: val.data.attributes.chapter }
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

  useEffect(() => {
    console.log("TRIGGERED")
    fetchMangaChapters()
    fetchChapterPages()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    history.listen(() => {
      history.go(0)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        {chapterPages.map(((pageFileName, index) => (
          <div className="bg-dark border-left border-right border-dark rounded" key={`MANGA-CHAPTER-IMAGE-${index}`}>
            <img
              className="bd-placeholder-img mx-auto d-block img-fluid"
              src={mangadexApi.ConstructChapterPage("", "", chapter_hash, pageFileName)}
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
    return(
      <footer className="main-footer bg-dark">
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th>
                <Select
                  options={chapterOptions}
                  menuPlacement={"top"}
                  className="text-black bg-white"
                  defaultValue={chapterOptions[currentChapterIDX]}
                  onChange={(e) => handleSelectChapter(e)}
                />
              </th>
            </tr>
          </thead>
        </table>
      </footer>
    )
  }

}

export default PageMangasDetailMangadex
