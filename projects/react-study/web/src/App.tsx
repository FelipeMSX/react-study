import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/about/page";
import Callback from "./pages/callback/page";

function App() {
    return (
        <div>
            <nav>
                <Link to="/callback">Callback</Link> | <Link to="/about">About</Link>
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
            </Routes>
        </div>
    );
}

export default App;
