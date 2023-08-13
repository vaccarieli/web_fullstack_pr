import "./App.css";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import CreatePost from "./pages/CreatePost";
import Consultar from "./pages/CSS/Consultar";
import Solicitar from "./pages/CSS/Solicitar";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="navbar">
                    <Link to="/">Main</Link>
                    <Link to="/games">Games</Link>
                    <Link to="/createpost">Create A Post</Link>
                    <Link to="/consultar">Css</Link>
                </div>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/games" Component={Games} />
                    <Route path="/createpost" Component={CreatePost} />
                    <Route path="/consultar" Component={Consultar} />
                    <Route path="/solicitar" Component={Solicitar} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
