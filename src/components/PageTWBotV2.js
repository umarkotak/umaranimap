import React, {useEffect, useRef, useState, useRadioButtons} from "react"
import Cookies from 'universal-cookie'
import ReactQuill from 'react-quill';
import { Form } from 'semantic-ui-react'
import 'react-quill/dist/quill.snow.css';

const cookies = new Cookies()

function PageTWBotV2() {
  const ws = useRef(null)
  const CONNECTION_STATUSES = ["CONNECTING", "CONNECTED", "LOGGED IN", "DISCONNECTED"]

  // =================================================================================================================== START CONFIG

  // MESSAGING
  const [latestMessage, setLatestMessage] = useState("")

  // ACCOUNT DATA
  const [userName, setUserName] = useState(cookies.get("TW_USERNAME"))
  const [userToken, setUserToken] = useState(cookies.get("TW_USER_TOKEN"))
  const [userID, setUserID] = useState(cookies.get("TW_USER_ID"))
  const [worldID, setWorldID] = useState(cookies.get("TW_WORLD_ID"))
  const [quickNotes, setQuickNotes] = useState(localStorage.getItem('TW_QUICK_NOTE') || "")
  var globID = 1

  // CONFIG DATA
  const [connectionStatus, setConnectionStatus] = useState(CONNECTION_STATUSES[0])

  // MAP VILLAGES DATA
  const [nearbyBarbarianVillages, setNearbyBarbarianVillages] = useState([])
  const [nearbyMyVillages, setNearbyMyVillages] = useState([])
  const [nearbyPlayerVillages, setNearbyPlayerVillages] = useState([])
  const [nearbyPassivePlayerVillages, setNearbyPassivePlayerVillages] = useState([])

  // IN GAME PLAYER DATA
  const [myVillages, setMyVillages] = useState([])
  const [myActiveVillage, setMyActiveVillage] = useState({})
  const [myActiveVillageID, setMyActiveVillageID] = useState("")
  const [myActiveVillageResources, setMyActiveVillageResources] = useState({})
  const [myActiveVillageUnits, setMyActiveVillageUnits] = useState({})
  const [myActiveVillageX, setMyActiveVillageX] = useState(0)
  const [myActiveVillageY, setMyActiveVillageY] = useState(0)
  const [myActiveVillageProvinceName, setMyActiveVillageProvinceName] = useState("")
  const [myActiveVillageProvinceX, setMyActiveVillageProvinceX] = useState(0)
  const [myActiveVillageProvinceY, setMyActiveVillageProvinceY] = useState(0)

  // PLAYER SELECTION
  const [selectedProvinceX, setSelectedProvinceX] = useState(0)
  const [selectedProvinceY, setSelectedProvinceY] = useState(0)
  const [selectedProvinceName, setSelectedProvinceName] = useState("")
  const [selectedMapHeight, setSelectedMapHeight] = useState(30)
  const [selectedMapWidth, setSelectedMapWidth] = useState(30)
  const [selectedMapCoordX, setSelectedMapCoordX] = useState(0)
  const [selectedMapCoordY, setSelectedMapCoordY] = useState(0)

  // BATTLE TARGET CONFIGURATION
  const [targetVillageIDs, setTargetVillageIDs] = useState("")
  const [targetVillagesCount, setTargetVillagesCount] = useState(0)

  // BATTLE TROOPS CONFIGURATION
  const [spear, setSpear] = useState("")
  const [sword, setSword] = useState("")
  const [axe, setAxe] = useState("")
  const [knight, setKnight] = useState("")
  const [lightCavalry, setLightCavalry] = useState("")
  const [mountedArcher, setMountedArcher] = useState("")
  const [archer, setArcher] = useState("")

  // BATTLE CONFIGS
  const [sendAttackWithRandomInterval, setSendAttackWithRandomInterval] = useState(false)
  const [sendAttackToAllNearbyRandomBarbarian, setSendAttackToAllNearbyRandomBarbarian] = useState(false)
  const [raidPercentage, setRaidPercentage] = useState(0)

  // =================================================================================================================== END CONFIG

  useEffect(() => { connectWs() }, [])
  useEffect(() => { initProcess() }, [latestMessage])

  function connectWs() {
    ws.current = new WebSocket(`wss://en.tribalwars2.com/socket.io/?platform=desktop&EIO=3&transport=websocket`)
    return () => { ws.current.close(); setConnectionStatus("not connected") }
  }

  function initProcess() {
    if (!ws.current) { return }
    ws.current.onopen = (e) => { onOpenProcess(e) }
    ws.current.onmessage = (e) => { onIncomingMessage(e) }
    ws.current.onclose = (e) => { onClosingWebSocket(e) }
  }

  function onOpenProcess(e) {
    setConnectionStatus(CONNECTION_STATUSES[1])
    if (userName && userToken && userID && worldID) { executeAutoLogin() }
    sendPing()
  }

  function onIncomingMessage(e) {
    e.preventDefault()
    setLatestMessage(e.data)
    handleIncomingMessage(e.data)
  }

  function onClosingWebSocket(e) {
    e.preventDefault()
    setConnectionStatus(CONNECTION_STATUSES[3])
  }

  function handleIncomingMessage(incomingMessage) {
    try {
      var prefixes = [0, 42]
      var sanitizedObject

      prefixes.forEach( (prefix) => {
        if (incomingMessage.startsWith(prefix)) {
          sanitizedObject = JSON.parse(incomingMessage.replace(prefix,""))[1]
        }
      })
      if (!sanitizedObject) { return }

      console.log("INCOMING MESSAGE:", sanitizedObject.type, "VALUE:", sanitizedObject)

      if (sanitizedObject.type === "Map/villageData") {
        handleIncomingMapMessage(sanitizedObject)
      } else if (sanitizedObject.type === "Character/info") {
        handleIncomingCharacterInfo(sanitizedObject)
      } else if (sanitizedObject.type === "Map/villageDetails") {
        handleIncomingVillageDetail(sanitizedObject)
      } else if (sanitizedObject.type === "Map/province") {
        handleIncomingProvinceData(sanitizedObject)
      } else if (sanitizedObject.type === "ResourceDeposit/info") {
        handleIncomingResourceDepositInfo(sanitizedObject)
      }
    } catch (error) { console.log("ERROR ON HANDLING MESSAGE", error) }
  }

  // =================================================================================================================== SENDING WEBSOCKET MESSAGE

  function timeNow() { return + new Date() }

  function commonHeaders() {
    return `{ "traveltimes": [["browser_send", ${timeNow()}]] }`
  }

  function sendSocketMessage(prefixNum, type, headers, payload) {
    var basePayload = `${prefixNum}["msg", {
      "id": ${globID},
      "type": "${type}",
      "headers": ${headers},
      "data": ${payload}
      }
    ]`
    console.log("SENDING SOCKET MESSAGE\n", basePayload)
    ws.current.send(basePayload)
    globID++
  }

  function sendLoginRequest() {
    var payload = { name: userName, token: userToken }
    sendSocketMessage(42, "Authentication/login", commonHeaders(), JSON.stringify(payload))
  }

  function sendSystemIdentityRequest() {
    var payload = {
      api_version: "10.*.*",
      platform: "browser",
      device: "Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_14_6)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/88.0.4324.96%20Safari/537.36"
    }
    sendSocketMessage(42, "System/identify", commonHeaders(), JSON.stringify(payload))
  }

  function sendSelectCharacterRequest() {
    var payload = { id: userID, world_id: worldID }
    sendSocketMessage(42, "Authentication/selectCharacter", commonHeaders(), JSON.stringify(payload))
  }

  function sendCompleteLoginRequest() {
    sendSocketMessage(42, "Authentication/completeLogin", commonHeaders(), JSON.stringify({}))
  }

  function sendCharacterInfoRequest() {
    sendSocketMessage(42, "Character/getInfo", commonHeaders(), JSON.stringify({}))
  }

  function sendVillageDetailRequest(selectedVillageID, e = false) {
    var payload = {
      village_id: parseInt(selectedVillageID), my_village_id: myVillages[0].id, num_reports: 5
    }
    sendSocketMessage(42, "Map/getVillageDetails", commonHeaders(), JSON.stringify(payload))
    if (e) {
      e.target.className = "btn btn-sm btn-rounded btn-danger"
    }
  }

  function sendCustomArmyRequest(targetVillageID) {
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
      start_village: parseInt(myActiveVillageID),
      target_village: parseInt(targetVillageID),
      type: "attack",
      units: units
    }
    sendSocketMessage(42, "Command/sendCustomArmy", commonHeaders(), JSON.stringify(payload))
  }

  function sendVillagesByAreaRequest() {
    var payload = {
      character_id: userID,
      height: parseInt(selectedMapHeight),
      width: parseInt(selectedMapWidth),
      x: parseInt(selectedMapCoordX),
      y: parseInt(selectedMapCoordY)
    }
    sendSocketMessage(42, "Map/getVillagesByArea", commonHeaders(), JSON.stringify(payload))
  }

  function sendVillagesByProvinceRequest() {
    var payload = { x: selectedProvinceX, y: selectedProvinceY }
    sendSocketMessage(42, "Map/getProvince", commonHeaders(), JSON.stringify(payload))
  }

  function sendVillagesByDynamicAreaRequest(offset) {
    var payload = {
      character_id: userID,
      height: parseInt(selectedMapHeight),
      width: parseInt(selectedMapWidth),
      x: parseInt(selectedMapCoordX) - offset,
      y: parseInt(selectedMapCoordY) - offset
    }
    sendSocketMessage(42, "Map/getVillagesByArea", commonHeaders(), JSON.stringify(payload))
  }

  function sendResourceDepositRequest() {
    sendSocketMessage(42, "ResourceDeposit/open", commonHeaders(), JSON.stringify({}))
  }

  function sendStartDepositJobRequest(job_id) {
    var payload = { job_id: job_id }
    sendSocketMessage(42, "ResourceDeposit/startJob", commonHeaders(), JSON.stringify(payload))
  }

  function sendCollectJobRequest(job_id) {
    var payload = { job_id: job_id, village_id: parseInt(myActiveVillageID) }
    sendSocketMessage(42, "ResourceDeposit/collect", commonHeaders(), JSON.stringify(payload))
  }

  function sendPing() {
    console.log("PING")
    setTimeout(() => {
      ws.current.send(2); executeAutomatedProcess(); sendPing()
    }, 4000)
  }

  // =================================================================================================================== MAIN BUSINESS LOGIC

  function executeAutoLogin() {
    handleSaveConfig()
    sendLoginRequest()
    setTimeout(() => { sendSystemIdentityRequest() }, 500)
    setTimeout(() => { sendSelectCharacterRequest() }, 1000)
    setTimeout(() => { sendCompleteLoginRequest() }, 1500)
    setTimeout(() => { sendCharacterInfoRequest() }, 1750)
  }

  function executeBulkAttack() {
    setRaidPercentage(0)
    if (sendAttackToAllNearbyRandomBarbarian) { executeSendAttackToAllNearbyRandomBarbarian(); return }

    var targetVillages = targetVillageIDs.split(",")
    if (sendAttackWithRandomInterval) {
      var ctr = 0
      targetVillages.forEach( (targetID, idx) => {
        var intervalVariants = [500, 1000, 1500]
        var selectedInterval = intervalVariants[Math.floor(Math.random() * intervalVariants.length)];
        setTimeout(() => {
          sendCustomArmyRequest(targetID)
          ctr += 1
          setRaidPercentage(Math.ceil( ctr / targetVillages.length * 100 ))
        }, selectedInterval + (idx * 1000))
      })

    } else {
      targetVillages.forEach((targetID) => { sendCustomArmyRequest(targetID) })
      setRaidPercentage(100)
    }

    sendVillageDetailRequest(myActiveVillageID)
  }

  function executeSendAttackToAllNearbyRandomBarbarian() {
    var targetVillages = nearbyBarbarianVillages.map((village) => { return village.id })
    targetVillages = shuffle(targetVillages).slice(0, 45)
    targetVillages.forEach((targetID) => { sendAveragedArmy(targetID, targetVillages.length) })
  }

  function sendAveragedArmy(targetID, size) {
    var units = {}

    units.spear = Math.floor(myActiveVillageUnits.spear / size)
    units.sword = Math.floor(myActiveVillageUnits.sword / size)
    units.axe = Math.floor(myActiveVillageUnits.axe / size)
    units.knight = Math.floor(myActiveVillageUnits.knight / size)
    units.lightCavalry = Math.floor(myActiveVillageUnits.lightCavalry / size)
    units.mountedArcher = Math.floor(myActiveVillageUnits.mountedArcher / size)
    units.archer = Math.floor(myActiveVillageUnits.archer / size)

    var payload = {
      catapult_target: "headquarter",
      icon: 0,
      start_village: parseInt(myActiveVillageID),
      target_village: parseInt(targetID),
      type: "attack",
      units: units
    }
    sendSocketMessage(42, "Command/sendCustomArmy", commonHeaders(), JSON.stringify(payload))
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function executeAutomatedProcess() {
    sendResourceDepositRequest()
  }

  // =================================================================================================================== INCOMING MESSAGE HANDLER

  function handleIncomingMapMessage(directObj) {
    var tempNearbyBarbarianVillages = []
    var tempNearbyMyVillages = []
    var tempNearbyPlayerVillages = []
    var tempNearbyPassivePlayerVillages = []

    directObj.data.villages.forEach((village) => {
      if (!village.character_id) {
        tempNearbyBarbarianVillages.push(village)

      } else if (village.character_name === userName) {
        tempNearbyMyVillages.push(village)

      } else if (!village.tribe_name && village.points < 200 && village.attack_protection === 0) {
        try {
          village.name = village.name.substring(0, 9)
          village.character_name = village.character_name.substring(0, 9)
          village.character_id = `${village.character_id}`.substring(0, 3) + "..."
        } catch (error) {}
        tempNearbyPassivePlayerVillages.push(village)

      } else {
        try {
          village.name = village.name.substring(0, 9)
          village.character_name = village.character_name.substring(0, 9)
          village.character_id = `${village.character_id}`.substring(0, 3) + "..."
        } catch (error) {}
        tempNearbyPlayerVillages.push(village)
      }
    })

    setNearbyBarbarianVillages(tempNearbyBarbarianVillages)
    setNearbyMyVillages(tempNearbyMyVillages)
    setNearbyPlayerVillages(tempNearbyPlayerVillages)
    setNearbyPassivePlayerVillages(tempNearbyPassivePlayerVillages)
  }

  function handleIncomingProvinceData(directObj) {
    var tempNearbyBarbarianVillages = []
    var tempNearbyMyVillages = []
    var tempNearbyPlayerVillages = []
    var tempNearbyPassivePlayerVillages = []

    directObj.data.villages.forEach((village) => {
      var tempVillage = {
        id: village.village_id,
        character_id: village.character_id,
        character_name: village.character_name,
        name: village.village_name,
        x: village.village_x,
        y: village.village_y,
        points: village.points,
        province_name: directObj.data.name,
        tribe_name: village.tribe_id
      }

      if (!tempVillage.character_id) {
        tempNearbyBarbarianVillages.push(tempVillage)

      } else if (tempVillage.character_name === userName) {
        tempNearbyMyVillages.push(tempVillage)

      } else if (!village.tribe_id && village.points < 200) {
        try {
          tempVillage.name = tempVillage.name.substring(0, 9)
          tempVillage.character_name = tempVillage.character_name.substring(0, 9)
          tempVillage.character_id = `${tempVillage.character_id}`.substring(0, 3) + "..."
        } catch (error) {}
        tempNearbyPassivePlayerVillages.push(tempVillage)

      } else {
        try {
          tempVillage.name = tempVillage.name.substring(0, 9)
          tempVillage.character_name = tempVillage.character_name.substring(0, 9)
          tempVillage.character_id = `${tempVillage.character_id}`.substring(0, 3) + "..."
        } catch (error) {}
        tempNearbyPlayerVillages.push(tempVillage)
      }
    })

    setNearbyBarbarianVillages(tempNearbyBarbarianVillages)
    setNearbyMyVillages(tempNearbyMyVillages)
    setNearbyPlayerVillages(tempNearbyPlayerVillages)
    setNearbyPassivePlayerVillages(tempNearbyPassivePlayerVillages)
  }

  function handleIncomingResourceDepositInfo(directObj) {
    try {
      directObj.data.jobs.forEach(element => {
        if (!element.time_completed) {
          sendStartDepositJobRequest(element.id)

        } else {
          var unixTimeNow = Math.floor(timeNow() / 1000)
          if (element.time_completed < unixTimeNow) {
            if (!myActiveVillageID) { throw "FOUND" }
            sendCollectJobRequest(element.id)
          }
          throw "FOUND"
        }
      })
    } catch (e) {}
  }

  function handleIncomingCharacterInfo(directObj) {
    setConnectionStatus(CONNECTION_STATUSES[2])
    var tempMyVillages = []
    directObj.data.villages.forEach((village) => {
      tempMyVillages.push(village)
    })
    setMyVillages(tempMyVillages)
  }

  function handleIncomingVillageDetail(directObj) {
    setMyActiveVillage(directObj.data)
    setMyActiveVillageID(directObj.data.id)
    setMyActiveVillageResources(directObj.data.resources)
    setMyActiveVillageUnits(directObj.data.units)
    setMyActiveVillageX(directObj.data.village_x)
    setMyActiveVillageY(directObj.data.village_y)
    setMyActiveVillageProvinceName(directObj.data.province.name)
    setMyActiveVillageProvinceX(directObj.data.province.x)
    setMyActiveVillageProvinceY(directObj.data.province.y)
    selectedMapCoordX(directObj.data.village_x)
    selectedMapCoordY(directObj.data.village_y)

    sendVillagesByDynamicAreaRequest(15)
  }

  // =================================================================================================================== HELPER FUNCTION

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
    window.location.reload()
  }

  function saveToCookies(k, v) {
    let date = new Date(2030, 12)
    cookies.set(k, v, { path: "/", expires: date })
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

  function calcDist(x2, y2) {
    try {
      var a = myActiveVillageX - x2
      var b = myActiveVillageY - y2
      var c = Math.sqrt((a*a)+(b*b))
      return Math.ceil(c)
    } catch (error) {}
  }

  function saveQuickNote() { localStorage.setItem("TW_QUICK_NOTE", quickNotes) }

  // =================================================================================================================== RENDERING APPLICATION

  return(
    <div>
      <h1>Tribal War Script</h1>

      <div className="row my-1">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info"></div>
            <div className="card-body p-2">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <div className="form-group">
                    <label >Username</label>
                    <input className="form-control" onChange={(e) => setUserName(e.target.value)} value={userName} />
                  </div>
                  <div className="form-group">
                    <label >User Token</label>
                    <input className="form-control" onChange={(e) => setUserToken(e.target.value)} value={userToken} />
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="form-group">
                    <label >User ID</label>
                    <input className="form-control" onChange={(e) => setUserID(e.target.value)} value={userID} />
                  </div>
                  <div className="form-group">
                    <label >World ID</label>
                    <input className="form-control" onChange={(e) => setWorldID(e.target.value)} value={worldID} />
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <button className="btn btn-block btn-sm btn-outline-primary disabled">{connectionStatus}</button>
                  <button className="btn btn-block btn-sm btn-outline-primary" onClick={() => executeAutoLogin()}>Login</button>
                  <button className="btn btn-block btn-sm btn-outline-danger" onClick={() => handleClearConfig()}>Logout</button>
                  <a className="btn btn-block btn-sm btn-outline-success" target="_blank" href="https://trakteer.id/marumaru" rel="noopener noreferrer">Support!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-1">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info p-2 text-white">
              controller
            </div>
            <div className="card-body">
              <div className="row border rounded">
                <div className="col-12 col-lg-4 p-2">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">ID</th>
                        <th className="p-1">Name</th>
                        <th className="p-1">X</th>
                        <th className="p-1">Y</th>
                      </tr>
                      {myVillages.map((myVillage, idx) => (
                        <tr key={`my-village-info-${idx}`}>
                          <td className="p-1">
                            <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => sendVillageDetailRequest(myVillage.id, e)}>
                              {myVillage.id}
                            </button>
                          </td>
                          <td className="p-1">{myVillage.name}</td>
                          <td className="p-1">{myVillage.x}</td>
                          <td className="p-1">{myVillage.y}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-12 col-lg-8 py-2">
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
                        <td className="p-1">{myActiveVillageUnits.spear}</td>
                        <td className="p-1">{myActiveVillageUnits.sword}</td>
                        <td className="p-1">{myActiveVillageUnits.axe}</td>
                        <td className="p-1">{myActiveVillageUnits.archer}</td>
                        <td className="p-1">{myActiveVillageUnits.mounted_archer}</td>
                        <td className="p-1">{myActiveVillageUnits.light_cavalry}</td>
                        <td className="p-1">{myActiveVillageUnits.heavy_cavalry}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">province X</th>
                        <th className="p-1">province Y</th>
                        <th className="p-1">province Name</th>
                      </tr>
                      <tr>
                        <td className="p-1">{selectedProvinceX}</td>
                        <td className="p-1">{selectedProvinceY}</td>
                        <td className="p-1">{selectedProvinceName}</td>
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
                    <input type="number" className="form-control" placeholder="" aria-label="Username" value={myActiveVillageID} onChange={(e) => setMyActiveVillageID(e.target.value)} />
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
                  <div className="mb-3">
                    <label>random interval</label>
                    <Form.Radio label="On" checked={sendAttackWithRandomInterval === true} value={`true`} onClick={() => setSendAttackWithRandomInterval(true)} />
                    <Form.Radio label="Off" checked={sendAttackWithRandomInterval === false} value={`false`} onClick={() => setSendAttackWithRandomInterval(false)} />
                  </div>
                  <div className="mb-3">
                    <label>all random barbarian</label>
                    <Form.Radio label="On" checked={sendAttackToAllNearbyRandomBarbarian === true} value={`true`} onClick={() => setSendAttackToAllNearbyRandomBarbarian(true)} />
                    <Form.Radio label="Off" checked={sendAttackToAllNearbyRandomBarbarian === false} value={`false`} onClick={() => setSendAttackToAllNearbyRandomBarbarian(false)} />
                  </div>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: `${raidPercentage}%`}} aria-valuenow={`${raidPercentage}`} aria-valuemin="0" aria-valuemax="100">{`${raidPercentage}`}%</div>
                  </div>
                  <button className="btn btn-outline-success btn-sm btn-block" onClick={ () => executeBulkAttack() }>Start Raid!</button>
                </div>

                <div className="col-12 col-md-9 border rounded py-2 px-1">
                  <h4>MAP</h4>

                  <div className="row pb-0 px-3 ">
                    <div className="col-12 col-md-2 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">X</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" value={myActiveVillageX} onChange={(e) => setMyActiveVillageX(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-2 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Y</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" value={myActiveVillageY} onChange={(e) => setMyActiveVillageY(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Height</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" value={selectedMapHeight} onChange={(e) => setSelectedMapHeight(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 px-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Width</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" value={selectedMapHeight} onChange={(e) => setSelectedMapHeight(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-2 px-1">
                      <button className="btn btn-outline-success btn-sm btn-block my-1" onClick={ () => sendVillagesByAreaRequest() }>Fetch Map</button>
                    </div>
                    {/* BATAS MENUS PER 12 */}
                    <div className="col-12 col-md-4 p-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Landmark X</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" value={selectedProvinceX} onChange={(e) => setSelectedProvinceX(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 p-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Landmark Y</span>
                        </div>
                        <input type="number" className="form-control" aria-label="Username" value={selectedProvinceY} onChange={(e) => setSelectedProvinceY(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 p-1">
                      <button className="btn btn-outline-success btn-sm btn-block my-1" onClick={ () => sendVillagesByProvinceRequest() }>Fetch Province</button>
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
                          {nearbyMyVillages.map ((village, idx) => (
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
                          {nearbyPlayerVillages.map ((village, idx) => (
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
                              <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addAllVillageIds(nearbyPassivePlayerVillages)}>
                                Add All
                              </button>
                            </td>
                          </tr>
                          {nearbyPassivePlayerVillages.map ((village, idx) => (
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
          <button className="btn btn-primary btn-sm float-right" onClick={() => saveQuickNote()}>Save Quick Note</button>
        </div>
      </div>
      <div className="row my-1">
        <div className="col-12">
            <ReactQuill theme="snow" value={quickNotes} onChange={setQuickNotes} style={{height: "650px"}}/>
        </div>
      </div>

      <div className="row mb-5">
      </div>
    </div>
  )
}

export default PageTWBotV2
