
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Users, TrendingUp, Zap } from 'lucide-react';

const Home = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/80 to-gray-800/50"></div>
        
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
            className="text-sm text-gray-400 tracking-[0.2em] uppercase mb-8"
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
            <span className="text-4xl md:text-5xl lg:text-6xl text-gray-400 font-extralight">
              Academy
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="/generate">
              <Button 
                size="lg" 
                className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-12 py-4 text-base font-light rounded-full backdrop-blur-sm transition-all duration-300"
              >
                Start Creating
              </Button>
            </Link>
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
                <div className="text-xs text-gray-500 tracking-wider">{stat.label}</div>
                <div className="text-2xl md:text-3xl font-light">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Transition Section */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-8 h-8 mx-auto mb-8">
            <div className="w-full h-full border border-gray-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 tracking-wide uppercase mb-4">
            🔗 Learn more about us
          </p>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            What's in it for you?
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed">
            Gain all the skills you need to kick-start your professional 
            path through mentoring by industry professionals.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
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
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
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
                      
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            Courses
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your creative ideas into viral content? 
            Join thousands of creators making the internet laugh.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/templates">
              <Button 
                size="lg"
                className="bg-white hover:bg-gray-100 text-black px-12 py-4 text-base font-medium rounded-full transition-all duration-300"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Explore Templates
              </Button>
            </Link>
            
            <Link to="/generate">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/10 text-white px-12 py-4 text-base font-light rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <Zap className="mr-2 h-4 w-4" />
                Start Generating
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
