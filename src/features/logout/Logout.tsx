// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import useStore from "../../data/store.js";

const Logout = () => {
    const { logout, setUser } = useStore();

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <div className="logout-button" onClick={handleLogout}>
            Logout
        </div>
    );
};

export default Logout;
