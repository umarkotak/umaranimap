import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import helper from "../../utils/Helper"
import mangameeApi from "../../apis/MangameeAPI"
import LoadingBar from "../../ui-components/LoadingBar"
import ScrollToTop from "../../ui-components/ScrollToTop"

var currPageNumber = 1

function PageMangasLibraryMangaRead() {
  const [isLoading, setIsLoading] = useState(true)
  const [mangaList, setMangaList] = useState([])

  async function fetchMangaList(pageNumber) {
    try {
      var response = await mangameeApi.MangareadGetPopularMangas(pageNumber)
      var status = await response.status
      var body = await response.json()

      if (status === 200) {
        console.log("MANGA LIST", body)
        setMangaList(mangaList.concat(body.MangaData))
        setIsLoading(false)
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function handleNextSection() {
    currPageNumber = currPageNumber + 1
    console.log("PGN", currPageNumber)
    fetchMangaList(currPageNumber)
    window.scrollTo(0,document.body.scrollHeight)
  }

  useEffect(() => {
    fetchMangaList(currPageNumber)
  // eslint-disable-next-line
  }, [])

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
        </div>
      </div>

      <ScrollToTop show={true} />
      <Link
        to="#"
        className="bg-primary"
        onClick={() => {handleNextSection()}}
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
        <i className="fa fa-angle-double-down my-float" style={{marginTop:"17px"}}></i>
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
            backgroundImage: `url(${props.manga.MangaCover})`
          }}
        >
          <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{`${props.manga.MangaLastChapter}`}</small>
            <Link
              to={props.util_link}
              className="btn btn-sm btn-light float-right"
              style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
            >
              <i className={`fa ${props.util_icon}`}></i>
            </Link>
          </div>
          <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{props.manga.MangaTitle}</small>
          </div>
        </div>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th width="100%">
                <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangaread/${props.manga.MangaLink}`}><i className="fa fa-info-circle"></i></Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

export default PageMangasLibraryMangaRead
