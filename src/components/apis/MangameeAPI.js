class MangameeAPI {
  constructor() {
    if (window.location.protocol === "https:") {
      this.MangameeHost = "https://go-mangamee-2.herokuapp.com"
    } else {
      this.MangameeHost = "https://go-mangamee-2.herokuapp.com"
    }
  }

  async MangareadGetPopularMangas(pageNumber) {
    var uri = `${this.MangameeHost}/browse?pageNumber=${pageNumber}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MangareadGetMangaDetail(src, mangaTitle) {
    var uri = `${this.MangameeHost}/manga?src=${src}&mangaTitle=${mangaTitle}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  async MangareadGetMangaRead(src, mangaTitle, chapter) {
    var uri = `${this.MangameeHost}/page?src=${src}&mangaTitle=${mangaTitle}&chapter=${chapter}`
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
