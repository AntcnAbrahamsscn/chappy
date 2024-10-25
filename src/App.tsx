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

const App = () => {
    const { isLoggedIn } = useStore();

    return (
        <div className="body-container">
            <div className="header-container">
                <img src="./chappy-logo.svg" alt="Chappy logo" />
                {/* RENDERAR LOGOUT ENBART OM MAN ÄR INLOGGAD */}
                {isLoggedIn && <Logout />}{" "}
            </div>
            <div className="content-container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                isLoggedIn ? <Dashboard /> : <Navigate to="/" />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </div>
    );
};

export default App;
