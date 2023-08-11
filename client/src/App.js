import "./App.css";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import CreatePost from "./pages/CreatePost";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="navbar">
                    <Link to="/">Main</Link>
                    <Link to="/games">Games</Link>
                    <Link to="/createpost">Create A Post</Link>
                </div>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/games" Component={Games} />
                    <Route path="/createpost" Component={CreatePost} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
