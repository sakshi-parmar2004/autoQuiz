import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import Results from "./pages/Results.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/mcqs" element={<QuizPage />} />
        <Route path="/result" element={<Results />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
