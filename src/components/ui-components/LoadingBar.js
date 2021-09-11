import React from "react"

function LoadingBar(props) {
  if (props.isLoading) {
    return(
      <div className="col-12">
        <div
          className="progress progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{width: "100%"}}
        ></div>
      </div>
    )
  }
  return(<div></div>)
}

export default LoadingBar
