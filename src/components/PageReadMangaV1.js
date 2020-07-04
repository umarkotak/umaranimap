import React, {useState, useEffect} from "react"

var cdn_host = "https://img.mghubcdn.com/file/imghub/"
var manga_title = "kingdom/"
var manga_chapter = "646/"
var manga_last_page = 21
var manga_pages = generateMangaPages(manga_last_page)

function PageReadMangaV1() {
  return (
    <div>
      {manga_pages.map(page_no => (
        <div className="container bg-dark border border-dark rounded m-1">
          <img
            className="bd-placeholder-img mx-auto d-block img-fluid"
            src={generateImageURL(page_no)}
            alt={generateImageURL(page_no)}
          />
        </div>
      ))}
    </div>
  )
}

function generateMangaPages(last_page) {
  var pages = []
  for (let i = 1; i <= last_page; i++) { pages.push(i) }
  return pages
}

function generateImageURL(page_no) {
  return cdn_host + manga_title + manga_chapter + page_no + ".jpg"
}

export default PageReadMangaV1
