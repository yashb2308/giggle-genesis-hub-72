
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, TrendingUp, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Generation',
      description: 'Create hilarious memes instantly with our advanced AI technology',
    },
    {
      icon: Sparkles,
      title: 'Custom Templates',
      description: 'Upload your own templates or choose from thousands of popular ones',
    },
    {
      icon: TrendingUp,
      title: 'Trending Content',
      description: 'Stay on top of the latest meme trends and viral content',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Share, like, and discover memes from our creative community',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Create Epic Memes
            <br />
            <span className="text-4xl md:text-6xl">with AI Magic</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your ideas into viral memes instantly. Our AI understands humor, 
            context, and trending formats to create memes that actually make people laugh.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-200"
              >
                <Zap className="mr-2 h-5 w-5" />
                Generate Meme Now
              </Button>
            </Link>
            
            <Link to="/memes">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 text-lg font-semibold rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                Explore Gallery
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-4xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          😂
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-4xl"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🚀
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose MemeGen AI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The most advanced meme creation platform on the internet
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Go Viral?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators making the internet laugh, one meme at a time.
          </p>
          <Link to="/register">
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-200"
            >
              Start Creating Free
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
