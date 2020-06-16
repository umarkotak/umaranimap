import React, {useState, useEffect} from "react"

function PageTopAnimes({match}) {
  console.log({match: match})
  const id = match.params.id

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.jikan.moe/v3/top/anime/1/airing")
      const results = await response.json()
      console.log({fetchItems: results})
      setItems(results.top)
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData(id) {
      const response = await fetch(`https://api.jikan.moe/v3/anime/${id}`);
      const result = await response.json();
      console.log({fetchItem: result});
      setItem(result)
    }
    fetchData(id);
  }, [id]);

  // useEffect(() => {
  //   fetchItems()
  //   fetchItem()
  // }, [])

  const detailed = id != null
  const [items, setItems] = useState([])
  const [item, setItem] = useState({})

  // const fetchItems = async () => {
  //   const response = await fetch("https://api.jikan.moe/v3/top/anime/1/airing")
  //   const results = await response.json()
  //   console.log({fetchItems: results})
  //   setItems(results.top)
  // }

  // const fetchItem = async () => {
  //   const response = await fetch(`https://api.jikan.moe/v3/anime/${id}`);
  //   const result = await response.json();
  //   console.log({fetchItem: result});
  //   setItem(result)
  // }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className="card ml-4 overflow-auto" style={{height: "100vh"}}>
            <div className="card-header">Top Upcoming Animes</div>
            <div className="card-body">
              {items.map(item => (
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" key={item.mal_id}>
                  <div className="col p-2 d-flex flex-column position-static">
                    <strong className="d-inline-block text-primary">{item.title}</strong>
                    <p className="mb-0">Rank : #{item.rank} | Score : {item.score}</p>
                    <a href={`/top-animes/${item.mal_id}`} className="stretched-link">See detail</a>
                  </div>
                  <div className="col-auto d-none d-lg-block">
                    <img src={item.image_url} className="bd-placeholder-img" width="100" height="125" alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={"col-md-8 " + (detailed ? "d-block" : "d-none")}>
          <DetailAnime anime={item} />
        </div>
      </div>
    </div>
  )
}

class DetailAnime extends React.Component {
  render() {
    console.log({DetailAnime: this.props})
    const anime = this.props.anime

    return (
      <div className="card mr-4">
        <div className="card-header">Info</div>
        <div className="card-body">
          <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" key={anime.mal_id}>
            <div className="col p-4 d-flex flex-column position-static">
              <h3 className="mb-0">{`[${anime.type}]`} {anime.title}</h3>
              <a href={anime.url}>Go to My Anime List</a>
              <p>{anime.synopsis}</p>
            </div>
            <div className="col-auto d-none d-lg-block">
              <iframe width="420" height="315" title={anime.mal_id}
                src={anime.trailer_url}>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageTopAnimes