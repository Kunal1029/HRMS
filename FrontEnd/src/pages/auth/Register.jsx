import Form from "../../components/forms/Form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { setFormType } from "../../redux/slices/helperSlice";
import "./auth.css";

function Register() {
  const dispatch = useDispatch();

  const fields = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Full Name", required: true },
    { label: "Email", name: "email", type: "email", placeholder: "Email Address", required: true },
    { label: "Password", name: "password", type: "password", placeholder: "Enter your password", required: true },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true },
  ];

  const handleRegister = async (data) => {
    let errors = {};
    if (!data.fullName) errors.fullName = "Full name required";
    if (!data.email) errors.email = "Email required";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    dispatch(register(data));
  };

  return (
    <div className="entry-form">
      <h2>Welcome to Dashboard</h2>
      <Form fields={fields} onSubmit={handleRegister} buttonText="Register" />

      <div className="formOption">
        <p>Already have an account?</p>{" "}
        <Link
          to="/auth/login"
          onClick={() => dispatch(setFormType("login"))}
        >
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
}

export default Register;
