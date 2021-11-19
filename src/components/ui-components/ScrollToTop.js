import React from "react"

function ScrollToTop(props) {
  return(
    <button
      className="bg-primary"
      onClick={() => window.scrollTo(0, 0)}
      style={{
        display: (props.show === false ? "none" : "block"),
        position:"fixed",
        width:"50px",
        height:"50px",
        bottom:"155px",
        right:"30px",
        color:"#FFF",
        borderRadius:"50px",
        paddingBottom: "30px",
        textAlign:"center",
        zIndex: "100"
      }}
    >
      <i className="fa fa-arrow-up" style={{marginTop:"17px"}}></i>
    </button>
  )
}

export default ScrollToTop
