import React, {useState, useEffect} from "react"
import ReactPlayer from 'react-player'

function PageAiringAnimeV4() {
  const [items, setItems] = useState([])
  const [item, setItem] = useState({})
  const [anime_id, setAnimeId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.jikan.moe/v3/top/anime/1/airing")
      const results = await response.json()
      console.log({fetchItems: results})
      setItems(results.top)
      setAnimeId(results.top[0].mal_id)
    }
    fetchData();
  }, []);

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

  function some_function(mal_id) {
    console.log(mal_id)
    setAnimeId(mal_id)
  }

  return (
    <div>
      <div className="container bg-dark sticky-top">
        <div style={ { width: "100%" } }>
          <RenderYouTube anime={item} />
        </div>
      </div>

      <div className="container overflow-auto bg-light" style={{height: "150px"}}>
        <h3 className="mb-0">{`[${item.type}]`} {item.title}</h3>
        <a href={item.url} target="_blank" rel="noopener noreferrer">Go to My Anime List</a>
        <p>{item.synopsis}</p>
      </div>

      <div className="container">
        <div className="row">
          {items.map(item => (
            <div className="col-md-3">
              <div className="card mb-2 box-shadow">
                <img className="card-img-top" src={item.image_url} className="bd-placeholder-img" alt="" style={ { height: "200px", width: "100%", display: "block" } } />
                <div className="card-body">
                  <p className="card-text">{item.title}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button onClick={() => some_function(item.mal_id)} className="btn btn-sm btn-outline-secondary">
                        View
                      </button>
                    </div>
                    <small className="text-muted">Rank : #{item.rank} | Score : {item.score}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
      fluid={false}
      url={videoId}
      playing={true}
      width={'100%'}
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

export default PageAiringAnimeV4