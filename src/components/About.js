import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

function About() {

  useEffect(() => {
    fetchItems()
  }, [])

  const [items, setItems] = useState([])

  const fetchItems = async () => {
    const data = await fetch("https://api.jikan.moe/v3/top/anime/1/upcoming")
    const items = await data.json()
    console.log(items.top)
    setItems(items.top)
  }

  return (
    <div>
      <h1>About</h1>

      {items.map(item => (
        <Link to={`/about/${item.mal_id}`} key={item.mal_id}>
          <h1 key={item.mal_id}>{item.title}</h1>
        </Link>
      ))}
    </div>
  )
}

export default About