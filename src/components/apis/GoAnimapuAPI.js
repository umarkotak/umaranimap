class GoAnimapuAPI {
  constructor() {
    if (window.location.protocol === "https:") {
      this.GoAnimapuAPIHOST = "https://go-animapu.herokuapp.com"
      // this.GoAnimapuAPIHOST = "https://go-animapu2.herokuapp.com"
    } else {
      this.GoAnimapuAPIHOST = "https://go-animapu.herokuapp.com"
      this.GoAnimapuAPIHOST = "http://localhost:4000"
    }
  }

  async UserSignUp(params) {
    var uri = `${this.GoAnimapuAPIHOST}/users/register`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async UserLogin(params) {
    var uri = `${this.GoAnimapuAPIHOST}/users/login`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async UserAddMangaToLibrary(token, params) {
    var uri = `${this.GoAnimapuAPIHOST}/users/add_manga_library`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async MangahubTodaysManga() {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/todays_v1`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MangaupdatesReleases() {
    var uri = `${this.GoAnimapuAPIHOST}/mangaupdates/releases`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MangaupdatesSearch(title) {
    var uri = `${this.GoAnimapuAPIHOST}/mangaupdates/search?title=${title}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MangaupdatesSeriesDetail(mangaID) {
    var uri = `${this.GoAnimapuAPIHOST}/mangaupdates/releases/${mangaID}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MaidMyHome() {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/maid_my/home`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }
}

const goAnimapuApi = new GoAnimapuAPI()

export default goAnimapuApi
