import React, {} from "react"
import {Link} from "react-router-dom"
import animeDB from "./AnimeDB"

var qs = require('qs')
function query_mal_id() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).mal_id
}
function query_title() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).title
}
var web_url
// const mal_id_to_animepahe = animeDB.GetMalToAnimePahe()
const mal_id_to_backup = animeDB.GetTitleToAnimePahe()

function checkAvailability(mal_id, title) {
  // if (mal_id_to_animepahe[mal_id]) {
  //   return mal_id_to_animepahe[mal_id]
  // }
  if (mal_id_to_backup[title]) {
    return mal_id_to_backup[title]
  }
  return false
}

function PageWatchAnimeV1() {
  function hello() {
    var anime_id = checkAvailability(query_mal_id(), query_title())

    if (anime_id) {
      web_url = `https://animepahe.com/anime/${anime_id}`
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
