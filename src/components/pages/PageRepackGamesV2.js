import React from "react"

function PageRepackGamesV2() {
  return (
    <div className="content-wrapper wrapper">
      <div>
        <iframe
          title="repack-games"
          src="https://repack-games.com/"
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
          allow="fullscreen"
          style={{"height": "2000px", "width": "100%"}}
        >
        </iframe>
      </div>
    </div>
  )
}

export default PageRepackGamesV2