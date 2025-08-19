import "./sidebar.css"

function Menu({department, processes}) {
  return (
    <div className="middleBar">
      <p className="department">{department}</p>

      {processes.map((x,i)=>(
        <div className="workOn" key={i}>
        <img src={`${x.icon}`} alt="" />
        <p>{x.name}</p>
      </div>
      ))}

    </div>
  )
}

export default Menu;
