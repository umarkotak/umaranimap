import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import Cookies from 'universal-cookie'

import {GoogleLogin, GoogleLogout} from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import AppleLogin from 'react-apple-login'
import TwitterLogin from "react-twitter-login"

import goAnimapuApi from "../apis/GoAnimapuAPI"

const cookies = new Cookies()

function PageLogin() {
  const history = useHistory()

  const [username, set_username] = useState("")
  const [password, set_password] = useState("")

  function handleGoogleCallback(response) {
    console.log("GOOGLE LOGIN", response)
  }

  function handleGoogleLogoutCallback(response) {
    console.log("GOOGLE LOGOUT", response)
  }

  function responseFacebook(response) {
    console.log(response)
  }

  function responseTwitter(err, data) {
    console.log(err, data)
  }

  return (
    <div>
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <div className="wrapper" >
          <div className="container pt-4" >
            <div className="card border-success tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div className="card-header">
                Login
              </div>
              <div className="card-body">
                <form onSubmit={handleLoginSubmit}>
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
                </form>
                <hr/>
                <div>
                  <GoogleLogin
                    clientId="334886517586-djci4jil803sqjk042f6nne3016bngni.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={handleGoogleCallback}
                    onFailure={handleGoogleCallback}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                      <button className="btn btn-block btn-light" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className="fab fa-google text-primary"></i> Login With Google
                      </button>
                    )}
                  />
                  <GoogleLogout
                    clientId="334886517586-djci4jil803sqjk042f6nne3016bngni.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={handleGoogleLogoutCallback}
                    onFailure={handleGoogleLogoutCallback}
                    render={renderProps => (
                      <button className="btn btn-block btn-light" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className="fab fa-google text-danger"></i> Logout From Google
                      </button>
                    )}
                  />
                  <FacebookLogin
                    appId="1050889079041740"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,email"
                    callback={responseFacebook}
                    render={renderProps => (
                      <button className="btn btn-block btn-light" onClick={renderProps.onClick}>
                        <i className="fab fa-facebook text-primary"></i> Login With FaceBook
                      </button>
                    )}
                  />
                  {/* <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in"></div> */}
                  <AppleLogin
                    clientId="goplay.apple.login.test"
                    redirectURI="https://go-animapu.herokuapp.com/goplay/account/apple/callback"
                    scope="name%20email"
                    responseType="code%20id_token"
                    responseMode="form_post"
                    render={renderProps => (
                      <button className="btn btn-block btn-light" onClick={renderProps.onClick}>
                        <i className="fab fa-apple text-primary"></i> Login With Apple
                      </button>
                    )}
                  />
                  <AppleLogin
                    clientId="goplay.apple.login.test"
                    redirectURI="https://go-animapu.herokuapp.com/goplay/account/apple/callback"
                    scope="name%20email"
                    responseType="code%20id_token"
                    responseMode="form_post"
                    render={renderProps => (
                      <button className="btn btn-block btn-light" onClick={renderProps.onClick}>
                        <i className="fab fa-apple text-primary"></i> Login With Apple With Redir
                      </button>
                    )}
                  />
                  <TwitterLogin
                    authCallback={responseTwitter}
                    consumerKey={"sKg9AyClMaDWw56uo5eBt57Qk"}
                    consumerSecret={"KZosfxHqFXijiZgFv4WaypxosSruO9zE4333T2Jqu5pzW5G20w"}
                    children={
                      <button className="btn btn-block btn-light mt-2">
                        <i className="fab fa-twitter text-primary"></i> Login With Twitter
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
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
