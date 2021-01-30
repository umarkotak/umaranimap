import React, {useEffect, useRef, useState} from "react"
import Cookies from 'universal-cookie'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cookies = new Cookies()

function PageTWBot() {
  const ws = useRef(null)
  const [socketMessages, setSocketMessages] = useState([])

  // ACCOUNT DATA
  const [userName, setUserName] = useState(cookies.get("TW_USERNAME"))
  const [userToken, setUserToken] = useState(cookies.get("TW_USER_TOKEN"))
  const [userID, setUserID] = useState(cookies.get("TW_USER_ID"))
  const [worldID, setWorldID] = useState(cookies.get("TW_WORLD_ID"))
  const [globID, setGlobID] = useState(1)
  const [quickNotes, setQuickNotes] = useState(localStorage.getItem('TW_QUICK_NOTE') || "")

  // CONFIG DATA
  const [connectionStatus, setConnectionStatus] = useState("not connected")

  // WORLD DATA
  const [nearbyBarbarianVillages, setNearbyBarbarianVillages] = useState([])
  const [myVillages, setMyVillages] = useState([])
  const [otherPlayerVillages, setOtherPlayerVillages] = useState([])
  const [saveToRaidPlayerVillages, setSaveToRaidPlayerVillages] = useState([])

  // SETTING DATA
  const [myCharacterVillages, setMyCharacterVillages] = useState([])
  const [checkVillageID, setCheckVillageID] = useState("")
  const [myVillageResources, setMyVillageResources] = useState({})
  const [myVillageUnits, setMyVillageUnits] = useState({})
  const [provinceLandmarkX, setProvinceLandmarkX] = useState(0)
  const [provinceLandmarkY, setProvinceLandmarkY] = useState(0)
  const [provinceName, setProvinceName] = useState("")

  const [sourceVillageID, setSourceVillageID] = useState("")
  const [sourceVillageX, setSourceVillageX] = useState(500)
  const [sourceVillageY, setSourceVillageY] = useState(450)
  const [mapHeight, setMapHeight] = useState(50)
  const [mapWidth, setMapWidth] = useState(50)
  const [targetVillageIDs, setTargetVillageIDs] = useState("")
  const [targetVillagesCount, setTargetVillagesCount] = useState(0)
  const [spear, setSpear] = useState("")
  const [sword, setSword] = useState("")
  const [axe, setAxe] = useState("")
  const [knight, setKnight] = useState("")
  const [lightCavalry, setLightCavalry] = useState("")
  const [mountedArcher, setMountedArcher] = useState("")
  const [archer, setArcher] = useState("")
  const [randomChecked, setRandomChecked] = useState(false)
  const [raidPercentage, setRaidPercentage] = useState(0)

  useEffect(() => {
    connectWs()
  }, [])

  useEffect(() => {
    if (!ws.current) { return }
    ws.current.onopen = (e) => {
      setConnectionStatus("connected")
      if (userName && userToken && userID && worldID) {
        handleEasyLogin()
      }
      handlePing()
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

      console.log("WS CLOSSED")

      setConnectionStatus("CLOSSED, Please reload page")
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
    handleRequestPlayerInfo()
  }

  function handeSaveQuickNote() {
    localStorage.setItem("TW_QUICK_NOTE", quickNotes)
  }

  function handleSystemIdentify() {
    var payload = {
      api_version: "10.*.*",
      platform: "browser",
      device: "Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_14_6)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/88.0.4324.96%20Safari/537.36"
    }
    sendSocketMessage(42, "System/identify", commonHeaders(), JSON.stringify(payload))
  }

  function handleRequestPlayerInfo() {
    var payload = {}
    sendSocketMessage(42, "Character/getInfo", commonHeaders(), JSON.stringify(payload))
  }

  function handleRequestVillageDetail() {
    var payload = {
      village_id: parseInt(checkVillageID),
      my_village_id: myCharacterVillages[0].id,
      num_reports: 5
    }
    sendSocketMessage(42, "Map/getVillageDetails", commonHeaders(), JSON.stringify(payload))
  }

  function handleRequestVillageDetailAuto(selectedVillageID, e = false) {
    var payload = {
      village_id: selectedVillageID,
      my_village_id: myCharacterVillages[0].id,
      num_reports: 5
    }
    sendSocketMessage(42, "Map/getVillageDetails", commonHeaders(), JSON.stringify(payload))
    setSourceVillageID(selectedVillageID)

    if (e) {
      e.target.className = "btn btn-sm btn-rounded btn-danger"
    }
  }

  function handleSelectCharacter() {
    var payload = { id: userID, world_id: worldID }
    sendSocketMessage(42, "Authentication/selectCharacter", commonHeaders(), JSON.stringify(payload))
  }

  function handleCompleteLogin() {
    var payload = {}
    sendSocketMessage(42, "Authentication/completeLogin", commonHeaders(), JSON.stringify(payload))
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
    sendSocketMessage(42, "Command/sendCustomArmy", commonHeaders(), JSON.stringify(payload))
  }

  function handleStartRaid() {
    var targets = targetVillageIDs.split(",")
    setRaidPercentage(0)

    if (randomChecked) {
      var ctr = 0
      targets.forEach( (targetID, idx) => {
          var someNumbers = [500, 1000, 1500]
          var randomNumber = someNumbers[Math.floor(Math.random() * someNumbers.length)];

          setTimeout(() => {
            sendTargetedArmy(targetID)
            ctr += 1
            var percentage = Math.ceil(ctr/targets.length* 100)
            setRaidPercentage(percentage)
          }, randomNumber + (idx * 1000))

        })

    } else {
      targets.forEach( (targetID, idx) => {
        sendTargetedArmy(targetID)
      })
      setRaidPercentage(100)
    }

    handleRequestVillageDetailAuto(parseInt(sourceVillageID))

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

  function handleFetchProvince() {
    var payload = {
      x: provinceLandmarkX,
      y: provinceLandmarkY
    }
    sendSocketMessage(42, "Map/getProvince", commonHeaders(), JSON.stringify(payload))
  }

  function handleIncomingMessage(incoming_message) {
    try {
      var sanitizedObj = justSanitize(incoming_message)
      console.log("HANDLING MESSAGE", sanitizedObj)
      console.log("HANDLING TYPE", sanitizedObj[1].type)
      var directObj = sanitizedObj[1]

      if (directObj.type === "Map/villageData") {
        handleMapMessage(directObj)
      } else if (directObj.type === "Character/info") {
        handleIncomingCharacterInfo(directObj)
      } else if (directObj.type === "Map/villageDetails") {
        handleIncomingVillageDetail(directObj)
      } else if (directObj.type === "Map/province") {
        handleIncomingProvinceData(directObj)
        console.log("PROVINCE DATA", directObj)
      }

    } catch (error) {

    }
  }

  function handleMapMessage(directObj) {
    var tempNearbyBarbarianVillages = []
    var tempMyVillages = []
    var tempPlayerVillages = []
    var tempSafePlayerVillages = []

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

      } else if (!village.tribe_name && village.points < 200 && village.attack_protection === 0) {
        try {
          tempVillageObj.name = tempVillageObj.name.substring(0, 9)
          tempVillageObj.character_name = tempVillageObj.character_name.substring(0, 9)
          tempVillageObj.character_id = `${tempVillageObj.character_id}`.substring(0, 3) + "..."
        } catch (error) {
          console.log("ERR", error.message)
        }
        tempSafePlayerVillages.push(tempVillageObj)

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
    setSaveToRaidPlayerVillages(tempSafePlayerVillages  )

  }

  function handleIncomingProvinceData(directObj) {
    var tempNearbyBarbarianVillages = []
    var tempMyVillages = []
    var tempPlayerVillages = []
    var tempSafePlayerVillages = []

    directObj.data.villages.forEach( (village, idx ) => {
      var tempVillageObj = {
        id: village.village_id,
        name: village.village_name,
        x: village.village_x,
        y: village.village_y,
        points: village.points,
        province_name: directObj.data.name,
        tribe_name: village.tribe_id
      }

      if (!village.character_id) {
        tempNearbyBarbarianVillages.push(tempVillageObj)

      } else if (village.character_name === userName) {
        tempMyVillages.push(tempVillageObj)

      } else if (!village.tribe_id && village.points < 200) {
        try {
          tempVillageObj.name = tempVillageObj.name.substring(0, 9)
          tempVillageObj.character_name = tempVillageObj.character_name.substring(0, 9)
          tempVillageObj.character_id = `${tempVillageObj.character_id}`.substring(0, 3) + "..."
        } catch (error) {
          console.log("ERR", error.message)
        }
        tempSafePlayerVillages.push(tempVillageObj)

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
    setSaveToRaidPlayerVillages(tempSafePlayerVillages  )
  }

  function handleIncomingCharacterInfo(directObj) {
    var tempMyVillages = []

    directObj.data.villages.forEach((village, idx) => {
      tempMyVillages.push(village)
    })

    setMyCharacterVillages(tempMyVillages)
  }

  function handleIncomingVillageDetail(directObj) {
    console.log(directObj)
    setMyVillageResources(directObj.data.resources)
    setMyVillageUnits(directObj.data.units)
    setProvinceLandmarkX(directObj.data.province.x)
    setProvinceLandmarkY(directObj.data.province.y)
    setProvinceName(directObj.data.province.name)
  }

  function handlePing() {
    console.log("PING")
    setTimeout(() => {
      ws.current.send(2)
      handlePing()
    }, 4000)
  }

  // MISC FUNCTION

  function handleSaveConfig() {
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

  function addVillageToTargets(villageID, e = false) {
    var tempVal = targetVillageIDs
    if (tempVal === "") {
      tempVal += villageID
    } else {
      tempVal += "," + villageID
    }
    setTargetVillageIDs(tempVal)

    if (e) {
      e.target.className = "btn btn-sm btn-rounded btn-danger"
    }
  }

  function addAllVillageIds(villageList) {
    try {
      var selectedArr = []

      villageList.forEach((val, idx) => {
        selectedArr.push(val.id)
      })

      setTargetVillageIDs(selectedArr.join(","))

    } catch (error) {}
  }

  useEffect(() => {
    try {
      var tmpCount = targetVillageIDs.split(",")
      setTargetVillagesCount(tmpCount.length)
    } catch (error) {
      setTargetVillagesCount(0)
    }
  }, [targetVillageIDs])

  // function beautifyVal(socketMessage) {
  //   try {
  //     var prefixes = [0, 42]
  //     var beautifiedJson = socketMessage

  //     prefixes.forEach( (prefix, idx) => {
  //       if (socketMessage.startsWith(prefix)) {
  //         var sanitizedSocketMessage = socketMessage.replace(prefix,"")
  //         var tempJson = JSON.parse(sanitizedSocketMessage)
  //         console.log(prefix, tempJson)
  //         beautifiedJson = JSON.stringify(tempJson, null, 4)
  //         return
  //       }
  //     })

  //     return beautifiedJson

  //   } catch (error) {
  //     return socketMessage
  //   }
  // }

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

  function calcDist(x2, y2) {
    try {
      var a = sourceVillageX - x2;
      var b = sourceVillageY - y2;

      var c = Math.sqrt( a*a + b*b );
      return Math.ceil(c)
    } catch (error) {}
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
                    <input className="form-control" onChange={(e) => setUserName(e.target.value)} value={userName} />
                  </div>
                  <div className="form-group">
                    <label >User Token</label>
                    <input className="form-control" onChange={(e) => setUserToken(e.target.value)} value={userToken} />
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label >User ID</label>
                    <input className="form-control" onChange={(e) => setUserID(e.target.value)} value={userID} />
                  </div>
                  <div className="form-group">
                    <label >World ID</label>
                    <input className="form-control" onChange={(e) => setWorldID(e.target.value)} value={worldID} />
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-group">
                    <label >TBD</label>
                    <input className="form-control" />
                  </div>
                  <div className="form-group">
                    <label >TBD</label>
                    <input className="form-control" />
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
              <div className="row border rounded">
                <h4 className="col-12">Village Info</h4>
                <div className="col-4 py-2">
                  <button className="btn btn-primary btn-sm float-right" onClick={() => handleRequestPlayerInfo()}>Get My Villages Info</button>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>X</th>
                        <th>Y</th>
                      </tr>
                      {myCharacterVillages.map((myVillage, idx) => (
                        <tr key={`my-village-info-${idx}`}>
                          <td>
                            <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => handleRequestVillageDetailAuto(myVillage.id, e)}>
                              {myVillage.id}
                            </button>
                          </td>
                          <td>{myVillage.name}</td>
                          <td>{myVillage.x}</td>
                          <td>{myVillage.y}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-8 py-2">
                  {/* <input type="number" className="float-right" value={checkVillageID} onChange={(e) => setCheckVillageID(e.target.value)}></input>
                  <button className="btn btn-primary btn-sm float-right mx-2" onClick={() => handleRequestVillageDetail()}>Get Village Detail</button> */}
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">clay</th>
                        <th className="p-1">food</th>
                        <th className="p-1">iron</th>
                        <th className="p-1">wood</th>
                      </tr>
                      <tr>
                        <td className="p-1">{myVillageResources.clay}</td>
                        <td className="p-1">{myVillageResources.food}</td>
                        <td className="p-1">{myVillageResources.iron}</td>
                        <td className="p-1">{myVillageResources.wood}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">spear</th>
                        <th className="p-1">sword</th>
                        <th className="p-1">axe</th>
                        <th className="p-1">archer</th>
                        <th className="p-1">mounted archer</th>
                        <th className="p-1">light cavalry</th>
                        <th className="p-1">heavy cavalry</th>
                      </tr>
                      <tr>
                        <td className="p-1">{myVillageUnits.spear}</td>
                        <td className="p-1">{myVillageUnits.sword}</td>
                        <td className="p-1">{myVillageUnits.axe}</td>
                        <td className="p-1">{myVillageUnits.archer}</td>
                        <td className="p-1">{myVillageUnits.mounted_archer}</td>
                        <td className="p-1">{myVillageUnits.light_cavalry}</td>
                        <td className="p-1">{myVillageUnits.heavy_cavalry}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">knight</th>
                        <th className="p-1">catapult</th>
                        <th className="p-1">doppelsoldner</th>
                        <th className="p-1">ram</th>
                        <th className="p-1">snob</th>
                        <th className="p-1">trebuchet</th>
                      </tr>
                      <tr>
                        <td className="p-1">{myVillageUnits.knight}</td>
                        <td className="p-1">{myVillageUnits.catapult}</td>
                        <td className="p-1">{myVillageUnits.doppelsoldner}</td>
                        <td className="p-1">{myVillageUnits.ram}</td>
                        <td className="p-1">{myVillageUnits.snob}</td>
                        <td className="p-1">{myVillageUnits.trebuchet}</td>
                      </tr>
                    </tbody>
                  </table> */}
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">province X</th>
                        <th className="p-1">province Y</th>
                        <th className="p-1">province Name</th>
                      </tr>
                      <tr>
                        <td className="p-1">{provinceLandmarkX}</td>
                        <td className="p-1">{provinceLandmarkY}</td>
                        <td className="p-1">{provinceName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-3 border rounded py-2">
                  <h4>Easy Raid</h4>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Source Village ID</span>
                    </div>
                    <input type="number" className="form-control" placeholder="" aria-label="Username" value={sourceVillageID} onChange={(e) => setSourceVillageID(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Target Village IDs</label><label className="float-right">{targetVillagesCount}</label>
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
                      <span className="input-group-text">Light Caval</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={lightCavalry} onChange={(e) => setLightCavalry(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Mount Arch</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={mountedArcher} onChange={(e) => setMountedArcher(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Archer</span>
                    </div>
                    <input type="number" className="form-control" placeholder="0" aria-label="Username" value={archer} onChange={(e) => setArcher(e.target.value)} />
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" checked={randomChecked} onChange={(e) => setRandomChecked(e.target.value)} />
                    <label className="form-check-label" >Enable random interval</label>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: `${raidPercentage}%`}} aria-valuenow={`${raidPercentage}`} aria-valuemin="0" aria-valuemax="100">{`${raidPercentage}`}%</div>
                  </div>
                  <button className="btn btn-outline-success btn-sm btn-block" onClick={ () => handleStartRaid() }>Start Raid!</button>
                </div>

                <div className="col-12 col-md-9 border rounded py-2 px-1">
                  <h4>MAP</h4>

                  <div className="row pb-0 px-3 ">
                    <div className="col-12 col-md-2 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">X</span>
                        </div>
                        <input type="number" className="form-control" placeholder="250" aria-label="Username" value={sourceVillageX} onChange={(e) => setSourceVillageX(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-2 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Y</span>
                        </div>
                        <input type="number" className="form-control" placeholder="255" aria-label="Username" value={sourceVillageY} onChange={(e) => setSourceVillageY(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Height</span>
                        </div>
                        <input type="number" className="form-control" placeholder="250" aria-label="Username" value={mapHeight} onChange={(e) => setMapHeight(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Width</span>
                        </div>
                        <input type="number" className="form-control" placeholder="255" aria-label="Username" value={mapWidth} onChange={(e) => setMapWidth(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-2 px-1">
                      <button className="btn btn-outline-success btn-sm btn-block my-1" onClick={ () => handleFetchMap() }>Fetch Map</button>
                    </div>
                    {/* BATAS MENUS PER 12 */}
                    <div className="col-12 col-md-4 p-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Landmark X</span>
                        </div>
                        <input type="number" className="form-control" placeholder="255" aria-label="Username" value={provinceLandmarkX} onChange={(e) => setProvinceLandmarkX(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 p-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Landmark Y</span>
                        </div>
                        <input type="number" className="form-control" placeholder="255" aria-label="Username" value={provinceLandmarkY} onChange={(e) => setProvinceLandmarkY(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 p-1">
                      <button className="btn btn-outline-success btn-sm btn-block my-1" onClick={ () => handleFetchProvince() }>Fetch Province</button>
                    </div>
                  </div>

                  <ul className="nav nav-tabs p-1" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Barbarian Villages</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">My Villages</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Player Villages</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="contact-tab" data-toggle="tab" href="#safeVillage" role="tab" aria-controls="contact" aria-selected="false">Low Point Player Villages</a>
                    </li>
                  </ul>

                  <div className="tab-content p-1 overflow-auto" id="myTabContent" style={{maxHeight: "600px"}}>
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th className="p-1">ID</th>
                            <th className="p-1">X</th>
                            <th className="p-1">Y</th>
                            <th className="p-1">Village Name</th>
                            <th className="p-1">Points</th>
                            <th className="p-1">Report</th>
                            <th className="p-1">Time</th>
                            <th className="p-1">Province</th>
                            <th className="p-1">Dist</th>
                          </tr>
                          <tr>
                            <td className="p-1">
                              <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addAllVillageIds(nearbyBarbarianVillages)}>
                                Add All
                              </button>
                            </td>
                          </tr>
                          {nearbyBarbarianVillages.map ((village, idx) => (
                            <tr key={`barbarian-${idx}`}>
                              <td className="p-1">
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addVillageToTargets(village.id, e)}>
                                  {village.id}
                                </button>
                              </td>
                              <td className="p-1">{village.x}</td>
                              <td className="p-1">{village.y}</td>
                              <td className="p-1">{village.name}</td>
                              <td className="p-1">{village.points}</td>
                              <td className="p-1">{village.report_title}</td>
                              <td className="p-1">{new Date(village.report_time_created * 1000).toLocaleString('en-GB', { hour12: false })}</td>
                              <td className="p-1">{village.province_name}</td>
                              <td className="p-1">{calcDist(village.x, village.y)}</td>
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
                            <th>Report Title</th>
                          </tr>
                          {otherPlayerVillages.map ((village, idx) => (
                            <tr key={`players-${idx}`}>
                              <td>
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addVillageToTargets(village.id, e)}>
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
                              <td>{village.report_title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="tab-pane fade" id="safeVillage" role="tabpanel" aria-labelledby="safeVillage-tab">
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
                            <th>Report Title</th>
                          </tr>
                          <tr>
                            <td className="p-1">
                              <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addAllVillageIds(saveToRaidPlayerVillages)}>
                                Add All
                              </button>
                            </td>
                          </tr>
                          {saveToRaidPlayerVillages.map ((village, idx) => (
                            <tr key={`players-${idx}`}>
                              <td>
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addVillageToTargets(village.id, e)}>
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
                              <td>{village.report_title}</td>
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

      <div className="row my-1">
        <div className="col-12">
          <button className="btn btn-primary btn-sm float-right" onClick={() => handeSaveQuickNote()}>Save Quick Note</button>
        </div>
      </div>
      <div className="row my-1">
        <div className="col-12">
            <ReactQuill theme="snow" value={quickNotes} onChange={setQuickNotes} style={{height: "650px"}}/>
        </div>
      </div>

      <div className="row mb-5">
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
