import React, {useState, useEffect} from "react"
import ReactPlayer from 'react-player'

function PageAiringAnimeV3() {
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
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div className="container" style={ { maxWidth: "100%", height: "360px" } }>
            <RenderYouTube anime={item} />
          </div>
          <div className="container overflow-auto" style={{height: "150px"}}>
            <h3 className="mb-0">{`[${item.type}]`} {item.title}</h3>
            <a href={item.url} target="_blank" rel="noopener noreferrer">Go to My Anime List</a>
            <p>{item.synopsis}</p>
          </div>
        </div>

        <div className="col-md-4 col-sm-12 overflow-auto" style={{height: "90vh"}}>
          {items.map(item => (
            <div className="row" key={item.mal_id}>
              <div className="col-2">
                <div className="container">
                  <img src={item.image_url} className="bd-placeholder-img" alt="" style={ { maxWidth: "80px", maxHeight: "160px" } } />
                </div>
              </div>
              <div className="col-10 ">
                <div className="card">
                  <strong className="d-inline-block text-primary">{item.title}</strong>
                  <p className="mb-0">Rank : #{item.rank} | Score : {item.score}</p>
                  <button onClick={() => some_function(item.mal_id)} className="btn btn-info">
                    See detail
                  </button>
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
      url={videoId}
      playing={true}
      width='100%'
      height='100%'
    />
  )
}

export default PageAiringAnimeV3