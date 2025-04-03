import { useState } from "react";
import "./SignupPage.css";

function SignupPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validation function
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

  // Handle blur (when user leaves input field)
  const handleBlur = (e) => {
    const { id, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validateField(id, value),
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="signup-container">
      {/* Left side - Image */}
      <div className="image-container">
        <img src="/images/signupimage.webp" alt="Modern home at night" className="home-image" />
      </div>

      {/* Right side - Form */}
      <div className="form-container">
        <div className="form-content">
          <h1 className="form-title">Set up your account</h1>
          <p className="form-subtitle">
          Join us today and unlock the world of solar!
          </p>
          
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
              <input type="checkbox" id="confirmPasswordCheck" className="form-checkbox" />
              <label htmlFor="confirmPasswordCheck" className="checkbox-label">
                Confirm Password
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
