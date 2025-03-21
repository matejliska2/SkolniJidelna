import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_ENDPOINTS from "./apiConfig";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
          const response = await fetch(API_ENDPOINTS.login, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Neúspěšné přihlášení");
    
          sessionStorage.setItem("token", data.token);
          const user = data.user;
          const user_id = user.id;
          sessionStorage.setItem("user_id", user_id);
          sessionStorage.setItem("username", user.username);
          window.dispatchEvent(new Event("storage"));
          navigate("/");
        } catch (err) {
          setError(err.message);
        }
      };
    

    return (
        <form class="login-form" onSubmit={handleSubmit}>
          <h1 class="login-title">Přihlášení<i className="fas fa-unlock"></i></h1>
          {error && <span style={{ color: "red" }}>{error}</span>}
          <div class="login-form-content">
            <input class="login-input" placeholder="Uživatelské jméno" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input class="login-input" type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" class="lunch-button login-button">Přihlásit</button>
        </form>
      );
}

export default Login;