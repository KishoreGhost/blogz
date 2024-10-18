import React from "react";
import { useEffect } from "react";
import BlogList from "./components/Blog/BlogList";
import CreateBlogForm from "./components/Blog/CreateBlogForm";
import HeaderCompo from "./components/Header/HeaderCompo";
import Footer from "./components/Footer/Footer";

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(theme);
  }, []);
  return (
    <>
      <HeaderCompo />
      <BlogList />
      <CreateBlogForm />
      <Footer />
    </>
  );
};

export default App;
