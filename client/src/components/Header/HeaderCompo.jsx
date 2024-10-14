import React from "react";
import Logo from "../../assets/blogz-logo.png";
import ThemeToogler from "../ThemeToogler";

const headerMiddleContent = ["Home", "Blog", "Pages", "Contact"];

const HeaderCompo = () => {
  return (
    <header className="border-2 border-black flex justify-between items-center px-4 py-2">
      <div>
        <img className="w-20 h-14" src={Logo} alt="logo" />
      </div>
      <nav className="flex space-x-4">
        {headerMiddleContent.map((content, index) => (
          <a key={index} className="px-4 cursor-pointer hover:text-blue-500" href="#">
            {content}
          </a>
        ))}
      </nav>
      <div className="flex items-center space-x-5">
        <button className="bg-blue-#4B6BFB text-white px-3 py-1 rounded hover:bg-blue-600">
          Create Blog
        </button>
        <ThemeToogler />
      </div>
    </header>
  );
};

export default HeaderCompo;
