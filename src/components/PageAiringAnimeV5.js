import React, {useState, useEffect} from "react"
import ReactPlayer from 'react-player'

function PageAiringAnimeV5() {
  var valid_seasons = ["spring", "summer", "fall", "winter"]
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
      var api = "https://api.jikan.moe/v3/season/" + selected_year + "/" + selected_season
      console.log(api)
      const response = await fetch(api)
      const results = await response.json()
      console.log({fetchItems: results})
      setItems(results.anime)
      setAnimeId(results.anime[0].mal_id)
    }
    fetchData(selected_year, selected_season);
  }, [selected_year, selected_season]);

  useEffect(() => {
    if(anime_id == null) { return }
    async function fetchData(anime_id) {
      const response = await fetch(`https://api.jikan.moe/v3/anime/${anime_id}`);
      const result = await response.json();
      console.log({fetchItem: result});
      setItem(result)
    }
    fetchData(anime_id);
  }, [anime_id]);

  function getAnimeDetail(mal_id) {
    console.log(mal_id)
    setAnimeId(mal_id)
  }

  function handleYearChange(year) {
    setSelectedYear(year)
  }

  function handleSeasonChange(season) {
    setSelectedSeason(season)
  }

  function getPreviousSeason() {
    if(selected_season === "spring") {
      setSelectedYear(selected_year - 1)
      setSelectedSeason("winter")
    } else {
      switch(selected_season) {
        case "summer":
          setSelectedSeason("spring")
          break;
        case "fall":
          setSelectedSeason("summer")
          break;
        case "winter":
          setSelectedSeason("fall")
          break;
        default:
      }
    }
    window.scrollTo(0, 0)
  }

  function getNextSeason() {
    if(selected_season === "winter") {
      setSelectedYear(selected_year + 1)
      setSelectedSeason("spring")
    } else {
      switch(selected_season) {
        case "spring":
          setSelectedSeason("summer")
          break;
        case "summer":
          setSelectedSeason("fall")
          break;
        case "fall":
          setSelectedSeason("winter")
          break;
        default:
      }
    }
    window.scrollTo(0, 0)
  }

  console.log("items")
  console.log(items)

  return (
    <div>
      <div className="bg-dark sticky-top">
          <RenderYouTube anime={item} />
      </div>

      <div className="container overflow-auto bg-light" style={{maxHeight: "150px"}}>
        <h3 className="mb-0">{`[${item.type}]`} {item.title}</h3>
        <a href={item.url} target="_blank" rel="noopener noreferrer">Go to My Anime List</a>
        <p>{item.synopsis}</p>
      </div>

      <div className="container pb-5 pt-1">
        <div className="row">
          {items.map(item => (
            <div className="col-md-3" key={item.mal_id}>
              <div className="card mb-2 box-shadow">
                <div className="row">
                  <div className="col-4">
                    <img className="bd-placeholder-img" src={item.image_url} alt="" style={ { height: "100px", width: "100%", display: "block" } } />
                  </div>
                  <div className="col-8">
                    <div className="overflow-auto" style={ { height: "50px" } }>
                      <small className="text-muted">{item.title}</small>
                    </div>
                    <small className="text-muted">Rank : #{item.rank} | Score : {item.score}</small>
                    <div className="d-flex justify-content-between align-items-center">
                      <button onClick={() => getAnimeDetail(item.mal_id)} className="btn btn-sm btn-block btn-outline-secondary">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container fixed-bottom bg-light">
        <div className="nav-scroller py-1 mb-3">
          <nav className="nav d-flex justify-content-between">
            <button className="btn btn-sm btn-outline-secondary mx-1 px-2" onClick={() => getPreviousSeason()}>
              Prev
            </button>

            {/* <button className="btn btn-sm btn-outline-secondary mx-1 disabled">Year :</button> */}
            <select className="custom-select mx-1" name="selectedYear" onChange={(e) => handleYearChange(e.target.value)}>
              {valid_years.map(year => (
                <option key={year} selected={year === selected_year} value={year}> {year} </option>
              ))}
            </select>

            {/* <button className="btn btn-sm btn-outline-secondary mx-1 disabled">Season :</button> */}
            <select className="custom-select mx-1" name="selectedSeason" onChange={(e) => handleSeasonChange(e.target.value)}>
              {valid_seasons.map(season => (
                <option key={season} selected={season === selected_season} value={season}> {season} </option>
              ))}
            </select>

            {/* <button onClick={() => getByYearAndSeason()} className="btn btn-sm btn-outline-secondary mx-1">
              Go!
            </button> */}

            <button className="btn btn-sm btn-outline-secondary mx-1 px-2" onClick={() => getNextSeason()}>
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

function RenderYouTube(props) {
  const videoId = props.anime.trailer_url

  return (
    <ReactPlayer
      playsInline
      url={videoId}
      playing={true}
      width={'100%'}
      height={window.innerHeight / 3 + "px"}
      config={{
        youtube: {
          playerVars: {
            showinfo: 1,
            controls: 1
          }
        }
      }}
    />
  )
}

function getValiYears() {
  var currentYear = new Date().getFullYear()
  var years = [];
  var startYear = 1980
  while ( startYear <= currentYear ) {
      years.push(startYear++)
  }
  console.log("Years" + years)
  return years
}

function getSeason() {
  var month = new Date().getMonth()
  console.log(month);
  var winter = 'dec,december,jan,january,feb,february,12,1,2,';
  var spring = 'mar,march,apr,april,may,3,4,5,';
  var summer = 'jun,june,jul,july,aug,august,6,7,8,';
  var fall = 'sep,september,oct,october,nov,november,9,10,11,';
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

export default PageAiringAnimeV5
