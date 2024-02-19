import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/farebaseContext'
import "firebase/compat/auth";
import Post from './store/postContext'


function App() {
  const { setUser } = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })

  })

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sell-your-vehicle' element={<Create />} />
            <Route path='/view-post' element={<ViewPost />} />
          </Routes>

        </Router>
      </Post>
    </div>
  );
}

export default App;
