import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'

import helper from "../../utils/Helper"
import LoadingBar from "../../ui-components/LoadingBar"
import mangahubApi from "../../apis/MangahubAPI"
import goAnimapuApi from "../../apis/GoAnimapuAPI"

const cookies = new Cookies()

function PageMangasLibraryKlikManga() {
  const [isLoading, setIsLoading] = useState(true)
  const [mangaList, setMangaList] = useState([])

  async function fetchUserKlikMangaLibrary() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") { setIsLoading(false); return }

    try {
      var response = await goAnimapuApi.GetUserKlikMangaHistories(cookies.get("GO_ANIMAPU_LOGIN_TOKEN"))
      var status = await response.status
      var body = await response.json()

      if (status === 200) {
        console.log("HISTORY MANGA LIST", body)
        setMangaList(body.klik_manga_histories_list)
        // setMangaDB(body.klik_manga_histories_map)
        setIsLoading(false)
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUserKlikMangaLibrary()
  // eslint-disable-next-line
  }, [])

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <h1 className="text-white">Library</h1>
          <h4 className="text-white">Read History</h4>
          <div className="row">
          </div>
          <hr className="my-2" />
          <LoadingBar isLoading={isLoading} />
          <div className="row">
            {mangaList.map(((mangaHistoryObj, index) => (
              <div className="col-4 col-md-2 mb-4" key={`HISTORY-MANGA-CARD-${index}`}>
                <RenderMangaCard
                  manga = {mangaHistoryObj}
                  continue_chapter = {"-"}
                  util_icon = "fa-share"
                  util_link = {`/mangas/detail/klik_manga/${mangaHistoryObj.title}/${mangaHistoryObj.last_read_chapter_id}`}
                />
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
  )

  function RenderMangaCard(props) {
    return(
      <div>
        <div
          style={{
            height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"),
            backgroundSize: '100% 100%',
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            backgroundImage: mangahubApi.GenerateBackgroundThumbnailFromTitle(props.manga.title)
          }}
        >
          <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{`${props.manga.last_read_chapter_int || "-"}/${props.manga.last_chapter_int || "-"}`}</small>
            <Link
              to={props.util_link}
              className="btn btn-sm btn-light float-right"
              style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
            >
              <i className={`fa ${props.util_icon}`}></i>
            </Link>
          </div>
          <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{props.manga.compact_title}</small>
          </div>
        </div>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th width="10%">
                <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/klik_manga/${props.manga.title}`}><i className="fa fa-info-circle"></i></Link>
              </th>
              <th width="35%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/klik_manga/${props.manga.title}`}>1</Link>
              </th>
              <th width="55%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/klik_manga/${props.manga.title}/${props.manga.last_chapter_id}`}>{props.manga.last_chapter_int || "-"}</Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

export default PageMangasLibraryKlikManga
