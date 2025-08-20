import Form from "../../components/forms/Form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { setFormType } from "../../redux/slices/helperSlice";
import "./auth.css";

function Login() {
  const dispatch = useDispatch();

  const fields = [
    { label: "Email Address", name: "email", type: "email", placeholder: "Email Address", required: true },
    { label: "Password", name: "password", type: "password", placeholder: "Enter your password", required: true },
  ];

  const handleLogin = async (data) => {
    let errors = {};
    if (!data.email) errors.email = "Email required";
    if (!data.password) errors.password = "Password required";

    if (Object.keys(errors).length > 0) {
      return { errors }; // Form.jsx will display these
    }

    // Dispatch login thunk
    dispatch(login(data));
  };

  return (
    <div className="entry-form">
      <h2>Welcome to Dashboard</h2>
      <Form fields={fields} onSubmit={handleLogin} buttonText="Login" />

      <div className="formOption">
        <p>Don’t have an account?</p>{" "}
        <Link
          to="/auth/register"
          onClick={() => dispatch(setFormType("register"))}
        >
          <span>Register</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
