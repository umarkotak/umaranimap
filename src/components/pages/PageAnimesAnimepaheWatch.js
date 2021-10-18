import React, {useState, useEffect} from "react"

import ScrollToTop from "../ui-components/ScrollToTop"

var qs = require('qs')
// function query_title() {
//   return qs.parse(window.location.search, { ignoreQueryPrefix: true }).title
// }
function query_raw_title() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true }).raw_title
}

function PageAnimesAnimepaheWatch() {
  const [web_url, setWebUrl] = useState("https://animepahe.com/")

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!query_raw_title()) { return }
    setWebUrl(`https://samehadaku.vip/?s=${query_raw_title().substr(0, 10)}`)

  }, [])

  return (
    <div>
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <iframe
          title="animepahe"
          src={web_url}
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
          allow="fullscreen"
          style={{
            "display": "block",
            "border": "none",
            "overflow": "hidden",
            "height": "550vh",
            "width": "100%"
          }}
          height="150%"
          width="100%"
          frameBorder="0"
        >
        </iframe>
      </div>

      <ScrollToTop />
    </div>
  )
}

export default PageAnimesAnimepaheWatch
