import React, {useState} from "react"
import {useHistory} from "react-router-dom"

import goAnimapuApi from "../apis/GoAnimapuAPI"

function PageSignUp() {
  const history = useHistory()

  const [username, set_username] = useState("")
  const [password, set_password] = useState("")
  const [password_confirmation, set_password_confirmation] = useState("")

  return (
    <div>
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <div className="wrapper" >
          <div className="container pt-4" >
            <form onSubmit={handleRegisterSubmit}>
              <div className="card border-success">
                <div className="card-header">
                  Register
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" required autoComplete="off" onChange={e => set_username(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control" required autoComplete="off" onChange={e => set_password(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Re-type Password</label>
                    <input type="text" className="form-control" required autoComplete="off" onChange={e => set_password_confirmation(e.target.value)} />
                  </div>
                  <hr/>
                  <button className="btn btn-block btn-info">Register</button>
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

  async function handleRegisterSubmit(event) {
    event.preventDefault()

    if (password !== password_confirmation) {alert("password confirmation is wrong"); return}

    try {
      var params = {
        username: username,
        password: password,
      }
      const response = await goAnimapuApi.UserSignUp(params)
      const status = await response.status
      const body = await response.json()

      if (status === 200) {
        alert("user registration success!")
        history.push("/login")
      } else {
        alert(body.message)
      }
    } catch (e) {
      alert(e.message)
    }
  }
}

export default PageSignUp
