class MangadexAPI {
  constructor(languageMode = "en") {
    if (window.location.protocol === "https:") {
      this.MangadexApiHost = "https://api.mangadex.org"
      this.MangadexApiHost = "https://go-animapu2.herokuapp.com/mangadex"
      this.MangadexApiHost = "https://go-animapu.herokuapp.com/mangadex"
    } else {
      this.MangadexApiHost = "https://api.mangadex.org"
      this.MangadexApiHost = "http://localhost:4000/mangadex"
      this.MangadexApiHost = "https://go-animapu.herokuapp.com/mangadex"
    }
    this.MangadexSessionToken = ""
    this.RefreshBearerToken = ""
    this.LanguageMode = languageMode ? languageMode : "en"
  }

  async GetMangaList(params) {
    var queries = []

    queries.push(`limit=90`)
    queries.push(`offset=${params.offset}`)
    queries.push(`includes[]=cover_art&includes[]=chapter`)
    queries.push(`availableTranslatedLanguage[]=${this.LanguageMode}`)

    if (params.originalLanguage && params.originalLanguage !== "" && params.originalLanguage !== "any") {
      queries.push(`originalLanguage[]=${params.originalLanguage}`)
    }

    var uri = `${this.MangadexApiHost}/manga?${queries.join("&")}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.MangadexSessionToken
      }
    })
    return response
  }

  async GetMangaListWithQuery(params) {
    var queries = []

    queries.push(`limit=90`)
    queries.push(`offset=${params.offset}`)
    queries.push(`includes[]=cover_art&includes[]=chapter`)
    queries.push(`availableTranslatedLanguage[]=${this.LanguageMode}`)

    if (params.title !== "") {
      queries.push(`title=${params.title}`)
    }

    if (params.originalLanguage !== "any") {
      queries.push(`originalLanguage[]=${params.originalLanguage}`)
    }

    if (params.status !== "any") {
      queries.push(`status[]=${params.status}`)
    }

    var uri = `${this.MangadexApiHost}/manga?${queries.join("&")}`

    console.log("CALLING PARAMS", params)
    console.log("CALLING QUERIES", queries)
    console.log("CALLING", uri)

    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.MangadexSessionToken
      }
    })
    return response
  }

  async GetMangaDetail(mangaID) {
    var uri = `${this.MangadexApiHost}/manga/${mangaID}?&includes[]=cover_art`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.MangadexSessionToken
      }
    })
    return response
  }

  async GetMangaChapters(mangaID) {
    var uri = `${this.MangadexApiHost}/manga/${mangaID}/feed?translatedLanguage[]=${this.LanguageMode}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.MangadexSessionToken
      }
    })
    return response
  }

  async GetMangaChapterDetail(params) {
    var uri = `${this.MangadexApiHost}/chapter/${params.chapterID}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.MangadexSessionToken
      }
    })
    return response
  }

  ConstructCoverArtOriginal(mangaID, coverFileName) {
    var result = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`
    return result
  }

  ConstructCoverArtCompressed(mangaID, coverFileName, size) {
    if (coverFileName === "") { return "/default-book.png" }
    var result = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}.${size}.jpg`
    return result
  }

  ConstructChapterPage(host, mode, chapterHash, fileName) {
    if (host === "") { host = "https://uploads.mangadex.org" }
    if (mode === "") { mode = "data" }

    var result = `${host}/${mode}/${chapterHash}/${fileName}`
    return result
  }

  ConstructChapterPageCompressed(host, mode, chapterHash, fileName) {
    if (host === "") { host = "https://uploads.mangadex.org" }
    if (mode === "") { mode = "data" }

    var result = `${host}/${mode}/${chapterHash}/${fileName}`
    return result
  }

  ExtractFileNameFromManga(manga) {
    try {
      var fileName = ""
      manga.relationships.forEach((val) => {
        if (val.attributes && val.attributes.fileName) {
          fileName = val.attributes.fileName
        }
      })
      // return manga.relationships.at(-1).attributes.fileName
      return fileName
    } catch (e) {
      // console.log(`ERR: ${e}; ${JSON.stringify(manga.relationships.at(-1))}`)
      return ""
    }
  }
}

const mangadexAPI = new MangadexAPI(localStorage.getItem("ANIMAPU_MANGADEX_LANG"))

export default mangadexAPI
