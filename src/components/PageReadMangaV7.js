import React, {useState, useCallback, useEffect, useRef} from "react"
import mangaDB from "./MangaDB"
import Cookies from 'universal-cookie';
import {WhatsappShareButton} from "react-share";

const cookies = new Cookies();
var cdn_host = "https://img.mghubcdn.com/file/imghub"
var go_animapu_host = "http://go-animapu2.herokuapp.com"
var animapu_host = "http://animapu.herokuapp.com"

var qs = require('qs');
function query_title() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).title
}
function query_chapter() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).chapter
}

function PageReadMangaV7() {
  const [manga_db, set_manga_db] = useState(mangaDB.GetMangaDB())
  const [new_mangas, set_new_mangas] = useState(mangaDB.GetNewManga())

  var manga_list = generateMangaListFromDB()

  const [manga_title, set_manga_title] = useState(query_title() || manga_list[0])
  var manga_pages = generateMangaPages(manga_title)

  const [page_loading_state, set_page_loading_state] = useState("true")
  const [new_manga_check_update, set_new_manga_check_update] = useState(" - finding new chapter . . .")
  const [manga_chapter_list, set_manga_chapter_list] = useState(generateChapterListFromTitle(manga_title))
  const [manga_chapter, set_manga_chapter] = useState(query_chapter() || findLatestMangaChapter(manga_title))
  const [manga_histories, set_manga_histories] = useState(generateHistoriesSection())
  const [bottom_nav, set_bottom_nav] = useState(true)
  const [y_pos, set_y_pos] = useState(window.scrollY)
  const [button_share, set_button_share] = useState("Share");

  const [shareable_link, set_shareable_link] = useState(reconstruct_shareable)

  const windowHeight = window.innerHeight
  const body = document.body
  const html = document.documentElement
  const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)

  const escFunction = useCallback((event) => {
    const windowBottom = windowHeight + window.pageYOffset

    if (event.keyCode === 39) {
      handleNextPage()
    } else if (event.keyCode === 37) {
      handlePreviousPage()
    }

    if (window.scrollY === 0) {
      set_bottom_nav(true)
      set_y_pos(window.scrollY)
    } else if (windowBottom >= docHeight) {
      set_bottom_nav(true)
      set_y_pos(window.scrollY)
    } else if (window.scrollY > y_pos + 75) {
      set_bottom_nav(false)
      set_y_pos(window.scrollY)
    } else if (window.scrollY < y_pos) {
      set_bottom_nav(true)
      set_y_pos(window.scrollY)
    }

    // eslint-disable-next-line
  }, [handlePreviousPage, handleNextPage, set_bottom_nav])
  useEffect(() => {
    document.addEventListener("keyup", escFunction, false)
    document.addEventListener("scroll", escFunction, false)

    return () => {
      document.removeEventListener("keyup", escFunction, false)
      document.removeEventListener("scroll", escFunction, false)
    };
  }, [escFunction]);

  const textAreaRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      var api = `${go_animapu_host}/mangas/firebase`
      const response = await fetch(api)
      const results = await response.json()
      var converted_manga_db = new Map(Object.entries(results.manga_db))
      set_manga_db(converted_manga_db)

      var new_mangas = []
      converted_manga_db.forEach((num, key) => {
        if (num.new_added > 0) {
          new_mangas.push({title: key, order: num.new_added})
        }
      })
      new_mangas.sort((a, b) => a.order - b.order)

      set_new_mangas(new_mangas.map(val => val.title))
      set_page_loading_state("false")
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function updateData() {
      var api = `${go_animapu_host}/mangas/firebase/update`
      const response = await fetch(api)
      const results = await response.json()
      var converted_manga_db = new Map(Object.entries(results.manga_db))
      set_manga_db(converted_manga_db)

      var new_mangas = []
      converted_manga_db.forEach((num, key) => {
        if (num.new_added > 0) {
          new_mangas.push({title: key, order: num.new_added})
        }
      })
      new_mangas.sort((a, b) => a.order - b.order)

      set_new_mangas(new_mangas.map(val => val.title))
      set_new_manga_check_update("")
    }
    updateData();
  }, []);

  async function postUserEvent() {
    try {
      const response = await fetch('http://go-animapu2.herokuapp.com/users/analytic_v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MangaPage: manga_chapter,
          MangaTitle: manga_title,
        })
      })
      console.log("RESULT: ", response.json(), response.status)

    } catch (e) {
      console.log("USER EVENT LOG: ", e.message);
    }
  }

  function generate_manga_airing_status(manga_title) {
    try {
      return (manga_db.get(manga_title).status === "ongoing") ? "border-primary" : "border-success"
    } catch (error) {
      console.log("error:generate_manga_airing_status", error, manga_title)
      return "border-primary"
    }
  }

  function reconstruct_shareable() {
    return `${animapu_host}/read-manga-v7?title=${manga_title}&chapter=${manga_chapter}`
  }

  function copyToClipboard(e) {
    textAreaRef.current.value = reconstruct_shareable()
    textAreaRef.current.select();
    document.execCommand('copy');

    set_button_share("Copied")
  }

  function handleSelectedMangaTitle(title) {
    set_manga_title(title)
    var last_chapter = manga_db.get(title).manga_last_chapter
    set_manga_chapter_list(generateChapterListFromLastChapter(parseInt(last_chapter)))
    set_manga_chapter(findLatestMangaChapter(title))
    setMangaHistores()
    window.scrollTo(0, 0)
  }

  function handleSelectedMangaChapter(chapter) {
    set_manga_chapter(chapter)
    setCookies(chapter)
    window.scrollTo(0, 0)
  }

  // eslint-disable-next-line
  function handlePreviousPage() {
    if (parseInt(manga_chapter) === 1) {return true}
    var last_chapter = manga_db.get(manga_title).manga_last_chapter
    set_manga_chapter_list(generateChapterListFromLastChapter(last_chapter))
    set_manga_chapter(parseInt(manga_chapter) - 1)
    setCookies(parseInt(manga_chapter) - 1)
    window.scrollTo(0, 0)
  }

  // eslint-disable-next-line
  function handleNextPage() {
    var last_chapter = manga_db.get(manga_title).manga_last_chapter
    if (parseInt(manga_chapter) === last_chapter) {return true}
    set_manga_chapter_list(generateChapterListFromLastChapter(last_chapter))
    set_manga_chapter(parseInt(manga_chapter) + 1)
    setCookies(parseInt(manga_chapter) + 1)
    window.scrollTo(0, 0)
  }

  function handleClearHistory() {
    var key = "last_manga_reads"
    let date = new Date(2030, 12)
    cookies.set(key, [], { path: "/", expires: date })
    set_manga_histories([])
    set_shareable_link(reconstruct_shareable())
  }

  function findLatestMangaChapter(title) {
    var key = `${title}/last_read_chapter`
    var chapter = cookies.get(key)

    if (typeof chapter !== "undefined") {
      return parseInt(chapter)
      // eslint-disable-next-line
    } else if (typeof chapter === "NaN") {
      return 1
    } else {
      return 1
    }
  }

  function generateMangaPages(title) {
    var page_count = manga_db.get(title).average_page
    var pages = []
    for (let i = 1; i <= page_count; i++) { pages.push(i) }
    return pages
  }

  function generateImageURL(page_no) {
    return `${cdn_host}/${manga_title}/${manga_chapter}/${page_no}.jpg`
  }

  function generateImageErrorUrl(page_no) {
    return `${cdn_host}/${manga_title}/${manga_chapter}/${page_no}.png`
  }

  function generateMangaListFromDB() {
    var manga_title_list = []
    for (let manga_title of manga_db.keys()) {
      manga_title_list.push(manga_title)
    }
    return manga_title_list
  }

  function generateChapterListFromTitle(title) {
    var last_chapter = manga_db.get(title).manga_last_chapter
    var chapters = []
    for (let i = 1; i <= last_chapter; i++) { chapters.push(i) }
    return chapters
  }

  function generateChapterListFromLastChapter(last_chapter) {
    var chapters = []
    for (let i = 1; i <= last_chapter; i++) { chapters.push(i) }
    return chapters
  }

  function generateMangaTitleText(raw_title) {
    if (raw_title[0] === "-") { return raw_title }

    var title = beutifyChapterTitle(raw_title)
    var last_read = findLatestMangaChapter(raw_title)
    var last_chapter = manga_db.get(raw_title).manga_last_chapter
    var status = manga_db.get(raw_title).status

    return `( ${last_read} / ${last_chapter} ) - ${title} - ${status}`
  }

  function generateThumbnailFromTitle(title) {
    return `https://thumb.mghubcdn.com/mn/${title}.jpg`
  }

  function generateHistoriesSection() {
    var key = "last_manga_reads"
    var last_manga_reads = cookies.get(key)
    if (Array.isArray(last_manga_reads)) {
      return last_manga_reads
    } else {
      return []
    }
  }

  function setCookies(chapter) {
    var key = `${manga_title}/last_read_chapter`
    var value = chapter
    let date = new Date(2030, 12)
    cookies.set(key, value, { path: "/", expires: date })
    setMangaHistores()
  }

  function setMangaHistores() {
    if (manga_title[0] === "-") return
    var key = "last_manga_reads"
    var last_manga_reads = cookies.get(key)
    var value = manga_title
    let date = new Date(2030, 12)

    postUserEvent()

    if (Array.isArray(last_manga_reads)) {
      var index = last_manga_reads.indexOf(manga_title);
      if (index !== -1) last_manga_reads.splice(index, 1);
      last_manga_reads.unshift(manga_title)
      cookies.set(key, last_manga_reads, { path: "/", expires: date })
      set_manga_histories(last_manga_reads)
    } else {
      cookies.set(key, [value], { path: "/", expires: date })
      set_manga_histories([value])
    }
    set_button_share("Share")
  }

  function beutifyChapterTitle(raw_title) {
    var title = raw_title.replace(/-/g, " ")
    title = title.toLowerCase().split(" ");
    for (var i = 0; i < title.length; i++) {
        title[i] = title[i].charAt(0).toUpperCase() + title[i].substring(1);
    }
    return title.join(" ")
  }

  return (
    <div>
      <div className="sticky-top bg-dark" style={{margin: "0px -14px 0px"}}>
        <RenderHead />
      </div>

      <div className="pb-5">
        <div>
          <RenderSuggestedManga isShown={manga_title[0]}/>
        </div>

        {manga_pages.map(page_no => (
          <div className="bg-dark border border-dark rounded mx-n2" key={generateImageURL(page_no)}>
            <img
              className="bd-placeholder-img mx-auto d-block img-fluid"
              src={generateImageURL(page_no)}
              alt=""
            />
            <img
              className="bd-placeholder-img mx-auto d-block img-fluid"
              src={generateImageErrorUrl(page_no)}
              alt=""
            />
          </div>
        ))}
      </div>

      <div className='form-group'>
        <form>
          <input
            readOnly
            className='form-control'
            type='text'
            style={{"display": "block"}}
            rows="10"
            display='none'
            ref={textAreaRef}
            defaultValue={shareable_link}
          />
        </form>
      </div>

      <div className="container fixed-bottom bg-dark">
        <RenderFoot />
      </div>
    </div>
  )

  function RenderHead() {
    if (bottom_nav === false) return(<div></div>)
    return(
      <div className="nav-scroller">
        <nav className="nav d-flex justify-content-between">
          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 my-1" onClick={copyToClipboard}>{button_share}</button>
          <div className="btn btn-light btn-sm btn-outline-secondary mx-1 my-1">
            <WhatsappShareButton url={reconstruct_shareable()} children={"WA"} />
          </div>
          <select className="custom-select mx-1 my-1" name="selectedMangaTitle" onChange={(e) => handleSelectedMangaTitle(e.target.value)} defaultValue={manga_title}>
            {manga_list.map(manga => (
              <option key={manga} value={manga}> {generateMangaTitleText(manga)} </option>
            ))}
          </select>
        </nav>
      </div>
    )
  }

  function RenderFoot() {
    if (bottom_nav === false) return(<div></div>)
    return(
      <div className="nav-scroller py-1 mb-3">
        <nav className="nav d-flex justify-content-between">
          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 px-2" onClick={() => handlePreviousPage()}>
            Prev
          </button>

          <button className="btn btn-light btn-sm btn-outline-secondary mx-1" onClick={() => handleSelectedMangaTitle(manga_list[0])}>Menu</button>
          <select className="custom-select mx-1" name="selectedMangaTitle" onChange={(e) => handleSelectedMangaChapter(e.target.value)} defaultValue={manga_chapter}>
            {manga_chapter_list.map(chapter => (
              <option key={chapter} value={chapter}> Chapter {chapter} </option>
            ))}
          </select>

          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 px-2" onClick={() => handleNextPage()}>
            Next
          </button>
        </nav>
      </div>
    )
  }

  function RenderSuggestedManga(props) {
    if (props.isShown !== '-') { return(<div></div>) }

    return(
      <div>
        <div>
          <div className="row">
            <div className="col-6"><h4>History</h4></div>
            <div className="col-6"><button className="float-right btn btn-sm btn-outline-secondary" onClick={() => handleClearHistory()} href="#">Clear History</button></div>
          </div>

          <div className="row flex-row flex-nowrap overflow-auto">
            {manga_histories.slice(0, 15).map(manga_title => (
              <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_history_list`} />
            ))}
          </div>

          <div className="row">
            <div className="col-6"><h4>New Manga{new_manga_check_update}</h4></div>
          </div>

          <RenderLoadingBar />
        </div>

        <h4>Manga List</h4>
        <div className="row">
          {manga_list.slice(1, manga_list.length).map(manga_title => (
            <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_list`} />
          ))}
        </div>
      </div>
    )
  }

  function RenderMangaCard(props) {
    if (props.manga_title[0] === "-") {return(<div></div>)}
    return(
      <div className="col-4 col-md-2">
        <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(props.manga_title)}`}>
          <div style={{height: "170px", backgroundSize: 'cover', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(props.manga_title)})`}}>
            <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>{`${findLatestMangaChapter(props.manga_title)}/${manga_db.get(props.manga_title).manga_last_chapter}`}</small>
            </div>
            <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>{props.manga_title}</small>
            </div>
          </div>
          <button type="button" className="btn btn-block btn-sm btn-outline-secondary" onClick={(e) => handleSelectedMangaTitle(e.target.value)} value={props.manga_title}>View</button>
        </div>
      </div>
    )
  }

  function RenderLoadingBar() {
    if (page_loading_state === "false") {
      return(
        <div className="row flex-row flex-nowrap overflow-auto">
          {new_mangas.map(manga_title => (
            <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_new_list`} />
          ))}
        </div>
      )
    }
    return(
      <div>
        <br/><div className="progress progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div><br/>
      </div>
    )
  }

}

export default PageReadMangaV7
