import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./screens/Home";
import Deligates from "./screens/Deligates";
import ProfileCard from "./components/ProfileCard";
import History from "./screens/History";
import Layout from "./screens/Layout";
import { useAccount } from "wagmi"; 
import TrustAccount from "./components/TrustAccount";
import { QrScan } from "./screens/TrustAction";

function App() {
  const { isConnected, address } = useAccount();
  console.log(isConnected, address);
  return (
    <BrowserRouter>
      {false ? (
        <Login />
      ) : (
        <Routes>
          {/* Other routes with navbars */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  {/* Add your other routes here */}
                  <Route
                    path="/"
                    element={
                      <Layout>
                        <Home />
                      </Layout>
                    }
                  />
                  <Route
                    path="/deligates"
                    element={
                      <Layout>
                        <Deligates />
                      </Layout>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Layout>
                        <ProfileCard />
                      </Layout>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <Layout>
                        <History />
                      </Layout>
                    }
                  />
                  <Route
                    path="/trust"
                    element={
                      <Layout>
                        <QrScan />
                      </Layout>
                    }
                  />
                </Routes>
                <BottomNavbar />
              </>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
