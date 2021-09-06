import React from "react"
import {Link} from "react-router-dom"

function PageNotFound() {
  return (
    <div>
      <div className="content-wrapper" style={{backgroundColor: "#454d55"}}>
        <section className="content text-white">
          <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>

            <div className="error-content">
              <h3><i className="fas fa-exclamation-triangle text-warning"></i> Maaf halaman yang anda cari tidak ditemukan</h3>

              <p>
                Kita ga nemu nih halaman yang kamu cari.
                Jadi... kamu bisa coba balik ke <Link to="/home">halaman Home</Link> atau coba halaman lain yang ada di menu.
              </p>

              <div className="search-form">
                <div className="input-group">
                  <input type="text" name="search" className="form-control" placeholder="Search" />

                  <div className="input-group-append">
                    <button type="submit" name="submit" className="btn btn-warning" onClick={() => alert("Fiturnya belom dibikin. Cari aja yang di menu gan!")}>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="main-footer bg-dark">
        ...
      </footer>
    </div>
  )
}

export default PageNotFound