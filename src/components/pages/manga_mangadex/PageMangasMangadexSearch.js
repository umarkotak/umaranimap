import React, {useState} from "react"
import {Link} from "react-router-dom"
import Select from 'react-select'

import mangadexApi from "../../apis/MangadexAPI"
import helper from "../../utils/Helper"
import LoadingBar from "../../ui-components/LoadingBar"

function PageMangasSearchMangadex() {

  const [isLoading, setIsLoading] = useState(false)
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(true)
  const [mangaList, setMangaList] = useState([])
  var limit = 90
  var offset = 0

  const [searchParams, setSearchParams] = useState({
    "title": "",
    "originalLanguage": "any",
    "status": "any"
  })
  function handleSearchParamsChanges(e) {
    try {
      const { name, value } = e.target
      setSearchParams(searchParams => ({...searchParams, [name]: value}))
    } catch (err) {
      setSearchParams(searchParams => ({...searchParams, [e.name]: e.value}))
    }
  }

  async function fetchMangaListWithQuery(append) {
    try {
      if (append) {
        offset += limit
      } else {
        offset = 0
      }

      searchParams.offset = offset
      var response = await mangadexApi.GetMangaListWithQuery(searchParams)
      var status = await response.status
      var body = await response.json()

      console.log("MANGA LIST", body)

      if (status === 200) {
        setIsLoading(false)
        if (append) {
          setMangaList(mangaList.concat(body.data))
        } else {
          setMangaList(body.data)
          setLoadMoreDisabled(false)
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function submitSearch() {
    setIsLoading(true)
    setMangaList([])
    fetchMangaListWithQuery(false)
  }

  async function handleLoadMore() {
    if (mangaList.length <= 0) {return}
    fetchMangaListWithQuery(true)
  }

  var statusOptions = [
    { name: 'status', value: 'any', label: 'Any' },
    { name: 'status', value: 'ongoing', label: 'Ongoing' },
    { name: 'status', value: 'completed', label: 'Completed' }
  ]

  var originOptions = [
    { name: 'originalLanguage', value: 'any', label: 'Any' },
    { name: 'originalLanguage', value: 'ja', label: 'Japan' },
    { name: 'originalLanguage', value: 'ko', label: 'Korea' },
    { name: 'originalLanguage', value: 'zh', label: 'China' }
  ]

  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <h1 className="text-white">Search</h1>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="form-group">
                <label className="text-white">Title</label>
                <input className="form-control" rows="2" name="title" onChange={(e) => handleSearchParamsChanges(e)} />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="form-group">
                <label className="text-white">Status</label>
                <Select
                  options={statusOptions}
                  defaultValue={statusOptions[0]}
                  onChange={(e) => handleSearchParamsChanges(e)}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="form-group">
                <label className="text-white">Origin</label>
                <Select
                  options={originOptions}
                  defaultValue={originOptions[0]}
                  onChange={(e) => handleSearchParamsChanges(e)}
                />
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <LoadingBar isLoading={isLoading} />
          <div className="row">
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
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12">
            <div className="form-group px-2">
              <button className="btn btn-success btn-block" onClick={() => handleLoadMore()} disabled={loadMoreDisabled}>Load More</button>
            </div>
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
            backgroundImage: `url(${mangadexApi.ConstructCoverArtCompressed(props.manga.id, props.manga.relationships.at(-1).attributes.fileName, 256)})`
          }}
        >
          <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <small>{`${props.continue_chapter}/${props.manga.attributes.lastChapter || "-"}`}</small>
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
              <th width="10%">
                <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangadex/${props.manga.id}`}><i className="fa fa-info-circle"></i></Link>
              </th>
              <th width="35%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangadex/${props.manga.id}`}>1</Link>
              </th>
              <th width="55%">
                <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/detail/mangadex/${props.manga.id}`}>{props.manga.attributes.lastChapter || "-"}</Link>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

export default PageMangasSearchMangadex
