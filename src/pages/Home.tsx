
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Users, TrendingUp, Zap } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Create hilarious memes instantly with our advanced AI technology that understands humor and context.',
      number: '01'
    },
    {
      icon: Sparkles,
      title: 'Premium Templates',
      description: 'Access thousands of popular templates or upload your own custom designs with professional quality.',
      number: '02'
    },
    {
      icon: TrendingUp,
      title: 'Trending Content',
      description: 'Stay on top of the latest meme trends and viral content with real-time trend analysis.',
      number: '03'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Share, discover, and engage with our creative community of meme creators worldwide.',
      number: '04'
    },
  ];

  const stats = [
    { label: 'MEMES CREATED', value: '1M+' },
    { label: 'ACTIVE USERS', value: '50K+' },
    { label: 'TEMPLATES', value: '10K+' },
    { label: 'COUNTRIES', value: '120+' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm text-slate-400 tracking-[0.2em] uppercase mb-8"
          >
            AI MEME GENERATOR
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-none"
          >
            GiggleGen
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl text-slate-400 font-extralight">
              Academy
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-4"
          >
            {isAuthenticated ? (
              <Link to="/generate">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-base font-medium rounded-full transition-all duration-300"
                >
                  Start Creating
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-base font-medium rounded-full transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-slate-600 hover:bg-slate-800 text-white px-12 py-4 text-base font-light rounded-full backdrop-blur-sm transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-20 left-0 right-0 px-4"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-xs text-slate-500 tracking-wider">{stat.label}</div>
                <div className="text-2xl md:text-3xl font-light">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Powerful Features
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Everything you need to create, share, and discover amazing memes with cutting-edge AI technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 h-full border border-slate-700 hover:border-slate-600 transition-all duration-300">
                    <div className="absolute top-6 right-6 text-6xl font-light text-slate-700 group-hover:text-slate-600 transition-colors duration-300">
                      {feature.number}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 mb-6">
                        <Icon className="w-full h-full text-blue-400" strokeWidth={1} />
                      </div>
                      
                      <h3 className="text-xl font-light mb-4 text-white">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/0 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8">
            Ready to Start?
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators making the internet laugh with AI-powered meme generation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/memes">
              <Button 
                size="lg"
                className="bg-white hover:bg-slate-100 text-black px-12 py-4 text-base font-medium rounded-full transition-all duration-300"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Browse Gallery
              </Button>
            </Link>
            
            <Link to="/trending">
              <Button 
                variant="outline"
                size="lg"
                className="border-slate-600 hover:bg-slate-800 text-white px-12 py-4 text-base font-light rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                See Trending
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
