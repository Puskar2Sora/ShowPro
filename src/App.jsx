// src/App.jsx
// Defines all pages and their URL paths

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProject from './pages/AddProject';      
import Profile from './pages/Profile';              // ADD THIS
  // ADD THIS
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    // AuthProvider makes login state available everywhere
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-project" element={<AddProject />} />  {/* ADD THIS */}
          <Route path="/profile/:id" element={<Profile />} />   {/* ADD THIS */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;