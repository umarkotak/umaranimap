import React, {useState} from "react"
import {Link} from "react-router-dom"
import Select from 'react-select'

import helper from "../../utils/Helper"
import LoadingBar from "../../ui-components/LoadingBar"
import goAnimapuApi from "../../apis/GoAnimapuAPI"
import mangahubApi from "../../apis/MangahubAPI"

function PageMangasSearchKlikManga() {
  var page = 1

  const [isLoading, setIsLoading] = useState(false)
  const [mangaDB, setMangaDB] = useState({})
  const [mangaList, setMangaList] = useState([])

  const [searchParams, setSearchParams] = useState({
    "title": "",
    "genre": "",
    "status": ""
  })
  function handleSearchParamsChanges(e) {
    try {
      const { name, value } = e.target
      setSearchParams(searchParams => ({...searchParams, [name]: value}))
    } catch (err) {
      setSearchParams(searchParams => ({...searchParams, [e.name]: e.value}))
    }
  }

  async function fetchMangaListWithQuery() {
    try {
      var response = await goAnimapuApi.KlikMangaSearch(searchParams)
      var status = await response.status
      var resJson = await response.json()

      console.log("MANGA LIST", resJson)

      if (status === 200) {
        setIsLoading(false)
        setMangaDB(resJson.manga_db)
        setMangaList(resJson.manga_data_keys)
        page = 1
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function fetchMangaListWithQueryNextPage() {
    try {
      searchParams.next_page = page
      var response = await goAnimapuApi.KlikMangaSearchNextPage(searchParams)
      var status = await response.status
      var resJson = await response.json()

      console.log("MANGA LIST", resJson)

      if (status === 200) {
        setIsLoading(false)
        setMangaDB({...mangaDB, ...resJson.manga_db})
        setMangaList(mangaList.concat(resJson.manga_data_keys))
        page++
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function submitSearch() {
    setMangaList([])
    setIsLoading(true)
    fetchMangaListWithQuery()
  }

  async function submitNextPage() {
    window.scrollTo(0,document.body.scrollHeight)
    setIsLoading(true)
    fetchMangaListWithQueryNextPage()
  }

  var statusOptions = [
    { name: 'status', value: 'any', label: 'Any' },
    { name: 'status', value: 'end', label: 'Finished' },
    { name: 'status', value: 'on-going', label: 'On Going' },
    { name: 'status', value: 'canceled', label: 'Cancelled' },
    { name: 'status', value: 'on-hold', label: 'On Hold' }
  ]

  var genreOptions = [
    { name: 'genre', value: 'any', label: 'Any' },
    { name: 'genre', value: 'action', label: 'action' },
    { name: 'genre', value: 'adventure', label: 'adventure' },
    { name: 'genre', value: 'comedy', label: 'comedy' },
    { name: 'genre', value: 'drama', label: 'drama' },
    { name: 'genre', value: 'fantasy', label: 'fantasy' },
    { name: 'genre', value: 'isekai', label: 'isekai' },
    { name: 'genre', value: 'martial-arts', label: 'martial-arts' },
    { name: 'genre', value: 'mecha', label: 'mecha' },
    { name: 'genre', value: 'mystery', label: 'mystery' },
    { name: 'genre', value: 'oneshot', label: 'oneshot' },
    { name: 'genre', value: 'romance', label: 'romance' },
    { name: 'genre', value: 'school-life', label: 'school-life' },
    { name: 'genre', value: 'sci-fi', label: 'sci-fi' },
    { name: 'genre', value: 'seinen', label: 'seinen' },
    { name: 'genre', value: 'shoujo', label: 'shoujo' },
    { name: 'genre', value: 'shounen', label: 'shounen' },
    { name: 'genre', value: 'slice-of-life', label: 'slice-of-life' },
    { name: 'genre', value: 'sports', label: 'sports' },
    { name: 'genre', value: 'supernatural', label: 'supernatural' }
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
                <label className="text-white">Genre</label>
                <Select
                  options={genreOptions}
                  defaultValue={genreOptions[0]}
                  onChange={(e) => handleSearchParamsChanges(e)}
                />
              </div>
            </div>
          </div>
          <hr className="my-2" />
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
          <LoadingBar isLoading={isLoading} />
          <hr className="my-2" />
        </div>
      </div>

      <Link
        to="#"
        className="bg-primary"
        onClick={() => submitNextPage()}
        style={{
          position:"fixed",
          width:"50px",
          height:"50px",
          bottom:"135px",
          right:"30px",
          color:"#FFF",
          borderRadius:"50px",
          textAlign:"center"
        }}
      >
        <i className="fa fa-angle-double-down my-float" style={{marginTop:"17px"}}></i>
      </Link>
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

export default PageMangasSearchKlikManga
