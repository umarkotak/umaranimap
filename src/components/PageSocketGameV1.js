import React, {useEffect, useRef, useState} from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'
// import { v4 as uuidv4 } from 'uuid'

const cookies = new Cookies()

const logged_in = cookies.get("GO_ANIMAPU_LOGGED_IN") === "true"
const username = cookies.get("GO_ANIMAPU_USERNAME")
const auth_token = cookies.get("GO_ANIMAPU_LOGIN_TOKEN")

function PageSocketGameV1() {
  const ws = useRef(null)
  const [horizontal_length, set_horizontal_length] = useState(0)
  const [vertical_length, set_vertical_length] = useState(0)
  const [world_maps, set_world_maps] = useState({maps: [[{players: []}]]})
  // RUN FOR THE FIRST TIME
  useEffect(() => {
    if (!logged_in) { return }
    // ws.current = new WebSocket(`ws://localhost:4000/socket_game_v1?token=${auth_token}`)
    ws.current = new WebSocket(`ws://go-animapu.herokuapp.com/socket_game_v1?token=${auth_token}`)
    ws.current.onopen = () => { console.log("CONNECTION OPEN") }
    ws.current.onclose = () => { console.log("CONNECTION CLOSE") }
    return () => { ws.current.close() }
  }, [])

  useEffect(() => {
    if (!ws.current) { return }
    ws.current.onmessage = (e) => {
      e.preventDefault();
      console.log("INCOMING MESSAGE", e.data)
      handleResponse(e.data)
    }
  }, [])

  function handleResponse(data_raw) {
    try {
      const data = JSON.parse(data_raw)
      if (data.direction === "response" && data.message_type === "world_map_info") {
        handleResponseMap(data)
      } else {
        console.log("INVALID MESSAGE FORMAT")
      }

    } catch (error) {
      console.log("ERROR ON HANDLE INCOMING MESSAGE", error.message)
    }
  }

  function handleResponseMap(data) {
    console.log(data.data)
    set_world_maps(data.data)
  }

  function handleRequestBroadcastMessage() {
    ws.current.send(
      `
        {
          "message_type": "global_message",
          "meta": {},
          "data": {
            "message": "hello world!"
          },
          "headers": {},
          "direction": "request"
        }
      `
    )
  }

  function handleRequestMap() {
    ws.current.send(
      `
        {
          "message_type": "world_map_info",
          "meta": {},
          "data": {},
          "headers": {},
          "direction": "request"
        }
      `
    )
  }

  function handleRequestPlayer() {
    console.log("REQUESTING PLAYER")
  }

  function processPlayer(players) {
    console.log("PLAYERS", players)
    if (players) {
      return players.join("\n")
    }
  }

  return (
    <div>
      <div className="sticky-top bg-light rounded" style={{marginLeft: "-9px", marginRight: "-9px"}}>
        <RenderTopNav />
      </div>

      <div>
        <RenderGameSection />
      </div>

      <div className="container">
        <div className="fixed-bottom container">
          <div className="bg-info rounded p-2" style={{marginLeft: "-9px", marginRight: "-9px"}}>
            <RenderBottomNav />
          </div>
        </div>
      </div>
    </div>
  )

  function RenderTopNav() {
    if (logged_in === false) {
      return(
        <div></div>
      )
    }
    return(
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td><button className="btn btn-sm btn-outline-primary">Top Nav</button></td>
              <td><button className="btn btn-sm btn-outline-primary">{username}</button></td>
              <td><button className="btn btn-sm btn-outline-primary"
                onClick={() => handleRequestBroadcastMessage()}
              >Broadcast Msg</button></td>
              <td><button className="btn btn-sm btn-outline-primary"
                onClick={() => handleRequestMap()}
              >Request Map</button></td>
              <td><button className="btn btn-sm btn-outline-primary"
                onClick={() => handleRequestPlayer()}
              >Request Player</button></td>
              <td><button className="btn btn-sm btn-outline-primary">Move Up</button></td>
              <td><button className="btn btn-sm btn-outline-primary">Move Down</button></td>
              <td><button className="btn btn-sm btn-outline-primary">Move Left</button></td>
              <td><button className="btn btn-sm btn-outline-primary">Move Right</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  function RenderGameSection() {
    if (logged_in === false) {
      return(
        <div>please login first <Link to="/login"></Link></div>
      )
    }
    return(
      <div style={{paddingBottom: "75px"}}>
        <table className="table">
          <tbody>
            {world_maps.maps.map( (val, idx) => (
              <tr key={`vertical_${idx}`}>
                {val.map( (row_data, row_idx) => (
                  <td key={`horizontal_${idx}_${row_idx}`}>
                    {row_data.pos_x}, {row_data.pos_y}
                    <br/>
                    <pre>{processPlayer(row_data.players)}</pre>
                  </td>
                ) )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function RenderBottomNav() {
    if (logged_in === false) {
      return(
        <div></div>
      )
    }
    return(
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td style={{width: "10%"}}>Top Nav</td>
              <td>{username}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default PageSocketGameV1
