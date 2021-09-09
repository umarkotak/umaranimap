class JadwalSholatAPI {
  constructor() {
    this.JadwalSholatAPIHOST = "https://api.pray.zone"
  }

  async FetchSchedule(cityName, currentDate) {
    var uri = `${this.JadwalSholatAPIHOST}/v2/times/day.json?city=${cityName}&date=${currentDate}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }
}

const jadwalSholatAPI = new JadwalSholatAPI()

export default jadwalSholatAPI
