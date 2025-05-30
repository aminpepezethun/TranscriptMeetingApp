import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8000";

export default function useAuthForm(isLogin) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return false;
    }
    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          ...(isLogin ? {} : { confirm_password: form.confirmPassword }),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.detail || "Authentication failed.");
      } else {
        setSuccess(isLogin ? "Login successful!" : "Signup successful!");
        // Move './TranscriptMeeting'
        navigate("/TranscriptMeeting");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return {
    form,
    error,
    success,
    handleChange,
    handleSubmit,
    setError,
    setSuccess,
  };
}