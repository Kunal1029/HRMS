import "./logo.css"
function Logo({classLogo, logo}) {
  return (
    <div className={`${classLogo ? classLogo : "dash-logo"}`}>
      <img src="./dash-logo.png" alt="" />
      <h2>{logo ? logo : "LOGO"}</h2>
    </div>
  )
}

export default Logo
