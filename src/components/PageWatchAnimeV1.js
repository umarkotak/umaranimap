import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import animeDB from "./AnimeDB"

var qs = require('qs')
function query_title() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).title
}

function PageWatchAnimeV1() {
  const [web_url, setWebUrl] = useState("https://animepahe.com/")

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://go-animapu.herokuapp.com/animes_map`);
      const result = await response.json();
      console.log(result)

      var anime_id = result[query_title()]
      console.log("FOUND", anime_id)
      if (anime_id) {
        setWebUrl(`https://animepahe.com/anime/${anime_id}`)
        console.log("FINISHED")
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("RUN ONCE")
    window.scrollTo(0, 0);
  }, [])


  return (
    <div style={{marginLeft: "-10px", marginRight: "-10px"}}>
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
