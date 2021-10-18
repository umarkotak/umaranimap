import React, {useState, useEffect, useCallback} from "react"
import Select from 'react-select'

var y_pos = 0

const defaultIndex = 0
const SOURCE_OPTIONS = [
  // {idx: 0, value: "manga_mangahub", view_port: "13000vh", source: "https://mangahub.io/", label: "Manga | EN | Mangahub"},
  {idx: 0, value: "manga_komiku", view_port: "1000vh", source: "https://komiku.id/", label: "Manga | ID | Komiku"},
  {idx: 1, value: "manga_komikid", view_port: "850vh", source: "https://www.komikid.com/", label: "Manga | ID | KomikID"},
  {idx: 2, value: "manga_maidmy", view_port: "550vh", source: "https://www.maid.my.id/", label: "Manga | ID | MaidMy"},
  {idx: 3, value: "manga_mangahere", view_port: "550vh", source: "http://mangahere.today/", label: "Manga | EN | MangaHere"},
  {idx: 4, value: "anime_animepahe", view_port: "200vh", source: "https://animepahe.com/", label: "Anime | EN | Animepahe"}
]

function PageOriginalSources() {
  const [sourceUrl, setSourceUrl] = useState(SOURCE_OPTIONS[defaultIndex].source)
  const [activeHeight, setActiveHeight] = useState(SOURCE_OPTIONS[defaultIndex].view_port)
  const [activeValueIndex, setActiveValueIndex] = useState(0)

  function handleSelectSource(e) {
    console.log("SOURCE SELECTED", e)
    setActiveValueIndex(e.idx)
    setSourceUrl(e.source)
    setActiveHeight(e.view_port)
  }

  // HIDING MANGA NAV START
  const [showMangaNav, setShowMangaNav] = useState(true)
  const escFunction = useCallback((event) => {
    console.log("SCROLLER START", window.scrollY, y_pos)

    if (window.scrollY === 0) {
      console.log("SCROLLER-1")
      setShowMangaNav(true)
      // eslint-disable-next-line
      y_pos = window.scrollY
    } else if (window.scrollY > y_pos + 75) {
      console.log("SCROLLER-2")
      setShowMangaNav(false)
      y_pos = window.scrollY
    } else if (window.scrollY <= y_pos) {
      console.log("SCROLLER-3")
      setShowMangaNav(true)
      y_pos = window.scrollY
    }
    console.log("SCROLLER END", window.scrollY, y_pos)

    // eslint-disable-next-line
  }, [showMangaNav])

  useEffect(() => {
    document.addEventListener("scroll", escFunction, false)
    return () => {
      document.removeEventListener("scroll", escFunction, false)
    }
  }, [escFunction])
  // HIDING MANGA NAV END

  return (
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <iframe
          title="animepahe"
          src={sourceUrl}
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
          allow="fullscreen"
          style={{
            "display": "block",
            "border": "none",
            "overflow": "hidden",
            "height": activeHeight,
            "width": "100%"
          }}
          width="100%"
          frameBorder="0"
        >
        </iframe>
      </div>

      <RenderFooter />
    </div>
  )

  function RenderFooter() {
    if (showMangaNav === false) return(<div></div>)
    return(
      <footer className="main-footer bg-dark">
        <Select
          options={SOURCE_OPTIONS}
          menuPlacement={"top"}
          className="text-black bg-white ml-3 mr-2 my-1"
          defaultValue={SOURCE_OPTIONS[defaultIndex]}
          value={SOURCE_OPTIONS[activeValueIndex]}
          onChange={(e) => handleSelectSource(e)}
        />
      </footer>
    )
  }
}

export default PageOriginalSources
