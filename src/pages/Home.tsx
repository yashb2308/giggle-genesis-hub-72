
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Users, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-black text-white font-inter overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm text-gray-400 tracking-[0.2em] uppercase mb-8 font-light"
          >
            AI MEME GENERATOR
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-12 leading-none"
          >
            Academy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-6 mb-16"
          >
            {isAuthenticated ? (
              <Link to="/generate">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-200 text-black px-12 py-4 text-base font-light rounded-full transition-all duration-300"
                >
                  Start Creating
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-gray-200 text-black px-12 py-4 text-base font-light rounded-full transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-white hover:bg-white hover:text-black text-white px-12 py-4 text-base font-light rounded-full transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Stats Bar - Fixed positioning */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full px-4 pb-20"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-xs text-gray-500 tracking-wider font-light">{stat.label}</div>
                <div className="text-2xl md:text-3xl font-light">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
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
                  <div className="bg-white/5 rounded-2xl p-8 h-full border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="absolute top-6 right-6 text-6xl font-light text-gray-800 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.number}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 mb-6">
                        <Icon className="w-full h-full text-white" strokeWidth={1} />
                      </div>
                      
                      <h3 className="text-xl font-light mb-4 text-white">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 text-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-white">
            Ready to Start?
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Join thousands of creators making the internet laugh with AI-powered meme generation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/memes">
              <Button 
                size="lg"
                className="bg-white hover:bg-gray-200 text-black px-12 py-4 text-base font-light rounded-full transition-all duration-300"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Browse Gallery
              </Button>
            </Link>
            
            <Link to="/trending">
              <Button 
                variant="outline"
                size="lg"
                className="border-white hover:bg-white hover:text-black text-white px-12 py-4 text-base font-light rounded-full transition-all duration-300"
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
