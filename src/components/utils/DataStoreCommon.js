class DataStoreCommon {
  GetConf() {
    var go_animapu_host, mal_host, go_animapu_ws

    if (window.location.protocol === "https:") {
      go_animapu_host = "https://go-animapu.herokuapp.com"
      go_animapu_ws = "wss://go-animapu.herokuapp.com"
      mal_host = "https://api.jikan.moe"
    } else {
      go_animapu_host = "http://localhost:4000"
      go_animapu_host = "http://go-animapu.herokuapp.com"
      go_animapu_ws = "ws://go-animapu.herokuapp.com"
      mal_host = "https://api.jikan.moe"
    }

    return {
      GO_ANIMAPU_HOST: go_animapu_host,
      GO_ANIMAPU_WS: go_animapu_ws,
      MAL_HOST: mal_host,
      ANIMAPU_HOST: "https://animapu.herokuapp.com",
      MANGAHUB_CDN_HOST: "https://img.mghubcdn.com"
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
