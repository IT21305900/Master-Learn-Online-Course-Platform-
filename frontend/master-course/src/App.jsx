import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  InstructorDashboard,
  Courses,
  Course,
  Lesson,
  Payment,
} from "./pages";
import "./App.css";
import Nav from "./components/common/Nav";
import InstructorProvider from "./ctx/InstructorProvider";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route
          path="/instructor/:id/:action?"
          element={
            <InstructorProvider>
              <InstructorDashboard />
            </InstructorProvider>
          }
        />
        <Route path="/course" element={<Courses />} />
        <Route path="/course/:cid" element={<Course />} />
        <Route path="/course/:cid/lesson/:lid" element={<Lesson />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
