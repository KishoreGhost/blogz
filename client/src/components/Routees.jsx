import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from './Blog/BlogList';
import CreateBlogForm from './Blog/CreateBlogForm';
import LoginPage from './Login/LoginPage';

const Routees = ({ theme }) => {
  return (
    <Routes>
      <Route path="/" element={<BlogList theme={theme} />} />
      <Route path="/create" element={<CreateBlogForm />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
};

export default Routees;
