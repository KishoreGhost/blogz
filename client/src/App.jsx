import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./components/Blog/BlogList";
import CreateBlogForm from "./components/Blog/CreateBlogForm";
import HeaderCompo from "./components/Header/HeaderCompo";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);

    return () => document.documentElement.classList.remove(theme);
  }, [theme]);

  return (
    <Router>
      <HeaderCompo theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<BlogList theme={theme} />} />
        <Route path="/create" element={<CreateBlogForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
