const mal_to_anime_pahe_db = {
  "": "",
}

const title_to_anime_pahe_db = {}

class AnimeDB {
  GetMalToAnimePahe() {
    return mal_to_anime_pahe_db
  }

  GetTitleToAnimePahe() {
    return title_to_anime_pahe_db
  }
}

const animeDB = new AnimeDB();

export default animeDB;
