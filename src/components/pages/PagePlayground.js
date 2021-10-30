import React, {useState} from "react"
import {Link} from "react-router-dom"
import { createWorker } from 'tesseract.js'
import Speech from 'react-speech'

import wordDB from '../utils/WordDB'

// https://www.npmjs.com/package/react-speech
// https://www.npmjs.com/package/tesseract.js/v/2.0.0
// https://mdn.github.io/web-speech-api/speak-easy-synthesis/
// https://github.com/johnoneil/MangaTextDetection

function PagePlayground() {
  var version = 0.0

  const [speechText, setSpeechText] = useState("")
  const [imageUrl, setImageUrl] = useState("https://uploads.mangadex.org/data/f191157492667704474cf09b86b58b88/1-bc1ba1a9cecb38f3b8e4611ad4c5ef4af5dd47bfa586ce9c8b9dbdb5ee3fee1c.png")
  const [generateProgress, setGenerateProgress] = useState(0)
  const [playgroundParams, setPlaygroundParams] = useState({
    "image_url": "",
  })
  function handlePlaygroundParamsChanges(e) {
    const { name, value } = e.target
    setPlaygroundParams(playgroundParams => ({...playgroundParams, [name]: value}))
    setImageUrl(value)
  }

  const worker = createWorker({
    logger: m => {
      setGenerateProgress(m.progress.toFixed(2) * 100)
      console.log(m)
    }
  })

  async function generateTextFromImage() {
    console.log(playgroundParams)
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const {data:{text}} = await worker.recognize(imageUrl);
    console.log("FINISH GENERATING", text)

    await worker.terminate()
    setSpeechText(text)
  }

  function sanitizeString(str){
    str = str.toLowerCase().replace(/([^a-z]|[\t\n\f\r\v\0])/gim," ")
    str = str.replace(/ +(?= )/g,'')
    var strs = str.split(" ")
    strs = strs.map((v) => {
      var validWord = ""
      if (v.length > 2) {
        if (wordDB.GetWordDB().get(v)) {
          validWord = v
        }
      }
      return validWord
    })
    str = strs.join(" ")
    str = str.replace(/ +(?= )/g,'')
    return str.trim()
  }

  return (
    <div>
      <div className="content-wrapper pt-2 px-2" style={{backgroundColor: "#454d55"}}>
        <h2 className="text-white">Playground</h2>
        <div className="row mb-2">
          <div className="col-12">
            <Link to="/?panelbear_disable" className="btn btn-block btn-primary">Disable Panel Bear</Link>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4">
            <input type="text" className="form-control" placeholder="input image url" onChange={(e) => handlePlaygroundParamsChanges(e)}></input>
            <img src={imageUrl} style={{width: "100%"}} alt="generated" />
          </div>
          <div className="col-4">
            <button className="btn btn-block btn-primary" onClick={() => generateTextFromImage()}>Generate Text, prog: ({generateProgress}%)</button>
            <textarea type="text" className="form-control" readOnly value={sanitizeString(speechText)} placeholder="generated text" rows="5"></textarea>
            {/* <option data-lang="ja-JP" data-name="Google 日本語">Google 日本語 (ja-JP)</option> // Google UK English Female */}
            <Speech
              className="btn btn-block btn-primary"
              voice="Google UK English Female"
              text={sanitizeString(speechText)}
              displayText="Start Speaking"
              rate={0.5}
              textAsButton={"yes"}
              style={{
                width: "100%"
              }}
            />
          </div>
        </div>
      </div>

      <footer className="main-footer bg-dark">
        <div className="float-right">
          <span className="badge badge-pill badge-primary mr-2">ANIMAPU 2021</span>
          <span className="badge badge-pill badge-primary">Version: {version}</span>
        </div>
      </footer>
    </div>
  )

}

export default PagePlayground