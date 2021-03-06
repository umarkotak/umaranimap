import React, {useState, useEffect} from "react"
import {Line} from 'react-chartjs-2';
import dataStoreCommon from "./DataStoreCommon"

function CompDailyMangaClick() {
  // eslint-disable-next-line
  const [date_data_shorted, set_date_data_shorted] = useState([])
  // eslint-disable-next-line
  const [total_count_shorted, set_total_count_shorted] = useState([])
  const data = {
    labels: date_data_shorted,
    datasets: [
      {
        label: 'Daily manga clicks',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: total_count_shorted
      }
    ]
  }

  useEffect(() => {
    async function fetchTodayMangaData() {
      var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/mangas/daily_manga_statistics")
      const response = await fetch(api)
      const results = await response.json()
      var temp_statistics = new Map(Object.entries(results))


      var temp_titles = []
      var temp_total_count = []
      temp_statistics.forEach((value, key) => {
        temp_titles.push(key)
        temp_total_count.push(value.count)
      })

      set_date_data_shorted(temp_titles)
      set_total_count_shorted(temp_total_count)
    }
    fetchTodayMangaData()
  }, [])

  return (
    <div>
      <Line data={data} />
    </div>
  )
}

export default CompDailyMangaClick