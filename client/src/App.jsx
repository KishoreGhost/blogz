import React from 'react';
import BlogList from './components/BlogList'; 
import CreateBlogForm from './components/CreateBlogForm';

const App = () => {
  return (
    <div className="App">
      <BlogList />
      <CreateBlogForm />
    </div>
  );
};

export default App;
