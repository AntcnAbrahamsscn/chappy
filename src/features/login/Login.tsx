import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import useStore from "../../data/store.js";
// import Logout from "../logout/Logout.js";

const Login = () => {
    // TODO: Lägg till detta i zustand
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {
        isLoggedIn,
        login /* restoreSession, */ /* user */,
        loginAsGuest,
        logout,
    } = useStore();
    const navigate = useNavigate();

    // TODO: Fixa så att man loggas in automatiskt om man kommer till login ifall det finns en JWT. Update: fixa guest udpdate
    useEffect(() => {
        logout();
    }, [logout]);

    const handleLogin = async () => {
        if (!username || !password) {
            setErrorMessage("Both username and password are required.");
            return;
        }

        const data = { username, password };
        const response = await fetch(`api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const { jwt, user } = await response.json();

            login(jwt, user);
            navigate("/dashboard");
        } else {
            console.error("Login failed");
            setErrorMessage("Invalid username or password.");
        }
    };

    const handleGuestLogin = () => {
        loginAsGuest();
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            {!isLoggedIn && (
                <div className="login-form">
                    <div className="login-container">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage && (
                            <p className="error-message">{errorMessage}</p>
                        )}{" "}
                    </div>

                    <div className="button-container">
                        <button className="cta" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="cta">Register</button>
                        <p>or...</p>
                        <button onClick={handleGuestLogin}>
                            Login as Guest
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
