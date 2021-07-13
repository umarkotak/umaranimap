import React, {useState} from "react"
import Cookies from 'universal-cookie';
import dataStoreCommon from "./DataStoreCommon"

const cookies = new Cookies();

function PageLogin() {
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [password_confirmation, set_password_confirmation] = useState("");

  return (
    <div>
      <div className="row">
        <div className="col-12 col-sm-6">
          <form onSubmit={handleLoginSubmit}>
            <div className="card border-success tab-pane active" id="home" role="tabpanel" ariaLabelledby="home-tab">
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
        <div className="col-12 col-sm-6">
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
  )

  async function handleLoginSubmit(event) {
    event.preventDefault();

    try {
      // const response = await fetch('http://localhost:4000/users/login', {
      var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/users/login")
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      const results = await response.json()
      const status = await response.status

      if (status === 200) {
        let date = new Date(2030, 12)
        cookies.set("GO_ANIMAPU_LOGGED_IN", "true", { path: "/", expires: date })
        cookies.set("GO_ANIMAPU_USERNAME", results.username, { path: "/", expires: date })
        cookies.set("GO_ANIMAPU_LOGIN_TOKEN", results.login_token, { path: "/", expires: date })
        alert("login success");
        // window.location.reload(false);
        window.location.href = '/manga-library-v1';
      } else {
        alert(results.message);
      }

    } catch (e) {
      alert(e.message);
    }
  }

  async function handleRegisterSubmit(event) {
    event.preventDefault();

    if (password !== password_confirmation) {
      alert("password confirmation is wrong")
    }

    try {
      var api = dataStoreCommon.ConstructURI("GO_ANIMAPU_HOST", "/users/register")
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      const results = await response.json()
      const status = await response.status

      if (status === 200) {
        alert("user registration success!");
      } else {
        alert(results.message);
      }

      console.log(results)

    } catch (e) {
      alert(e.message);
    }
  }
}

export default PageLogin
