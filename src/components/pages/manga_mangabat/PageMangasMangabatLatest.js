import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import helper from "../../utils/Helper"
import LoadingBar from "../../ui-components/LoadingBar"
import ScrollToTop from "../../ui-components/ScrollToTop"

import goAnimapuApi from "../../apis/GoAnimapuAPI"

var currPageNumber = 1

function PageMangasLatestMangabat() {
  const [isLoading, setIsLoading] = useState(true)
  const [mangaList, setMangaList] = useState([])

  async function fetchMangaList(pageNumber) {
    try {
      var response = await goAnimapuApi.MangabatHome({page: pageNumber})
      var status = await response.status
      var body = await response.json()

      if (status === 200) {
        console.log("MANGA LIST", body)
        setMangaList(mangaList.concat(body))
        setIsLoading(false)
      }
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchMangaList(currPageNumber)
  // eslint-disable-next-line
  }, [])

  async function handleLoadMore() {
    currPageNumber = currPageNumber + 1
    console.log("PGN", currPageNumber)
    fetchMangaList(currPageNumber)
    window.scrollTo(0,document.body.scrollHeight)
  }

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <LoadingBar isLoading={isLoading} />

          <div className="row">
            {mangaList.map(((manga, index) => (
              <div className="col-4 col-md-2 mb-4" key={`LATEST-MANGA-CARD-${index}`}>
                <RenderMangaCard
                  manga = {manga}
                  continue_chapter = {"-"}
                  util_icon = "fa-share"
                  util_link = {`#`}
                />
              </div>
            )))}
          </div>

          <div className="row">
            <div className="col-12">
              <button className="btn btn-sm btn-block btn-success" onClick={() => handleLoadMore()}>Load more</button>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop show={true} />
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
            <small>{`${props.manga.manga_last_chapter}`}</small>
            <Link
              to={props.util_link}
              className="btn btn-sm btn-light float-right"
              style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
            >
              <i className={`fa ${props.util_icon}`}></i>
            </Link>
          </div>
          <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{props.manga.title}</small>
          </div>
        </div>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th width="100%">
                <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangabat/${props.manga.compact_title}`}><i className="fa fa-info-circle"></i></Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }

}

export default PageMangasLatestMangabat
