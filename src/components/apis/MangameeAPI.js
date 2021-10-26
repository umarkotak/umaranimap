class MangameeAPI {
  constructor() {
    if (window.location.protocol === "https:") {
      this.MangameeHost = "https://go-mangamee-2.herokuapp.com"
    } else {
      this.MangameeHost = "https://go-mangamee-2.herokuapp.com"
    }
  }

  async MangabuddyGetPopularMangas(pageNumber) {
    var uri = `${this.MangameeHost}/browse?pageNumber=${pageNumber}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MangabuddyGetMangaDetail(mangaTitle) {
    var uri = `${this.MangameeHost}/manga?mangaTitle=${mangaTitle}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }
}

const mangameeApi = new MangameeAPI()

export default mangameeApi
