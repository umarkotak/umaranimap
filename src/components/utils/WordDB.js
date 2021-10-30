import db from "../data/words_dictionary.json"

let word_db = new Map(Object.entries(db))

class WordDB {
  GetWordDB() {
    return word_db
  }
}

const wordDB = new WordDB()

export default wordDB
