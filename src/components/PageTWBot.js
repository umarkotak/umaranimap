import React, {useEffect, useRef, useState, useCallback} from "react"
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const twCookies = new Cookies()

function PageTWBot() {
  const ws = useRef(null)
  const [socketMessages, setSocketMessages] = useState([])
  const unitTypes = ["spear", "sword", "axe", "knight", "light_cavalry", "mounted_archer", "archer"]


  // ACCOUNT DATA
  const [userName, setUserName] = useState(cookies.get("TW_USERNAME"))
  const [userToken, setUserToken] = useState(cookies.get("TW_USER_TOKEN"))
  const [userID, setUserID] = useState(cookies.get("TW_USER_ID"))
  const [worldID, setWorldID] = useState(cookies.get("TW_WORLD_ID"))
  const [globID, setGlobID] = useState(1)

  // const [userName, setUserName] = useState("NgunyahBatu")
  // const [userToken, setUserToken] = useState("b6bba3b4ff8c3e64b6662bfe20efc3f2353ea95a")
  // const [userID, setUserID] = useState(848915556)
  // const [worldID, setWorldID] = useState("en62")
  // const [globID, setGlobID] = useState(1)

  // CONFIG DATA
  const [connectionStatus, setConnectionStatus] = useState("not connected")

  // WORLD DATA
  const [nearbyBarbarianVillages, setNearbyBarbarianVillages] = useState([])
  const [myVillages, setMyVillages] = useState([])
  const [otherPlayerVillages, setOtherPlayerVillages] = useState([])

  // SETTING DATA
  const [sourceVillageID, setSourceVillageID] = useState("")
  const [sourceVillageX, setSourceVillageX] = useState(500)
  const [sourceVillageY, setSourceVillageY] = useState(450)
  const [mapHeight, setMapHeight] = useState(50)
  const [mapWidth, setMapWidth] = useState(50)
  const [targetVillageIDs, setTargetVillageIDs] = useState("")
  const [spear, setSpear] = useState("")
  const [sword, setSword] = useState("")
  const [axe, setAxe] = useState("")
  const [knight, setKnight] = useState("")
  const [lightCavalry, setLightCavalry] = useState("")
  const [mountedArcher, setMountedArcher] = useState("")
  const [archer, setArcher] = useState("")


  useEffect(() => {
    connectWs()
  }, [])

  useEffect(() => {
    if (!ws.current) { return }
    ws.current.onopen = (e) => {
      setConnectionStatus("connected")
    }

    ws.current.onmessage = (e) => {
      e.preventDefault();

      const updateArray = [...socketMessages];
      updateArray.unshift(e.data)
      setSocketMessages(updateArray)

      handleIncomingMessage(e.data)
    }

    ws.current.onclose = (e) => {
      e.preventDefault();

      setConnectionStatus("reconnecting . . .")
      connectWs()
      setConnectionStatus("connected")
    }
  }, [socketMessages])

  function connectWs() {
    ws.current = new WebSocket(`wss://en.tribalwars2.com/socket.io/?platform=desktop&EIO=3&transport=websocket`)
    return () => {
      ws.current.close()
      setConnectionStatus("not connected")
    }
  }

  // MESSAGING FUNCTION

  function handleLogin() {
    var payload = { name: userName, token: userToken }
    sendSocketMessage(42, "Authentication/login", commonHeaders(), JSON.stringify(payload))
  }

  function handleEasyLogin() {
    setConnectionStatus("logging in . . .")
    handleLogin()
    sleep(500)
    handleSystemIdentify()
    sleep(500)
    handleSelectCharacter()
    sleep(500)
    handleCompleteLogin()
    setConnectionStatus("logged in")
  }

  function handleEasyLoginV2() {
    setConnectionStatus("connecting . . .")
    handleLogin()
    sleep(500)
    handleSystemIdentify()
    sleep(500)
    handleSelectCharacter()
    sleep(500)
    handleCompleteLogin()
    setConnectionStatus("connected")
  }

  function handleSystemIdentify() {
    var payload = {
      api_version: "10.*.*",
      platform: "browser",
      device: "Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_14_6)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/88.0.4324.96%20Safari/537.36"
    }
    sendSocketMessage(42, "System/identify", commonHeaders(), JSON.stringify(payload))
  }

  function handleSelectCharacter() {
    var payload = { id: userID, world_id: worldID }
    sendSocketMessage(42, "Authentication/selectCharacter", commonHeaders(), JSON.stringify(payload))
  }

  function handleCompleteLogin() {
    var payload = {}
    sendSocketMessage(42, "Authentication/completeLogin", commonHeaders(), JSON.stringify(payload))
  }

  function handleSendCustomArmy() {
    var payload = {
      catapult_target: "headquarter",
      icon: 0,
      start_village: 182,
      target_village: 183,
      type: "attack",
      units: {
        spear: 5
      }
    }
    sendSocketMessage(42, "Command/sendCustomArmy", commonHeaders(), JSON.stringify(payload))
  }

  function sendTargetedArmy(targetID) {
    var units = {}

    if (spear > 0) { units.spear = parseInt(spear) }
    if (sword > 0) { units.sword = parseInt(sword) }
    if (axe > 0) { units.axe = parseInt(axe) }
    if (knight > 0) { units.knight = parseInt(knight) }
    if (lightCavalry > 0) { units.light_cavalry = parseInt(lightCavalry) }
    if (mountedArcher > 0) { units.mounted_archer = parseInt(mountedArcher) }
    if (archer > 0) { units.archer = parseInt(archer) }

    var payload = {
      catapult_target: "headquarter",
      icon: 0,
      start_village: parseInt(sourceVillageID),
      target_village: parseInt(targetID),
      type: "attack",
      units: units
    }
    console.log(payload)
    sendSocketMessage(42, "Command/sendCustomArmy", commonHeaders(), JSON.stringify(payload))
  }

  function handleStartRaid() {
    var targets = targetVillageIDs.split(",")

    targets.forEach( (targetID, idx) => {
      sendTargetedArmy(targetID)
    })
  }

  function handleFetchMap() {
    var payload = {
      character_id: userID,
      height: parseInt(mapHeight),
      width: parseInt(mapWidth),
      x: parseInt(sourceVillageX),
      y: parseInt(sourceVillageY)
    }
    sendSocketMessage(42, "Map/getVillagesByArea", commonHeaders(), JSON.stringify(payload))
  }

  function handleIncomingMessage(incoming_message) {
    try {
      var sanitizedObj = justSanitize(incoming_message)
      console.log("HANDLING MESSAGE", sanitizedObj)
      console.log("HANDLING TYPE", sanitizedObj[1].type)
      var directObj = sanitizedObj[1]

      if (directObj.type === "Map/villageData") {
        handeMapMessage(directObj)
      }

    } catch (error) {

    }
  }

  function handeMapMessage(directObj) {
    var tempNearbyBarbarianVillages = []
    var tempMyVillages = []
    var tempPlayerVillages = []

    directObj.data.villages.forEach( (village, idx ) => {
      // var tempVillageObj = {
      //   "id": village.id,
      //   "name": village.name,
      //   "x": village.x,
      //   "y": village.y,
      //   "character_id": village.character_id,
      //   "province_name": village.province_name,
      //   "character_name": village.character_name,
      //   "character_points": village.character_points,
      //   "points": village.points,
      //   "fortress": village.fortress,
      //   "tribe_id": village.tribe_id,
      //   "tribe_name": village.tribe_name,
      //   "tribe_tag": village.tribe_tag,
      //   "tribe_points": village.tribe_points,
      //   "attack_protection": village.attack_protection,
      //   "barbarian_boost": village.barbarian_boost,
      //   "report_time_created": village.report_time_created,
      //   "report_title": village.report_title,
      //   "report_haul": village.report_haul,
      //   "player_attack_id": village.player_attack_id,
      //   "report_result": village.report_result
      // }
      var tempVillageObj = village

      if (!village.character_id) {
        tempNearbyBarbarianVillages.push(tempVillageObj)

      } else if (village.character_name === userName) {
        tempMyVillages.push(tempVillageObj)

      } else {
        try {
          tempVillageObj.name = tempVillageObj.name.substring(0, 9)
          tempVillageObj.character_name = tempVillageObj.character_name.substring(0, 9)
          tempVillageObj.character_id = `${tempVillageObj.character_id}`.substring(0, 3) + "..."
        } catch (error) {
          console.log("ERR", error.message)
        }
        tempPlayerVillages.push(tempVillageObj)
      }
    })

    setNearbyBarbarianVillages(tempNearbyBarbarianVillages)
    setMyVillages(tempMyVillages)
    setOtherPlayerVillages(tempPlayerVillages)

  }

  // MISC FUNCTION

  function handleSaveConfig() {
    console.log("SAVED!")
    saveToCookies("TW_USERNAME", userName)
    saveToCookies("TW_USER_TOKEN", userToken)
    saveToCookies("TW_USER_ID", userID)
    saveToCookies("TW_WORLD_ID", worldID)
  }

  function handleClearConfig() {
    saveToCookies("TW_USERNAME", "")
    saveToCookies("TW_USER_TOKEN", "")
    saveToCookies("TW_USER_ID", "")
    saveToCookies("TW_WORLD_ID", "")
  }

  function saveToCookies(k, v) {
    let date = new Date(2030, 12)
    cookies.set(k, v, { path: "/", expires: date })
  }

  function justSanitize(socketMessage) {
    var prefixes = [0, 42]
    var tempJson

    prefixes.forEach( (prefix, idx) => {
      if (socketMessage.startsWith(prefix)) {
        var sanitizedSocketMessage = socketMessage.replace(prefix,"")
        tempJson = JSON.parse(sanitizedSocketMessage)
      }
    })

    return tempJson
  }

  function addVillageToTargets(villageID) {
    var tempVal = targetVillageIDs
    if (tempVal === "") {
      tempVal += villageID
    } else {
      tempVal += "," + villageID
    }
    setTargetVillageIDs(tempVal)
  }

  function beautifyVal(socketMessage) {
    try {
      var prefixes = [0, 42]
      var beautifiedJson = socketMessage

      prefixes.forEach( (prefix, idx) => {
        if (socketMessage.startsWith(prefix)) {
          var sanitizedSocketMessage = socketMessage.replace(prefix,"")
          var tempJson = JSON.parse(sanitizedSocketMessage)
          console.log(prefix, tempJson)
          beautifiedJson = JSON.stringify(tempJson, null, 4)
          return
        }
      })

      return beautifiedJson

    } catch (error) {
      return socketMessage
    }
  }

  function timeNow() { return + new Date() }

  function commonHeaders() {
    return `{ "traveltimes": [["browser_send", ${timeNow()}]] }`
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  function sendSocketMessage(prefixNum, type, headers, payload) {
    var basePayload = `${prefixNum}["msg", {
      "id": ${globID},
      "type": "${type}",
      "headers": ${headers},
      "data": ${payload}
      }
    ]`
    ws.current.send(basePayload)
    setGlobID(globID + 1)
  }

  // RENDERING SECTION

  return(
    <div>
      <h1>Tribal War Script</h1>

      <div className="row my-1">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info">
              Options
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label >Username</label>
                    <input className="form-control" placeholder="NgunyahBatu" onChange={(e) => setUserName(e.target.value)} value={userName} />
                  </div>
                  <div className="form-group">
                    <label >User Token</label>
                    <input className="form-control" placeholder="b6bba3b4ff8c3e64b6662bfe20efc3f2353*****" onChange={(e) => setUserToken(e.target.value)} value={userToken} />
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label >User ID</label>
                    <input className="form-control" placeholder="84891****" onChange={(e) => setUserID(e.target.value)} value={userID} />
                  </div>
                  <div className="form-group">
                    <label >World ID</label>
                    <input className="form-control" placeholder="en62" onChange={(e) => setWorldID(e.target.value)} value={worldID} />
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label >TBD</label>
                    <input className="form-control" placeholder="TBD" />
                  </div>
                  <div className="form-group">
                    <label >TBD</label>
                    <input className="form-control" placeholder="TBD" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-primary btn-sm float-left" disabled>Status:</button>
                  <button className="btn btn-outline-primary btn-sm float-left mx-2">{connectionStatus}</button>
                  <button className="btn btn-primary btn-sm float-right" onClick={() => handleEasyLogin()}>Login</button>
                  <button className="btn btn-success btn-sm float-right mx-2" onClick={() => handleSaveConfig()}>Save to cookies</button>
                  <button className="btn btn-danger btn-sm float-right mx-2" onClick={() => handleClearConfig()}>Clear from cookies</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-1">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info">
              Game Window
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-4 border rounded py-2">
                  <h3>Easy Raid</h3>
                  <hr/>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Source Village ID</span>
                    </div>
                    <input type="number" className="form-control" placeholder="" aria-label="Username" value={sourceVillageID} onChange={(e) => setSourceVillageID(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Target Village IDs</label>
                    <textarea className="form-control" rows="5" placeholder="" value={targetVillageIDs} onChange={(e) => setTargetVillageIDs(e.target.value)}></textarea>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Spear</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={spear} onChange={(e) => setSpear(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Sword</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={sword} onChange={(e) => setSword(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Axe</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={axe} onChange={(e) => setAxe(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Knight</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={knight} onChange={(e) => setKnight(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Light Cavalry</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={lightCavalry} onChange={(e) => setLightCavalry(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Mounted Archer</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={mountedArcher} onChange={(e) => setMountedArcher(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Archer</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={archer} onChange={(e) => setArcher(e.target.value)} />
                  </div>
                  <button className="btn btn-outline-success btn-sm btn-block" disabled>status: none</button>
                  <button className="btn btn-outline-success btn-sm btn-block" onClick={ () => handleStartRaid() }>Start Raid!</button>
                </div>

                <div className="col-12 col-md-8 border rounded py-2 overflow-auto" style={{maxHeight: "1000px"}}>
                  <h3>MAP</h3>
                  <hr/>

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Coord X</span>
                        </div>
                        <input type="number" className="form-control" placeholder="250" aria-label="Username" value={sourceVillageX} onChange={(e) => setSourceVillageX(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Coord Y</span>
                        </div>
                        <input type="number" className="form-control" placeholder="255" aria-label="Username" value={sourceVillageY} onChange={(e) => setSourceVillageY(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Height</span>
                        </div>
                        <input type="number" className="form-control" placeholder="250" aria-label="Username" value={mapHeight} onChange={(e) => setMapHeight(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Width</span>
                        </div>
                        <input type="number" className="form-control" placeholder="255" aria-label="Username" value={mapWidth} onChange={(e) => setMapWidth(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-outline-success btn-sm btn-block" onClick={ () => handleFetchMap() }>Fetch Map</button>

                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Barbarian Villages</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">My Villages</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Player Villages</a>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>ID</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Char ID</th>
                            <th>Char Name</th>
                            <th>Village Name</th>
                            <th>Tribe Name</th>
                            <th>Points</th>
                          </tr>
                          {nearbyBarbarianVillages.map ((village, idx) => (
                            <tr key={`barbarian-${idx}`}>
                              <td>
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={() => addVillageToTargets(village.id)}>
                                  {village.id}
                                </button>
                              </td>
                              <td>{village.x}</td>
                              <td>{village.y}</td>
                              <td>{village.character_id}</td>
                              <td>{village.character_name}</td>
                              <td>{village.name}</td>
                              <td>{village.tribe_name}</td>
                              <td>{village.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>ID</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Char ID</th>
                            <th>Char Name</th>
                            <th>Village Name</th>
                            <th>Tribe Name</th>
                            <th>Points</th>
                          </tr>
                          {myVillages.map ((village, idx) => (
                            <tr key={`my-${idx}`}>
                              <td>{village.id}</td>
                              <td>{village.x}</td>
                              <td>{village.y}</td>
                              <td>{village.character_id}</td>
                              <td>{village.character_name}</td>
                              <td>{village.name}</td>
                              <td>{village.tribe_name}</td>
                              <td>{village.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>ID</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Char ID</th>
                            <th>Char Name</th>
                            <th>Village Name</th>
                            <th>Tribe Name</th>
                            <th>Points</th>
                          </tr>
                          {otherPlayerVillages.map ((village, idx) => (
                            <tr key={`players-${idx}`}>
                              <td>
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={() => addVillageToTargets(village.id)}>
                                  {village.id}
                                </button>
                              </td>
                              <td>{village.x}</td>
                              <td>{village.y}</td>
                              <td>{village.character_id}</td>
                              <td>{village.character_name}</td>
                              <td>{village.name}</td>
                              <td>{village.tribe_name}</td>
                              <td>{village.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      </div>

      {/* <div className="row">
        <div className="col-12">
          <div style={{whiteSpace: "pre"}}>
            {socketMessages.map( (socketMessage, idx) => (
              <div key={`${idx}`} className="border rounded p-2">
                <code>
                  <pre>
                    {beautifyVal(socketMessage)}
                  </pre>
                </code>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default PageTWBot