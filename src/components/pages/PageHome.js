import React from "react"

function PageHome() {
  var version = 2.9

  return (
    <div>
      <div className="content-wrapper pt-2 px-2" style={{backgroundColor: "#454d55"}}>
        <div className="position-relative">
          <img src="/images/dashboard.png" alt="welcome" style={{width: "100%", maxHeight: "270px", objectFit: "cover"}} />

          <div className="ribbon-wrapper ribbon-lg">
            <div className="ribbon bg-primary text-lg">
              ANIMAPU
            </div>
          </div>
        </div>

        <div className="text-white">
          <h1><span className="badge badge-pill badge-primary">Welcome To Animapu</span></h1>
          <small>This site is dedicated for learning purpose, please enjoy and give us your feedback!, </small>
          <small className="text-warning">Please login if you want to access the full features of this sites ^^</small>
        </div>

        <hr className="my-2 bg-white" />

        <div>
          <h3 className="text-white"><span className="badge badge-pill badge-primary">Feature Map</span></h3>
          <FeatureMap />
          <small className="badge badge-pill badge-danger">*All manga data is provided by 3rd party</small>
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

  function FeatureMap() {
    return(
      <table className="table table-bordered border-light">
        <thead>
          <tr className="bg-lightblue">
            <th className="p-1">Source Name</th>
            <th className="p-1">Latest</th>
            <th className="p-1">Detail</th>
            <th className="p-1">Read</th>
            <th className="p-1">Search</th>
            <th className="p-1">Library</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://mangahub.io/"><span className="badge badge-pill badge-primary">Mangahub</span></a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
          </tr>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://mangadex.org/"><span className="badge badge-pill badge-primary">Mangadex</span></a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
          </tr>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://www.maid.my.id/"><span className="badge badge-pill badge-primary">Maid My</span></a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
          </tr>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://klikmanga.com/"><span className="badge badge-pill badge-primary">Klik Manga</span></a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
          </tr>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://mangabuddy.com/"><span className="badge badge-pill badge-primary">Manga Buddy</span></a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default PageHome