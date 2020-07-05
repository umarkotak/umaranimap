import React, {useState} from "react"
import mangaDB from "./MangaDB"

let manga_db = mangaDB.GetMangaDB()

var cdn_host = "https://img.mghubcdn.com/file/imghub"

function PageReadMangaV1() {
  var manga_list = generateMangaListFromDB()

  const [manga_title, set_manga_title] = useState(manga_list[0])
  var manga_pages = generateMangaPages(manga_title)

  const [manga_chapter_list, set_manga_chapter_list] = useState(generateChapterListFromTitle(manga_title))
  const [manga_chapter, set_manga_chapter] = useState(manga_chapter_list[manga_chapter_list.length - 1])

  return (
    <div>
      <div className="sticky-top bg-dark" style={{margin: "0px -14px 0px"}}>
        <RenderHead />
      </div>

      <div className="pb-5">
        {manga_pages.map(page_no => (
          <div className="bg-dark border border-dark rounded mx-n2" key={generateImageURL(page_no)}>
            <img
              className="bd-placeholder-img mx-auto d-block img-fluid"
              src={generateImageURL(page_no)}
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="container fixed-bottom bg-dark">
        <RenderFoot />
      </div>
    </div>
  )

  function RenderHead() {
    return(
      <div className="nav-scroller">
        <nav className="nav d-flex justify-content-center">
          <select className="custom-select mx-5 my-1" name="selectedMangaTitle" onChange={(e) => handleSelectedMangaTitle(e.target.value)}>
            {manga_list.map(manga => (
              <option key={manga} value={manga} selected={manga === manga_title}> {generateMangaTitleText(manga)} </option>
            ))}
          </select>
        </nav>
      </div>
    )
  }

  function RenderFoot() {
    return(
      <div className="nav-scroller py-1 mb-3">
        <nav className="nav d-flex justify-content-between">
          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 px-2" onClick={() => handlePreviousPage()}>
            Prev
          </button>

          <button className="btn btn-light btn-sm btn-outline-secondary mx-1">Chapter :</button>
          <select className="custom-select mx-1" name="selectedMangaTitle" onChange={(e) => handleSelectedMangaChapter(e.target.value)}>
            {manga_chapter_list.map(chapter => (
              <option key={chapter} value={chapter} selected={parseInt(chapter) === parseInt(manga_chapter)}> {chapter} </option>
            ))}
          </select>

          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 px-2" onClick={() => handleNextPage()}>
            Next
          </button>
        </nav>
      </div>
    )
  }

  function handleSelectedMangaTitle(title) {
    set_manga_title(title)
    var last_chapter = manga_db.get(title).manga_last_chapter
    set_manga_chapter(last_chapter)
    set_manga_chapter_list(generateChapterListFromLastChapter(parseInt(last_chapter)))
  }

  function handleSelectedMangaChapter(chapter) {
    set_manga_chapter(chapter)
  }

  function handlePreviousPage() {
    if (parseInt(manga_chapter) === 1) {return true}
    set_manga_chapter_list(generateChapterListFromLastChapter(parseInt(manga_chapter) - 1))
    set_manga_chapter(parseInt(manga_chapter) - 1)
  }

  function handleNextPage() {
    set_manga_chapter_list(generateChapterListFromLastChapter(parseInt(manga_chapter) + 1))
    set_manga_chapter(parseInt(manga_chapter) + 1)
  }

  function generateMangaPages(title) {
    var page_count = manga_db.get(title).average_page
    var pages = []
    for (let i = 1; i <= page_count; i++) { pages.push(i) }
    return pages
  }

  function generateImageURL(page_no) {
    return `${cdn_host}/${manga_title}/${manga_chapter}/${page_no}.jpg`
  }

  function generateMangaListFromDB() {
    var manga_title_list = []
    for (let manga_title of manga_db.keys()) {
      manga_title_list.push(manga_title)
    }
    return manga_title_list
  }

  function generateChapterListFromTitle(title) {
    var last_chapter = manga_db.get(title).manga_last_chapter
    var chapters = []
    for (let i = 1; i <= last_chapter; i++) { chapters.push(i) }
    return chapters
  }

  function generateChapterListFromLastChapter(last_chapter) {
    var chapters = []
    for (let i = 1; i <= last_chapter; i++) { chapters.push(i) }
    return chapters
  }

  function generateMangaTitleText(raw_title) {
    if (raw_title[0] === "-") { return raw_title }

    var title = beutifyChapterTitle(raw_title)
    var last_chapter = manga_db.get(raw_title).manga_last_chapter
    var status = manga_db.get(raw_title).status

    return `${last_chapter} | ${status} | ${title}`
  }

  function beutifyChapterTitle(raw_title) {
    var title = raw_title.replace(/-/g, " ")
    title = title.toLowerCase().split(" ");
    for (var i = 0; i < title.length; i++) {
        title[i] = title[i].charAt(0).toUpperCase() + title[i].substring(1);
    }
    return title.join(" ")
  }
}

export default PageReadMangaV1
