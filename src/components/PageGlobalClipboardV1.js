import React, {useState, useCallback, useEffect, useRef} from "react"

function PageGlobalClipboardV1() {
  const [message, set_message] = useState("")
  const [clips, set_clips] = useState([])
  const [clip_keys, set_clip_keys] = useState([])

  useEffect(() => {

  }, [])

  useEffect(() => {
    async function fetchTodayMangaData() {
      var api = "http://go-animapu.herokuapp.com/clips"
      const response = await fetch(api)
      const results = await response.json()
      var temp_clips = new Map(Object.entries(results))
      console.log(temp_clips)
      var i = []
      var x = temp_clips.forEach((val, key) => i.push(key))
      console.log(i)
      set_clips(temp_clips)
      set_clip_keys(i)
    }
    fetchTodayMangaData()
  }, [])

  function sendClip() {

  }

  return (
    <div className="container">
        <div className="page-header">
          <h1 id="timeline">Global Clipboard</h1>
        </div>

        <div className="row">
          <div className="col-12 col-sm-9">
            <div className="form-group">
              <label>Message</label>
              <input className="form-control my-1" type="text" value={message} onChange={(e) => set_message(e.target.value)} />
            </div>
          </div>
          <div className="col-12 col-sm-3">
            <div className="form-group">
              <label>.</label>
              <button className="btn btn-success btn-md btn-block my-1" onClick={sendClip}>send message</button>
            </div>
          </div>
        </div>

        <div className="row">
          {clip_keys.map(clip_key => (
            <div className="col-12 my-1" key={clip_key}>
              <div className="overflow-auto py-2 px-3 border border-secondary shadow" style={{maxHeight: "250px", textAlign: "justify", background: "#ffffff"}}>
                <code>
                  {clips.get(clip_key).content}
                </code>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default PageGlobalClipboardV1