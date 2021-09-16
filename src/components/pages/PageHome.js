import React from "react"

function PageHome() {
  return (
    <div>
      <div className="content-wrapper p-2" style={{backgroundColor: "#454d55"}}>
        <div className="position-relative">
          <img src="/dashboard.png" alt="welcome" className="img-fluid" style={{width: "100%"}} />

          <div className="ribbon-wrapper ribbon-lg">
            <div className="ribbon bg-success text-lg">
              ANIMAPU
            </div>
          </div>
        </div>

        <div className="text-white">
          <h1>Welcome To Animapu</h1>
          <small>This site is dedicated for learning purpose, please enjoy and give us your feedback!</small>
        </div>

        <hr className="my-2 bg-white" />

        <div>
          <h3 className="text-white">Feature Map</h3>
          <FeatureMap />
        </div>
      </div>

      <footer className="main-footer bg-dark">
        <div className="float-right">
          ANIMAPU 2021 | Version: 2.3
        </div>
      </footer>
    </div>
  )

  function FeatureMap() {
    return(
      <table className="table table-bordered border-light">
        <thead>
          <tr className="bg-secondary">
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
            <td className="p-1"><a href="https://mangahub.io/">Mangahub</a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
          </tr>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://mangadex.org/">Mangadex</a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
          </tr>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://www.maid.my.id/">Maid My</a></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-success fa-check"></i></td>
            <td className="p-1"><i className="fa text-danger fa-times"></i></td>
          </tr>
          <tr className="bg-dark">
            <td className="p-1"><a href="https://klikmanga.com/">Klik Manga</a></td>
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