import "./global.css";

import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/about/page";
import Callback from "./pages/callback/page";
import ReactHook from "./pages/react-hook-form/page";
import AndreyProblem from "./pages/andrey/page";

function App() {
    return (
        <div>
            <nav>
                <Link to="/callback">Callback</Link> | <Link to="/about">About</Link> |
                <Link to="/react-hook-form">React Hook Form</Link> |
                <Link to="/andrey">Andrey Problem</Link>
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
                <Route
                    path="/andrey"
                    element={<AndreyProblem />}
                />
            </Routes>
        </div>
    );
}

export default App;
