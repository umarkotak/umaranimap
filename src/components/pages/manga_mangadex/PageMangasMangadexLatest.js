import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'

import mangadexApi from "../../apis/MangadexAPI"
import helper from "../../utils/Helper"
import LoadingBar from "../../ui-components/LoadingBar"
import ScrollToTop from "../../ui-components/ScrollToTop"

function PageMangasLatestMangadex() {

  const [isLoading, setIsLoading] = useState(true)
  const [mangaList, setMangaList] = useState([])
  var limit = 90
  var offset = 0

  async function fetchMangaList() {
    try {
      var params = {
        offset: offset
      }
      var response = await mangadexApi.GetMangaList(params)
      var status = await response.status
      var body = await response.json()

      if (status === 200) {
        console.log("MANGA LIST", body)
        setMangaList(mangaList.concat(body.data))
        setIsLoading(false)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const maxCount = 600
  const [hasMore, setHasMore] = useState(true)

  const getMoreData = () => {
    if (mangaList.length >= maxCount) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      offset += limit
      fetchMangaList()
    }, 500)
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
          <div>
            <InfiniteScroll
              dataLength={mangaList.length}
              next={getMoreData}
              hasMore={hasMore}
              loader={<hr />}
              className="row"
              endMessage={<p className="text-white"><b>End of list</b></p>}
            >
              {mangaList.map(((manga, index) => (
                <div className="col-4 col-md-2 mb-4" key={`LATEST-MANGA-CARD-${index}`}>
                  <RenderMangaCard
                    manga = {manga}
                    continue_chapter = {"-"}
                    util_icon = "fa-share"
                    util_link = {`/mangas/detail/mangadex/${manga.id}`}
                  />
                </div>
              )))}
            </InfiniteScroll>
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
            backgroundImage: `url(${mangadexApi.ConstructCoverArtCompressed(props.manga.id, mangadexApi.ExtractFileNameFromManga(props.manga), 256)})`
          }}
        >
          <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{`${props.manga.attributes.lastChapter || ""}`}</small>
            <Link
              to={props.util_link}
              className="btn btn-sm btn-light float-right"
              style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
            >
              <i className={`fa ${props.util_icon}`}></i>
            </Link>
          </div>
          <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{props.manga.attributes.title.en}</small>
          </div>
        </div>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th width="100%">
                <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangadex/${props.manga.id}`}><i className="fa fa-info-circle"></i></Link>
              </th>
              {/* <th width="35%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangadex/${props.manga.id}`}>1</Link>
              </th>
              <th width="55%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangadex/${props.manga.id}`}>{props.manga.attributes.lastChapter || "-"}</Link>
              </th> */}
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

export default PageMangasLatestMangadex
