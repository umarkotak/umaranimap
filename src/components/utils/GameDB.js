import db from "../data/games.json"

let game_db = new Map(Object.entries(db))

class GameDB {
  GetGameDB() {
    return game_db
  }
}

const gameDB = new GameDB()

export default gameDB
