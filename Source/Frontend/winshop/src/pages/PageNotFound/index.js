import React from 'react'

function PageNotFound() {
  return (
    <div className="container-fluid" style={{background:"#95c2de", width:"100%", height:"700px", overflowX:"hidden", marginTop: "50px"}}>
    <div className="mainbox">
        <div className="d-flex" style={{justifyContent:"center", alignItems:"center", color:"#fff"}}>
          <div className="err" style={{fontSize:"11rem"}}>4</div>
          <i className="far fa-question-circle fa-spin" style={{fontSize:"11rem"}}/>
          <div className="err2" style={{fontSize:"11rem"}}>4</div>
      </div>
      <div className="msg" style={{color:"#000", fontSize:"1.6rem", fontWeight:"300"}}>
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p>
            Let's go <a className="notFoundLink" href="/" style={{color:"#fb4226", textDecoration:"none"}}>Home</a> and try from there.
        </p>
      </div>
    </div>
  </div>
  )
}

export default PageNotFound