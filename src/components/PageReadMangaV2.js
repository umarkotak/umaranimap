import React, {useState} from "react"
import mangaDB from "./MangaDB"
import Cookies from 'universal-cookie';

let manga_db = mangaDB.GetMangaDB()
const cookies = new Cookies();
var cdn_host = "https://img.mghubcdn.com/file/imghub"

function PageReadMangaV2() {
  var manga_list = generateMangaListFromDB()

  const [manga_title, set_manga_title] = useState(manga_list[0])
  var manga_pages = generateMangaPages(manga_title)

  const [manga_chapter_list, set_manga_chapter_list] = useState(generateChapterListFromTitle(manga_title))
  const [manga_chapter, set_manga_chapter] = useState(findLatestMangaChapter(manga_title))

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
          <select className="custom-select mx-5 my-1" name="selectedMangaTitle" onChange={(e) => handleSelectedMangaTitle(e.target.value)} defaultValue={manga_title}>
            {manga_list.map(manga => (
              <option key={manga} value={manga}> {generateMangaTitleText(manga)} </option>
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
          <select className="custom-select mx-1" name="selectedMangaTitle" onChange={(e) => handleSelectedMangaChapter(e.target.value)} defaultValue={manga_chapter}>
            {manga_chapter_list.map(chapter => (
              <option key={chapter} value={chapter}> {chapter} </option>
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
    set_manga_chapter_list(generateChapterListFromLastChapter(parseInt(last_chapter)))
    set_manga_chapter(findLatestMangaChapter(title))
  }

  function handleSelectedMangaChapter(chapter) {
    set_manga_chapter(chapter)
    setCookies(chapter)
  }

  function handlePreviousPage() {
    if (parseInt(manga_chapter) === 1) {return true}
    var last_chapter = manga_db.get(manga_title).manga_last_chapter
    set_manga_chapter_list(generateChapterListFromLastChapter(last_chapter))
    set_manga_chapter(parseInt(manga_chapter) - 1)
    setCookies(parseInt(manga_chapter) - 1)
  }

  function handleNextPage() {
    var last_chapter = manga_db.get(manga_title).manga_last_chapter
    set_manga_chapter_list(generateChapterListFromLastChapter(last_chapter))
    set_manga_chapter(parseInt(manga_chapter) + 1)
    setCookies(parseInt(manga_chapter) + 1)
  }

  function findLatestMangaChapter(title) {
    var key = `${title}/last_read_chapter`
    var chapter = cookies.get(key)

    if (typeof chapter !== "undefined") {
      console.log(`not null ${title}: ${chapter}`)
      return parseInt(chapter)
    } else {
      console.log(`null ${title}: ${chapter}`)
      return manga_chapter_list[0]
    }
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
    var last_read = findLatestMangaChapter(raw_title)
    var last_chapter = manga_db.get(raw_title).manga_last_chapter
    var status = manga_db.get(raw_title).status

    return `( ${last_read} / ${last_chapter} ) - ${title} - ${status}`
  }

  function setCookies(chapter) {
    var key = `${manga_title}/last_read_chapter`
    var value = chapter
    let date = new Date(2030, 12)
    cookies.set(key, value, { path: "/", expires: date })
    console.log("COOKIES SET: " + cookies.get(key))
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

export default PageReadMangaV2
