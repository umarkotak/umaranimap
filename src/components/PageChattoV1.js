import React, {useState, useCallback, useEffect, useRef} from "react"
import { v4 as uuidv4 } from 'uuid';

function PageChattoV1() {
  const ws = useRef(null);
  const [messages, set_messages] = useState([])
  const [chat_message, set_chat_message] = useState("")
  const [chat_name, set_chat_name] = useState("")

  useEffect(() => {
    // ws.current = new WebSocket("ws://localhost:3005/chats_v1");
    ws.current = new WebSocket("ws://go-animapu.herokuapp.com/chats_v1");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
        ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
        e.preventDefault();

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        const resMessage = JSON.parse(e.data);
        const updateArray = [...messages];
        updateArray.push(
          {
            "key": uuidv4(),
            "ts": date,
            "name": resMessage.name,
            "message": resMessage.message,
          }
        )
        updateArray.reverse()
        set_messages(updateArray)
        console.log("e", messages, updateArray);
    };
  }, [messages]);

  function sendToWebSocket() {
    console.log("clicked!")
    ws.current.send(
      `
        {
          "name": "${chat_name}",
          "message": "${chat_message}"
        }
      `
    )
  }

  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1 id="timeline">Chatto V1</h1>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label>Name</label>
              <input className="form-control my-1" type="text" value={chat_name} onChange={(e) => set_chat_name(e.target.value)} />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label>Message</label>
              <input className="form-control my-1" type="text" value={chat_message} onChange={(e) => set_chat_message(e.target.value)} />
            </div>
          </div>
        </div>

        <button className="btn btn-success btn-md btn-block my-1" onClick={sendToWebSocket}>send message</button>

        <ul className="timeline">
          {messages.map(message => (
            <li key={message.key}>
              <div className="timeline-badge"><i className="glyphicon glyphicon-check"></i></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="timeline-title">{message.name}</h4>
                  <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> {message.ts}</small></p>
                </div>
                <div className="timeline-body">
                  <p>{message.message}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PageChattoV1
