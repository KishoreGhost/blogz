import React from "react";
import Logo from "../../assets/blogz-logo.png";
import ThemeToggler from "../ThemeToggler";

const headerMiddleContent = ["Home", "Blog", "Pages", "Contact"];

const HeaderCompo = () => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <img className="w-20 h-14 object-contain" src={Logo} alt="logo" />
        </div>
        <nav className="hidden md:flex space-x-6">
          {headerMiddleContent.map((content, index) => (
            <a
              key={index}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              href="#"
            >
              {content}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
            Create Blog
          </button>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default HeaderCompo;