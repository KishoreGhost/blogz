import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from './Blog/BlogList';
import CreateBlogForm from './Blog/CreateBlogForm';

const Routees = ({ theme }) => {
  return (
    <Routes>
      <Route path="/" element={<BlogList theme={theme} />} />
      <Route path="/create" element={<CreateBlogForm />} />
    </Routes>
  );
};

export default Routees;
