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

  async GetUserDetail(token) {
    var uri = `${this.GoAnimapuAPIHOST}/users/detail`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async GetUserMangaLibrary(token) {
    var uri = `${this.GoAnimapuAPIHOST}/users/manga_library`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    return response
  }

  async SetUserKlikMangaHistory(token, params) {
    var uri = `${this.GoAnimapuAPIHOST}/users/klik_manga/history`
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

  async GetUserKlikMangaHistories(token) {
    var uri = `${this.GoAnimapuAPIHOST}/users/klik_manga/history`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
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

  async MangaupdatesReleasesV2() {
    var uri = `${this.GoAnimapuAPIHOST}/mangaupdates/releases/v2`
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

  async MaidMyDetail(title) {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/maid_my/manga_detail?manga_title=${title}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MaidMyChapter(chapter_title) {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/maid_my/manga_chapter_detail?manga_chapter=${chapter_title}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MaidMySearch(params) {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/maid_my/search?query=${params.title}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async KlikMangaHome() {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/klik_manga/home`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async KlikMangaHomeNextPage(params) {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/klik_manga/home/${params.next_page}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async KlikMangaMangaDetail(params) {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/klik_manga/manga/${params.manga_title}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async KlikMangaChapterDetail(params) {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/klik_manga/manga/${params.manga_title}/${params.manga_chapter}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async KlikMangaSearch(params) {
    var statusQuery = ""
    var genreQuery = ""

    if (params.status !== "any") { statusQuery = `&status=${params.status}` }
    if (params.genre !== "any") { genreQuery = `&genre=${params.genre}` }

    var uri = `${this.GoAnimapuAPIHOST}/mangas/klik_manga/search?title=${params.title}${genreQuery}${statusQuery}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async KlikMangaSearchNextPage(params) {
    var statusQuery = ""
    var genreQuery = ""

    if (params.status !== "any") { statusQuery = `&status=${params.status}` }
    if (params.genre !== "any") { genreQuery = `&genre=${params.genre}` }

    var uri = `${this.GoAnimapuAPIHOST}/mangas/klik_manga/search/${params.next_page}?title=${params.title}${genreQuery}${statusQuery}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async GetGlobalMangaFromFirebase() {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/firebase`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async UpdateGlobalMangaToFirebase(params) {
    var uri = `${this.GoAnimapuAPIHOST}/mangas/firebase/update`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async GetProxy(url) {
    var uri = `${this.GoAnimapuAPIHOST}/proxy/${url}`
    const response = await fetch(uri, {
      method: 'GET'
    })
    return response
  }

  async GenerateProxyUrl(url) {
    console.log("PROXY",`${this.GoAnimapuAPIHOST}/proxy/${url}`)
    return `${this.GoAnimapuAPIHOST}/proxy/${url}`
  }
}

const goAnimapuApi = new GoAnimapuAPI()

export default goAnimapuApi
