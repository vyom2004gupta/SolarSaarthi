// AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase/supabaseClient.js"; // Adjust if your path is different

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (!data?.session?.access_token) {
          console.error("Session token not found or expired.");
          navigate("/?error=expired");
          return;
        }
        
        console.log("Access token:", data.session.access_token);

  
      if (error || !data.session) {
        console.error("Failed to get session:", error?.message);
        return;
      }
  
      const session = data.session;
      const token = session.access_token;

      console.log("Access token:", session.access_token);
      console.log("User info:", session.user);

  
      // ⬇️ Get saved profile from localStorage
      const profileData = JSON.parse(localStorage.getItem("profileData"));
  
      if (!profileData) {
        console.warn("No profile data found in localStorage.");
        return;
      }
  
      const response = await fetch("http://localhost:8000/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
  
      const result = await response.json();
      console.log("User saved:", result);
  
      localStorage.removeItem("profileData"); // ✅ Clean up
  
      navigate("/");
    };
  
    handleRedirect();
  }, [navigate]);
  

  return <p>Finalizing signup... Please wait.</p>;
}

export default AuthCallback;
