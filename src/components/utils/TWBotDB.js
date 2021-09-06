// const BUILDING_ENUM = [
//   "academy",
//   "barracks",
//   "chapel",
//   "church",
//   "clay_pit",
//   "farm",
//   "headquarter",
//   "hospital",
//   "iron_mine",
//   "market",
//   "preceptory",
//   "rally_point",
//   "statue",
//   "tavern",
//   "timber_camp",
//   "wall",
//   "warehouse"
// ]

const BUILDING_TEMPLATE_LIST = [
  { building_name: "headquarter", level: 1 },
  { building_name: "warehouse", level: 1 },
  { building_name: "farm", level: 1 },
  { building_name: "timber_camp", level: 1 },
  { building_name: "clay_pit", level: 1 },
  { building_name: "iron_mine", level: 1 },
  { building_name: "barracks", level: 1 },
  { building_name: "statue", level: 1 },

  { building_name: "headquarter", level: 2 },
  { building_name: "warehouse", level: 2 },
  { building_name: "farm", level: 2 },
  { building_name: "timber_camp", level: 2 },
  { building_name: "clay_pit", level: 2 },
  { building_name: "iron_mine", level: 2 },

  { building_name: "headquarter", level: 3 },
  { building_name: "warehouse", level: 3 },
  { building_name: "farm", level: 3 },
  { building_name: "timber_camp", level: 3 },
  { building_name: "clay_pit", level: 3 },
  { building_name: "iron_mine", level: 3 },

  { building_name: "headquarter", level: 4 },
  { building_name: "warehouse", level: 4 },
  { building_name: "farm", level: 4 },
  { building_name: "timber_camp", level: 4 },
  { building_name: "clay_pit", level: 4 },
  { building_name: "iron_mine", level: 4 },

  { building_name: "headquarter", level: 5 },
  { building_name: "warehouse", level: 5 },
  { building_name: "farm", level: 5 },
  { building_name: "timber_camp", level: 5 },
  { building_name: "clay_pit", level: 5 },
  { building_name: "iron_mine", level: 5 },

  { building_name: "wall", level: 2 },
  { building_name: "hospital", level: 2 },
  { building_name: "headquarter", level: 6 },
  { building_name: "warehouse", level: 6 },
  { building_name: "farm", level: 6 },
  { building_name: "timber_camp", level: 6 },
  { building_name: "clay_pit", level: 6 },
  { building_name: "iron_mine", level: 6 },

  { building_name: "warehouse", level: 7 },
  { building_name: "farm", level: 7 },
  { building_name: "timber_camp", level: 7 },
  { building_name: "clay_pit", level: 7 },
  { building_name: "iron_mine", level: 7 },

  { building_name: "warehouse", level: 8 },
  { building_name: "farm", level: 8 },
  { building_name: "timber_camp", level: 8 },
  { building_name: "clay_pit", level: 8 },
  { building_name: "iron_mine", level: 8 },
  { building_name: "barracks", level: 5 },

  { building_name: "timber_camp", level: 20 },
  { building_name: "clay_pit", level: 20 },
  { building_name: "iron_mine", level: 20 },

  { building_name: "warehouse", level: 25 },
  { building_name: "farm", level: 20 },
  { building_name: "headquarter", level: 20 },
  { building_name: "academy", level: 1 },

  { building_name: "farm", level: 30 },
  { building_name: "", level: 0 }
]

class TWBotDB {
  GetBuildingTemplateList() {
    return BUILDING_TEMPLATE_LIST
  }
}

export default TWBotDB
