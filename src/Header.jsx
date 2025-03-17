import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {

  const [username, setUsername] = useState(sessionStorage.getItem("username") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(sessionStorage.getItem("username") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <header>
      <div id="header-content">
        <h1 id="header-title">Hodnocení školní jídelny</h1>
        <nav id="header-nav">
          <Link to={`/`}>Domů</Link>
          {username ? (
            <>
              {" | "}
              <div className="user-div">
                <i className="fas fa-user"></i>
                <span id="username-span">{username}</span>
              </div>
              <button onClick={handleLogout} class="lunch-button logout-button">Odhlásit</button>
            </>
          ) : (
            <Link to={`/login`}>Přihlášení</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;