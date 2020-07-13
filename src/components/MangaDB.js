// import db from "./data/db.json"
import db from "./data/play_ground.json"

let manga_db = new Map(Object.entries(db.manga_db))

// let manga_db = new Map([
//   ["-- select manga title --", { "manga_last_chapter": 2, "average_page": 1 , "status": "ongoing", "image_url": "" }],
//   ["a-returner-s-magic-should-be-special", { "manga_last_chapter": 109, "average_page": 4, "status": "ongoing", "image_url": "" }],
//   ["attack-on-titan", { "manga_last_chapter": 129, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["akame-ga-kill", { "manga_last_chapter": 75, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["baby-steps", { "manga_last_chapter": 388, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["black-clover", { "manga_last_chapter": 256, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["bleach", { "manga_last_chapter": 686, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["boku-no-hero-academia", { "manga_last_chapter": 277, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["boruto-naruto-next-generations", { "manga_last_chapter": 47, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["bungou-stray-dogs", { "manga_last_chapter": 83, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["darwin-s-game", { "manga_last_chapter": 85, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["detective-conan", { "manga_last_chapter": 1054, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["domestic-na-kanojo", { "manga_last_chapter": 276, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["dr-stone", { "manga_last_chapter": 156, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["eyeshield-21", { "manga_last_chapter": 333, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["fairy-tail", { "manga_last_chapter": 545, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["fire-brigade-of-flames", { "manga_last_chapter": 224, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["go-toubun-no-hanayome", { "manga_last_chapter": 122, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["gosu", { "manga_last_chapter": 183, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["haikyuu", { "manga_last_chapter": 400, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["hardcore-leveling-warrior", { "manga_last_chapter": 231, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["horimiya", { "manga_last_chapter": 115, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["hunter-x-hunter", { "manga_last_chapter": 390, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["i-am-the-sorcerer-king", { "manga_last_chapter": 98, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["jagaaaaaan", { "manga_last_chapter": 109, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["jumyou-wo-kaitotte-moratta-ichinen-ni-tsuki-ichimanen-de", { "manga_last_chapter": 16, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen", { "manga_last_chapter": 194, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["kengan-ashua", { "manga_last_chapter": 236, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["kengan-omega", { "manga_last_chapter": 67, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["kimetsu-no-yaiba", { "manga_last_chapter": 205, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["kingdom", { "manga_last_chapter": 646, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["konjiki-no-moji-tsukai-yuusha-yonin-ni-makikomareta-unique-cheat", { "manga_last_chapter": 64, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["kono-oto-tomare", { "manga_last_chapter": 92, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["my-wife-is-a-demon-queen", { "manga_last_chapter": 204, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["nanatsu-no-taizai", { "manga_last_chapter": 346, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["naruto", { "manga_last_chapter": 700, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["omniscient-reader-s-viewpoint", { "manga_last_chapter": 11, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["one-piece", { "manga_last_chapter": 984, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["onepunch-man", { "manga_last_chapter": 131, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["out-makoto-mizuta", { "manga_last_chapter": 169, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["peerless-dad", { "manga_last_chapter": 129, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["player-reborn", { "manga_last_chapter": 167, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["ranker-who-lives-a-second-time", { "manga_last_chapter": 68, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["rebirth-of-the-urban-immortal-cultivator", { "manga_last_chapter": 339, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["record-of-ragnarok", { "manga_last_chapter": 33, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["relife", { "manga_last_chapter": 222, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["rurouni-kenshin", { "manga_last_chapter": 258, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["shokugeki-no-soma", { "manga_last_chapter": 315, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["slam-dunk", { "manga_last_chapter": 276, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["solo-leveling", { "manga_last_chapter": 110, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["tate-no-yuusha-no-nariagari", { "manga_last_chapter": 65, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["tensei-shitara-slime-datta-ken", { "manga_last_chapter": 72, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["the-legendary-moonlight-sculptor", { "manga_last_chapter": 141, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["tokyo-ghoul-re", { "manga_last_chapter": 179, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["tower-of-god", { "manga_last_chapter": 485, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["tsuyokute-new-saga", { "manga_last_chapter": 76, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["versatile-mage", { "manga_last_chapter": 471, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["yakusoku-no-neverland", { "manga_last_chapter": 181, "average_page": 50, "status": "finished", "image_url": "" }],
//   ["yong-heng-zhi-zun", { "manga_last_chapter": 232, "average_page": 50, "status": "ongoing", "image_url": "" }],
//   ["yuragi-sou-no-yuuna-san", { "manga_last_chapter": 209, "average_page": 50, "status": "ongoing", "image_url": "" }],
// ]);

class MangaDB {
  GetMangaDB() {
    return manga_db
  }

  GetNewManga() {
    var new_mangas = []

    manga_db.forEach((num, key) => {
      if (num.new_added > 0) {
        new_mangas.push({title: key, order: num.new_added})
      }
    })

    new_mangas.sort((a, b) => a.order - b.order)

    return new_mangas.map( val => val.title)
  }

  GetMangaByStatus(status) {
    return []
  }

  GetRandomManga() {
    return manga_db
  }
}

const mangaDB = new MangaDB();

export default mangaDB;

