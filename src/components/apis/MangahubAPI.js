class MangahubAPI {
  // constructor() {

  // }

  GenerateBackgroundThumbnailFromTitle(title) {
    var sources = []
    sources.push(`url(${`https://thumb.mghubcdn.com/m4l/${title}.jpg`})`)
    sources.push(`url(${`https://thumb.mghubcdn.com/mn/${title}.jpg`})`)
    sources.push(`url(${`https://thumb.mghubcdn.com/md/${title}.jpg`})`)
    sources.push(`url(${`https://img.mghubcdn.com/mn/${title}.jpg`})`)
    sources.push(`url(/default-book.png)`)
    return sources.join(",")
  }
}

const mangahubApi = new MangahubAPI()

export default mangahubApi
