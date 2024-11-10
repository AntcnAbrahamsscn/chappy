// App.tsx
// import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./features/login/Login.js";
import Dashboard from "./features/dashboard/Dashboard.js";
import useStore from "./data/store.js";
import "./App.css";
import Logout from "./features/logout/Logout.js";
import Channel from "./features/chat-rooms/ChannelRoom.js";
import DirectMessage from "./features/chat-rooms/DirectMessageRoom.js";
import { useEffect } from "react";

const App = () => {
    const { isLoggedIn, initializeUser } = useStore();

    useEffect(() => {
        initializeUser();
    }, [initializeUser]);

    return (
        <Router>
            {/* TODO: Lägg till en Root med outlet istället. */}
            <div className="body-container">
                <div className="header-container">
                    <img src="/chappy-logo-3.svg" alt="Chappy logo" />
                    {isLoggedIn && <Logout />}{" "}
                </div>
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                isLoggedIn ? <Dashboard /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/channel/:id"
                            element={
                                isLoggedIn ? <Channel /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/message/:receiver"
                            element={
                                isLoggedIn ? (
                                    <DirectMessage />
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
