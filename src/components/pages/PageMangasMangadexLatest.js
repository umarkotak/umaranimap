import React from "react"

function PageMangasLatestMangadex() {
  return(
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="mt-2 mx-2">
          <div className="row">
          </div>
        </div>
      </div>

      <footer className="main-footer bg-dark">
        <div className="float-right">
          ANIMAPU 2021 | Version: 2
        </div>
      </footer>
    </div>
  )

  // title
  // beautified_title
  // detail_link
  // last_chapter
  // continue_chapter
  // util_icon
  // util_link
  // border_color
  // function RenderMangaCard(props) {
  //   return(
  //     <div className={`${props.border_color}`}>
  //       <div
  //         style={{
  //           height: (helper.GenerateImageCardHeightByWidth(window.innerWidth) + "px"),
  //           backgroundSize: '100% 100%',
  //           justifyContent: "space-between",
  //           display: "flex",
  //           flexDirection: "column",
  //           backgroundImage: `url(${generateThumbnailFromTitle(props.title)}), url(${'/default-book.png'})`
  //         }}
  //       >
  //         <div className="text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
  //           <small>{`${props.continue_chapter}/${props.last_chapter}`}</small>
  //           <Link
  //             to={props.util_link}
  //             className="btn btn-sm btn-light float-right"
  //             style={{ paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}
  //           >
  //             <i className={`fa ${props.util_icon}`}></i>
  //           </Link>
  //         </div>
  //         <div className="text-white card-text overflow-auto" style={{"height": "35px", "width": "100%", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
  //           <small>{props.beautified_title}</small>
  //         </div>
  //       </div>
  //       <table style={{width: "100%"}}>
  //         <thead>
  //           <tr>
  //             <th width="10%">
  //               <Link type="button" className="btn btn-block btn-sm btn-outline-light" to={props.detail_link}><i className="fa fa-info-circle"></i></Link>
  //             </th>
  //             <th width="35%">
  //               <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${props.title}/1?last_chapter=${props.last_chapter}`}>1</Link>
  //             </th>
  //             <th width="55%">
  //               <Link className="btn btn-block btn-sm btn-outline-light" to={`/mangas/read/mangahub/${props.title}/${props.last_chapter}?last_chapter=${props.last_chapter}`}>{props.last_chapter}</Link>
  //             </th>
  //           </tr>
  //         </thead>
  //       </table>
  //     </div>
  //   )
  // }
}

export default PageMangasLatestMangadex
