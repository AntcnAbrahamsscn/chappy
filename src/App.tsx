import "./App.css";
import { useState } from "react";

const LS_KEY = "JWT-TOKEN";

const App = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<{
        id: string;
        username: string;
        gender: string;
    } | null>(null);

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
        <div>
            <h1>Chappy</h1>
            {!isLoggedIn ? (
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>
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

export default App;
