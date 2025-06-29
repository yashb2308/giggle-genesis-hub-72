
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const AuthForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState({ login: false, register: false });
  const [isLoading, setIsLoading] = useState({ login: false, register: false });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(prev => ({ ...prev, login: true }));
    try {
      await login(loginData.username, loginData.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, login: false }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (registerData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(prev => ({ ...prev, register: true }));
    try {
      await register(registerData.username, registerData.email, registerData.password);
      toast.success('Account created successfully! Welcome to GiggleGen!');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.username?.[0] || 
                          error.response?.data?.email?.[0] || 
                          'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(prev => ({ ...prev, register: false }));
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 font-light">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border border-white/10 bg-black/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-light text-white">Welcome</CardTitle>
            <CardDescription className="text-gray-400 font-light">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
                <TabsTrigger value="login" className="font-light">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="font-light">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                      className="h-12 pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 font-light"
                      disabled={isLoading.login}
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword.login ? 'text' : 'password'}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="h-12 pl-10 pr-12 bg-white/5 border-white/10 text-white placeholder-gray-400 font-light"
                      disabled={isLoading.login}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, login: !prev.login }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword.login ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-white hover:bg-gray-200 text-black font-light"
                    disabled={isLoading.login}
                  >
                    {isLoading.login ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Username"
                      value={registerData.username}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, username: e.target.value }))}
                      className="h-12 pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 font-light"
                      disabled={isLoading.register}
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 font-light"
                      disabled={isLoading.register}
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword.register ? 'text' : 'password'}
                      placeholder="Password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="h-12 pl-10 pr-12 bg-white/5 border-white/10 text-white placeholder-gray-400 font-light"
                      disabled={isLoading.register}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, register: !prev.register }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword.register ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="h-12 pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 font-light"
                      disabled={isLoading.register}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-white hover:bg-gray-200 text-black font-light"
                    disabled={isLoading.register}
                  >
                    {isLoading.register ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthForm;
