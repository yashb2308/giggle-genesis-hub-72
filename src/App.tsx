
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Templates from './pages/Templates';
import UploadTemplate from './pages/UploadTemplate';
import Generate from './pages/Generate';
import BatchGenerate from './pages/BatchGenerate';
import Gallery from './pages/Gallery';
import MemeDetail from './pages/MemeDetail';
import Trending from './pages/Trending';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-colors duration-300">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/upload-template" element={
                  <ProtectedRoute>
                    <UploadTemplate />
                  </ProtectedRoute>
                } />
                <Route path="/generate" element={<Generate />} />
                <Route path="/generate-batch" element={
                  <ProtectedRoute>
                    <BatchGenerate />
                  </ProtectedRoute>
                } />
                <Route path="/memes" element={<Gallery />} />
                <Route path="/memes/:id" element={<MemeDetail />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toaster />
            <Sonner />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
