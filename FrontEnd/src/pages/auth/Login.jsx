import Form from "../../components/forms/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthState } from "../../redux/slices/authSlice";
import { setFormType } from "../../redux/slices/helperSlice";
import "./auth.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const fields = [
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Email Address",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const handleLogin = async (data) => {
    let errors = {};
    if (!data.email) errors.email = "Email required";
    if (!data.password) errors.password = "Password required";

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    const resultAction = await dispatch(login(data));

    if (login.fulfilled.match(resultAction)) {
      dispatch(clearAuthState());
      navigate("/dashboard");
    } else {
      return { errors: { email: "Invalid credentials" } };
    }
  };

  return (
    <div className="entry-form">
      <h2>Welcome to Dashboard</h2>
      <Form
        fields={fields}
        onSubmit={handleLogin}
        buttonText={loading ? "Logging in..." : "Login"}
        successMessage="Login successful! Welcome"
        errorMessage="Login failed. Try again."
        success={success}
        error={error}
      />

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
