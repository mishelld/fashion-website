import "./AuthForm.css";
import React, { useState, useEffect } from "react";
import UserPage from "./UserPage"; // import the new page

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(""); // store email
  const [name, setName] = useState(""); // store email

  const [password, setPassword] = useState(""); // store password
  const [user, setUser] = useState(null);

  // ✅ check localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        alert("✅ Signup successful!");
        setIsLogin(true); // switch to login form
      } else {
        alert("❌ Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ save
        alert("✅ Login successful! Welcome " + data.user?.name);
      } else {
        alert("❌ Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };

  const toggleForm = () => setIsLogin(!isLogin);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ clear
  };

  if (user) {
    return <UserPage user={user} handleLogout={handleLogout} />;
  }

  return (
    <div className="auth-container">
      {isLogin ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <span onClick={toggleForm}>Sign Up</span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Enter your full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button type="submit">Sign up</button>
          Already have an account? <span onClick={toggleForm}>Login</span>
        </form>
      )}
    </div>
  );
}

export default AuthForm;
