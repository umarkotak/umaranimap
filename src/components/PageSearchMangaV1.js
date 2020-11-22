// https://reactjs.org/docs/hooks-effect.html
// https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately

import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

function PageSearchManga() {
  const [searching_state, set_searching_state] = useState("standby")
  const [fetch_todays_manga_state, set_fetch_todays_manga_state] = useState("finding")
  const [search_query, set_search_query] = useState("")
  const [search_result_db, set_search_result_db] = useState(new Map())
  const [result_titles, set_result_titles] = useState([])
  const [todays_manga_db, set_todays_manga_db] = useState(new Map())
  const [todays_manga_titles, set_todays_manga_titles] = useState([])

  function handleSearchManga(event) {
    event.preventDefault()

    set_searching_state("searching")
    execute_search_manga(search_query)
  }

  function handleClearManga(event) {
    event.preventDefault()

    set_searching_state("standby")
    set_search_query("")
  }

  async function execute_search_manga(search_query) {
    console.log("fetching execute_search_manga")

    var api = `http://go-animapu.herokuapp.com/mangas/search_v1?title=${search_query}`
    const response = await fetch(api)
    const results = await response.json()
    var converted_search_result_db = new Map(Object.entries(results.manga_db))
    set_search_result_db(converted_search_result_db)
    set_searching_state("finished")

    console.log("done execute_search_manga")
  }

  function generateThumbnailFromTitle(title) {
    return `https://thumb.mghubcdn.com/mn/${title}.jpg`
  }

  function generate_manga_airing_status(manga_title) {
    try {
      return (search_result_db.get(manga_title).status === "ongoing") ? "border-primary" : "border-success"
    } catch (error) {
      return "border-primary"
    }
  }

  useEffect(() => {
    var manga_title_list = []
    search_result_db.forEach((num, key) => {
      manga_title_list.push({title: key, order: num.new_added, weight: num.weight})
    })
    manga_title_list.sort((a, b) => b.weight - a.weight)

    set_result_titles(manga_title_list.map(val => val.title))
  }, [search_result_db])

  useEffect(() => {
    async function fetchTodayMangaData() {
      var api = "http://go-animapu.herokuapp.com/mangas/todays_v1"
      const response = await fetch(api)
      const results = await response.json()
      var converted_manga_db = new Map(Object.entries(results.manga_db))
      set_todays_manga_db(converted_manga_db)
      console.log(converted_manga_db)

      var new_mangas = []
      converted_manga_db.forEach((num, key) => {
        new_mangas.push({title: key, order: num.new_added, weight: num.weight})
      })
      new_mangas.sort((a, b) => b.weight - a.weight)

      set_todays_manga_titles(new_mangas.map(val => val.title))
      set_fetch_todays_manga_state("finished")
    }
    fetchTodayMangaData()
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12"><h4>Search</h4></div>
        <div className="col-12 col-lg-9"><input
          type="text" name="search_text" className="form-control"
          value={search_query}
          onChange={(e) => set_search_query(e.target.value)}
        ></input></div>
        <div className="col-6 col-lg-2"><input
          type="button"
          name="search_submit"
          className="btn btn-outline-secondary btn-block"
          value="search"
          onClick={(e) => handleSearchManga(e)}
        ></input></div>
        <div className="col-6 col-lg-1"><input
          type="button"
          name="search_submit"
          className="btn btn-outline-secondary btn-block"
          value="clear"
          onClick={(e) => handleClearManga(e)}
        ></input></div>
      </div>

      <div className="row">
        <RenderSearchSection />
      </div>

      <div className="row">
        <div className="col-12">
          <hr/>
          <h4>Today's Manga</h4>
          <hr/>
        </div>
        <RenderTodaysMangaSection />
      </div>
    </div>
  )

  function RenderSearchSection() {
    if (searching_state === "searching") {
      return(<RenderLoadingBar />)
    }  else if (searching_state === "finished") {
      return(<div className="col-12"><RenderSearchResults /></div>)
    }
    return(<div></div>)
  }

  function RenderSearchResults() {
    return(
      <div>
        <hr/>
        <h4>Results</h4>
        <hr/>
        <div className="row">
          {result_titles.map(value => (
            <div className="col-4 col-md-2">
              <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(value)}`}>
                <div style={{height: "170px", backgroundSize: 'cover', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(value)})`}}>
                  <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{`( 1 / ${search_result_db.get(value).manga_last_chapter})`}</small>
                  </div>
                  <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <small>{value}</small>
                  </div>
                </div>
                <Link to={`/read-manga-v8?title=${value}&chapter=1`} className="btn btn-block btn-sm btn-outline-secondary">Read Manga</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function RenderTodaysMangaSection() {
    if (fetch_todays_manga_state === "finished") {
      return(
        <div className="col-12">
          <div className="row">
            {todays_manga_titles.map(value => (
              <div className="col-4 col-md-2">
                <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(value)}`}>
                  <div style={{height: "170px", backgroundSize: 'cover', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generateThumbnailFromTitle(value)})`}}>
                    <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                      <small>{`( ${todays_manga_db.get(value).manga_last_chapter} / ${todays_manga_db.get(value).manga_last_chapter} )`}</small>
                    </div>
                    <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                      <small>{value}</small>
                    </div>
                  </div>
                  <Link to={`/read-manga-v8?title=${value}&chapter=${todays_manga_db.get(value).manga_last_chapter}&custom_last_chapter=${todays_manga_db.get(value).manga_last_chapter}`} className="btn btn-block btn-sm btn-outline-secondary">Read Manga</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return(<RenderLoadingBar />)
  }

  function RenderLoadingBar() {
    return(
      <div className="col-12">
        <br/>
        <div
          className="progress progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{width: "100%"}}></div>
        <br/>
      </div>
    )
  }
}

export default PageSearchManga
