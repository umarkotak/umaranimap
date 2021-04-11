class ConfigDB {
  GetConf() {
    return {
      GO_ANIMAPU_HOST: "http://go-animapu2.herokuapp.com"
    }
  }
}

const configDB = new ConfigDB();

export default configDB;
