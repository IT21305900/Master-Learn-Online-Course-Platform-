import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, InstructorDashboard } from "./pages";
import LoginUser from "./components/lerner/LoginUser";
import "./App.css";
import Dashboard from "./components/landing-page/Dashboard";
import Reports from "./components/landing-page/Reports";
import Progress from "./components/landing-page/Progress";
import Inventory from "./components/landing-page/Inventory";
import Courses from "./components/landing-page/Courses";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/learner" element={<LoginUser />} />
      <Route path="/landingpage" element={<Dashboard />} />
      <Route path="/landingpage/courses" element={<Courses />} />
      <Route path="/landingpage/progress" element={<Progress />} />
      <Route path="/landingpage/inventory" element={<Inventory />} />
      <Route path="/landingpage/reports" element={<Reports />} />
        <Route path="/" element={<Home />} />
        <Route path="/instructor/:id" element={<InstructorDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
