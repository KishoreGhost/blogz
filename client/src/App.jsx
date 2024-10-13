import React from 'react';
import BlogList from './components/Blog/BlogList'; 
import CreateBlogForm from './components/Blog/CreateBlogForm';

const App = () => {
  return (
    <div className="App">
      <BlogList />
      <CreateBlogForm />
    </div>
  );
};

export default App;
