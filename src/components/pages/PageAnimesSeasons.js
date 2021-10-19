import React, {useState, useEffect} from "react"
import ReactPlayer from 'react-player'
import {Link} from "react-router-dom"

import dataStoreCommon from "../utils/DataStoreCommon"
import ScrollToTop from "../ui-components/ScrollToTop"

function PageAnimesSeasons() {
  var valid_seasons = ["winter", "spring", "summer", "fall"]
  var valid_years = getValiYears()
  var current_year = new Date().getFullYear()
  var current_season = getSeason()

  const [items, setItems] = useState([])
  const [item, setItem] = useState({})
  const [anime_id, setAnimeId] = useState(null)
  const [selected_year, setSelectedYear] = useState(current_year)
  const [selected_season, setSelectedSeason] = useState(current_season)

  useEffect(() => {
    async function fetchData(selected_year, selected_season) {
      const response = await fetch(dataStoreCommon.ConstructURI("MAL_HOST", `/v3/season/${selected_year}/${selected_season}`))
      const results = await response.json()
      try {
        setItems(results.anime)
        setAnimeId(results.anime[0].mal_id)
      } catch (error) {
        setItems(results.anime)
      }
    }
    fetchData(selected_year, selected_season);
  }, [selected_year, selected_season]);

  useEffect(() => {
    if(anime_id == null) { return }
    async function fetchData(anime_id) {
      const response = await fetch(dataStoreCommon.ConstructURI("MAL_HOST", `/v3/anime/${anime_id}`))
      const result = await response.json();
      console.log(result)
      setItem(result)
    }
    fetchData(anime_id);
  }, [anime_id]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", `/animes_map`))
      const result = await response.json();
      console.log(result)
      // setAnimesMap(result)
    }
    fetchData();
  }, []);

  function getAnimeDetail(mal_id) {
    setAnimeId(mal_id)
  }

  function handleYearChange(year) {
    setSelectedYear(year)
  }

  function handleSeasonChange(season) {
    setSelectedSeason(season)
  }

  function getPreviousSeason() {
    if(selected_season === "winter") {
      setSelectedYear(selected_year - 1)
      setSelectedSeason("fall")
    } else {
      switch(selected_season) {
        case "summer":
          setSelectedSeason("spring")
          break;
        case "fall":
          setSelectedSeason("summer")
          break;
        case "spring":
          setSelectedSeason("winter")
          break;
        default:
      }
    }
    window.scrollTo(0, 0)
  }

  // function sanitizeTitle(title) {
  //   return title.replace(/\W/g, '')
  // }

  function getNextSeason() {
    if(selected_season === "fall") {
      setSelectedYear(selected_year + 1)
      setSelectedSeason("winter")
    } else {
      switch(selected_season) {
        case "spring":
          setSelectedSeason("summer")
          break;
        case "summer":
          setSelectedSeason("fall")
          break;
        case "winter":
          setSelectedSeason("spring")
          break;
        default:
      }
    }
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <div className="content-wrapper px-2" style={{backgroundColor: "#454d55"}}>
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="sticky-top pt-4 pb-2 overflow-auto" style={{maxHeight: window.innerHeight}}>
              <RenderYouTube anime={item} />
              <div className="text-white p-1">
                <h1>{item.title}</h1> <a href={`#manga-anchor-${item.mal_id}`} className="float-right"><span className="fa fa-share"></span></a>
                <hr className="my-1 bg-white" />
                <span className="badge badge-pill badge-primary">{item.source}</span>
                <span className="badge badge-pill badge-primary ml-2">{item.status}</span>
                <span className="badge badge-pill badge-primary ml-2">#{item.rank}</span>
                <p style={{"textAlign":"justify"}}>{item.synopsis}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3">
            <div className="row">
              {items.map(item => (
                <div className="col-12 px-1 py-0" key={item.mal_id} id={`manga-anchor-${item.mal_id}`}>
                  <div className="border border-info rounded">
                    <table className="table" style={{backgroundColor: dataStoreCommon.GetActiveTemplate("#CBD2D9", "white")}}>
                      <tbody>
                        <tr>
                          <th className="p-1" style={{width: "30%"}}>
                            <a target="_blank" rel="noopener noreferrer" href={item.url}>
                              <img className="bd-placeholder-img" src={item.image_url} alt="" style={ { height: "120px", width: "100%", display: "block" } } />
                            </a>
                          </th>
                          <th className="p-1" style={{width: "70%"}}>
                            <div className="overflow-auto" style={{maxHeight: "130px"}}>
                              <table className="table table-hover">
                                <tbody>
                                  <tr className="p-0">
                                    <td className="p-1">
                                      <div>
                                        <small>{item.mal_id} - <b>{item.title}</b></small>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr><td className="p-1"><small>Rank #{item.rank} / Score {item.score}</small></td></tr>
                                  {/* <tr><td className="p-1"><small>{item.synopsis}</small></td></tr> */}
                                </tbody>
                              </table>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <td className="p-1">
                            <button onClick={() => getAnimeDetail(item.mal_id)} className="btn btn-sm btn-block btn-outline-success">Detail</button>
                          </td>
                          <td className="p-1">
                            <Link
                              to={`#`}
                              className={ "btn btn-block btn-sm btn-outline-primary" }
                            >
                              { "▶︎ Watch" }
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <footer className="main-footer bg-dark">
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <td ><button className="btn btn-block btn-primary mx-1 px-2" onClick={() => getPreviousSeason()}>Prev</button></td>
              <td><button className="btn btn-block btn-primary mx-1 px-2" disabled>{selected_year}</button></td>
              <td width="30%">
                <select className="custom-select mx-1" name="selectedYear" onChange={(e) => handleYearChange(e.target.value)} defaultValue={selected_year}>
                  {valid_years.map(year => (
                    <option key={year} value={year}> {year} </option>
                  ))}
                </select>
              </td>
              <td>
                <select className="custom-select mx-1" name="selectedSeason" onChange={(e) => handleSeasonChange(e.target.value)} defaultValue={selected_season}>
                  {valid_seasons.map(season => (
                    <option key={season} value={season}> {season} </option>
                  ))}
                </select>
              </td>
              <td><button className="btn btn-block btn-primary mx-1 px-2" disabled>{selected_season}</button></td>
              <td><button className="btn btn-block btn-primary mx-1 px-2" onClick={() => getNextSeason()}>Next</button></td>
            </tr>
          </thead>
        </table>
      </footer>

      <ScrollToTop />
    </div>
  )
}

function RenderYouTube(props) {
  const videoId = props.anime.trailer_url

  return (
    <div>
      <ReactPlayer
        playsInline
        url={videoId}
        playing={true}
        width={'100%'}
        height={window.innerWidth / 2.5 + "px"}
        // height={'1000px'}
        config={{
          youtube: {
            playerVars: {
              showinfo: 1,
              controls: 1
            }
          }
        }}
      />
    </div>
  )
}

function getValiYears() {
  var currentYear = new Date().getFullYear()
  var years = [];
  var startYear = 1980
  while ( startYear <= currentYear + 1 ) {
      years.push(startYear++)
  }
  return years
}

function getSeason() {
  var month = new Date().getMonth()
  console.log(month)
  var winter = 'jan,january,feb,february,mar,march,0,1,2,';
  var spring = 'apr,april,may,jun,june,3,4,5,';
  var summer = 'jul,july,aug,august,sep,september,6,7,8,';
  var fall = 'oct,october,nov,november,dec,december,9,10,11,';
  var season = 'unknown';
  if (winter.indexOf(month) !== -1) {
      season = 'winter';
  } else if (spring.indexOf(month) !== -1) {
      season = 'spring';
  } else if (summer.indexOf(month) !== -1) {
      season = 'summer';
  } else if (fall.indexOf(month) !== -1) {
      season = 'fall';
  }
  return season
}

export default PageAnimesSeasons
