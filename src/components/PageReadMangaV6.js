import React, {useState, useEffect, useRef} from "react"
import Cookies from 'universal-cookie';
import {WhatsappShareButton} from "react-share";

const cookies = new Cookies();
var cdn_host = "https://img.mghubcdn.com/file/imghub"
var go_animapu_host = "http://go-animapu.herokuapp.com"
var go_animapu_read_manga_path = "read-manga-v6"
var default_manga_title_list = ["-- select manga title --"]
var default_manga_object_list = new Map([["-- select manga title --", {average_page: 1, image_url: "", manga_last_chapter: 0, new_added: 0, status: "finished", weight: 0}]])

function PageReadMangaV6() {
  const [manga_object_list, set_manga_object_list] = useState(default_manga_object_list)
  const [manga_title_list, set_manga_title_list] = useState(default_manga_title_list)
  const [new_manga_title_list, set_new_manga_title_list] = useState(default_manga_title_list)
  const [selected_manga_title, set_selected_manga_title] = useState(manga_title_list[0])
  const [selected_manga_chapter, set_selected_manga_chapter] = useState(0)
  const [selected_manga_chapter_list, set_selected_manga_chapter_list] = useState([])
  const [selected_manga_chapter_pages, set_selected_manga_chapter_pages] = useState([])
  const [button_share_text, set_button_share_text] = useState("share")
  const [manga_title_history_list, set_manga_title_history_list] = useState([])
  const [page_loading_state, set_page_loading_state] = useState("true")

  const text_area_ref = useRef(null);

  useEffect(() => {
    get_manga_object_from_go_animapu_firebase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {post_update_manga_object_to_go_animapu_firebase()}, []);

  async function get_manga_object_from_go_animapu_firebase() {
    try {
      var api = `${go_animapu_host}/mangas/firebase`
      const response = await fetch(api)
      const results = await response.json()

      var temp_manga_object_list = new Map(Object.entries(results.manga_db))
      set_manga_object_list(temp_manga_object_list)

      var temp_new_manga_title_list = []
      var temp_manga_title_list = []
      temp_manga_object_list.forEach((manga_object, manga_title) => {
        if (manga_object.new_added > 0) {
          temp_new_manga_title_list.push({title: manga_title, order: manga_object.new_added})
        }
        temp_manga_title_list.push(manga_title)
      })
      temp_new_manga_title_list.sort((a, b) => a.order - b.order)

      set_new_manga_title_list(temp_new_manga_title_list.map(new_manga_title => (new_manga_title.title)))
      set_manga_title_list(temp_manga_title_list)
      populate_user_read_histories()
      set_page_loading_state("false")
    } catch (error) {
      console.log("RETRYING . . .")
      get_manga_object_from_go_animapu_firebase()
    }
  }

  async function post_update_manga_object_to_go_animapu_firebase() {
    var api = `${go_animapu_host}/mangas/firebase/update`
    await fetch(api)
  }

  async function populate_user_read_histories() {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    try {
      const response = await fetch(`${go_animapu_host}/users/detail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        }
      })
      const results = await response.json()
      const temp_mapped_manga_histories = new Map(Object.entries(results.read_histories));

      var mapped_manga_histories = []
      temp_mapped_manga_histories.forEach((manga, _) => {
        var cache_key = `${manga.manga_title}/last_read_chapter_logged_in`
        var value = manga.last_chapter
        cookies.set(cache_key, value, { path: "/", expires: new Date(2030, 12) })
        mapped_manga_histories.push(manga)
      })
      mapped_manga_histories.sort((a, b) => b.last_read_time_i - a.last_read_time_i)
      set_manga_title_history_list(mapped_manga_histories.map(val => val.manga_title))
    } catch (error) {
      console.log("RETRYING . . .")
      populate_user_read_histories()
    }
  }

  async function set_user_read_histories_to_firebase(manga_title, chapter) {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") !== "true") {
      return
    }

    try {
      const response = await fetch(`${go_animapu_host}/users/read_histories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get("GO_ANIMAPU_LOGIN_TOKEN")
        },
        body: JSON.stringify({
          last_chapter: chapter,
          manga_title: manga_title
        })
      })
      const status = await response.status
      console.log(`SAFE:${status}`)
    } catch (e) {
    }
  }

  function generate_ascending_array_of_integer_from_number(number) {
    var numbers = []
    for (let i = 1; i <= number; i++) { numbers.push(i) }
    return numbers
  }

  function get_manga_last_read_chapter(manga_title) {
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") === "true") {
      var login_history_last_chapter = cookies.get(`${manga_title}/last_read_chapter_logged_in`)

      if (typeof login_history_last_chapter !== "undefined") {
        return parseInt(login_history_last_chapter)
      } else {
        return 1
      }
    } else {
      var local_history_last_chapter = cookies.get(`${manga_title}/last_read_chapter`)

      if (typeof local_history_last_chapter !== "undefined") {
        return parseInt(local_history_last_chapter)
      } else {
        return 1
      }
    }
  }

  function handle_navigation_selected_manga_title(manga_title) {
    var selected_manga_object = manga_object_list.get(manga_title)
    set_selected_manga_title(manga_title)
    set_selected_manga_chapter(get_manga_last_read_chapter(manga_title))
    set_selected_manga_chapter_list(generate_ascending_array_of_integer_from_number(selected_manga_object.manga_last_chapter))
    set_selected_manga_chapter_pages(generate_ascending_array_of_integer_from_number(selected_manga_object.average_page))
    post_handle_navigation(manga_title, selected_manga_chapter)
  }

  function handle_navigation_selected_manga_chapter(manga_chapter) {
    set_selected_manga_chapter(manga_chapter)
    post_handle_navigation(selected_manga_title, manga_chapter)
  }

  function handle_navigation_previous_page() {
    if (parseInt(selected_manga_chapter) === 1) {return true}
    var previous_manga_chapter = parseInt(selected_manga_chapter) - 1
    handle_navigation_selected_manga_chapter(previous_manga_chapter)
  }

  function handle_navigation_next_page() {
    var last_chapter = manga_object_list.get(selected_manga_title).manga_last_chapter
    if (parseInt(selected_manga_chapter) === last_chapter) {return true}
    var next_manga_chapter = parseInt(selected_manga_chapter) + 1
    handle_navigation_selected_manga_chapter(next_manga_chapter)
  }

  function post_handle_navigation(manga_title, manga_chapter) {
    set_user_read_histories_to_firebase(manga_title, manga_chapter)
    set_user_read_histories_to_cookies(manga_title, manga_chapter)
    window.scrollTo(0, 0)
  }

  function generate_shareable_link() {
    return `${go_animapu_host}/${go_animapu_read_manga_path}?title=${selected_manga_title}&chapter=${selected_manga_chapter}`
  }

  function copy_to_clipboard() {
    text_area_ref.current.value = generate_shareable_link()
    text_area_ref.current.select();
    document.execCommand("copy");
    set_button_share_text("copied")
  }

  function generate_image_url(page_no, format) {
    return `${cdn_host}/${selected_manga_title}/${selected_manga_chapter}/${page_no}.${format}`
  }

  function generate_manga_airing_status(manga_title) {
    var selected_manga_object = manga_object_list.get(manga_title)
    return (selected_manga_object.status === "ongoing") ? "border-primary" : "border-success"
  }

  function generate_manga_cover_image(manga_title) {
    return `https://thumb.mghubcdn.com/mn/${manga_title}.jpg`
  }

  function set_user_read_histories_to_cookies(manga_title, chapter) {
    console.log(manga_title, chapter)
    if (manga_title[0] === "-") {return}

    var temp_manga_title_history_list = manga_title_history_list
    var index_of_manga_title = temp_manga_title_history_list.indexOf(manga_title);
    if (index_of_manga_title !== -1) { temp_manga_title_history_list.splice(index_of_manga_title, 1) }
    temp_manga_title_history_list.unshift(manga_title)

    set_manga_title_history_list(temp_manga_title_history_list)

    var cache_key = ""
    if (cookies.get("GO_ANIMAPU_LOGGED_IN") === "true") {
      cache_key = `${manga_title}/last_read_chapter_logged_in`
      cookies.set(cache_key, chapter, { path: "/", expires: new Date(2030, 12) })
    } else {
      cache_key = `${manga_title}/last_read_chapter`
      cookies.set(cache_key, chapter, { path: "/", expires: new Date(2030, 12) })
    }
  }

  return (
    <div>

      <div className="sticky-top bg-dark" style={{margin: "0px -14px 0px"}}>
        <RenderHeader />
      </div>

      <div className="pb-5">
        <RenderLoadingBar />

        <RenderReadMangaHome />

        <RenderMangaPageContent />
      </div>

      <div className='form-group'>
        <form><input readOnly className='form-control' type='text' style={{"display": "block"}} rows="10" display='none' ref={text_area_ref} defaultValue={generate_shareable_link()} /></form>
      </div>

      <div className="container fixed-bottom bg-dark">
        <RenderFooter />
      </div>
    </div>
  )

  function RenderHeader() {
    return(
      <div className="nav-scroller">
        <nav className="nav d-flex justify-content-between">
          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 my-1" onClick={copy_to_clipboard}>{button_share_text}</button>
          <div className="btn btn-light btn-sm btn-outline-secondary mx-1 my-1">
            <WhatsappShareButton url={generate_shareable_link()} children={"WA"} />
          </div>
          <select className="custom-select mx-1 my-1" name="selectedMangaTitle" defaultValue={selected_manga_title} onChange={(e) => handle_navigation_selected_manga_title(e.target.value)}>
            {manga_title_list.map(manga_title => (
              <option key={manga_title} value={manga_title}> {manga_title} </option>
            ))}
          </select>
        </nav>
      </div>
    )
  }

  function RenderReadMangaHome() {
    if (selected_manga_title[0] !== "-") {return(<div></div>)}
    return(
      <div>
        <div className="row col-12"><h4>History</h4></div>
        <div className="row flex-row flex-nowrap overflow-auto">
          {manga_title_history_list.map(manga_title => (
            <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_history_list`} />
          ))}
        </div>
        <hr />

        <div className="row col-12"><h4>New Updates</h4></div>
        <div className="row flex-row flex-nowrap overflow-auto">
          {new_manga_title_list.map(manga_title => (
            <RenderMangaCard manga_title={manga_title} key={`${manga_title}-new_manga_title_list`} />
          ))}
        </div>
        <hr />

        <div className="row col-12"><h4>Library</h4></div>
        <div className="row">
          {manga_title_list.map(manga_title => (
            <RenderMangaCard manga_title={manga_title} key={`${manga_title}-manga_title_list`} />
          ))}
        </div>
      </div>
    )
  }

  function RenderMangaCard(props) {
    if (props.manga_title[0] === "-") {return(<div></div>)}
    return(
      <div className="col-4 col-md-2">
        <div className={`card mb-4 box-shadow shadow border-4 ${generate_manga_airing_status(props.manga_title)}`}>
          <div style={{height: "170px", backgroundSize: 'cover', justifyContent: "space-between", display: "flex", flexDirection: "column", backgroundImage: `url(${generate_manga_cover_image(props.manga_title)})`}}>
            <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>{`${get_manga_last_read_chapter(props.manga_title)}/${manga_object_list.get(props.manga_title).manga_last_chapter}`}</small>
            </div>
            <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
              <small>{props.manga_title}</small>
            </div>
          </div>
          <button type="button" className="btn btn-block btn-sm btn-outline-secondary" onClick={(e) => handle_navigation_selected_manga_title(e.target.value)} value={props.manga_title}>View</button>
        </div>
      </div>
    )
  }

  function RenderMangaPageContent() {
    return(
      <div>
        {selected_manga_chapter_pages.map(page_no => (
          <div className="bg-dark border border-dark rounded mx-n2" key={generate_image_url(page_no, 'key')}>
            <img className="bd-placeholder-img mx-auto d-block img-fluid" src={generate_image_url(page_no, 'jpg')} alt=""/>
            <img className="bd-placeholder-img mx-auto d-block img-fluid" src={generate_image_url(page_no, 'png')} alt=""/>
          </div>
        ))}
      </div>
    )
  }

  function RenderFooter() {
    return(
      <div className="nav-scroller py-1 mb-3">
        <nav className="nav d-flex justify-content-between">
          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 px-2" onClick={() => handle_navigation_previous_page()}>←</button>

          <button className="btn btn-light btn-sm btn-outline-secondary mx-1" onClick={() => handle_navigation_selected_manga_title(manga_title_list[0])}>Menu</button>

          <select className="custom-select mx-1" name="selectedMangaTitle" onChange={(e) => handle_navigation_selected_manga_chapter(e.target.value)} defaultValue={selected_manga_chapter}>
            {selected_manga_chapter_list.map(chapter => (<option key={chapter} value={chapter}> Chapter {chapter} </option>))}
          </select>

          <button className="btn btn-light btn-sm btn-outline-secondary mx-1 px-2" onClick={() => handle_navigation_next_page()}>→</button>
        </nav>
      </div>
    )
  }

  function RenderLoadingBar() {
    if (page_loading_state === "false") {return(<div></div>)}
    return(
      <div>
        <br/><div className="progress progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div><br/>
      </div>
    )
  }
}

export default PageReadMangaV6
