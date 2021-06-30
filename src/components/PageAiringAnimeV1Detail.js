import React, {useState, useEffect} from "react"
import dataStoreCommon from "./DataStoreCommon"

function AboutDetail({match}) {

  useEffect(() => {
    fetchItem()
  }, [])

  const [item, setItem] = useState({})

  const fetchItem = async () => {
    const data = await fetch(`https://api.jikan.moe/v3/anime/${match.params.id}`)
    const item = await data.json()
    console.log(item)
    setItem(item)
  }

  return (
    <div>
      <h1>About Detail</h1>
      <h2>{item.title}</h2>
      <img src={item.image_url} />
    </div>
  )
}

export default AboutDetail