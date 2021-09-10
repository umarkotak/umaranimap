class MangadexAPI {
  constructor() {
    if (window.location.protocol === "https:") {
      this.MangadexApiHost = "https://api.mangadex.org"
    } else {
      this.MangadexApiHost = "https://api.mangadex.org"
    }
    this.MangadexSessionToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0eXAiOiJzZXNzaW9uIiwiaXNzIjoibWFuZ2FkZXgub3JnIiwiYXVkIjoibWFuZ2FkZXgub3JnIiwiaWF0IjoxNjMxMTg5MzkzLCJuYmYiOjE2MzExODkzOTMsImV4cCI6MTYzMTE5MDI5MywidWlkIjoiYzEzMWRlNmMtNjBmYi00ZmYxLWEyOWEtZTE3ZmI4MmY3MDdlIiwicm9sIjpbIlJPTEVfVVNFUiJdLCJwcm0iOlsidXNlci5saXN0IiwicmVwb3J0LmNyZWF0ZSIsImNoYXB0ZXIudXBsb2FkIiwic2NhbmxhdGlvbl9ncm91cC5jcmVhdGUiLCJtYW5nYS52aWV3IiwiY2hhcHRlci52aWV3IiwiYXV0aG9yLnZpZXciLCJzY2FubGF0aW9uX2dyb3VwLnZpZXciLCJjb3Zlci52aWV3IiwidXNlci52aWV3IiwibWFuZ2EubGlzdCIsImNoYXB0ZXIubGlzdCIsImF1dGhvci5saXN0Iiwic2NhbmxhdGlvbl9ncm91cC5saXN0IiwiY292ZXIubGlzdCJdLCJzaWQiOiI1MTY3NGUzNC0zZmVjLTRmYTktOWQ4NC05MGYwZmI5MTNiOWQifQ.Y85pX5H4W2xQxOIJA2-frdNhZ8i8Hadmck8zvVmNkcx0la3C2mSd8jrGS4JdaIPRi5AjECYQpGT8lcvLsy_RLLutanp3FqMxGuZHngfXrG3Lp6OA-75jA9lEXGnigsc-E3SGNVmtovLofYZ2z__gtMrkh99499KV4ZCgx82BFIVQK5GOMb5_ALc_yHkUf5xZ8EEO3iqLsLWNMPEmc8SgutOQvjyzoIIczKv5jNaoFjLcbWheMRYmkH1pJCBbeJgATwWfvv-uUa-eWPQBc3tLzrhqY1zpjGZdBZToskXl6QJO9OquCxjZvlbv5xgswVAxMFB24Cf5eMVbtZg88Nx88QEnC6qQJogLorP_GG2GzP6gYlBFyV0mV7QWPdVZqD5kIMoGK8Y0oPq5z3yXYhC67hK2cSTnMu9iuAkMKiPNFAwwY1Hbi92im76xHhVLCoULfNv6goI2_t21x_tY5KyVwyL6QJW9j4SkMhVryaGLtijKowey8JqN-Be74imVfmuxZbufWmvbONyMHk5VPTDgfyUO2qRe5u9VsWLpVZCXSGNc-J56eYThJLKuL0tTxpCe5YYWW1u9Nu90XW0BzR-x2HldoJ8we8ayE91JbGRJ5O2_Cylmwme2ePBH2r3s1Sy2Z2ckixaKOWolWztd-s-jW_fYRxyIhoKMnj9JKoDH1N0"
    this.MangadexBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0eXAiOiJyZWZyZXNoIiwiaXNzIjoibWFuZ2FkZXgub3JnIiwiYXVkIjoibWFuZ2FkZXgub3JnIiwiaWF0IjoxNjMxMTg5MjMyLCJuYmYiOjE2MzExODkyMzIsImV4cCI6MTYzMzc4MTIzMiwidWlkIjoiYzEzMWRlNmMtNjBmYi00ZmYxLWEyOWEtZTE3ZmI4MmY3MDdlIiwic2lkIjoiNTE2NzRlMzQtM2ZlYy00ZmE5LTlkODQtOTBmMGZiOTEzYjlkIn0.YAN4tuEf3YW50mTdQoTMT_w0k8k5AhLAU72N8eGI6IqPXEFZfzjtZ22Ao96Jvv5YJazJeyVhPKrZ2CfzOxXnQ3zWgpV32zRmJkRgSERIw8H3h484hpCVGiWR7bqcFnieVIfbdYi_BEU-k_OwVjuRVExjg8ukhhRXBzQEjSjT3E-wjTAnB5zin49KaN2Zov3Y4YO1B8836wCq43wMiqTiAYBNbrE1277ljgiDXh3U42g7rB7qm5nEdGImAS3qMq095eoJEwW-_u8TwB0Egtu2PzljOfPRiA1LBXf_Kf0YqhbhgzM7-lYbRIj5PALXYsuf7GALNylp3gA9giHr7GLrZKaXHQDaquFTx_QatF84haQMY0x9lmrxjVR-hAcCuLpbd3Rg8EQiUz_JuuczB3L7TVc7mKJU3mVLiuUepdDa9lkBprLkfVuV2WlXAaYlsBctZktxZ8ExoJETA0SDPQ9iOMXvk9GYqZPHSKed4yCYOz1M_Utgke5lsEaU1OYejgHr-4oGdepPMLHOwRPOLUEnQf92K35sTA4Eqo6aNJ5lZTvCJncox1vDlgLoWbcy70S7MgFNDpiTfDeOc1MxSxecdfAatBKODS208MsG7iNjFCgRRMozOx8esoCCFT7_dtFlTL6i37pvxZvQzm8WF8VEDJ56Oh4h9f-_xoyhzbCN1VI"
  }

  async GetMangaList() {
    var uri = `${this.MangadexApiHost}/manga?includes[]=cover_art`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.MangadexSessionToken
      }
    })
    return response
  }

  async GetMangaDetail(mangaID) {
    var uri = `${this.MangadexApiHost}/manga/${mangaID}/feed`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.MangadexSessionToken
      }
    })
    return response
  }

  ConstructCoverArtOriginal(mangaID, coverFileName) {
    var result = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}`
    return result
  }

  ConstructCoverArtCompressed(mangaID, coverFileName, size) {
    var result = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}.${size}.jpg`
    return result
  }
}

const mangadexAPI = new MangadexAPI()

export default mangadexAPI
