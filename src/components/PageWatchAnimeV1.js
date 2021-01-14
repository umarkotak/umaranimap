import React from "react"
import {Link} from "react-router-dom"
import animeDB from "./AnimeDB"

var qs = require('qs')
function query_mal_id() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).mal_id
}
var web_url = "https://animepahe.com/"
const mal_id_to_animepahe = animeDB.GetMalToAnimePahe()

function PageWatchAnimeV1() {

  function hello() {
    console.log("CALLED", query_mal_id())
    if (query_mal_id()) {
      web_url = `https://animepahe.com/anime/${mal_id_to_animepahe[query_mal_id()]}`
    } else {
      web_url = "https://animepahe.com/"
    }
    window.scrollTo(0, 0)
  }
  hello()

  return (
    <div>
      <div className="row my-2">
        <div className="col-12">
          <Link to="/airing-anime-v5" className="btn btn-outline-success btn-sm float-right"><span role="img" aria-label="book">📰</span> Seasonal Anime</Link>
        </div>
      </div>
      <iframe
        title="animepahe"
        src={web_url}
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        allow="fullscreen"
        style={{"height": "1100px", "width": "100%"}}
      >
      </iframe>
    </div>
  )
}

export default PageWatchAnimeV1
