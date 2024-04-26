import './App.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostPage from './pages/PostPage'
import { Link } from 'react-router-dom'


const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const posts = [
  ]
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts searchTerm={searchTerm}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/PostPage/:id",
      element: <PostPage />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <p style={{ marginRight: '50px', marginLeft: '200px' }}>Social Media Test</p>
        <input
          style={{width: '30%'}}
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Link to="/"><button className="headerBtn"> Home </button></Link>
        <Link to="/new"><button className="headerBtn"> Create New Post</button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
