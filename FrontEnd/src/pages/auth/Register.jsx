/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/forms/input";
import "./auth.css";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="entry-form">
      <h2>Welcome to Dashboard</h2>
      <form>
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          value={form.email}
          onChange={handleChange}
          placeholder="Full Name"
          error={errors.email}
          required={true}
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          error={errors.email}
          required={true}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          required={true}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.e}
          onChange={handleChange}
          placeholder="Confirm Password"
          error={errors.email}
          required={true}
        />

        <Button
          classParent="formBTN"
          type="submit"
          behaviour="primary"
          size="sm"
        >
          Register
        </Button>
      </form>

      <div className="formOption">
        <p>Already have an account?</p> <span>Login</span>
      </div>
    </div>
  );
}

export default Register;
