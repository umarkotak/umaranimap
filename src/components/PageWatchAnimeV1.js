import React from "react"
import {Link} from "react-router-dom"

function PageWatchAnimeV1() {
  return (
    <div>
      <div className="row my-2">
        <div className="col-12">
          <Link to="/airing-anime-v5" className="btn btn-outline-success btn-sm float-right"><span role="img" aria-label="book">📰</span> Seasonal Anime</Link>
        </div>
      </div>
      <iframe
        title="animepahe"
        src="https://animepahe.com/"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        allow="fullscreen"
        style={{"height": "1100px", "width": "100%"}}
      >
      </iframe>
    </div>
  )
}

export default PageWatchAnimeV1