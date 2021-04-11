class ConfigDB {
  GetConf() {
    return {
      GO_ANIMAPU_HOST: "http://go-animapu2.herokuapp.com"
    }
  }

  GetActiveTemplate(dark_val, light_val) {
    if (localStorage.getItem("DARK_MODE") === "ON") {
      return dark_val
    }
    return light_val
  }
}

const configDB = new ConfigDB();

export default configDB;
