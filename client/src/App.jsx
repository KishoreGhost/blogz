import React from 'react';
import BlogList from './components/Blog/BlogList'; 
import CreateBlogForm from './components/Blog/CreateBlogForm';
import HeaderCompo from './components/Header/HeaderCompo';

useEffect(() => {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.add(theme);
}, []);

const App = () => {
  return (
    <>
      <HeaderCompo />
      <BlogList />
      <CreateBlogForm />
    </>
  );
};

export default App;
