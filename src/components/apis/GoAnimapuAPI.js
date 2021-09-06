class GoAnimapuAPI {
  constructor() {
    if (window.location.protocol === "https:") {
      this.GoAnimapuAPIHOST = "https://go-animapu.herokuapp.com"
      // this.GoAnimapuAPIHOST = "https://go-animapu2.herokuapp.com"
    } else {
      this.GoAnimapuAPIHOST = "https://go-animapu.herokuapp.com"
      // this.GoAnimapuAPIHOST = "http://localhost:4000"
    }
  }

  async UserSignUp(params) {
    var uri = `${this.GoAnimapuAPIHOST}/users/register`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return response
  }

  async UserLogin(params) {
    var uri = `${this.GoAnimapuAPIHOST}/users/login`
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return response
  }
}

const goAnimapuApi = new GoAnimapuAPI()

export default goAnimapuApi
