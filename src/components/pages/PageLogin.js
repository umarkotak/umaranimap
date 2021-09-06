import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import Cookies from 'universal-cookie'

import goAnimapuApi from "../apis/GoAnimapuAPI"

const cookies = new Cookies()

function PageLogin() {
  const history = useHistory()

  const [username, set_username] = useState("")
  const [password, set_password] = useState("")

  return (
    <div>
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <div className="wrapper" >
          <div className="container pt-4" >
            <form onSubmit={handleLoginSubmit}>
              <div className="card border-success tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="card-header">
                  Login
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" required autoComplete="off" onChange={e => set_username(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" required autoComplete="off" onChange={e => set_password(e.target.value)} />
                  </div>
                  <hr/>
                  <button className="btn btn-block btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="main-footer bg-dark">
        ...
      </footer>
    </div>

  )

  async function handleLoginSubmit(event) {
    event.preventDefault()
    try {
      var params = {
        username: username,
        password: password,
      }
      const response = await goAnimapuApi.UserLogin(params)
      const status = await response.status
      const body = await response.json()
      if (status === 200) {
        let date = new Date(2030, 12)
        cookies.set("GO_ANIMAPU_LOGGED_IN", "true", { path: "/", expires: date })
        cookies.set("GO_ANIMAPU_USERNAME", body.username, { path: "/", expires: date })
        cookies.set("GO_ANIMAPU_LOGIN_TOKEN", body.login_token, { path: "/", expires: date })
        history.push("/")
        window.location.reload()
      } else {
        alert(body.message)
      }
    } catch (e) {
      alert(e.message)
    }
  }
}

export default PageLogin
