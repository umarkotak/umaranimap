class DataStoreCommon {
  GetConf() {
    var go_animapu_host, mal_host
    if (window.location.protocol === "https") {
      go_animapu_host = "https://go-animapu2.herokuapp.com"
      mal_host = "https://api.jikan.moe"
    } else {
      go_animapu_host = "http://go-animapu2.herokuapp.com"
      mal_host = "https://api.jikan.moe"
    }
    
    return {
      GO_ANIMAPU_HOST: go_animapu_host,
      MAL_HOST: mal_host
    }
  }

  ConstructURI(host, path) {
    return `${this.GetConf()[host]}${path}`
  }

  GetActiveTemplate(dark_val, light_val) {
    if (localStorage.getItem("DARK_MODE") === "ON") {
      return dark_val
    }
    return light_val
  }
}

const dataStoreCommon = new DataStoreCommon();

export default dataStoreCommon;
