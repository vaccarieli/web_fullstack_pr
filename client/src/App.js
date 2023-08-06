import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" Component={Home} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
