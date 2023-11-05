// Login.js

import React, { useState } from "react";
import axios from "axios";

const GLogin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      const { data } = response;

      // Store the user in local storage or context
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect user based on role
      if (data.accessLevel === "HOD") {
        history.push("/hod-dashboard");
      } else {
        history.push("/faculty-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors (show message to the user, etc.)
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default GLogin;
