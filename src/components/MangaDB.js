let manga_db = new Map([
  ["-- select manga title --", { "manga_last_chapter": 2, "average_page": 1 , "status": "ongoing"}],
  ["a-returner-s-magic-should-be-special", { "manga_last_chapter": 109, "average_page": 4, "status": "ongoing" }],
  ["black-clover", { "manga_last_chapter": 256, "average_page": 50, "status": "ongoing" }],
  ["boku-no-hero-academia", { "manga_last_chapter": 277, "average_page": 50, "status": "ongoing" }],
  ["bungou-stray-dogs", { "manga_last_chapter": 83, "average_page": 50, "status": "ongoing" }],
  ["darwin-s-game", { "manga_last_chapter": 85, "average_page": 50, "status": "ongoing" }],
  ["dr-stone", { "manga_last_chapter": 156, "average_page": 50, "status": "ongoing" }],
  ["fire-brigade-of-flames", { "manga_last_chapter": 224, "average_page": 50, "status": "ongoing" }],
  ["i-am-the-sorcerer-king", { "manga_last_chapter": 97, "average_page": 50, "status": "ongoing" }],
  ["jumyou-wo-kaitotte-moratta-ichinen-ni-tsuki-ichimanen-de", { "manga_last_chapter": 16, "average_page": 50, "status": "finished" }],
  ["kengan-omega", { "manga_last_chapter": 67, "average_page": 50, "status": "ongoing" }],
  ["kimetsu-no-yaiba", { "manga_last_chapter": 205, "average_page": 50, "status": "finished" }],
  ["kingdom", { "manga_last_chapter": 646, "average_page": 50, "status": "ongoing" }],
  ["konjiki-no-moji-tsukai-yuusha-yonin-ni-makikomareta-unique-cheat", { "manga_last_chapter": 64, "average_page": 50, "status": "ongoing" }],
  ["kono-oto-tomare", { "manga_last_chapter": 92, "average_page": 50, "status": "ongoing" }],
  ["my-wife-is-a-demon-queen", { "manga_last_chapter": 204, "average_page": 50, "status": "ongoing" }],
  ["omniscient-reader-s-viewpoint", { "manga_last_chapter": 11, "average_page": 50, "status": "ongoing" }],
  ["one-piece", { "manga_last_chapter": 984, "average_page": 50, "status": "ongoing" }],
  ["onepunch-man", { "manga_last_chapter": 131, "average_page": 50, "status": "ongoing" }],
  ["out-makoto-mizuta", { "manga_last_chapter": 169, "average_page": 50, "status": "ongoing" }],
  ["ranker-who-lives-a-second-time", { "manga_last_chapter": 67, "average_page": 50, "status": "ongoing" }],
  ["rebirth-of-the-urban-immortal-cultivator", { "manga_last_chapter": 339, "average_page": 50, "status": "ongoing" }],
  ["record-of-ragnarok", { "manga_last_chapter": 33, "average_page": 50, "status": "ongoing" }],
  ["the-legendary-moonlight-sculptor", { "manga_last_chapter": 141, "average_page": 50, "status": "ongoing" }],
  ["yakusoku-no-neverland", { "manga_last_chapter": 181, "average_page": 50, "status": "finished" }],
  ["yong-heng-zhi-zun", { "manga_last_chapter": 232, "average_page": 50, "status": "ongoing" }]
]);

class MangaDB {
  GetMangaDB() {
    return manga_db
  }

  GetMangaByStatus(status) {
    return []
  }
}

const mangaDB = new MangaDB();

export default mangaDB;

