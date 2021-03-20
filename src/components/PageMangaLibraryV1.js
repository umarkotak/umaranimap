import React, {useState, useEffect} from "react"
import mangaDB from "./MangaDB"
import Cookies from 'universal-cookie'
import {Link} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

const cookies = new Cookies()
var go_animapu_host = "http://go-animapu.herokuapp.com"
// var go_animapu_host = "http://localhost:3005"

function PageMangaLibraryV1() {
  const [manga_db, set_manga_db] = useState(mangaDB.GetMangaDB())
  const [new_mangas, set_new_mangas] = useState(mangaDB.GetNewManga())
  const [my_read_later, set_my_read_later] = useState(mangaDB.GetMangaDB())

  var manga_list = generateMangaListFromDB()

  const [page_loading_state, set_page_loading_state] = useState("true")
  const [new_manga_check_update, set_new_manga_check_update] = useState(" - finding new chapter . . .")
  const [manga_histories, set_manga_histories] = useState(generateHistoriesSection())
  const [logged_in_manga_histories, set_logged_in_manga_histories] = useState([])
  const [history_loading_state, set_history_loading_state] = useState("true")
  const [manga_library_titles, set_manga_library_titles] = useState([])

  useEffect(() => {
    // console.log("RUN ONCE")
    window.scrollTo(0, 0)
  }, [])

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
    getUserDetailFromFirebase()
    getMyReadLater()
    fetchData()
  }, [])

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
    updateData()
  }, [])

  async function getUserDetailFromFirebase() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    const response = await fetch(`${go_animapu_host}/users/detail`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
      }
    })
    const results = await response.json()

    var manga_title_histories = []

    if (!results.read_histories) {
      set_history_loading_state("false")
      return
    }

    const mapped_manga_histories = new Map(Object.entries(results.read_histories))
    mapped_manga_histories.forEach((manga, key) => {
      manga_title_histories.push(manga)
      var manga_firebase_title = manga.manga_title
      var cache_key = `${manga_firebase_title}/last_read_chapter_logged_in`
      var value = manga.last_chapter
      // let date = new Date(2030, 12)
      // cookies.set(cache_key, value, { path: "/", expires: date })

      cache_key = `${manga_firebase_title}/last_read_chapter_logged_in`
      value = manga.last_chapter
      localStorage.setItem(cache_key, value)
    })
    manga_title_histories.sort((a, b) => b.last_read_time_i - a.last_read_time_i)
    var mapped_title_histories = manga_title_histories.map(val => val.manga_title)
    set_logged_in_manga_histories(mapped_title_histories)
    set_history_loading_state("false")
  }

  async function getMyReadLater() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    try {
      const response = await fetch(`${go_animapu_host}/users/manga_library`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        }
      })
      const results = await response.json()

      if (!results.my_libraries) {
        return
      }

      var tmp_manga_histories_arr = []
      const tmp_manga_histories_map = new Map(Object.entries(results.my_libraries))

      tmp_manga_histories_map.forEach((manga, key) => {
        tmp_manga_histories_arr.push(manga)
      })

      // TODO SHORT BY DATE ADDED
      tmp_manga_histories_arr.sort((a, b) => b.weight - a.weight)

      var tmp_manga_history_titles = tmp_manga_histories_arr.map(val => val.manga_title)
      set_my_read_later(tmp_manga_histories_map)
      set_manga_library_titles(tmp_manga_history_titles)

    } catch (error) {

    }

  }

  function generate_manga_airing_status(manga_title) {
    try {
      return (manga_db.get(manga_title).status === "ongoing") ? "border-primary" : "border-success"
    } catch (error) {
      return "border-primary"
    }
  }

  function handleClearHistory() {
    var key = "last_manga_reads"
    let date = new Date(2030, 12)
    cookies.set(key, [], { path: "/", expires: date })
    set_manga_histories([])
  }

  function findLatestMangaChapter(title) {
    var key = `${title}/last_read_chapter`
    var chapter = localStorage.getItem(key)

    if (chapter) {
      return parseInt(chapter)
    }

    return 1

    // if (typeof chapter !== "undefined") {
    //   return parseInt(chapter)
    // // eslint-disable-next-line
    // } else if (typeof chapter === "NaN") {
    //   return 1
    // } else {
    //   return 1
    // }
  }

  function findLatestMangaChapterLoggedIn(title) {
    var key = `${title}/last_read_chapter_logged_in`
    var chapter = localStorage.getItem(key)

    if (chapter) {
      return parseInt(chapter)
    }

    return findLatestMangaChapter(title)

    // if (typeof chapter !== "undefined") {
    //   return parseInt(chapter)
    // // eslint-disable-next-line
    // } else if (typeof chapter === "NaN") {
    //   return 1
    // } else {
    //   return 1
    // }
  }

  function findLastMangaChapter(title) {
    var last_chapter
    try {
      last_chapter = manga_db.get(title).manga_last_chapter

      if (typeof last_chapter === "undefined") {
        last_chapter = 150
      }

      if (last_chapter) {
        return last_chapter
      }

      last_chapter = 150
    } catch (error) {
      last_chapter = 150
    }
    return last_chapter
  }

  function generateMangaListFromDB() {
    var manga_title_list = []
    for (let manga_title of manga_db.keys()) {
      manga_title_list.push(manga_title)
    }
    return manga_title_list
  }

  function generateThumbnailFromTitle(title) {
    if (manga_db.get(title)) {
      if (manga_db.get(title).image_url !== "") {
        return manga_db.get(title).image_url
      } else {
        return `https://thumb.mghubcdn.com/mn/${title}.jpg`
      }
    }
    return `https://thumb.mghubcdn.com/mn/${title}.jpg`
  }

  function generateHistoriesSection() {
    var key = "last_manga_reads"
    var last_manga_reads = localStorage.getItem(key)

    try {
      last_manga_reads = JSON.parse(last_manga_reads)
    } catch (error) {
      return []
    }

    if (Array.isArray(last_manga_reads)) {
      return last_manga_reads
    } else {
      return []
    }
  }

  async function removeMangaLibrary(selected_title) {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    try {
      const response = await fetch('http://go-animapu.herokuapp.com/users/remove_manga_library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        },
        body: JSON.stringify({
          manga_title: selected_title
        })
      })
      const results = await response.json()
      const status = await response.status

      if (status === 200) {
        alert("manga successfully removed from library!")
        window.location.reload(false)
      } else {
        alert(results.message);
      }

    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <div className="pb-5">
        <div>
          <div className="row my-2">
            <div className="col-12">
              <Link to="/todays-manga-v1" className="btn btn-outline-success btn-sm float-right"><span role="img" aria-label="book">📔</span> Latest</Link>
              <Link to="/search-manga-v1" className="btn btn-outline-success btn-sm float-right mx-3"><span role="img" aria-label="search">🔍</span> Search</Link>
              <button className="float-right btn btn-sm btn-outline-danger" onClick={() => handleClearHistory()} href="#"><span role="img" aria-label="bin">🗑</span> Clear History</button>
            </div>
          </div>
          <div><h4>History</h4></div>

          <RenderHistoriesSection />

          <div className="row">
            <div className="col-6"><h4>New Manga{new_manga_check_update}</h4></div>
          </div>
          <RenderLoadingBar />

          <div className="row">
            <div className="col-12">
              <ul className="nav nav-tabs" id="myTab2" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab2" data-toggle="tab" href="#home2" role="tab" aria-controls="home2" aria-selected="true">Top Picks</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="profile-tab2" data-toggle="tab" href="#profile2" role="tab" aria-controls="profile2" aria-selected="false">My Read Later</a>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade" id="profile2" role="tabpanel" aria-labelledby="profile-tab2">
                  <RenderMyReadLater />
                </div>
                <div className="tab-pane fade show active" id="home2" role="tabpanel" aria-labelledby="home-tab2">
                  <div className="row">
                    {manga_list.slice(1, manga_list.length).map(manga_title => (
                      <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_list`} new_manga_carousel={true} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12 col-md-8">
              <h4>Manga List</h4>
              <div className="row">
                {manga_list.slice(1, manga_list.length).map(manga_title => (
                  <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_list`} new_manga_carousel={true} />
                ))}
              </div>
            </div>
            <div className="col-12 col-md-4">
              <h4>My Read Later</h4>
              <RenderMyReadLater />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )

  function RenderMangaCard(props) {
    if (props.manga_title[0] === "-") {return(<div></div>)}
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return(
        <div className="col-4 col-md-2">
          <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(props.manga_title)}`}>
            <div style={{height: "170px", backgroundSize: '100% 100%', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(props.manga_title)}), url(${window.location.origin + '/default-book.png'})`}}>
              <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                <small>{`${findLatestMangaChapter(props.manga_title)}/${findLastMangaChapter(props.manga_title)}`}</small>
                <button className="btn btn-xs btn-outline-danger float-right" style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>♥︎</button>
              </div>
              <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                <small>{props.manga_title}</small>
              </div>
            </div>
            {/* <button type="button" className="btn btn-block btn-sm btn-outline-secondary" onClick={(e) => handleSelectedMangaTitle(e.target.value)} value={props.manga_title}>Read</button> */}
            <Link type="button" className="btn btn-block btn-sm btn-outline-secondary" to={`/read-manga-only-v1/${props.manga_title}/${findLatestMangaChapter(props.manga_title)}?last_chapter=${findLastMangaChapter(props.manga_title)}&chapter_size=${ manga_db.get(props.manga_title) ? manga_db.get(props.manga_title).average_page : 100}`}>Read</Link>
          </div>
        </div>
      )
    }
    return(
      <div className="col-4 col-md-2">
        {/* <Link to={`/read-manga-only-v1/${props.manga_title}/${findLatestMangaChapter(props.manga_title)}?last_chapter=${findLastMangaChapter(props.manga_title)}&chapter_size=${ manga_db.get(props.manga_title) ? manga_db.get(props.manga_title).average_page : 100}`}> */}
        <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(props.manga_title)}`}>
          <div style={{height: "170px", backgroundSize: '100% 100%', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(props.manga_title)}), url(${window.location.origin + '/default-book.png'})`}}>
            <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>{`${findLatestMangaChapterLoggedIn(props.manga_title)}/${findLastMangaChapter(props.manga_title)}`}</small>
              {/* <button className="btn btn-xs btn-outline-danger float-right" style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>♥︎</button> */}
              <RenderLoveButton manga_title={props.manga_title} new_manga_carousel={props.new_manga_carousel} />
            </div>
            <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>{props.manga_title}</small>
            </div>
          </div>
          {/* <button type="button" className="btn btn-block btn-sm btn-outline-secondary" onClick={(e) => handleSelectedMangaTitle(e.target.value)} value={props.manga_title}>Read</button> */}
          <Link type="button" className="btn btn-block btn-sm btn-outline-secondary" to={`/read-manga-only-v1/${props.manga_title}/${findLatestMangaChapter(props.manga_title)}?last_chapter=${findLastMangaChapter(props.manga_title)}&chapter_size=${ manga_db.get(props.manga_title) ? manga_db.get(props.manga_title).average_page : 100}`}>Read</Link>
        </div>
        {/* </Link> */}
      </div>
    )
  }

  function RenderLoveButton(props) {
    // if (props.new_manga_carousel === true) {
    //   return(
    //     <button className="btn btn-xs btn-outline-danger float-right" style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>♥︎</button>
    //   )
    // }
    return(
      <Link to={`/read-manga-only-v1/${props.manga_title}/${findLastMangaChapter(props.manga_title)}?last_chapter=${findLastMangaChapter(props.manga_title)}&chapter_size=${ manga_db.get(props.manga_title) ? manga_db.get(props.manga_title).average_page : 100}`} className="btn btn-xs btn-outline-danger float-right" style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>▶︎</Link>
    )
  }

  function RenderHistoriesSection() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return(
        <div>
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Local</a>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row flex-row flex-nowrap overflow-auto">
                    {manga_histories.slice(0, 15).map(manga_title => (
                      <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_history_list`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      )
    }
    return(
      <div>
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Logged In</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Local</a>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="row flex-row flex-nowrap overflow-auto">
                  {manga_histories.slice(0, 30).map(manga_title => (
                    <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_history_list`} />
                  ))}
                </div>
              </div>
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <RenderLoggedInHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function RenderLoadingBar() {
    if (page_loading_state === "false") {
      return(
        <div className="row flex-row flex-nowrap overflow-auto">
          {new_mangas.slice(0, 30).map(manga_title => (
            <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_new_list`} />
          ))}
        </div>
      )
    }
    return(
      <div>
        {/* <br/><div className="progress progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div><br/> */}
        <div className="row flex-row flex-nowrap overflow-auto">
          {[0,1,2,3,4,5,6].map(manga_title => (
            <RenderMangaCardLoading key={uuidv4()} />
          ))}
        </div>
      </div>
    )
  }

  function RenderLoggedInHistory() {
    if (history_loading_state === "true") {
      return(
        <div>
          {/* <br/><div className="progress progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div><br/> */}
          <div className="row flex-row flex-nowrap overflow-auto">
            {[0,1,2,3,4,5,6].map(manga_title => (
              <RenderMangaCardLoading key={uuidv4()} />
            ))}
          </div>
        </div>
      )
    }
    return(
      <div className="row flex-row flex-nowrap overflow-auto">
        {logged_in_manga_histories.slice(0, 50).map(manga_title => (
          <div className="col-4 col-md-2" key={"histories_" + manga_title}>
            <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(manga_title)}`}>
              <div style={{height: "170px", backgroundSize: '100% 100%', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(manga_title)}), url(${window.location.origin + '/default-book.png'})`}}>
                <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                  <small>{`${findLatestMangaChapterLoggedIn(manga_title)}/${findLastMangaChapter(manga_title) || 150}`}</small>
                </div>
                <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                  <small>{manga_title}</small>
                </div>
              </div>
              <Link type="button" className="btn btn-block btn-sm btn-outline-secondary" to={`/read-manga-only-v1/${manga_title}/${findLatestMangaChapterLoggedIn(manga_title)}?last_chapter=${findLastMangaChapter(manga_title) || 150}&chapter_size=${ manga_db.get(manga_title) ? manga_db.get(manga_title).average_page : 100}`}>Read</Link>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function RenderMyReadLater() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {return(<div></div>)}
    return(
      <div>
        <div className="row">
          {manga_library_titles.map(manga_title => (
            <div className="col-4 col-md-2" key={`my-read-later-${manga_title}`}>
              <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(manga_title)}`}>
                <div style={{height: "170px", backgroundSize: '100% 100%', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(manga_title)}), url(${window.location.origin + '/default-book.png'})`}}>
                  <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{`${findLatestMangaChapterLoggedIn(manga_title)}/${my_read_later.get(manga_title).manga_last_chapter}`}</small>

                    <button className="btn btn-xs btn-outline-danger float-right" style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }} onClick={() => removeMangaLibrary(manga_title)}>✕</button>
                  </div>
                  <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{manga_title}</small>
                  </div>
                </div>
                <Link type="button" className="btn btn-block btn-sm btn-outline-secondary" to={`/read-manga-only-v1/${manga_title}/${findLatestMangaChapter(manga_title)}?last_chapter=${my_read_later.get(manga_title).manga_last_chapter}&chapter_size=${ my_read_later.get(manga_title) ? my_read_later.get(manga_title).average_page : 100}`}>Read</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function RenderMangaCardLoading() {
    return(
      <div className="col-4 col-md-2">
        <div className={`card mb-4 box-shadow shadow border-4`}>
          <div style={{height: "170px", backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${window.location.origin + '/cool-loading-animated-gif-1.gif'})`}}>
            <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>0/0</small>
            </div>
            <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>Loading</small>
            </div>
          </div>
          <button className="btn btn-block btn-sm btn-outline-secondary" disabled>Read</button>
        </div>
      </div>
    )
  }

}

export default PageMangaLibraryV1
