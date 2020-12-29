import React, {useState, useEffect} from "react"

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
      var temp_clip_keys = []
      temp_clips.forEach((val, key) => temp_clip_keys.push(key))
      temp_clip_keys.reverse()
      console.log(temp_clip_keys)
      set_clips(temp_clips)
      set_clip_keys(temp_clip_keys)
    }
    fetchTodayMangaData()
  }, [])

  async function sendClip() {
    try {
      const response = await fetch('http://go-animapu.herokuapp.com/clips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message
        })
      })
      const results = await response.json()
      const status = await response.status

      if (status === 200) {
        window.location.reload();
      } else {
        alert(results.message);
      }

    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="container">
        <div className="page-header">
          <h1 id="timeline">Global Clipboard</h1>
        </div>

        <div className="row">
          <div className="col-12 col-sm-9 col-md-10">
            <div className="form-group">
              <label>Content</label>
              <textarea className="form-control" rows="5" value={message} onChange={(e) => set_message(e.target.value)} />
            </div>
          </div>
          <div className="col-12 col-sm-3 col-md-2">
            <div className="form-group">
              <button className="btn btn-success btn-md btn-block" style={{align:"bottom"}} onClick={sendClip}>send content</button>
            </div>
          </div>
        </div>

        <div className="row">
          {clip_keys.map(clip_key => (
            <div className="col-12 my-2" key={clip_key}>
              <div className="container border border-secondary shadow py-1 rounded">
                <label><b>code : </b> {clip_key}</label>
                <button className="btn btn-danger btn-sm float-right">delete</button>

                <div className="overflow-auto py-1 border-top border-success" style={{maxHeight: "250px", textAlign: "justify", background: "#ffffff"}}>
                  <code>
                    {clips.get(clip_key).content}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default PageGlobalClipboardV1