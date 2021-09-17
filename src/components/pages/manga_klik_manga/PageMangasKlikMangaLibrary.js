import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import helper from "../../utils/Helper"
import LoadingBar from "../../ui-components/LoadingBar"
import mangahubApi from "../../apis/MangahubAPI"

function PageMangasLibraryKlikManga() {

  const [isLoading, setIsLoading] = useState(false)
  const [mangaDB, setMangaDB] = useState({})
  const [mangaList, setMangaList] = useState([])
  const [body, setBody] = useState({manga_data_keys: []})

  async function submitSearch() {
    setMangaList([])
    setIsLoading(true)
  }

  useEffect(() => {
    setMangaDB({})
    setBody({manga_data_keys: []})
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setMangaList(body.manga_data_keys)
  // eslint-disable-next-line
  }, [body])

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <h1 className="text-white">History</h1>
          <div className="row">
          </div>
          <hr className="my-2" />
          <LoadingBar isLoading={isLoading} />
          <div className="row">
            {mangaList.map(((title, index) => (
              <div className="col-4 col-md-2 mb-4" key={`LATEST-MANGA-CARD-${index}`}>
                <RenderMangaCard
                  manga = {mangaDB[title]}
                  continue_chapter = {"-"}
                  util_icon = "fa-share"
                  util_link = {`/mangas/detail/klik_manga/${mangaDB[title].title}`}
                />
              </div>
            )))}
          </div>
        </div>
      </div>

      <Link
        to="#"
        className="bg-primary"
        onClick={() => submitSearch()}
        style={{
          position:"fixed",
          width:"50px",
          height:"50px",
          bottom:"70px",
          right:"30px",
          color:"#FFF",
          borderRadius:"50px",
          textAlign:"center"
        }}
      >
        <i className="fa fa-search my-float" style={{marginTop:"17px"}}></i>
      </Link>
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
            <small>{`-/${props.manga.manga_last_chapter || "-"}`}</small>
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
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/klik_manga/${props.manga.title}/${props.manga.last_chapter_id}`}>{props.manga.manga_last_chapter || "-"}</Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

export default PageMangasLibraryKlikManga
