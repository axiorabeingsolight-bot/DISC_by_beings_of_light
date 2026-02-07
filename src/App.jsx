import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import LandingPage from "./pages/LandingPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  return (
    <div className="w-full min-h-screen body overflow-hidden">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-info" element={<UserDetailsPage />} />
        <Route path="/questions" element={<TestPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
