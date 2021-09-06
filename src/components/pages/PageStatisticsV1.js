import React, {useState, useEffect} from "react"
import {HorizontalBar} from 'react-chartjs-2';
import dataStoreCommon from "../utils/DataStoreCommon"

function PageStatisticsV1() {
  const [titles_shorted, set_titles_shorted] = useState([])
  const [total_count_shorted, set_total_count_shorted] = useState([])
  const statCount = 50

  useEffect(() => {
    async function fetchTodayMangaData() {
      var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/mangas/statistics")
      const response = await fetch(api)
      const results = await response.json()
      var temp_statistics = new Map(Object.entries(results))

      var temp_titles = []
      var temp_total_count = []
      temp_statistics.forEach((value, key) => {
        console.log(key, value)
        temp_titles.push(key.substring(0,30))
        temp_total_count.push(value.TotalHitCount)
      })

      var temp_shorted_arr = []
      temp_statistics.forEach((value, key) => {
        value.title = key
        temp_shorted_arr.push(value)
      })
      temp_shorted_arr.sort(function (a, b) {
        return b.TotalHitCount - a.TotalHitCount || a.Title - b.Title
      })
      console.log("HEY!", temp_shorted_arr)

      set_titles_shorted(temp_shorted_arr.map(v => v.Title.substring(0,30)).slice(0, statCount))
      set_total_count_shorted(temp_shorted_arr.map(v => v.TotalHitCount).slice(0, statCount))
    }
    fetchTodayMangaData()
  }, [])

  const data = {
    labels: titles_shorted,
    datasets: [
      {
        label: 'animapu mangas hit count',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: total_count_shorted
      }
    ]
  };

  return (
    <div className="content-wrapper wrapper">
      <div className="page-header">
        <h2 style={{color:dataStoreCommon.GetActiveTemplate("white", "black")}}>Statistics</h2>
      </div>

      <div className="bg-white">
        <HorizontalBar data={data} height={500} />
      </div>
    </div>
  )
}

export default PageStatisticsV1