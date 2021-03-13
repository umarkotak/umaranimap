import React, {useState} from "react"
import {Line} from 'react-chartjs-2';

function CompDailyMangaClick() {
  // eslint-disable-next-line
  const [date_data_shorted, set_date_data_shorted] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July'])
  // eslint-disable-next-line
  const [total_count_shorted, set_total_count_shorted] = useState([65, 70, 65, 60, 55, 0, 10])
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
  };

  return (
    <div>
      <Line data={data} />
    </div>
  )
}

export default CompDailyMangaClick