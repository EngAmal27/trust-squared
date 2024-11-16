import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./screens/Home";
import Deligates from "./screens/Deligates";
import ProfileCard from "./components/ProfileCard";
import History from "./screens/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route without navbars */}
        <Route path="/login" element={<Login />} />

        {/* Other routes with navbars */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                {/* Add your other routes here */}
                <Route path="/" element={<Home />} />
                <Route path="/deligates" element={<Deligates />} />
                <Route path="/profile" element={<ProfileCard />} />
                <Route path="/history" element={<History />} />
              </Routes>
              <BottomNavbar />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
