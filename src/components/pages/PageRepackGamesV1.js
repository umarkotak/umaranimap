import React from "react"
import gameDB from "../utils/GameDB"

function PageRepackGamesV1() {
  var game_list = gameDB.GetGameDB().get("game_db")
  console.log(game_list)

  return (
    <div className="content-wrapper wrapper">
      <div className="row">
        {game_list.map(game => (
          <div key={game.title} className="col-6 col-lg-2 my-1">
            <div className="border rounded" style={{background: "white"}}>
              <img src={game.image_url} className="bd-placeholder-img mx-auto d-block img-fluid" alt={game.title} style={{height: "250px"}} />
              <p>
                {game.title}
              </p>
              <div className="row">
                <div className="col-6 pr-0"><a className="btn btn-sm btn-block btn-success" href={game.link} target="_blank" rel="noopener noreferrer"><span aria-label="info" role="img">ℹ︎</span></a></div>
                <div className="col-6 pl-0"><a className="btn btn-sm btn-block btn-success" href={game.download_link} target="_blank" rel="noopener noreferrer"><span aria-label="download" role="img">📥</span></a></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PageRepackGamesV1