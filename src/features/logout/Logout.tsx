import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation for checking the current route
import useStore from "../../data/store.js";

const Logout = () => {
    const { logout, setUser } = useStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        if (location.pathname.startsWith("/channel")) {
            navigate("/dashboard");
        } else {
            logout();
            setUser(null);
        }
    };

    return (
        <div className="logout-button" onClick={handleLogout}>
            {location.pathname.startsWith("/channel") ? (
                <p> Go Back </p>
            ) : (
                <p> Sign Out</p>
            )}
        </div>
    );
};

export default Logout;
