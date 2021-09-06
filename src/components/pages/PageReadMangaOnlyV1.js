import React, {useState, useCallback, useEffect, useRef} from "react"
import Cookies from 'universal-cookie'
import {Link, useParams, useHistory} from "react-router-dom"
import {WhatsappShareButton} from "react-share"
import InfiniteScroll from 'react-infinite-scroll-component';
import dataStoreCommon from "../utils/DataStoreCommon"

const cookies = new Cookies()
var cdn_host = dataStoreCommon.ConstructURI("MANGAHUB_CDN_HOST", "/file/imghub")
var animapu_host = dataStoreCommon.GetConf()["ANIMAPU_HOST"]

var qs = require('qs')
function query_last_chapter() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).last_chapter
}
function query_chapter_size() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).chapter_size
}

function PageReadMangaOnlyV1() {
  let history = useHistory();

  let { path_title } = useParams();
  let { path_chapter } = useParams();

  const manga_title = path_title
  const [manga_chapter, set_manga_chapter] = useState(path_chapter)
  const manga_last_chapter = query_last_chapter()
  const manga_chapter_size = query_chapter_size() || 150
  var manga_pages = generateMangaPages(manga_chapter_size)
  var next_manga_chapter = parseInt(manga_chapter) === parseInt(manga_last_chapter) ? manga_last_chapter : parseInt(manga_chapter) + 1
  var prev_manga_chapter = parseInt(manga_chapter) === 1 ? parseInt(manga_chapter) : parseInt(manga_chapter) - 1
  const loadCount = 10
  const [count, setCount] = useState({
    prev: 0,
    next: loadCount
  })
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(manga_pages.slice(count.prev, count.next))
  const getMoreData = () => {
    if (current.length === manga_chapter_size) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      // console.log("triggered")
      setCurrent(current.concat(manga_pages.slice(count.prev + loadCount, count.next + loadCount)))
    }, 500)
    setCount((prevState) => ({ prev: prevState.prev + loadCount, next: prevState.next + loadCount }))
  }

  useEffect(() => {
    // console.log("RUN ONCE")
    window.scrollTo(0, 0)
    set_manga_chapter(path_chapter)
    postUserEvent()
    setHistoriesToFireBase()
    setCookies()
    // eslint-disable-next-line
  }, [path_chapter])

  const [manga_chapter_list, set_manga_chapter_list] = useState(generateChapterListFromTitle())

  async function fetchMangaDetail() {
    var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", `/mangas_detail?manga_title=${manga_title}`)
    const response = await fetch(api)
    const results = await response.json()
    // console.log(results)

    if (!Array.isArray(results.chapters)) {
      results.chapters=[]
      return
    }

    if (!response.ok) {
      return
    }

    return results
  }

  useEffect(() => {
    async function fetchData() {
      var results = await fetchMangaDetail()

      set_manga_chapter_list(results.chapters)
    }
    fetchData()
    // eslint-disable-next-line
  }, [manga_title])

  // var manga_chapter_list = generateChapterListFromTitle()
  const [bottom_nav, set_bottom_nav] = useState(true)
  var y_pos = 0
  const [button_share, set_button_share] = useState("📑 Copy Link")

  const shareable_link = reconstruct_shareable

  // const windowHeight = window.innerHeight
  // const body = document.body
  // const html = document.documentElement
  // const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)

  const escFunction = useCallback((event) => {
    // const windowBottom = windowHeight + window.pageYOffset

    if (event.keyCode === 39) {
      history.push(`/read-manga-only-v1/${manga_title}/${next_manga_chapter}?last_chapter=${manga_last_chapter}&chapter_size=${manga_chapter_size}`);
    } else if (event.keyCode === 37) {
      history.push(`/read-manga-only-v1/${manga_title}/${prev_manga_chapter}?last_chapter=${manga_last_chapter}&chapter_size=${manga_chapter_size}`);
    }

    if (window.scrollY === 0) {
      set_bottom_nav(true)
      // eslint-disable-next-line
      y_pos = window.scrollY
    } else if (window.scrollY > y_pos + 75) {
      set_bottom_nav(false)
      y_pos = window.scrollY
    } else if (window.scrollY < y_pos) {
      set_bottom_nav(true)
      y_pos = window.scrollY
    }

    // eslint-disable-next-line
  }, [history, set_bottom_nav])

  useEffect(() => {
    document.addEventListener("keyup", escFunction, false)
    document.addEventListener("scroll", escFunction, false)

    return () => {
      document.removeEventListener("keyup", escFunction, false)
      document.removeEventListener("scroll", escFunction, false)
    }
  }, [escFunction])

  const textAreaRef = useRef(null)

  async function postUserEvent() {
    if (!manga_title && !manga_chapter) {
      // console.log("NOT SENDING USER EVENT")
      return
    }
    try {
      // const response = await fetch(`${go_animapu_host}/users/analytic_v1`, {
      await fetch(dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", `/users/analytic_v1`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MangaPage: manga_chapter,
          MangaTitle: manga_title,
        })
      })
      // console.log("RESULT: ", response.json(), response.status)

    } catch (e) {
      // console.log("USER EVENT LOG: ", e.message)
    }
  }

  async function setHistoriesToFireBase() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      // console.log("NOT SETTING HISTORY")
      return
    }

    if (!manga_title && !manga_chapter) {
      // console.log("NOT SETTING HISTORY")
      return
    }

    try {
      await fetch(dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", `/users/read_histories`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        },
        body: JSON.stringify({
          last_chapter: `${path_chapter}`,
          manga_title: manga_title
        })
      })
      // console.log("SUCCESS STORE TO FIREBASE", path_chapter)

    } catch (e) {
      // console.log("STORE TO FIREBASE ERROR", e.message)
    }
  }

  function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

  function reconstruct_shareable() {
    var beauty_title = manga_title.replaceAll('-',' ')
    beauty_title = capitalizeTheFirstLetterOfEachWord(beauty_title)
    var shareLink = `${animapu_host}/read-manga-only-v1/${manga_title}/${manga_chapter}`
    return `Come and read your favorite manga on Animapu! *${beauty_title}* Chapter *${manga_chapter}*. Link: *${shareLink}*`
  }

  function copyToClipboard(e) {
    textAreaRef.current.value = reconstruct_shareable()
    textAreaRef.current.select()
    document.execCommand('copy')

    set_button_share("Copied")
  }

  async function addToGenericLibrary() {
    if (!manga_title && !manga_chapter) {
      console.log("Invalid!")
      return
    }
    if (!cookies.get("GO_ANIMAPU_LOGIN_TOKEN")) {
      console.log("Unauthorized!")
      return
    }
    try {
      var payload = {
        "title": manga_title,
        "manga_last_chapter": parseInt(manga_chapter_list[0]) || 150,
        "image_url": ""
      }
      fetch(dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", `/mangas/general/add`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        },
        body: JSON.stringify(payload)
      })
      alert("SUCCESS!")

    } catch (e) {}
  }

  async function removeFromGenericLibrary() {
    if (!manga_title && !manga_chapter) {
      console.log("Invalid!")
      return
    }
    if (!cookies.get("GO_ANIMAPU_LOGIN_TOKEN")) {
      console.log("Unauthorized!")
      return
    }
    if (!window.confirm("Are you sure removing this?")) {
      return
    }

    try {
      var payload = {"title": manga_title}
      fetch(dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", `/mangas/general/delete`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        },
        body: JSON.stringify(payload)
      })

    } catch (e) {}
  }

  function handleChangeMangaChapter(no_chapter) {
    history.push(`/read-manga-only-v1/${manga_title}/${no_chapter}?last_chapter=${manga_last_chapter}&chapter_size=${manga_chapter_size}`);
  }

  function generateMangaPages(last_chapter) {
    if (!manga_title && !manga_chapter) {
      // console.log("NOT SETTING MANGA PAGES")
      return []
    }
    var pages = []
    for (let i = 1; i <= last_chapter; i++) { pages.push(i) }
    return pages
  }

  function generateImageURL(page_no) {
    return `${cdn_host}/${manga_title}/${manga_chapter}/${page_no}.jpg`
  }

  function generateImageErrorUrl(page_no) {
    return `${cdn_host}/${manga_title}/${manga_chapter}/${page_no}.png`
  }

  function generateImageJPEG(page_no) {
    return `${cdn_host}/${manga_title}/${manga_chapter}/${page_no}.jpeg`
  }

  function generateImageWEBP(page_no) {
    return `${cdn_host}/${manga_title}/${manga_chapter}/${page_no}.webp`
  }

  function generateChapterListFromTitle() {
    var chapters = []
    for (let i = 1; i <= manga_last_chapter; i++) { chapters.push(i) }
    return chapters
  }

  function setCookies() {
    if (!manga_title && !manga_chapter) {
      // console.log("NOT STORING TO COOKIES")
      return
    }
    if (manga_title === "-- select manga title --") {
      return
    }

    var key = `${manga_title}/last_read_chapter`
    var value = path_chapter
    // let date = new Date(2030, 12)
    // cookies.set(key, value, { path: "/", expires: date })
    localStorage.setItem(key, value)

    if (cookies.get("GO_ANIMAPU_LOGGED_IN") === "true") {
      key = `${manga_title}/last_read_chapter`
      value = path_chapter
      localStorage.setItem(key, value)
    }

    setMangaHistories()
  }

  function setMangaHistories() {
    if (manga_title[0] === "-") return
    var key = "last_manga_reads"

    var last_manga_reads = []

    try {
      last_manga_reads = JSON.parse(localStorage.getItem(key))

    } catch (error) {
      last_manga_reads = []
    }

    var value = manga_title

    // postUserEvent()

    // console.log("last_manga_reads", last_manga_reads)
    try {
      if (last_manga_reads.length >= 1) {

        var index = last_manga_reads.indexOf(manga_title)
        if (index !== -1) last_manga_reads.splice(index, 1)
        last_manga_reads.unshift(manga_title)

        var last_manga_reads_json = JSON.stringify(last_manga_reads)
        // cookies.set(key, last_manga_reads, { path: "/", expires: date })
        localStorage.setItem(key, last_manga_reads_json)
      } else {
        // cookies.set(key, [value], { path: "/", expires: date })
        localStorage.setItem(key, `["${value}"]`)
      }

    } catch (error) {
      localStorage.setItem(key, `["${value}"]`)

    }

    set_button_share("❏ Copy Link")

    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }
  }

  var hist = {}
  function handleImageFallback(val, e) {
    if (!hist[val]) { hist[val] = {} }

    if (hist[val] && !hist[val]["png"]) {
      hist[val]["png"] = "tried"
      e.target.src = generateImageErrorUrl(val)
    } else if (hist[val] && !hist[val]["jpeg"]) {
      hist[val]["jpeg"] = "tried"
      e.target.src = generateImageJPEG(val)
    } else if (hist[val] && !hist[val]["webp"]) {
      hist[val]["webp"] = "tried"
      e.target.src = generateImageWEBP(val)
    } else {
      e.target.src = window.location.origin + "/default-image.png"
    }
  }

  return (
    <div>
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <RenderHead />

        <div className="" key={manga_chapter}>
          <InfiniteScroll
            dataLength={current.length}
            next={getMoreData}
            hasMore={hasMore}
            loader={<h4></h4>}
          >
            {current && current.map(((value, index) => (
              <div className="bg-dark border-left border-right border-dark rounded" key={generateImageURL(value)}>
                <img
                  className="bd-placeholder-img mx-auto d-block img-fluid"
                  src={generateImageURL(value)}
                  alt=""
                  onError={(e) => handleImageFallback(value, e)}
                />
              </div>
            )))}
          </InfiniteScroll>
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
      </div>

      <RenderFoot />
    </div>
  )

  function RenderHead() {
    if (bottom_nav === false) return(<div></div>)
    return(
      <div className="sticky-top bg-dark px-3">
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th><button className="btn btn-light btn-sm btn-block btn-outline-info mx-1 my-1" onClick={copyToClipboard}>{button_share}</button></th>
              <th>
                <div className="btn btn-light btn-sm btn-block btn-outline-info mx-1 my-1">
                  <WhatsappShareButton url={reconstruct_shareable()} children={"⇪ Share WhatsApp"} />
                </div>
              </th>
              <th><button className="btn btn-light btn-sm btn-block btn-outline-info mx-1 my-1" onClick={addToGenericLibrary}>+</button></th>
              <th><button className="btn btn-light btn-sm btn-block btn-outline-info mx-1 my-1" onClick={removeFromGenericLibrary}>-</button></th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }

  function RenderFoot() {
    if (bottom_nav === false) return(<div></div>)
    return(
      <footer className="main-footer bg-dark">
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th>
                <Link className="btn btn-light btn-block btn-outline-secondary mx-1 my-1" to={`/read-manga-only-v1/${manga_title}/${prev_manga_chapter}?last_chapter=${manga_last_chapter}&chapter_size=${manga_chapter_size}`}>
                  Prev
                </Link>
              </th>
              <th>
                <Link className="btn btn-light btn-block btn-outline-secondary mx-1 my-1" to="/manga-library-v1">Menu</Link>
              </th>
              <th>
                <select className="custom-select mx-1 my-1" name="selectedMangaTitle" onChange={(e) => handleChangeMangaChapter(e.target.value)} defaultValue={manga_chapter}>
                  {manga_chapter_list.map(chapter => (
                    <option key={chapter} value={chapter}> Chapter {chapter} </option>
                  ))}
                </select>
              </th>
              <th>
                <Link className="btn btn-light btn-block btn-outline-secondary mx-1 my-1" to={`/read-manga-only-v1/${manga_title}/${next_manga_chapter}?last_chapter=${manga_last_chapter}&chapter_size=${manga_chapter_size}`}>
                  Next
                </Link>
              </th>
            </tr>
          </thead>
        </table>
      </footer>
    )
  }


}

export default PageReadMangaOnlyV1
