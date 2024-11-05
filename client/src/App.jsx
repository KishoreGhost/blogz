import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderCompo from "./components/Header/HeaderCompo";
import Footer from "./components/Footer/Footer";
import Routes from "./components/Routees";

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
      <Routes theme={theme} />
      <Footer />
    </Router>
  );
};

export default App;
