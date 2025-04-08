import { useNavigate } from "react-router-dom";
import "./SignupOptions.css";
import { supabase } from "./supabase/supabaseClient.js";

function SignupOptions() {
  const navigate = useNavigate();

  // Handle social signup
  const handleSocialSignup = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase(),
        options: {
          redirectTo: 'http://localhost:3000/auth/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error(`Error signing in with ${provider}:`, error.message);
        alert(`Failed to sign in with ${provider}: ${error.message}`);
      }
    } catch (error) {
      console.error(`Unexpected error during ${provider} sign-in:`, error);
      alert(`Something went wrong with ${provider} sign-in. Please try again.`);
    }
  };

  // Navigate to login page
  const navigateToLogin = () => {
    navigate("/login");
  };

  // Navigate to email/phone signup page
  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="signup-options-container">
      {/* Left side - Image */}
      <div className="image-container">
        <img src="/images/SignupOptionsimage.jpg" alt="Scenery" className="home-image" />
      </div>

      {/* Right side - Options */}
      <div className="options-container">
        <div className="options-content">
          <div className="logo-circle"></div>
          <div className="logo-container">
            <h1 className="company-name">SolarSaarthi</h1>
          </div>

          <p className="join-subtitle">Join us today</p>

          {/* Social Signup Buttons */}
          <div className="social-signup-container">
            <button
              className="social-signup-button google-button"
              onClick={() => handleSocialSignup("Google")}
            >
              <img src="/images/search.png" alt="Google icon" className="social-icon-img google-icon-img" />
              Sign up with Google
            </button>

            <button
              className="social-signup-button facebook-button"
              onClick={() => handleSocialSignup("Facebook")}
            >
              <img src="/images/facebook.png" alt="Facebook icon" className="social-icon-img facebook-icon-img" />
              Sign up with Facebook
            </button>
          </div>

          <div className="divider">
            <span className="divider-text">OR</span>
          </div>

          {/* Email/Phone Signup Button */}
          <button className="email-signup-button" onClick={navigateToSignup}>
            Sign up with phone or email
          </button>

          {/* Terms Agreement */}
          <p className="terms-text">
            By signing up, you agree to the{" "}
            <a href="#" className="terms-link">Terms of Service</a> and{" "}
            <a href="#" className="terms-link">Privacy Policy</a>, including cookie use.
          </p>

          {/* Already have account */}
          <div className="account-prompt">
            <p>Already have an account?</p>
            <button className="login-button" onClick={navigateToLogin}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupOptions;