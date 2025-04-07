import { useState } from "react";
import "./SignupPage.css";
import "@supabase/supabase-js";
import { supabase } from "./supabase/supabaseClient.js";
import { useNavigate } from "react-router-dom";

function SignupPage({ onBackToOptions }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[A-Za-z]+$/.test(value)) error = "Only letters are allowed";
        break;
      case "mobileNumber":
        if (!/^\d{10}$/.test(value)) error = "Enter a valid 10-digit number";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validateField(id, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (!Object.values(newErrors).every((error) => error === "")) {
      setLoading(false);
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile: formData.mobileNumber,
        },
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (authError) {
      alert("Signup error: " + authError.message);
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "profileData",
      JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
      })
    );

    alert("Signup successful! Check your email to confirm.");

    const sessionResponse = await supabase.auth.getSession();
    const session = sessionResponse.data.session;

    if (session) {
      const token = session.access_token;

      try {
        const response = await fetch("http://localhost:8000/api/save-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            mobileNumber: formData.mobileNumber,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert("Backend error: " + errorData.detail);
        } else {
          const result = await response.json();
          console.log(result.message);
        }
      } catch (backendError) {
        console.error("Error calling backend:", backendError);
      }
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img
          src="/images/signupimage.webp"
          alt="Modern home at night"
          className="home-image"
        />
      </div>

      <div className="form-container">
        <div className="form-content">
          <h1 className="form-title">Set up your account</h1>
          <p className="form-subtitle">Join us today and unlock the world of solar!</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="form-field">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                className="form-input"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="form-field">
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                className="form-input"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            </div>

            {/* Mobile Number */}
            <div className="form-field">
              <input
                type="tel"
                id="mobileNumber"
                placeholder="Mobile Number"
                className="form-input"
                value={formData.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.mobileNumber && <p className="error-text">{errors.mobileNumber}</p>}
            </div>

            {/* Email */}
            <div className="form-field">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-field">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="form-field">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>

            {/* Checkbox */}
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="confirmPasswordCheck"
                className="form-checkbox"
              />
              <label htmlFor="confirmPasswordCheck" className="checkbox-label">
                Confirm Password
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Signing up..." : "Continue"}
            </button>
          </form>

          {/* Back to Options Button */}
          <div className="back-option">
            <button className="back-button" onClick={() => navigate("/")}>
              Back to options
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignupPage;
