let manga_db = new Map([
  ["-- select manga title --", { "manga_last_chapter": 2, "average_page": 1 , "status": "ongoing"}],
  ["a-returner-s-magic-should-be-special", { "manga_last_chapter": 109, "average_page": 4, "status": "ongoing" }],
  ["attack-on-titan", { "manga_last_chapter": 129, "average_page": 50, "status": "ongoing" }],
  ["baby-steps", { "manga_last_chapter": 388, "average_page": 50, "status": "ongoing" }],
  ["black-clover", { "manga_last_chapter": 256, "average_page": 50, "status": "ongoing" }],
  ["bleach", { "manga_last_chapter": 686, "average_page": 50, "status": "ongoing" }],
  ["boku-no-hero-academia", { "manga_last_chapter": 277, "average_page": 50, "status": "ongoing" }],
  ["boruto-naruto-next-generations", { "manga_last_chapter": 47, "average_page": 50, "status": "ongoing" }],
  ["bungou-stray-dogs", { "manga_last_chapter": 83, "average_page": 50, "status": "ongoing" }],
  ["darwin-s-game", { "manga_last_chapter": 85, "average_page": 50, "status": "ongoing" }],
  ["detective-conan", { "manga_last_chapter": 1054, "average_page": 50, "status": "ongoing" }],
  ["domestic-na-kanojo", { "manga_last_chapter": 276, "average_page": 50, "status": "ongoing" }],
  ["dr-stone", { "manga_last_chapter": 156, "average_page": 50, "status": "ongoing" }],
  ["eyeshield-21", { "manga_last_chapter": 333, "average_page": 50, "status": "ongoing" }],
  ["fairy-tail", { "manga_last_chapter": 545, "average_page": 50, "status": "ongoing" }],
  ["fire-brigade-of-flames", { "manga_last_chapter": 224, "average_page": 50, "status": "ongoing" }],
  ["go-toubun-no-hanayome", { "manga_last_chapter": 122, "average_page": 50, "status": "ongoing" }],
  ["gosu", { "manga_last_chapter": 183, "average_page": 50, "status": "ongoing" }],
  ["haikyuu", { "manga_last_chapter": 400, "average_page": 50, "status": "ongoing" }],
  ["hardcore-leveling-warrior", { "manga_last_chapter": 231, "average_page": 50, "status": "ongoing" }],
  ["horimiya", { "manga_last_chapter": 115, "average_page": 50, "status": "ongoing" }],
  ["hunter-x-hunter", { "manga_last_chapter": 390, "average_page": 50, "status": "ongoing" }],
  ["i-am-the-sorcerer-king", { "manga_last_chapter": 97, "average_page": 50, "status": "ongoing" }],
  ["jagaaaaaan", { "manga_last_chapter": 109, "average_page": 50, "status": "ongoing" }],
  ["jumyou-wo-kaitotte-moratta-ichinen-ni-tsuki-ichimanen-de", { "manga_last_chapter": 16, "average_page": 50, "status": "finished" }],
  ["kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen", { "manga_last_chapter": 194, "average_page": 50, "status": "ongoing" }],
  ["kengan-ashua", { "manga_last_chapter": 236, "average_page": 50, "status": "ongoing" }],
  ["kengan-omega", { "manga_last_chapter": 67, "average_page": 50, "status": "ongoing" }],
  ["kimetsu-no-yaiba", { "manga_last_chapter": 205, "average_page": 50, "status": "finished" }],
  ["kingdom", { "manga_last_chapter": 646, "average_page": 50, "status": "ongoing" }],
  ["konjiki-no-moji-tsukai-yuusha-yonin-ni-makikomareta-unique-cheat", { "manga_last_chapter": 64, "average_page": 50, "status": "ongoing" }],
  ["kono-oto-tomare", { "manga_last_chapter": 92, "average_page": 50, "status": "ongoing" }],
  ["my-wife-is-a-demon-queen", { "manga_last_chapter": 204, "average_page": 50, "status": "ongoing" }],
  ["nanatsu-no-taizai", { "manga_last_chapter": 346, "average_page": 50, "status": "ongoing" }],
  ["naruto", { "manga_last_chapter": 700, "average_page": 50, "status": "ongoing" }],
  ["omniscient-reader-s-viewpoint", { "manga_last_chapter": 11, "average_page": 50, "status": "ongoing" }],
  ["one-piece", { "manga_last_chapter": 984, "average_page": 50, "status": "ongoing" }],
  ["onepunch-man", { "manga_last_chapter": 131, "average_page": 50, "status": "ongoing" }],
  ["out-makoto-mizuta", { "manga_last_chapter": 169, "average_page": 50, "status": "ongoing" }],
  ["peerless-dad", { "manga_last_chapter": 129, "average_page": 50, "status": "ongoing" }],
  ["player-reborn", { "manga_last_chapter": 167, "average_page": 50, "status": "ongoing" }],
  ["ranker-who-lives-a-second-time", { "manga_last_chapter": 67, "average_page": 50, "status": "ongoing" }],
  ["rebirth-of-the-urban-immortal-cultivator", { "manga_last_chapter": 339, "average_page": 50, "status": "ongoing" }],
  ["record-of-ragnarok", { "manga_last_chapter": 33, "average_page": 50, "status": "ongoing" }],
  ["relife", { "manga_last_chapter": 222, "average_page": 50, "status": "ongoing" }],
  ["rurouni-kenshin", { "manga_last_chapter": 258, "average_page": 50, "status": "ongoing" }],
  ["shokugeki-no-soma", { "manga_last_chapter": 315, "average_page": 50, "status": "finished" }],
  ["slam-dunk", { "manga_last_chapter": 276, "average_page": 50, "status": "ongoing" }],
  ["solo-leveling", { "manga_last_chapter": 110, "average_page": 50, "status": "ongoing" }],
  ["tate-no-yuusha-no-nariagari", { "manga_last_chapter": 65, "average_page": 50, "status": "ongoing" }],
  ["tensei-shitara-slime-datta-ken", { "manga_last_chapter": 72, "average_page": 50, "status": "ongoing" }],
  ["the-legendary-moonlight-sculptor", { "manga_last_chapter": 141, "average_page": 50, "status": "ongoing" }],
  ["tokyo-ghoul-re", { "manga_last_chapter": 179, "average_page": 50, "status": "ongoing" }],
  ["tower-of-god", { "manga_last_chapter": 485, "average_page": 50, "status": "ongoing" }],
  ["tsuyokute-new-saga", { "manga_last_chapter": 76, "average_page": 50, "status": "ongoing" }],
  ["versatile-mage", { "manga_last_chapter": 471, "average_page": 50, "status": "ongoing" }],
  ["yakusoku-no-neverland", { "manga_last_chapter": 181, "average_page": 50, "status": "finished" }],
  ["yong-heng-zhi-zun", { "manga_last_chapter": 232, "average_page": 50, "status": "ongoing" }],
  ["yuragi-sou-no-yuuna-san", { "manga_last_chapter": 209, "average_page": 50, "status": "ongoing" }],
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

