import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateItinerary from "./pages/CreateItinerary.jsx";
import ViewItinerary from "./pages/ViewItinerary.jsx";
import Explore from "./pages/Explore.jsx";
import Profile from "./pages/Profile.jsx";
// import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from "react-hot-toast";

// Import auth components
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
// import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

function App() {
  useEffect(() => {
    document.title = "TripTales ✈️"; // Set the title here
  }, []);

  return (

    <Router>
      <div>
        <Toaster position="top-center" />
      </div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-itinerary" element={<CreateItinerary />} />
          <Route path="/itinerary/:id" element={<ViewItinerary />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
