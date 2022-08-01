import './App.css';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import PostDetails from './Pages/PostDetails';
import { useDispatch } from 'react-redux';
import { getAllPosts } from './redux/actions/post.action';
import { getAllUsers } from './redux/actions/user.action';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  const API = axios.create({ baseURL: 'http://localhost:2303' });

  useEffect(() => {
    //Get  All Posts
    API.get('/posts').then(response => dispatch(getAllPosts(response.data.data)));

    //Get  All Users
    API.get('/users').then(response => dispatch(getAllUsers(response.data.data)));
  }, []);

  return (
    <div className='light'>
      <NavBar />
      <Routes>
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
