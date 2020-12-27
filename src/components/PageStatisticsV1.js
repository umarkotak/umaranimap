import React, {useState, useCallback, useEffect, useRef} from "react"
import {HorizontalBar} from 'react-chartjs-2';

function PageStatisticsV1() {
  const [titles, set_titles] = useState([])
  const [total_count, set_total_count] = useState([])

  useEffect(() => {
    async function fetchTodayMangaData() {
      var api = "http://go-animapu.herokuapp.com/mangas/statistics"
      const response = await fetch(api)
      const results = await response.json()
      var temp_statistics = new Map(Object.entries(results))

      var temp_titles = []
      var temp_total_count = []
      temp_statistics.forEach((value, key) => {
        console.log(key, value)
        temp_titles.push(key.substring(0,40))
        temp_total_count.push(value.TotalHitCount)
      })

      set_titles(temp_titles)
      set_total_count(temp_total_count)
    }
    fetchTodayMangaData()
  }, [])

  const data = {
    labels: titles,
    datasets: [
      {
        label: 'animapu mangas hit count',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: total_count
      }
    ]
  };

  return (
    <div>
      <div className="page-header">
        <h2>Statistics</h2>
      </div>

      <div>
        <HorizontalBar data={data} height={750} />
      </div>
    </div>
  )
}

export default PageStatisticsV1