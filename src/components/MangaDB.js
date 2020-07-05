let manga_db = new Map([
  ["-- select manga title --", { "manga_last_chapter": 1, "average_page": 1 }],
  ["a-returner-s-magic-should-be-special", { "manga_last_chapter": 100, "average_page": 30 }],
  ["black-clover", { "manga_last_chapter": 100, "average_page": 30 }],
  ["boku-no-hero-academia", { "manga_last_chapter": 100, "average_page": 30 }],
  ["bungou-stray-dogs", { "manga_last_chapter": 100, "average_page": 30 }],
  ["darwin-s-game", { "manga_last_chapter": 100, "average_page": 30 }],
  ["dr-stone", { "manga_last_chapter": 100, "average_page": 30 }],
  ["enen-no-shouboutai", { "manga_last_chapter": 100, "average_page": 30 }],
  ["i-am-the-sorcerer-king", { "manga_last_chapter": 100, "average_page": 30 }],
  ["jumyou-wo-kaitotte-moratta-ichinen-ni-tsuki-ichimanen-de", { "manga_last_chapter": 100, "average_page": 30 }],
  ["kengan-omega", { "manga_last_chapter": 100, "average_page": 30 }],
  ["kingdom", { "manga_last_chapter": 646, "average_page": 30 }],
  ["konjiki-no-moji-tsukai-yuusha-yonin-ni-makikomareta-unique-cheat", { "manga_last_chapter": 100, "average_page": 30 }],
  ["kono-oto-tomare", { "manga_last_chapter": 100, "average_page": 30 }],
  ["my-wife-is-a-demon-queen", { "manga_last_chapter": 100, "average_page": 30 }],
  ["omniscient-reader-s-viewpoint", { "manga_last_chapter": 100, "average_page": 30 }],
  ["one-piece", { "manga_last_chapter": 984, "average_page": 30 }],
  ["onepunch-man", { "manga_last_chapter": 100, "average_page": 30 }],
  ["out-makoto-mizuta", { "manga_last_chapter": 100, "average_page": 30 }],
  ["ranker-who-lives-a-second-time", { "manga_last_chapter": 100, "average_page": 30 }],
  ["rebirth-of-the-urban-immortal-cultivator", { "manga_last_chapter": 100, "average_page": 30 }],
  ["record-of-ragnarok", { "manga_last_chapter": 100, "average_page": 30 }],
  ["the-legendary-moonlight-sculptor", { "manga_last_chapter": 100, "average_page": 30 }],
  ["yakusoku-no-neverland", { "manga_last_chapter": 100, "average_page": 30 }],
  ["yong-heng-zhi-zun", { "manga_last_chapter": 100, "average_page": 30 }]
]);

class MangaDB {
  GetMangaDB() {
    return manga_db
  }
}

const mangaDB = new MangaDB();

export default mangaDB;

