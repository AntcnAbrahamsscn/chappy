import { useEffect, useState } from "react";
import "./login.css";
// import useStore from "../../data/store.js";

const LS_KEY = "JWT-TOKEN";
// TODO: TYPESCRIPT
// TODO: LABEL
const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<{
        id: string;
        username: string;
        gender: string;
    } | null>(null);

    // Håller användaren inloggad
    useEffect(() => {
        const token = localStorage.getItem(LS_KEY);
        if (token) {
            setIsLoggedIn(true);
            fetchUserData();
        }
    }, []);

    const handleLogin = async () => {
        const data = { username, password };
        const response = await fetch(`api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const { jwt } = await response.json();
        localStorage.setItem(LS_KEY, jwt);
        setIsLoggedIn(true);
        fetchUserData();
    };

    const handleLogout = () => {
        localStorage.removeItem(LS_KEY);
        setIsLoggedIn(false);
        setUser(null);
    };

    const fetchUserData = async () => {
        const response = await fetch("api/user/protected", {
            headers: {
                Authorization: localStorage.getItem(LS_KEY) || "",
            },
        });

        const data = await response.json();

        console.log("the data is: " + data);

        setUser({
            id: data.user.id,
            username: data.user.username,
            gender: data.user.gender,
        });
        console.log("Thi is the  user state:", {
            id: data.user.id,
            username: data.user.username,
            gender: data.user.gender,
        });
    };
    return (
        <div className="login-container">
            {!isLoggedIn ? (
                <div className="login-form">
                    <div className="input-container">
                        {/* <label htmlFor="username">Username</label> */}
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {/* <label htmlFor="Password"></label> */}
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="button-container">
                        <button className="cta" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="cta">Register</button>
                        <p>or...</p>
                        <button>Login as Guest</button>
                    </div>
                </div>
            ) : (
                <div className="login-form">
                    <button onClick={handleLogout}>Logout</button>
                    {user && (
                        <div>
                            <p>user ID: {user.id}</p>
                            <p>name: {user.username}</p>
                            <p>gender: {user.gender}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Login;
