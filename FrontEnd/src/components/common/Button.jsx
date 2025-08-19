import "./common.css"

function Button({
  children,
  onClick,
  type = "button",
  behaviour = "primary", 
  size = "md", 
  disabled = false,
  loading = false,
}) {
  return (
    <div>
      <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${behaviour} btn-${size}`}
    >
      <p className="btn-text">{loading ? "Loading..." : children}</p>
    </button>
    </div>
  )
}

export default Button;
