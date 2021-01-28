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

  useEffect(() => {



    ws.current = new WebSocket(`wss://en.tribalwars2.com/socket.io/?platform=desktop&EIO=3&transport=websocket`)
    return () => {
      ws.current.close()
      setConnectionStatus("not connected")
    }
  }, [])

  useEffect(() => {
    if (!ws.current) { return }
    ws.current.onmessage = (e) => {
      e.preventDefault();
      console.log("INCOMING MESSAGE", e.data)

      const updateArray = [...socketMessages];
      updateArray.unshift(e.data)
      setSocketMessages(updateArray)

      handleIncomingMessage(e.data)
    }
  }, [socketMessages])

  // MESSAGING FUNCTION

  function handleLogin() {
    var payload = { name: userName, token: userToken }
    sendSocketMessage(42, "Authentication/login", commonHeaders(), JSON.stringify(payload))
  }

  function handleEasyLogin() {
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
    var payload = {
      catapult_target: "headquarter",
      icon: 0,
      start_village: 182,
      target_village: targetID,
      type: "attack",
      units: {
        spear: 1
      }
    }
    sendSocketMessage(42, "Command/sendCustomArmy", commonHeaders(), JSON.stringify(payload))
  }

  function handleStartRaid() {
    var targets = [26,27,28,31,88,90,99,109,110,116,124,127,155,165,167,173,180,183,211,215,217,250,276,277,283,284,285,286,312,328,330,354,359,369,370,371,381,382,383,387,392,394,396,427,440,441,464,468,480,486,494,496,498,507,508,532,535,541,559,564,568,591,670,681,682,683,684,701,709,716,721,736,738,753,776,822,838,852,858,893,915,943,964,966,996,1046,1056,1065,1084,1086,1093,1099,1103,1131,1136,1143,1144,1145,1162,1171,1172,1201,1203,1215,1217,1219,1245,1253,1256,1260,1275,1287,1335,1338,1353,1357,1359,1364,1388,1391,1403,1414,1419,1430,1492,1493,1495,1501,1507,1524,1526,1566,1585,1608,1669,1678,1680,1683,1693,1699,1736,1737,1781,1804,1808,1815,1816,1880,1889,1900,1910,1936,1938,1947,1949,1982,1990,2000,2011,2056,2095,2115,2117,2119,2121,2129,2132,2158,2161,2263]

    return ""
    targets.forEach( (targetID, idx) => {
      sendTargetedArmy(targetID)
    })
  }

  function handleFetchMap() {
    var payload = {
      character_id: 848915556,
      height: 50,
      width: 50,
      x: 500,
      y: 450
    }
    sendSocketMessage(42, "Map/getVillagesByArea", commonHeaders(), JSON.stringify(payload))
  }

  function handleIncomingMessage(incoming_message) {
    try {
      var sanitizedObj = justSanitize(incoming_message)
      console.log("HANDLING MESSAGE", sanitizedObj)
      console.log("HANDLING TYPE", sanitizedObj[1].type)

      if (sanitizedObj[1].type === "Map/villageData") {
        sanitizedObj[1].data.villages.forEach( (village, idx ) => {

          if (!village.character_id) {
            console.log(village.id, village.x, village.y, village.name)
          }
        })
      }

    } catch (error) {

    }
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
                    <input type="number" className="form-control" placeholder="182" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>

                  <div className="form-group">
                    <label>Target Village IDs</label>
                    <textarea className="form-control" rows="5"></textarea>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Spear</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Sword</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Axe</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Knight</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Light Cavalry</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Mounted Archer</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Archer</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <button className="btn btn-outline-success btn-sm btn-block" onClick={ () => handleStartRaid() }>Start Raid!</button>
                </div>

                <div className="col-12 col-md-8 border rounded">
                  <h3>MAP</h3>
                  <hr/>
                  <button className="btn btn-outline-success btn-sm btn-block" onClick={ () => handleFetchMap() }>Fetch Map</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      </div>

      <div className="row">
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
      </div>
    </div>
  )
}

export default PageTWBot
