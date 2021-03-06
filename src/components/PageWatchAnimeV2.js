import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

var qs = require('qs')
function query_title() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).title
}
function query_raw_title() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).raw_title
}

function PageWatchAnimeV2() {
  const [web_url, setWebUrl] = useState("https://animepahe.com/")

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!query_raw_title()) { return }
    setWebUrl(`https://samehadaku.vip/?s=${query_raw_title().substr(0, 10)}`)

  }, [])

  return (
    <div style={{marginLeft: "-10px", marginRight: "-10px"}}>
      <div className="row my-2">
        <div className="col-12">
          <Link to="/airing-anime-v6" className="btn btn-outline-success btn-sm float-right"><span role="img" aria-label="book">📰</span> Seasonal Anime</Link>
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

export default PageWatchAnimeV2
