import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import helper from "../../utils/Helper"
import goAnimapuApi from "../../apis/GoAnimapuAPI"
import LoadingBar from "../../ui-components/LoadingBar"

function PageMangasLatestMaidMy() {
  const [isLoading, setIsLoading] = useState(true)
  const [mangaDB, setMangaDB] = useState({})
  const [mangaList, setMangaList] = useState([])

  async function fetchMangaList() {
    try {
      var response = await goAnimapuApi.MaidMyHome()
      var status = await response.status
      var body = await response.json()

      if (status === 200) {
        console.log("MANGA LIST", body)
        setMangaDB(body.manga_db)
        setMangaList(body.MangaDataKeys)
        setIsLoading(false)
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchMangaList()
  // eslint-disable-next-line
  }, [])

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <LoadingBar isLoading={isLoading} />
          <div className="row">
            {mangaList.map(((title, index) => (
              <div className="col-4 col-md-2 mb-4" key={`LATEST-MANGA-CARD-${index}`}>
                <RenderMangaCard
                  manga = {mangaDB[title]}
                  continue_chapter = {"-"}
                  util_icon = "fa-share"
                  util_link = {`/mangas/detail/maid_my/${title}`}
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
            backgroundImage: `url(${props.manga.image_url})`
          }}
        >
          <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{`-/-`}</small>
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
                <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/maid_my/${props.manga.title}`}><i className="fa fa-info-circle"></i></Link>
              </th>
              <th width="35%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/maid_my/${props.manga.title}`}>1</Link>
              </th>
              <th width="55%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/maid_my/${props.manga.title}`}>{props.manga.manga_last_chapter || "-"}</Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

export default PageMangasLatestMaidMy
