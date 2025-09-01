import "./global.css";

import { Routes, Route, Link } from "react-router-dom";
import Callback from "./pages/callback/page";
import About from "./pages/about/page";
import ReactHook from "./pages/react-hook-form/page";

function App() {
    return (
        <div>
            <nav>
                <Link to="/callback">Callback</Link> | <Link to="/about">About</Link> |
                <Link to="/react-hook-form">React Hook Form</Link> |
            </nav>
            <Routes>
                <Route
                    path="/callback"
                    element={<Callback />}
                />
                <Route
                    path="/about"
                    element={<About />}
                />
                <Route
                    path="/react-hook-form"
                    element={<ReactHook />}
                />
            </Routes>
        </div>
    );
}

export default App;
