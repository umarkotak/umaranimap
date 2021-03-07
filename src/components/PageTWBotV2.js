import React, {useEffect, useRef, useState} from "react"
import Cookies from 'universal-cookie'
import ReactQuill from 'react-quill';
import { Form } from 'semantic-ui-react'
import 'react-quill/dist/quill.snow.css';
import TWBotDB from "./TWBotDB"

const cookies = new Cookies()
const tWBotDB = new TWBotDB();

function PageTWBotV2() {
  const ws = useRef(null)
  const CONNECTION_STATUSES = ["CONNECTING", "CONNECTED", "LOGGED IN", "DISCONNECTED", "NOT CONNECTED", "RECONNECTING"]
  const ONE_FOR_ALL_DELAY = 9000 * 1000
  const MAX_RAID_OVERFLOW = 47

  // =================================================================================================================== START CONFIG

  // MESSAGING
  const [latestMessage, setLatestMessage] = useState("")

  var globID = 1
  var joinTime

  // ACCOUNT DATA
  const [userName, setUserName] = useState(cookies.get("TW_USERNAME"))
  const [userToken, setUserToken] = useState(cookies.get("TW_USER_TOKEN"))
  const [userID, setUserID] = useState(cookies.get("TW_USER_ID"))
  const [worldID, setWorldID] = useState(cookies.get("TW_WORLD_ID"))
  const [quickNotes, setQuickNotes] = useState(localStorage.getItem('TW_QUICK_NOTE') || "")
  const [loginProgress, setLoginProgress] = useState(0)

  // CONFIG DATA
  const [connectionStatus, setConnectionStatus] = useState(CONNECTION_STATUSES[0])
  const [timeElapsed, setTimeElapsed] = useState("00:00:00")

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
  const [myActiveVillageOutgoingArmy, setMyActiveVillageOutgoingArmy] = useState(0)
  const [myActiveVillageSummarizedOutgoingArmy, setMyActiveVillageSummarizedOutgoingArmy] = useState({})
  const [myActiveVillageSimplifiedBuildingsLevel, setMyActiveVillageSimplifiedBuildingsLevel] = useState({})
  const [myActiveVillageBuildingQueue, setMyActiveVillageBuildingQueue] = useState([])
  const [myActiveVillageOngoingQueueCount, setMyActiveVillageOngoingQueueCount] = useState(0)
  const [myActiveVillageUnlockedQueue, setMyActiveVillageUnlockedQueue] = useState(0)

  // PLAYER SELECTION
  const [selectedProvinceX, setSelectedProvinceX] = useState(0)
  const [selectedProvinceY, setSelectedProvinceY] = useState(0)
  const [selectedProvinceName, setSelectedProvinceName] = useState("")
  const [selectedMapHeight, setSelectedMapHeight] = useState(40)
  const [selectedMapWidth, setSelectedMapWidth] = useState(40)
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
  const [heavyCavalry, setHeavyCavalry] = useState("")

  // BATTLE CONFIGS
  const [sendAttackWithRandomInterval, setSendAttackWithRandomInterval] = useState(false)
  const [sendAttackToAllNearbyRandomBarbarian, setSendAttackToAllNearbyRandomBarbarian] = useState(false)
  const [raidPercentage, setRaidPercentage] = useState(0)
  const [attackAllVillageProgress, setAttackAllVillageProgress] = useState(0)

  // AUTOMATED CONFIGS
  const [enableAutoResourceCollector, setEnableAutoResourceCollector] = useState("false")
  const [enableAutoArmySender, setEnableAutoArmySender] = useState("false")
  const [enableAutoBuildConstruction, setEnableAutoBuildConstruction] = useState("false")

  const [autoArmyCycle, setAutoArmyCycle] = useState(0)
  const [autoArmyMaxOutgoing, setAutoArmyMaxOutgoing] = useState(48)
  const [autoArmyNextAttackIndex, setAutoArmyNextAttackIndex] = useState(0)
  const [autoArmyNextAttackVillageID, setAutoArmyNextAttackVillageID] = useState(0)
  const [autoArmyPercentage, setAutoArmyPercentage] = useState(0)
  const [autoArmyTotalAttack, setAutoArmyTotalAttack] = useState(0)
  const [autoArmyTotalWood, setAutoArmyTotalWood] = useState(0)
  const [autoArmyTotalClay, setAutoArmyTotalClay] = useState(0)
  const [autoArmyTotalIron, setAutoArmyTotalIron] = useState(0)
  const [autoArmyWithFullHaul, setAutoArmyWithFullHaul] = useState(0)
  const [autoArmyWithPartialHaul, setAutoArmyWithPartialHaul] = useState(0)

  const [autoBuildNextIndex, setAutoBuildNextIndex] = useState(0)
  const [autoBuildNextBuilding, setAutoBuildNextBuilding] = useState("")
  const [autoBuildNextLevel, setAutoBuildNextLevel] = useState(0)
  const [autoBuildTemplateProgress, setAutoBuildTemplateProgress] = useState(0)

  const [enableAutoOneForAll, setEnableAutoOneForAll] = useState("false")
  const [autoOneForAllLastAttackTime, setAutoOneForAllLastAttackTime] = useState(0)
  const [autoOneForAllNextAttackTime, setAutoOneForAllNextAttackTime] = useState(0)
  const [autoOneForAllRemainingAttackTime, setAutoOneForAllRemainingAttackTime] = useState("00:00:00")
  const [autoOneForAllCycle, setAutoOneForAllCycle] = useState(0)
  const [autoOneForAllInterval, setAutoOneForAllInterval] = useState(localStorage.getItem("autoOneForAllInterval") || ONE_FOR_ALL_DELAY)

  const [enableRaidOverFlow, setEnableRaidOverFlow] = useState("false")
  const [pingRaidOverFlow, setPingRaidOverFlow] = useState(0)
  const [raidOverFlow, setRaidOverFlow] = useState({
    0: {
      totalCycle: 0,
      totalAttack: 0,
      nextIdx: 0,
      nextVillage: 0,
      targetCnt: 0,
      outgoingCnt: 0,
      full: 0,
      partial: 0,
      wood: 0,
      clay: 0,
      iron: 0
    }
  })

  // =================================================================================================================== END CONFIG

  // =================================================================================================================== CORE LOGIC START

  useEffect(() => { sendPing(); connectWs(); automatedInitiation() }, [])
  useEffect(() => { initProcess() }, [latestMessage])

  function connectWs() {
    try {
      ws.current = new WebSocket(`wss://en.tribalwars2.com/socket.io/?platform=desktop&EIO=3&transport=websocket`)
      return () => { ws.current.close(); setConnectionStatus(CONNECTION_STATUSES[4]); console.log(CONNECTION_STATUSES[4]) }
    } catch (error) {
      triggerReconnection()
    }
  }

  function automatedInitiation() {
    joinTime = timeNowUnix()
    setEnableAutoOneForAll("false")
    localStorage.setItem("enableAutoOneForAll", "false")
    setAutoOneForAllLastAttackTime(0)
    localStorage.setItem("autoOneForAllLastAttackTime", 0)
    setAutoOneForAllNextAttackTime(0)
    localStorage.setItem("autoOneForAllNextAttackTime", 0)
    setAutoOneForAllCycle(0)
    localStorage.setItem("autoOneForAllCycle", 0)

    setEnableRaidOverFlow("false")
    localStorage.setItem("enableRaidOverFlow", "false")
  }

  function initProcess() {
    if (!ws.current) { return }
    ws.current.onopen = (e) => { onOpenProcess(e) }
    ws.current.onmessage = (e) => { onIncomingMessage(e) }
    ws.current.onclose = (e) => { onClosingWebSocket(e) }
  }

  function onOpenProcess(e) {
    setConnectionStatus(CONNECTION_STATUSES[1])
    console.log(CONNECTION_STATUSES[1])
    if (userName && userToken && userID && worldID) { executeAutoLogin() }
  }

  function onIncomingMessage(e) {
    e.preventDefault()
    setLatestMessage(e.data)
    handleIncomingMessage(e.data)
  }

  function onClosingWebSocket(e) {
    e.preventDefault()
    setConnectionStatus(CONNECTION_STATUSES[3])
    console.log(CONNECTION_STATUSES[3])
    triggerReconnection()
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

      // console.log("INCOMING MESSAGE:", sanitizedObject.type, "VALUE:", sanitizedObject)

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
      } else if (sanitizedObject.type === "UnitScreen/data") {
        handleIncomingUnitScreenData(sanitizedObject)
      } else if (sanitizedObject.type === "Report/new") {
        handleIncomingNewReport(sanitizedObject)
      } else if (sanitizedObject.type === "Report/view") {
        handleIncomingReportDetail(sanitizedObject)
      } else if (sanitizedObject.type === "VillageBatch/villageData") {
        handleIncomingVillageDataDetail(sanitizedObject)
      } else if (sanitizedObject.type === "Exception/SystemException") {
        executeAutoLogin()
      }

    } catch (error) {
      console.log("ERROR ON HANDLING MESSAGE", error)
    }
  }

  // =================================================================================================================== CORE LOGIC END

  // =================================================================================================================== SENDING WEBSOCKET MESSAGE START

  function timeNowUnix() { return + new Date() }

  function commonHeaders() {
    return `{ "traveltimes": [["browser_send", ${timeNowUnix()}]] }`
  }

  function sendSocketMessage(prefixNum, type, headers, payload) {
    var basePayload = `${prefixNum}["msg", {
      "id": ${globID},
      "type": "${type}",
      "headers": ${headers},
      "data": ${payload}
      }
    ]`
    // console.log("SENDING SOCKET MESSAGE\n", basePayload)
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
    var tempMyVillageID
    if (myVillages[0]) {
      tempMyVillageID = myVillages[0].id
    } else {
      tempMyVillageID = selectedVillageID
    }

    var payload = {
      village_id: parseInt(selectedVillageID), my_village_id: tempMyVillageID, num_reports: 5
    }
    sendSocketMessage(42, "Map/getVillageDetails", commonHeaders(), JSON.stringify(payload))

    setLoginProgress(95)

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
    if (heavyCavalry > 0) { units.heavy_cavalry = parseInt(heavyCavalry) }

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

  function sendFullyCustomArmyRequest(sourceVillageID, targetVillageID, units) {
    var payload = {
      catapult_target: "headquarter",
      icon: 0,
      start_village: parseInt(sourceVillageID),
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

  function sendVillagesByDynamicAreaRequest(x, y, width, height) {
    var payload = {
      character_id: userID,
      height: parseInt(height),
      width: parseInt(width),
      x: parseInt(x),
      y: parseInt(y)
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

  function sendUnitScreenInfoRequest(villageID) {
    var payload = { village_id: villageID }
    sendSocketMessage(42, "Unit/getUnitScreenInfo", commonHeaders(), JSON.stringify(payload))
  }

  function sendReportDetailRequest(reportID) {
    var payload = { id: reportID }
    sendSocketMessage(42, "Report/get", commonHeaders(), JSON.stringify(payload))
  }

  function sendVillageDataDetailRequest(villageID) {
    var payload = { village_ids: [parseInt(villageID)] }
    sendSocketMessage(42, "VillageBatch/getVillageData", commonHeaders(), JSON.stringify(payload))
  }

  function sendBuildingUpgradeRequest(villageID, buildingName) {
    var payload = {
      building: buildingName,
      village_id: parseInt(villageID),
      location: "hq",
      premium: false
     }
    sendSocketMessage(42, "Building/upgrade", commonHeaders(), JSON.stringify(payload))
  }

  function sendPing() {
    setTimeout(() => {
      if (ws.current.readyState === 1) {
        sendPing()
        ws.current.send(2)
        executeAutomatedProcess()
      } else { sendPing() }
    }, 4000)
  }

  // =================================================================================================================== SENDING WEBSOCKET MESSAGE END

  // =================================================================================================================== MAIN BUSINESS LOGIC START

  function executeAutoLogin() {
    handleSaveConfig()
    setTimeout(() => { sendLoginRequest() }, 200)
    setTimeout(() => { setLoginProgress(25) }, 200)

    setTimeout(() => { sendSystemIdentityRequest() }, 500)
    setTimeout(() => { setLoginProgress(50) }, 500)

    setTimeout(() => { sendSelectCharacterRequest() }, 750)
    setTimeout(() => { setLoginProgress(75) }, 750)

    setTimeout(() => { sendCompleteLoginRequest() }, 1000)
    setTimeout(() => { setLoginProgress(90) }, 1000)

    setTimeout(() => { sendCharacterInfoRequest() }, 1150)
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
      setTimeout(() => { setRaidPercentage(100) }, 500)
    }

    saveAttackPreset()
    sendVillageDetailRequest(myActiveVillageID)
  }

  function saveAttackPreset() {
    storeVillageLastAttack(myActiveVillageID)

    storeArmyLastAttack(myActiveVillageID, "spear", (parseInt(spear) || 0))
    storeArmyLastAttack(myActiveVillageID, "sword", (parseInt(sword) || 0))
    storeArmyLastAttack(myActiveVillageID, "axe", (parseInt(axe) || 0))
    storeArmyLastAttack(myActiveVillageID, "knight", (parseInt(knight) || 0))
    storeArmyLastAttack(myActiveVillageID, "lightCavalry", (parseInt(lightCavalry) || 0))
    storeArmyLastAttack(myActiveVillageID, "mountedArcher", (parseInt(mountedArcher) || 0))
    storeArmyLastAttack(myActiveVillageID, "archer", (parseInt(archer) || 0))
    storeArmyLastAttack(myActiveVillageID, "heavyCavalry", (parseInt(heavyCavalry) || 0))
  }

  function executeSendAttackToAllNearbyRandomBarbarian() {
    var targetVillages = nearbyBarbarianVillages.map((village) => { return village.id })
    targetVillages = shuffle(targetVillages).slice(0, 45)
    targetVillages.forEach((targetID) => { sendAveragedArmy(targetID, targetVillages.length) })
    setRaidPercentage(100)
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
    units.heavy_cavalry = Math.floor(myActiveVillageUnits.heavy_cavalry / size)

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

  function findLatestIndexForAutoBuild() {
    var buildingTemplateList = tWBotDB.GetBuildingTemplateList()
    if (myActiveVillageID === "") { return }
    try {
      buildingTemplateList.forEach((val, idx) => {
        if (myActiveVillageSimplifiedBuildingsLevel[val.building_name] >= val.level) {
        } else {

          var foundOnQueue = false
          myActiveVillageBuildingQueue.forEach((buildedQueue, idx2) => {
            if (buildedQueue.building == val.building_name && buildedQueue.level >= val.level) {
              foundOnQueue = true
            }
          })

          if (!foundOnQueue) {
            setAutoBuildNextIndex(idx)
            setAutoBuildNextBuilding(val.building_name)
            setAutoBuildNextLevel(val.level)
            throw "Break"
          }
        }
      })

      setEnableAutoBuildConstruction("false")

    } catch (error) {

    }
  }

  function attackAllPreviousVillage() {
    setAttackAllVillageProgress(0)
    var totalLength = 0
    myVillages.forEach((tempVillage, idx) => {
      var tempTargetVillageIDs = getVillageLastAttack(tempVillage.id)

      if (tempTargetVillageIDs) {
        var arrTempTargetVillageIDs = tempTargetVillageIDs.split(",")
        totalLength += arrTempTargetVillageIDs.length
      } else {}
    })

    var currentLength = 0
    myVillages.forEach((tempVillage, idx) => {
      var tempTargetVillageIDs = getVillageLastAttack(tempVillage.id)

      if (tempTargetVillageIDs) {
        var arrTempTargetVillageIDs = tempTargetVillageIDs.split(",")
        arrTempTargetVillageIDs.forEach((targetVillageID, idx2) => {
          var units = {}
          if (getArmyLastAttack(tempVillage.id, "spear")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "spear")) > 0) {
              units.spear = parseInt(getArmyLastAttack(tempVillage.id, "spear"))
            }
          }
          if (getArmyLastAttack(tempVillage.id, "sword")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "sword")) > 0) {
              units.sword = parseInt(getArmyLastAttack(tempVillage.id, "sword"))
            }
          }
          if (getArmyLastAttack(tempVillage.id, "axe")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "axe")) > 0) {
              units.axe = parseInt(getArmyLastAttack(tempVillage.id, "axe"))
            }
          }
          if (getArmyLastAttack(tempVillage.id, "knight")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "knight")) > 0) {
              units.knight = parseInt(getArmyLastAttack(tempVillage.id, "knight"))
            }
          }
          if (getArmyLastAttack(tempVillage.id, "lightCavalry")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "lightCavalry")) > 0) {
              units.light_cavalry = parseInt(getArmyLastAttack(tempVillage.id, "lightCavalry"))
            }
          }
          if (getArmyLastAttack(tempVillage.id, "mountedArcher")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "mountedArcher")) > 0) {
              units.mounted_archer = parseInt(getArmyLastAttack(tempVillage.id, "mountedArcher"))
            }
          }
          if (getArmyLastAttack(tempVillage.id, "archer")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "archer")) > 0) {
              units.archer = parseInt(getArmyLastAttack(tempVillage.id, "archer"))
            }
          }
          if (getArmyLastAttack(tempVillage.id, "heavyCavalry")) {
            if (parseInt(getArmyLastAttack(tempVillage.id, "heavyCavalry")) > 0) {
              units.heavy_cavalry = parseInt(getArmyLastAttack(tempVillage.id, "heavyCavalry"))
            }
          }

          setTimeout(function() {
            sendFullyCustomArmyRequest(tempVillage.id, targetVillageID, units)

            currentLength++
            setAttackAllVillageProgress(Math.ceil( currentLength / totalLength * 100 ))
          }, (currentLength * 200))
        })
      } else {}
    })

    setEnableAutoOneForAll("true")
    localStorage.setItem("enableAutoOneForAll", "true")
    var tempTimeNowUnix = timeNowUnix()
    setAutoOneForAllLastAttackTime(tempTimeNowUnix)
    localStorage.setItem("autoOneForAllLastAttackTime", tempTimeNowUnix)
    var tempDelay = parseInt(localStorage.getItem("autoOneForAllInterval"))
    setAutoOneForAllNextAttackTime(tempTimeNowUnix + tempDelay)
    localStorage.setItem("autoOneForAllNextAttackTime", tempTimeNowUnix + tempDelay)
  }

  function executeAutoOneForAll() {
    if (localStorage.getItem("enableAutoOneForAll") === "false") { return }

    var tempAutoOneForAllLastAttackTime = parseInt(localStorage.getItem("autoOneForAllLastAttackTime"))
    var tempAutoOneForAllNextAttackTime = parseInt(localStorage.getItem("autoOneForAllNextAttackTime"))
    var tempAutoOneForAllCycle = parseInt(localStorage.getItem("autoOneForAllCycle"))

    if (tempAutoOneForAllLastAttackTime >= 0 && tempAutoOneForAllNextAttackTime >= 0) {  } else { return }
    setAutoOneForAllRemainingAttackTime(calculateTimeElapsedCustom(timeNowUnix(), tempAutoOneForAllNextAttackTime))

    if (timeNowUnix() < tempAutoOneForAllNextAttackTime) { return }

    tempAutoOneForAllCycle++
    setAutoOneForAllCycle(tempAutoOneForAllCycle)
    localStorage.setItem("autoOneForAllCycle", tempAutoOneForAllCycle)
    var tempTimeNowUnix = timeNowUnix()
    setAutoOneForAllLastAttackTime(tempTimeNowUnix)
    localStorage.setItem("autoOneForAllLastAttackTime", tempTimeNowUnix)
    var tempDelay = parseInt(localStorage.getItem("autoOneForAllInterval"))
    setAutoOneForAllNextAttackTime(tempTimeNowUnix + tempDelay)
    localStorage.setItem("autoOneForAllNextAttackTime", tempTimeNowUnix + tempDelay)
  }
  useEffect(() => {
    if (localStorage.getItem("enableAutoOneForAll") === "false") { return }

    attackAllPreviousVillage()
  }, [autoOneForAllCycle])

  function attackPreviousVillage(selectedVillageID) {
    var tempTargetVillageIDs = getVillageLastAttack(selectedVillageID)
    if (tempTargetVillageIDs) {
      var arrTempTargetVillageIDs = tempTargetVillageIDs.split(",")
      var totalLength = arrTempTargetVillageIDs.length
      var currentLength = 0
      arrTempTargetVillageIDs.forEach((targetVillageID, idx2) => {
        var units = {}
        if (getArmyLastAttack(selectedVillageID, "spear")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "spear")) > 0) {
            units.spear = parseInt(getArmyLastAttack(selectedVillageID, "spear"))
          }
        }
        if (getArmyLastAttack(selectedVillageID, "sword")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "sword")) > 0) {
            units.sword = parseInt(getArmyLastAttack(selectedVillageID, "sword"))
          }
        }
        if (getArmyLastAttack(selectedVillageID, "axe")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "axe")) > 0) {
            units.axe = parseInt(getArmyLastAttack(selectedVillageID, "axe"))
          }
        }
        if (getArmyLastAttack(selectedVillageID, "knight")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "knight")) > 0) {
            units.knight = parseInt(getArmyLastAttack(selectedVillageID, "knight"))
          }
        }
        if (getArmyLastAttack(selectedVillageID, "lightCavalry")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "lightCavalry")) > 0) {
            units.light_cavalry = parseInt(getArmyLastAttack(selectedVillageID, "lightCavalry"))
          }
        }
        if (getArmyLastAttack(selectedVillageID, "mountedArcher")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "mountedArcher")) > 0) {
            units.mounted_archer = parseInt(getArmyLastAttack(selectedVillageID, "mountedArcher"))
          }
        }
        if (getArmyLastAttack(selectedVillageID, "archer")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "archer")) > 0) {
            units.archer = parseInt(getArmyLastAttack(selectedVillageID, "archer"))
          }
        }
        if (getArmyLastAttack(selectedVillageID, "heavyCavalry")) {
          if (parseInt(getArmyLastAttack(selectedVillageID, "heavyCavalry")) > 0) {
            units.heavy_cavalry = parseInt(getArmyLastAttack(selectedVillageID, "heavyCavalry"))
          }
        }

        setTimeout(function() {
          sendFullyCustomArmyRequest(selectedVillageID, targetVillageID, units)

          currentLength++
          setAttackAllVillageProgress(Math.ceil( currentLength / totalLength * 100 ))
        }, (currentLength * 200))
      })
    }
  }

  function saveLiveTimeGatheredResourcesReport(directObj) {
    try {
      var attVillageId = directObj.data.ReportAttack.attVillageId

      // WOOD
      var haulWood = directObj.data.ReportAttack.haul.wood
      var currentWood = getLiveTimeResources(attVillageId, "wood")
      var totalWood = parseInt(currentWood) + parseInt(haulWood)
      storeLiveTimeResources(attVillageId, "wood", totalWood)

      // CLAY
      var haulClay = directObj.data.ReportAttack.haul.clay
      var currentClay = getLiveTimeResources(attVillageId, "clay")
      var totalClay = parseInt(currentClay) + parseInt(haulClay)
      storeLiveTimeResources(attVillageId, "clay", totalClay)

      // IRON
      var haulIron = directObj.data.ReportAttack.haul.iron
      var currentIron = getLiveTimeResources(attVillageId, "iron")
      var totalIron = parseInt(currentIron) + parseInt(haulIron)
      storeLiveTimeResources(attVillageId, "iron", totalIron)
    } catch(error) {}
  }

  function executeRaidOverFlow() {
    try {
      myVillages.forEach((tempVillage, idx) => {
        if (raidOverFlow[tempVillage.id]) {
          sendUnitScreenInfoRequest(tempVillage.id)

        } else {
          var tempRaidOverflow = raidOverFlow
          tempRaidOverflow[tempVillage.id] = {
            totalCycle: 0,
            totalAttack: 0,
            nextIdx: 0,
            nextVillage: 0,
            targetCnt: 0,
            outgoingCnt: 0,
            full: 0,
            partial: 0,
            wood: 0,
            clay: 0,
            iron: 0
          }
          setRaidOverFlow(tempRaidOverflow)
        }
      })
    } catch(error) {}
  }

  function triggerReconnection() {
    setConnectionStatus(CONNECTION_STATUSES[5])
    console.log(CONNECTION_STATUSES[5])
    setTimeout(function() {
      connectWs()
      initProcess()
    }, 1000)
  }

  function executeAutomatedProcess() {
    calculateTimeElapsed()

    if (localStorage.getItem("enableAutoResourceCollector") === "true") {
      sendResourceDepositRequest()
    }

    if (localStorage.getItem("enableAutoArmySender") === "true") {
      sendUnitScreenInfoRequest(localStorage.getItem("myActiveVillageID"))
    }

    if (localStorage.getItem("enableAutoBuildConstruction") === "true") {
      sendVillageDataDetailRequest(localStorage.getItem("myActiveVillageID"))
    }

    if (localStorage.getItem("enableAutoOneForAll") === "true") {
      executeAutoOneForAll()
    }

    if (localStorage.getItem("enableRaidOverFlow") === "true") {
      setPingRaidOverFlow(timeNowUnix())
    }
  }

  useEffect(() => { localStorage.setItem("enableAutoResourceCollector", enableAutoResourceCollector) }, [enableAutoResourceCollector])

  useEffect(() => {
    if (targetVillageIDs === "" || !targetVillageIDs) {
      var tempArr = nearbyBarbarianVillages
      // tempArr = tempArr.concat(nearbyPassivePlayerVillages)

      addAllVillageIds(tempArr)
    }
    localStorage.setItem("enableAutoArmySender", enableAutoArmySender)
    localStorage.setItem("myActiveVillageID", myActiveVillageID)
  }, [enableAutoArmySender])

  useEffect(() => {
    localStorage.setItem("enableAutoBuildConstruction", enableAutoBuildConstruction)
    localStorage.setItem("myActiveVillageID", myActiveVillageID)
  }, [enableAutoBuildConstruction])

  useEffect(() => {
    findLatestIndexForAutoBuild()
  }, [myActiveVillageSimplifiedBuildingsLevel])

  useEffect(() => {
    findLatestIndexForAutoBuild()
  }, [myActiveVillageOngoingQueueCount])

  useEffect(() => {
    executeRaidOverFlow()
  }, [pingRaidOverFlow])

  // =================================================================================================================== MAIN BUSINESS LOGIC END

  // =================================================================================================================== INCOMING MESSAGE HANDLER START

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

      } else if (!village.tribe_name && village.points < 150 && village.attack_protection === 0) {
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
      village["dist"] = calcDist(village.x, village.y)
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

    setSelectedProvinceName(directObj.data.name)

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
        tribe_name: village.tribe_id,
        dist: calcDist(village.village_x, village.village_y)
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
          var unixTimeNow = Math.floor(timeNowUnix() / 1000)
          if (element.time_completed < unixTimeNow) {
            if (!myActiveVillageID) { throw "FOUND" }
            sendCollectJobRequest(element.id)
            sendCollectJobRequest(element.id)
          }
          throw "FOUND"
        }
      })
    } catch (e) {}
  }

  function handleIncomingUnitScreenData(directObj) {
    try {
      handleIncomingUnitScreenDataRaidOverFlow(directObj)

      if (directObj.data.village_id !== myActiveVillageID) { return }
      var tmpOutgoingArmy = directObj.data.outgoingArmies.length
      setMyActiveVillageOutgoingArmy(tmpOutgoingArmy)
      summarizeOutgoingArmy(directObj.data.outgoingArmies)
      summarizeDeffArmy(directObj.data.defArmies[0])

      if (enableAutoArmySender === "false") { return }

      var targetVillages = targetVillageIDs.split(",")

      // ATTACK TARGET VILLAGE
      if (tmpOutgoingArmy >= autoArmyMaxOutgoing) { return }
      var tempTargetVillage = targetVillages[autoArmyNextAttackIndex]
      sendCustomArmyRequest(tempTargetVillage)

      if (autoArmyNextAttackIndex + 1 >= targetVillages.length) {
        setAutoArmyCycle(autoArmyCycle + 1)
        setAutoArmyNextAttackVillageID(targetVillages[0])
        setAutoArmyNextAttackIndex(0)
        setAutoArmyPercentage(0)

      } else {
        setAutoArmyNextAttackVillageID(targetVillages[autoArmyNextAttackIndex + 1])
        setAutoArmyNextAttackIndex(autoArmyNextAttackIndex + 1)

        var tempPercentage = Math.ceil( (autoArmyNextAttackIndex + 1) / targetVillages.length * 100 )
        setAutoArmyPercentage(tempPercentage)
      }

      setAutoArmyTotalAttack(autoArmyTotalAttack + 1)
    } catch (e) {}
  }

  function handleIncomingUnitScreenDataRaidOverFlow(directObj) {
    if (localStorage.getItem("enableRaidOverFlow") !== "true") { return }

    var tmpOutgoingArmy = directObj.data.outgoingArmies.length
    if (tmpOutgoingArmy >= MAX_RAID_OVERFLOW) { return }

    var selectedVillageID = directObj.data.village_id
    var selectedRaidOverFlow = raidOverFlow[selectedVillageID]
    if (!selectedRaidOverFlow) { return }

    var tempTargetVillageIDs = getVillageLastAttack(selectedVillageID)
    var arrTempTargetVillageIDs = tempTargetVillageIDs.split(",")

    selectedRaidOverFlow.targetCnt = arrTempTargetVillageIDs.length
    if (selectedRaidOverFlow.nextIdx >= arrTempTargetVillageIDs.length) {
      selectedRaidOverFlow.totalCycle++
      selectedRaidOverFlow.nextIdx = 0
      selectedRaidOverFlow.nextVillage = arrTempTargetVillageIDs[selectedRaidOverFlow.nextIdx]

    } else {
      var tempTargetVillageID = arrTempTargetVillageIDs[selectedRaidOverFlow.nextIdx]

      var units = {}
      if (getArmyLastAttack(selectedVillageID, "spear")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "spear")) > 0) {
          units.spear = parseInt(getArmyLastAttack(selectedVillageID, "spear"))
        }
      }
      if (getArmyLastAttack(selectedVillageID, "sword")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "sword")) > 0) {
          units.sword = parseInt(getArmyLastAttack(selectedVillageID, "sword"))
        }
      }
      if (getArmyLastAttack(selectedVillageID, "axe")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "axe")) > 0) {
          units.axe = parseInt(getArmyLastAttack(selectedVillageID, "axe"))
        }
      }
      if (getArmyLastAttack(selectedVillageID, "knight")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "knight")) > 0) {
          units.knight = parseInt(getArmyLastAttack(selectedVillageID, "knight"))
        }
      }
      if (getArmyLastAttack(selectedVillageID, "lightCavalry")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "lightCavalry")) > 0) {
          units.light_cavalry = parseInt(getArmyLastAttack(selectedVillageID, "lightCavalry"))
        }
      }
      if (getArmyLastAttack(selectedVillageID, "mountedArcher")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "mountedArcher")) > 0) {
          units.mounted_archer = parseInt(getArmyLastAttack(selectedVillageID, "mountedArcher"))
        }
      }
      if (getArmyLastAttack(selectedVillageID, "archer")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "archer")) > 0) {
          units.archer = parseInt(getArmyLastAttack(selectedVillageID, "archer"))
        }
      }
      if (getArmyLastAttack(selectedVillageID, "heavyCavalry")) {
        if (parseInt(getArmyLastAttack(selectedVillageID, "heavyCavalry")) > 0) {
          units.heavy_cavalry = parseInt(getArmyLastAttack(selectedVillageID, "heavyCavalry"))
        }
      }

      sendFullyCustomArmyRequest(selectedVillageID, tempTargetVillageID, units)

      selectedRaidOverFlow.nextIdx++
      selectedRaidOverFlow.totalAttack++
      selectedRaidOverFlow.nextVillage = arrTempTargetVillageIDs[selectedRaidOverFlow.nextIdx]
    }

    var tempFinalRaidOverFlow = raidOverFlow
    tempFinalRaidOverFlow[selectedVillageID] = selectedRaidOverFlow
    setRaidOverFlow(tempFinalRaidOverFlow)
  }

  function handleIncomingCharacterInfo(directObj) {
    setLoginProgress(100)

    setConnectionStatus(CONNECTION_STATUSES[2])
    console.log(CONNECTION_STATUSES[2])
    var tempMyVillages = []
    directObj.data.villages.forEach((village) => {
      tempMyVillages.push(village)
    })
    setMyVillages(tempMyVillages)

    if (tempMyVillages[0].id) {
      sendVillageDetailRequest(tempMyVillages[0].id)
      sendUnitScreenInfoRequest(tempMyVillages[0].id)
    }
  }

  function handleIncomingVillageDetail(directObj) {
    setMyActiveVillage(directObj.data)
    setMyActiveVillageID(directObj.data.village_id)
    setMyActiveVillageResources(directObj.data.resources)
    setMyActiveVillageUnits(directObj.data.units)
    setMyActiveVillageX(directObj.data.village_x)
    setMyActiveVillageY(directObj.data.village_y)
    setMyActiveVillageProvinceName(directObj.data.province.name)
    setMyActiveVillageProvinceX(directObj.data.province.x)
    setMyActiveVillageProvinceY(directObj.data.province.y)

    var offset = 20
    setSelectedMapCoordX(directObj.data.village_x - offset)
    setSelectedMapCoordY(directObj.data.village_y - offset)
    setSelectedProvinceX(directObj.data.province.x)
    setSelectedProvinceY(directObj.data.province.y)
    sendVillagesByDynamicAreaRequest(directObj.data.village_x - offset, directObj.data.village_y - offset, selectedMapWidth, selectedMapHeight)
    sendUnitScreenInfoRequest(directObj.data.village_id)
    sendVillageDataDetailRequest(directObj.data.village_id)

    var tempTargetVillageIDs = getVillageLastAttack(directObj.data.village_id)
    if (tempTargetVillageIDs) {
      setTargetVillageIDs(tempTargetVillageIDs)
    } else {
      setTargetVillageIDs("")
    }

    setLoginProgress(100)
  }

  function handleIncomingNewReport(directObj) {
    sendReportDetailRequest(directObj.data.id)
  }

  function handleIncomingReportDetail(directObj) {
    try {
      saveLiveTimeGatheredResourcesReport(directObj)

      if (parseInt(directObj.data.ReportAttack.attVillageId) !== parseInt(myActiveVillageID)) { return }

      setAutoArmyTotalWood(autoArmyTotalWood + directObj.data.ReportAttack.haul.wood)
      setAutoArmyTotalClay(autoArmyTotalClay + directObj.data.ReportAttack.haul.clay)
      setAutoArmyTotalIron(autoArmyTotalIron + directObj.data.ReportAttack.haul.iron)

      if (directObj.data.haul === "full") {
        setAutoArmyWithFullHaul(autoArmyWithFullHaul + 1)
      } else {
        setAutoArmyWithPartialHaul(autoArmyWithPartialHaul + 1)
      }
    } catch(error) {}
  }

  function handleIncomingVillageDataDetail(directObj) {
    try {
      var tmpJustVillage = directObj.data[myActiveVillageID]["Village/village"]
      var tmpMyActiveVillageSimplifiedBuildingsLevel = {
        academy: tmpJustVillage.buildings["academy"].level,
        barracks: tmpJustVillage.buildings["barracks"].level,
        chapel: tmpJustVillage.buildings["chapel"].level,
        church: tmpJustVillage.buildings["church"].level,
        clay_pit: tmpJustVillage.buildings["clay_pit"].level,
        farm: tmpJustVillage.buildings["farm"].level,
        headquarter: tmpJustVillage.buildings["headquarter"].level,
        hospital: tmpJustVillage.buildings["hospital"].level,
        iron_mine: tmpJustVillage.buildings["iron_mine"].level,
        market: tmpJustVillage.buildings["market"].level,
        preceptory: tmpJustVillage.buildings["preceptory"].level,
        rally_point: tmpJustVillage.buildings["rally_point"].level,
        statue: tmpJustVillage.buildings["statue"].level,
        tavern: tmpJustVillage.buildings["tavern"].level,
        timber_camp: tmpJustVillage.buildings["timber_camp"].level,
        wall: tmpJustVillage.buildings["wall"].level,
        warehouse: tmpJustVillage.buildings["warehouse"].level
      }

      var tempBuildingQueue = directObj.data[myActiveVillageID]["Building/queue"]
      setMyActiveVillageSimplifiedBuildingsLevel(tmpMyActiveVillageSimplifiedBuildingsLevel)
      setMyActiveVillageBuildingQueue(tempBuildingQueue.queue)
      setMyActiveVillageOngoingQueueCount(tempBuildingQueue.queue.length)
      setMyActiveVillageUnlockedQueue(tempBuildingQueue.unlocked_slots)

      if (enableAutoBuildConstruction !== "true") { return }
      if (tempBuildingQueue.queue.length >= tempBuildingQueue.unlocked_slots) { return }

      sendBuildingUpgradeRequest(myActiveVillageID, autoBuildNextBuilding)

    } catch(error) {}
  }

  // =================================================================================================================== INCOMING MESSAGE HANDLER END

  // =================================================================================================================== HELPER FUNCTION START

  function calculateTimeElapsed() {
    try {
      var tempTimeElapsedMs = timeNowUnix() - joinTime
      var formattedTimeElapsed = new Date(tempTimeElapsedMs).toISOString().substr(11, 8)
      setTimeElapsed(formattedTimeElapsed)
    } catch (error) {
      joinTime = timeNowUnix()
    }
  }

  function calculateTimeElapsedCustom(tempTimeNowUnix, tempTimeNextUnix) {
    if (tempTimeNowUnix > tempTimeNextUnix) {
      var formattedTimeElapsed = new Date(0).toISOString().substr(11, 8)
      return formattedTimeElapsed
    } else {
      var tempTimeElapsedMs = tempTimeNextUnix - tempTimeNowUnix
      var formattedTimeElapsed = new Date(tempTimeElapsedMs).toISOString().substr(11, 8)
      return formattedTimeElapsed
    }
  }

  function sortIDAsc(villages) {
    var sortedVillages = villages.sort((a, b) => a.id - b.id)
    return sortedVillages
  }

  function sortTimeAsc(villages) {
    var sortedVillages = villages.sort((a, b) => a.report_time_created - b.report_time_created)
    return sortedVillages
  }

  function sortTimeDesc(villages) {
    var sortedVillages = villages.sort((a, b) => b.report_time_created - a.report_time_created)
    return sortedVillages
  }

  function sortDistAsc(villages) {
    var sortedVillages = villages.sort((a, b) => a.dist - b.dist)
    return sortedVillages
  }

  function sortDistDesc(villages) {
    var sortedVillages = villages.sort((a, b) => b.dist - a.dist)
    return sortedVillages
  }

  function summarizeOutgoingArmy(outgoingArmies) {
    var tempSummarizedOutgoingArmy = {
      spear: 0,
      sword: 0,
      axe: 0,
      knight: 0,
      light_cavalry: 0,
      mounted_archer: 0,
      archer: 0,
      heavy_cavalry: 0
    }
    outgoingArmies.forEach((val) => {
      tempSummarizedOutgoingArmy.spear += val.spear
      tempSummarizedOutgoingArmy.sword += val.sword
      tempSummarizedOutgoingArmy.axe += val.axe
      tempSummarizedOutgoingArmy.knight += val.knight
      tempSummarizedOutgoingArmy.light_cavalry += val.light_cavalry
      tempSummarizedOutgoingArmy.mounted_archer += val.mounted_archer
      tempSummarizedOutgoingArmy.archer += val.archer
      tempSummarizedOutgoingArmy.heavy_cavalry += val.heavy_cavalry
    })

    setMyActiveVillageSummarizedOutgoingArmy(tempSummarizedOutgoingArmy)
  }

  function summarizeDeffArmy(deffArmies) {
    var tempSummarizedDeffArmy = {
      spear: deffArmies.spear,
      sword: deffArmies.sword,
      axe: deffArmies.axe,
      knight: deffArmies.knight,
      light_cavalry: deffArmies.light_cavalry,
      mounted_archer: deffArmies.mounted_archer,
      archer: deffArmies.archer,
      heavy_cavalry: deffArmies.heavy_cavalry
    }
    setMyActiveVillageUnits(tempSummarizedDeffArmy)
  }

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

  function storeVillageLastAttack(villageID) {
    localStorage.setItem(`VILLAGE_ATTACK_HISTORY:${villageID}`, targetVillageIDs)
  }

  function getVillageLastAttack(villageID) {
    return localStorage.getItem(`VILLAGE_ATTACK_HISTORY:${villageID}`)
  }

  function storeArmyLastAttack(villageID, kind, num) {
    localStorage.setItem(`VILLAGE_ARMY_HISTORY:${villageID}:${kind}`, num)
  }

  function getArmyLastAttack(villageID, kind) {
    return localStorage.getItem(`VILLAGE_ARMY_HISTORY:${villageID}:${kind}`)
  }

  function storeLiveTimeResources(villageID, kind, num) {
    localStorage.setItem(`VILLAGE_LIVE_TIME_RESOURCE:${villageID}:${kind}`, num)
  }

  function getLiveTimeResources(villageID, kind) {
    var key = `VILLAGE_LIVE_TIME_RESOURCE:${villageID}:${kind}`
    var tempVal = parseInt(localStorage.getItem(key))

    if (tempVal >= 0) {
      return localStorage.getItem(`VILLAGE_LIVE_TIME_RESOURCE:${villageID}:${kind}`)
    }

    storeLiveTimeResources(villageID, kind, 0)
    return localStorage.getItem(key)
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

  // =================================================================================================================== HELPER FUNCTION END

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
                  <button className="btn btn-block btn-sm btn-outline-primary" onClick={() => executeAutoLogin()}>➤ Login</button>
                  <button className="btn btn-block btn-sm btn-outline-danger" onClick={() => handleClearConfig()}>X Logout</button>
                  <a className="btn btn-block btn-sm btn-success" target="_blank" href="https://trakteer.id/marumaru" rel="noopener noreferrer">🤝 Give Support</a>
                  {/* <button className="btn btn-block btn-sm btn-outline-primary" onClick={() => ws.current.close()}>DC</button> */}
                </div>

                <div className="col-12">
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: `${loginProgress}%`}} aria-valuenow={`${loginProgress}`} aria-valuemin="0" aria-valuemax="100">{`${loginProgress}`}%</div>
                  </div>
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
                <div className="col-12 col-lg-4 p-2 overflow-auto" style={{maxHeight: "300px"}}>
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
                        <th className="p-1">Active Village</th>
                        <th className="p-1">Outgoing</th>
                        <th className="p-1">Prov X</th>
                        <th className="p-1">Prov Y</th>
                        <th className="p-1">Prov Name</th>
                      </tr>
                      <tr>
                        <td className="p-1">{myActiveVillageID}</td>
                        <td className="p-1">{myActiveVillageOutgoingArmy}</td>
                        <td className="p-1">{myActiveVillageProvinceX}</td>
                        <td className="p-1">{myActiveVillageProvinceY}</td>
                        <td className="p-1">{myActiveVillageProvinceName}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">Troops</th>
                        <th className="p-1">Spear</th>
                        <th className="p-1">Sword</th>
                        <th className="p-1">Axe</th>
                        <th className="p-1">Archer</th>
                        <th className="p-1">MA</th>
                        <th className="p-1">LC</th>
                        <th className="p-1">HC</th>
                      </tr>
                      <tr>
                        <td className="p-1">In</td>
                        <td className="p-1">{myActiveVillageUnits.spear || 0}</td>
                        <td className="p-1">{myActiveVillageUnits.sword || 0}</td>
                        <td className="p-1">{myActiveVillageUnits.axe || 0}</td>
                        <td className="p-1">{myActiveVillageUnits.archer || 0}</td>
                        <td className="p-1">{myActiveVillageUnits.mounted_archer || 0}</td>
                        <td className="p-1">{myActiveVillageUnits.light_cavalry || 0}</td>
                        <td className="p-1">{myActiveVillageUnits.heavy_cavalry || 0}</td>
                      </tr>
                      <tr>
                        <td className="p-1">Out</td>
                        <td className="p-1">{myActiveVillageSummarizedOutgoingArmy.spear || 0}</td>
                        <td className="p-1">{myActiveVillageSummarizedOutgoingArmy.sword || 0}</td>
                        <td className="p-1">{myActiveVillageSummarizedOutgoingArmy.axe || 0}</td>
                        <td className="p-1">{myActiveVillageSummarizedOutgoingArmy.archer || 0}</td>
                        <td className="p-1">{myActiveVillageSummarizedOutgoingArmy.mounted_archer || 0}</td>
                        <td className="p-1">{myActiveVillageSummarizedOutgoingArmy.light_cavalry || 0}</td>
                        <td className="p-1">{myActiveVillageSummarizedOutgoingArmy.heavy_cavalry || 0}</td>
                      </tr>
                      <tr>
                        <td className="p-1">Total</td>
                        <td className="p-1">{(myActiveVillageSummarizedOutgoingArmy.spear || 0) + (myActiveVillageUnits.spear || 0)}</td>
                        <td className="p-1">{(myActiveVillageSummarizedOutgoingArmy.sword || 0) + (myActiveVillageUnits.sword || 0)}</td>
                        <td className="p-1">{(myActiveVillageSummarizedOutgoingArmy.axe || 0) + (myActiveVillageUnits.axe || 0)}</td>
                        <td className="p-1">{(myActiveVillageSummarizedOutgoingArmy.archer || 0) + (myActiveVillageUnits.archer || 0)}</td>
                        <td className="p-1">{(myActiveVillageSummarizedOutgoingArmy.mounted_archer || 0) + (myActiveVillageUnits.mounted_archer || 0)}</td>
                        <td className="p-1">{(myActiveVillageSummarizedOutgoingArmy.light_cavalry || 0) + (myActiveVillageUnits.light_cavalry || 0)}</td>
                        <td className="p-1">{(myActiveVillageSummarizedOutgoingArmy.heavy_cavalry || 0) + (myActiveVillageUnits.heavy_cavalry || 0)}</td>
                      </tr>
                      <tr>
                        <td className="p-1">Avg/50</td>
                        <td className="p-1">{Math.floor((myActiveVillageUnits.spear || 0) / 50)}</td>
                        <td className="p-1">{Math.floor((myActiveVillageUnits.sword || 0) / 50)}</td>
                        <td className="p-1">{Math.floor((myActiveVillageUnits.axe || 0) / 50)}</td>
                        <td className="p-1">{Math.floor((myActiveVillageUnits.archer || 0) / 50)}</td>
                        <td className="p-1">{Math.floor((myActiveVillageUnits.mounted_archer || 0) / 50)}</td>
                        <td className="p-1">{Math.floor((myActiveVillageUnits.light_cavalry || 0) / 50)}</td>
                        <td className="p-1">{Math.floor((myActiveVillageUnits.heavy_cavalry || 0) / 50)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="main-tab" data-toggle="tab" href="#main" role="tab" aria-controls="main" aria-selected="true">🏠 MAIN</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="one-for-all-tab" data-toggle="tab" href="#one-for-all" role="tab" aria-controls="one-for-all" aria-selected="false">🔥 ONE FOR ALL</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="live-time-report-tab" data-toggle="tab" href="#live-time-report" role="tab" aria-controls="live-time-report" aria-selected="false">🧾 LIVE TIME REPORT</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="raid-overflow-tab" data-toggle="tab" href="#raid-overflow" role="tab" aria-controls="raid-overflow" aria-selected="false">☸︎ RAID OVERFLOW</a>
                  </li>
                </ul>
              </div>

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="main" role="tabpanel" aria-labelledby="main-tab">
                </div>

                <div className="tab-pane fade pb-3" id="one-for-all" role="tabpanel" aria-labelledby="one-for-all-tab">
                  <div className="row">
                    <div className="col-12 col-md-6 px-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">One For All Interval (Ms)</span>
                        </div>
                        <input type="number" className="form-control" value={autoOneForAllInterval} onChange={(e) => {setAutoOneForAllInterval(e.target.value); localStorage.setItem("autoOneForAllInterval", e.target.value)}} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 px-1">
                      <button className="btn btn-outline-success btn-md float-right" onClick={() => attackAllPreviousVillage()}>😈 Attack!</button>
                      <button className="btn btn-outline-danger btn-md float-right" onClick={() => {setEnableAutoOneForAll("false"); localStorage.setItem("enableAutoOneForAll", "false")}}>Disable Auto Attack</button>
                    </div>
                    <div className="col-12 px-1 overflow-auto" style={{maxHeight: "550px"}}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="p-1" colSpan="2">Auto One For All</th>
                            <th className="p-1" colSpan="3">Last Attack Time</th>
                            <th className="p-1" colSpan="3">Next Attack Time</th>
                            <th className="p-1" colSpan="2">Count Down</th>
                            <th className="p-1" colSpan="2">Total Cycle</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-1" colSpan="2">{enableAutoOneForAll}</td>
                            <td className="p-1" colSpan="3">{new Date(autoOneForAllLastAttackTime).toString().substr(0, 25)}</td>
                            <td className="p-1" colSpan="3">{new Date(autoOneForAllNextAttackTime).toString().substr(0, 25)}</td>
                            <td className="p-1" colSpan="2">{autoOneForAllRemainingAttackTime}</td>
                            <td className="p-1" colSpan="2">{autoOneForAllCycle}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="p-1">ID</th>
                            <th className="p-1">Name</th>
                            <th className="p-1">Target Count</th>
                            <th className="p-1">Targets</th>
                            <th className="p-1">Spear</th>
                            <th className="p-1">Sword</th>
                            <th className="p-1">Axe</th>
                            <th className="p-1">Knight</th>
                            <th className="p-1">LC</th>
                            <th className="p-1">MA</th>
                            <th className="p-1">HC</th>
                            <th className="p-1">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myVillages.map((myVillage, idx) => (
                          <tr key={`bulkAttacking-${idx}`}>
                            <td className="p-1">{myVillage.id}</td>
                            <td className="p-1">{myVillage.name}</td>
                            <td className="p-1">{(getVillageLastAttack(myVillage.id) || "").split(",").length}</td>
                            <td className="p-1">
                              <pre style={{width: "115px", height: "35px"}}>
                                {(getVillageLastAttack(myVillage.id) || "").substring(0, 100)}
                              </pre>
                            </td>
                            <td className="p-1">{getArmyLastAttack(myVillage.id, "spear") || 0}</td>
                            <td className="p-1">{getArmyLastAttack(myVillage.id, "sword") || 0}</td>
                            <td className="p-1">{getArmyLastAttack(myVillage.id, "axe") || 0}</td>
                            <td className="p-1">{getArmyLastAttack(myVillage.id, "knight") || 0}</td>
                            <td className="p-1">{getArmyLastAttack(myVillage.id, "lightCavalry") || 0}</td>
                            <td className="p-1">{getArmyLastAttack(myVillage.id, "mountedArcher") || 0}</td>
                            <td className="p-1">{getArmyLastAttack(myVillage.id, "heavyCavalry") || 0}</td>
                            <td className="p-1">
                              <button className="btn btn-block btn-outline-success btn-sm" onClick={() => attackPreviousVillage(myVillage.id)}>
                                ⚔️
                              </button>
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 px-1">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${attackAllVillageProgress}%`}} aria-valuenow={`${attackAllVillageProgress}`} aria-valuemin="0" aria-valuemax="100">{`${attackAllVillageProgress}`}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade pb-3" id="live-time-report" role="tabpanel" aria-labelledby="live-time-report-tab">
                  <div className="row">
                    <div className="col-12 px-1 overflow-auto" style={{maxHeight: "550px"}}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="p-1">ID</th>
                            <th className="p-1">Name</th>
                            <th className="p-1">Wood</th>
                            <th className="p-1">Clay</th>
                            <th className="p-1">Iron</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myVillages.map((myVillage, idx) => (
                          <tr key={`LIVE_TIME_REPORT:${idx}`}>
                            <td className="p-1">{myVillage.id}</td>
                            <td className="p-1">{myVillage.name}</td>
                            <td className="p-1">{getLiveTimeResources(myVillage.id, "wood")}</td>
                            <td className="p-1">{getLiveTimeResources(myVillage.id, "clay")}</td>
                            <td className="p-1">{getLiveTimeResources(myVillage.id, "iron")}</td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade pb-3" id="raid-overflow" role="tabpanel" aria-labelledby="raid-overflow-tab">
                  <div className="row">
                    <div className="col-12">
                      <label><b>Enabled</b>: {enableRaidOverFlow}</label>

                      <button className="btn btn-outline-success btn-md float-right" onClick={() => { localStorage.setItem("enableRaidOverFlow", "true"); setEnableRaidOverFlow("true") }}>Enable</button>
                      <button className="btn btn-outline-danger btn-md float-right" onClick={() => { localStorage.setItem("enableRaidOverFlow", "false"); setEnableRaidOverFlow("false") }}>Disable</button>
                    </div>
                    <div className="col-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="p-1">Village ID</th>
                            <th className="p-1">Total Cycle</th>
                            <th className="p-1">Total Attack</th>
                            <th className="p-1">Next IDx</th>
                            <th className="p-1">Next Village</th>
                            <th className="p-1">Target Cnt</th>
                            <th className="p-1">Outgoing Cnt</th>
                            <th className="p-1">Full</th>
                            <th className="p-1">Partial</th>
                            <th className="p-1">Wood</th>
                            <th className="p-1">Clay</th>
                            <th className="p-1">Iron</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(raidOverFlow).map((raidOverFlowID, idx) => (
                          <tr key={`RAID_OVERFLOW:${idx}`}>
                            <td className="p-1">{raidOverFlowID}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].totalCycle}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].totalAttack}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].nextIdx}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].nextVillage}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].targetCnt}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].outgoingCnt}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].full}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].partial}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].wood}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].clay}</td>
                            <td className="p-1">{raidOverFlow[raidOverFlowID].iron}</td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 border rounded py-2 ">
                  <div className="row pb-0">
                    <div className="col-12 col-md-2">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">X</span>
                        </div>
                        <input type="number" className="form-control" value={selectedMapCoordX} onChange={(e) => setSelectedMapCoordX(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-2">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Y</span>
                        </div>
                        <input type="number" className="form-control" value={selectedMapCoordY} onChange={(e) => setSelectedMapCoordY(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Height</span>
                        </div>
                        <input type="number" className="form-control" value={selectedMapHeight} onChange={(e) => setSelectedMapHeight(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Width</span>
                        </div>
                        <input type="number" className="form-control" value={selectedMapWidth} onChange={(e) => setSelectedMapWidth(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-2">
                      <button className="btn btn-outline-success btn-sm btn-block my-1" onClick={ () => sendVillagesByAreaRequest() }>🔎 Fetch Map</button>
                    </div>
                    {/* BATAS MENUS PER 12 */}
                    <div className="col-12 col-md-3 py-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Province X</span>
                        </div>
                        <input type="number" className="form-control" value={selectedProvinceX} onChange={(e) => setSelectedProvinceX(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 py-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Province Y</span>
                        </div>
                        <input type="number" className="form-control" value={selectedProvinceY} onChange={(e) => setSelectedProvinceY(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 py-1">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Name</span>
                        </div>
                        <input type="text" className="form-control" value={selectedProvinceName} disabled />
                      </div>
                    </div>
                    <div className="col-12 col-md-3 py-1">
                      <button className="btn btn-outline-success btn-sm btn-block my-1" onClick={ () => sendVillagesByProvinceRequest() }>🔎 Fetch Province</button>
                    </div>
                  </div>

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
                    <li className="nav-item">
                      <a className="nav-link" id="contact-tab" data-toggle="tab" href="#safeVillage" role="tab" aria-controls="contact" aria-selected="false">Low Point Player Villages</a>
                    </li>
                  </ul>

                  <div className="tab-content overflow-auto" id="myTabContent" style={{maxHeight: "600px"}}>
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td className="p-1" colSpan="2">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => addAllVillageIds(nearbyBarbarianVillages)}>
                                Add All
                              </button>
                            </td>
                            <td className="p-1" colSpan="2">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyBarbarianVillages(sortIDAsc(nearbyBarbarianVillages))}>
                                ID Asc
                              </button>
                            </td>
                            <td className="p-1"></td>
                            <td className="p-1"></td>
                            <td className="p-1" colSpan="5"  align="right">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyBarbarianVillages(sortTimeAsc(nearbyBarbarianVillages))}>
                                Time Asc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyBarbarianVillages(sortTimeDesc(nearbyBarbarianVillages))}>
                                Time Desc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyBarbarianVillages(sortDistAsc(nearbyBarbarianVillages))}>
                                Dist Asc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => setNearbyBarbarianVillages(sortDistDesc(nearbyBarbarianVillages))}>
                                Dist Desc
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th className="p-1">ID</th>
                            <th className="p-1">No</th>
                            <th className="p-1">X</th>
                            <th className="p-1">Y</th>
                            <th className="p-1">Village Name</th>
                            <th className="p-1">Points</th>
                            <th className="p-1">Report</th>
                            <th className="p-1">Time</th>
                            <th className="p-1">Province</th>
                            <th className="p-1">Dist</th>
                          </tr>
                          {nearbyBarbarianVillages.map ((village, idx) => (
                            <tr key={`barbarian-${idx}`}>
                              <td className="p-1">
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addVillageToTargets(village.id, e)}>
                                  {village.id}
                                </button>
                              </td>
                              <td className="p-1">{idx+1}</td>
                              <td className="p-1">{village.x}</td>
                              <td className="p-1">{village.y}</td>
                              <td className="p-1">{village.name}</td>
                              <td className="p-1">{village.points}</td>
                              <td className="p-1">{village.report_title}</td>
                              <td className="p-1">{new Date(village.report_time_created * 1000).toLocaleString('en-GB', { hour12: false })}</td>
                              <td className="p-1">{village.province_name}</td>
                              <td className="p-1">{village.dist}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th className="p-1">ID</th>
                            <th className="p-1">X</th>
                            <th className="p-1">Y</th>
                            <th className="p-1">Char ID</th>
                            <th className="p-1">Char Name</th>
                            <th className="p-1">Village Name</th>
                            <th className="p-1">Tribe Name</th>
                            <th className="p-1">Points</th>
                          </tr>
                          {nearbyMyVillages.map ((village, idx) => (
                            <tr key={`my-${idx}`}>
                              <td className="p-1">{village.id}</td>
                              <td className="p-1">{village.x}</td>
                              <td className="p-1">{village.y}</td>
                              <td className="p-1">{village.character_id}</td>
                              <td className="p-1">{village.character_name}</td>
                              <td className="p-1">{village.name}</td>
                              <td className="p-1">{village.tribe_name}</td>
                              <td className="p-1">{village.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td className="p-1" colSpan="2">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => addAllVillageIds(nearbyPlayerVillages)}>
                                Add All
                              </button>
                            </td>
                            <td className="p-1" colSpan="2">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPlayerVillages(sortIDAsc(nearbyPlayerVillages))}>
                                ID Asc
                              </button>
                            </td>
                            <td className="p-1"></td>
                            <td className="p-1"></td>
                            <td className="p-1" colSpan="6"  align="right">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPlayerVillages(sortTimeAsc(nearbyPlayerVillages))}>
                                Time Asc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPlayerVillages(sortTimeDesc(nearbyPlayerVillages))}>
                                Time Desc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPlayerVillages(sortDistAsc(nearbyPlayerVillages))}>
                                Dist Asc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => setNearbyPlayerVillages(sortDistDesc(nearbyPlayerVillages))}>
                                Dist Desc
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th className="p-1">ID</th>
                            <th className="p-1">X</th>
                            <th className="p-1">Y</th>
                            <th className="p-1">Char ID</th>
                            <th className="p-1">Char Name</th>
                            <th className="p-1">Village Name</th>
                            <th className="p-1">Tribe Name</th>
                            <th className="p-1">Points</th>
                            <th className="p-1">Report Title</th>
                            <th className="p-1">Time</th>
                            <th className="p-1">Province</th>
                            <th className="p-1">Dist</th>
                          </tr>
                          {nearbyPlayerVillages.map ((village, idx) => (
                            <tr key={`players-${idx}`}>
                              <td className="p-1">
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addVillageToTargets(village.id, e)}>
                                  {village.id}
                                </button>
                              </td>
                              <td className="p-1">{village.x}</td>
                              <td className="p-1">{village.y}</td>
                              <td className="p-1">{village.character_id}</td>
                              <td className="p-1">{village.character_name}</td>
                              <td className="p-1">{village.name}</td>
                              <td className="p-1">{village.tribe_name}</td>
                              <td className="p-1">{village.points}</td>
                              <td className="p-1">{village.report_title}</td>
                              <td className="p-1">{new Date(village.report_time_created * 1000).toLocaleString('en-GB', { hour12: false })}</td>
                              <td className="p-1">{village.province_name}</td>
                              <td className="p-1">{village.dist}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="tab-pane fade" id="safeVillage" role="tabpanel" aria-labelledby="safeVillage-tab">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td className="p-1" colSpan="2">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => addAllVillageIds(nearbyPassivePlayerVillages)}>
                                Add All
                              </button>
                            </td>
                            <td className="p-1" colSpan="2">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPassivePlayerVillages(sortIDAsc(nearbyPassivePlayerVillages))}>
                                ID Asc
                              </button>
                            </td>
                            <td className="p-1"></td>
                            <td className="p-1"></td>
                            <td className="p-1" colSpan="6"  align="right">
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPassivePlayerVillages(sortTimeAsc(nearbyPassivePlayerVillages))}>
                                Time Asc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPassivePlayerVillages(sortTimeDesc(nearbyPassivePlayerVillages))}>
                                Time Desc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary mr-1" onClick={(e) => setNearbyPassivePlayerVillages(sortDistAsc(nearbyPassivePlayerVillages))}>
                                Dist Asc
                              </button>
                              <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => setNearbyPassivePlayerVillages(sortDistDesc(nearbyPassivePlayerVillages))}>
                                Dist Desc
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th className="p-1">ID</th>
                            <th className="p-1">X</th>
                            <th className="p-1">Y</th>
                            <th className="p-1">Char ID</th>
                            <th className="p-1">Char Name</th>
                            <th className="p-1">Village Name</th>
                            <th className="p-1">Tribe Name</th>
                            <th className="p-1">Points</th>
                            <th className="p-1">Report Title</th>
                            <th className="p-1">Time</th>
                            <th className="p-1">Province</th>
                            <th className="p-1">Dist</th>
                          </tr>
                          {/* <tr>
                            <td className="p-1">
                              <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addAllVillageIds(nearbyPassivePlayerVillages)}>
                                Add All
                              </button>
                            </td>
                          </tr> */}
                          {nearbyPassivePlayerVillages.map ((village, idx) => (
                            <tr key={`players-${idx}`}>
                              <td className="p-1">
                                <button className="btn btn-sm btn-rounded btn-primary" onClick={(e) => addVillageToTargets(village.id, e)}>
                                  {village.id}
                                </button>
                              </td>
                              <td className="p-1">{village.x}</td>
                              <td className="p-1">{village.y}</td>
                              <td className="p-1">{village.character_id}</td>
                              <td className="p-1">{village.character_name}</td>
                              <td className="p-1">{village.name}</td>
                              <td className="p-1">{village.tribe_name}</td>
                              <td className="p-1">{village.points}</td>
                              <td className="p-1">{village.report_title}</td>
                              <td className="p-1">{new Date(village.report_time_created * 1000).toLocaleString('en-GB', { hour12: false })}</td>
                              <td className="p-1">{village.province_name}</td>
                              <td className="p-1">{village.dist}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Village ID</span>
                        </div>
                        <input type="number" className="form-control" placeholder="" value={myActiveVillageID} onChange={(e) => setMyActiveVillageID(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Spear</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={spear} onChange={(e) => setSpear(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Sword</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={sword} onChange={(e) => setSword(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Axe</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={axe} onChange={(e) => setAxe(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Knight</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={knight} onChange={(e) => setKnight(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Light Caval</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={lightCavalry} onChange={(e) => setLightCavalry(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Mount Arch</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={mountedArcher} onChange={(e) => setMountedArcher(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Heavy Caval</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={heavyCavalry} onChange={(e) => setHeavyCavalry(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Target Village IDs</label><label className="float-right">{`Count: ${targetVillagesCount}`}</label>
                        <textarea className="form-control" rows="4" placeholder="" value={targetVillageIDs} onChange={(e) => setTargetVillageIDs(e.target.value)}></textarea>
                      </div>
                    </div>
                    <div className={"col-12 col-lg-2 border" + " " + ((sendAttackWithRandomInterval) ? "border-success" : "border-danger")}>
                      <div>
                        <label>Random interval</label>
                        <Form.Radio label=" On" checked={sendAttackWithRandomInterval === true} value={`true`} onClick={() => setSendAttackWithRandomInterval(true)} />
                        <Form.Radio label=" Off" checked={sendAttackWithRandomInterval === false} value={`false`} onClick={() => setSendAttackWithRandomInterval(false)} />
                      </div>
                    </div>
                    <div className={"col-12 col-lg-2 border" + " " + ((sendAttackToAllNearbyRandomBarbarian) ? "border-success" : "border-danger")}>
                      <div>
                        <label>Send all even army to 45 random barbarian</label>
                        <Form.Radio label=" On" checked={sendAttackToAllNearbyRandomBarbarian === true} value={`true`} onClick={() => setSendAttackToAllNearbyRandomBarbarian(true)} />
                        <Form.Radio label=" Off" checked={sendAttackToAllNearbyRandomBarbarian === false} value={`false`} onClick={() => setSendAttackToAllNearbyRandomBarbarian(false)} />
                      </div>
                    </div>
                    <div className={"col-12 col-lg-2 border" + " " + ((enableAutoResourceCollector === "true") ? "border-success" : "border-danger")}>
                      <div>
                        <label>Auto resource collector</label>
                        <Form.Radio
                          name="enableAutoResourceCollector"
                          label="On"
                          value="true"
                          checked={enableAutoResourceCollector === "true"}
                          onClick={() => setEnableAutoResourceCollector("true")} />
                        <Form.Radio
                          name="enableAutoResourceCollector"
                          label="Off"
                          value="false"
                          checked={enableAutoResourceCollector === "false"}
                          onClick={() => setEnableAutoResourceCollector("false")} />
                      </div>
                    </div>
                    <div className={"col-12 col-lg-2 border" + " " + ((enableAutoArmySender === "true") ? "border-success" : "border-danger")}>
                      <div>
                        <label>Auto army sender</label>
                        <Form.Radio
                          name="enableAutoArmySender"
                          label="On"
                          value="true"
                          checked={enableAutoArmySender === "true"}
                          onClick={() => setEnableAutoArmySender("true")} />
                        <Form.Radio
                          name="enableAutoArmySender"
                          label="Off"
                          value="false"
                          checked={enableAutoArmySender === "false"}
                          onClick={() => setEnableAutoArmySender("false")} />
                      </div>
                    </div>
                    <div className={"col-12 col-lg-2 border" + " " + ((enableAutoBuildConstruction === "true") ? "border-success" : "border-danger")}>
                      <div>
                        <label>Auto build construction</label>
                        <Form.Radio
                          name="enableAutoBuildConstruction"
                          label="On"
                          value="true"
                          checked={enableAutoBuildConstruction === "true"}
                          onClick={() => setEnableAutoBuildConstruction("true")} />
                        <Form.Radio
                          name="enableAutoBuildConstruction"
                          label="Off"
                          value="false"
                          checked={enableAutoBuildConstruction === "false"}
                          onClick={() => setEnableAutoBuildConstruction("false")} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-2 border border-primary py-2">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${raidPercentage}%`}} aria-valuenow={`${raidPercentage}`} aria-valuemin="0" aria-valuemax="100">{`${raidPercentage}`}%</div>
                      </div>
                      <hr/>
                      <button className="btn btn-outline-success btn-lg btn-block" disabled={enableAutoArmySender === "true"} onClick={ () => executeBulkAttack() }>👊 Start Raid!</button>
                      <button className="btn btn-outline-success btn-sm btn-block" disabled={enableAutoArmySender === "true"} onClick={ () => saveAttackPreset() }>save preset</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 py-2 px-1">
                  <label><b>Automated Army Progress</b></label>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Max Outgoing Cnt</span>
                        </div>
                        <input type="number" className="form-control" placeholder="0" value={autoArmyMaxOutgoing} onChange={(e) => setAutoArmyMaxOutgoing(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Time Elapsed</span>
                        </div>
                        <input type="text" className="form-control" value={timeElapsed} disabled />
                      </div>
                    </div>
                  </div>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="p-1">Total Cycle</th>
                        <th className="p-1">Total Attack</th>
                        <th className="p-1">Next IDx</th>
                        <th className="p-1">Next Village</th>
                        <th className="p-1">Target Cnt</th>
                        <th className="p-1">Outgoing Cnt</th>
                        <th className="p-1">Full</th>
                        <th className="p-1">Partial</th>
                        <th className="p-1">Wood</th>
                        <th className="p-1">Clay</th>
                        <th className="p-1">Iron</th>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td className="p-1">{autoArmyCycle}</td>
                        <td className="p-1">{autoArmyTotalAttack}</td>
                        <td className="p-1">{autoArmyNextAttackIndex}</td>
                        <td className="p-1">{autoArmyNextAttackVillageID}</td>
                        <td className="p-1">{targetVillagesCount}</td>
                        <td className="p-1">{myActiveVillageOutgoingArmy}</td>
                        <td className="p-1">{autoArmyWithFullHaul}</td>
                        <td className="p-1">{autoArmyWithPartialHaul}</td>
                        <td className="p-1">{autoArmyTotalWood}</td>
                        <td className="p-1">{autoArmyTotalClay}</td>
                        <td className="p-1">{autoArmyTotalIron}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: `${autoArmyPercentage}%`}} aria-valuenow={`${autoArmyPercentage}`} aria-valuemin="0" aria-valuemax="100">{`${autoArmyPercentage}`}%</div>
                  </div>
                </div>
              </div>

              {/* AUTOMATED BUILDING */}
              <div className="row">
                <div className="col-12 py-2 px-1">
                  <label><b>Automated Building Construction</b></label>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="p-1">headquarter</th>
                        <th className="p-1">warehouse</th>
                        <th className="p-1">timber_camp</th>
                        <th className="p-1">clay_pit</th>
                        <th className="p-1">iron_mine</th>
                        <th className="p-1">farm</th>
                        <th className="p-1">barracks</th>
                        <th className="p-1">market</th>
                        <th className="p-1">hospital</th>
                        <th className="p-1">wall</th>
                        <th className="p-1">rally_point</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.headquarter}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.warehouse}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.timber_camp}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.clay_pit}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.iron_mine}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.farm}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.barracks}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.market}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.hospital}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.wall}</td>
                        <td className="p-1">{myActiveVillageSimplifiedBuildingsLevel.rally_point}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="p-1">Queue</th>
                        <th className="p-1">Next Idx</th>
                        <th className="p-1">Next Building</th>
                        <th className="p-1">Next Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1">{myActiveVillageOngoingQueueCount} / {myActiveVillageUnlockedQueue}</td>
                        <td className="p-1">{autoBuildNextIndex}</td>
                        <td className="p-1">{autoBuildNextBuilding}</td>
                        <td className="p-1">{autoBuildNextLevel}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AUTOMATED TRUST ME ATTACK */}

            </div>
          </div>
        </div>
      </div>

      <hr className="my-2" />

      <div className="row my-1">
        <div className="col-12">
          <label>📌 <b>Quick Notes</b></label>
          <button className="btn btn-primary btn-sm float-right" onClick={() => saveQuickNote()}>💾 Save Quick Note</button>
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
