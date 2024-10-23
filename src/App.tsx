import "./App.css";

// Components
import Login from "./features/login/Login.js";

// TODO: TYPESCRIPT
const App = () => {
    return (
        <div className="body-container">
            <section className="header-container">
                <h1>Chappy</h1>
            </section>
            <section className="content-container">
                <Login />
            </section>
        </div>
    );
};

export default App;
