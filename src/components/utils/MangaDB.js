// import db from "./data/db.json"
import db from "../data/play_ground.json"

let manga_db = new Map(Object.entries(db.manga_db))

class MangaDB {
  GetMangaDB() {
    return manga_db
  }

  GetNewManga() {
    var new_mangas = []

    manga_db.forEach((num, key) => {
      if (num.new_added > 0) {
        new_mangas.push({title: key, order: num.new_added, weight: num.weight})
      }
    })

    // new_mangas.sort((a, b) => a.order - b.order)
    new_mangas.sort((a, b) => SortFunction(a, b))

    return new_mangas.map( val => val.title)
  }

  GetMangaByStatus(status) {
    return []
  }

  GetRandomManga() {
    return manga_db
  }
}

function SortFunction(a, b) {
  if (a.order < b.order) return -1;
  if (a.order > b.order) return 1;
  if (a.weight > b.weight) return -1;
  if (a.weight < b.weight) return 1;
  return 0;
}

const mangaDB = new MangaDB();

export default mangaDB;

