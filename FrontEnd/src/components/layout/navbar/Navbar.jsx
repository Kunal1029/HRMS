import "./Nav.css"
function Navbar() {
  return (
    <div className='navBar'>
      <div className="activeNav">
        <h2>Candidates</h2>
      </div>

      <div className="profile">
        <img src="./email-icon.png" alt="" />
        <img src="./bell-icon.png" alt="" />
      </div>
    </div>
  )
}

export default Navbar
