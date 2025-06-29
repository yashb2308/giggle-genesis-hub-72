
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Users, Zap, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Our advanced AI understands context, humor, and trending formats to create memes that actually make people laugh.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional-quality memes in seconds, not minutes. Our optimized system ensures quick results.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of creators sharing, discovering, and trending memes in our vibrant community.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your data is protected with enterprise-grade security. We respect your privacy and creativity.'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      description: 'Former AI researcher with a passion for making people laugh through technology.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of AI',
      description: 'Machine learning expert specializing in natural language processing and computer vision.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Lead Designer',
      description: 'Creative director ensuring every meme generated meets the highest quality standards.'
    },
    {
      name: 'Emily Davis',
      role: 'Community Manager',
      description: 'Building and nurturing our amazing community of meme creators worldwide.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GiggleGen</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            We're on a mission to democratize humor and make meme creation accessible to everyone. 
            Our AI-powered platform helps you turn ideas into viral content that brings joy to millions.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                GiggleGen was born from a simple observation: creating great memes shouldn't require 
                design skills or hours of work. We believed everyone had the potential to be funny, 
                they just needed the right tools.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Founded in 2024 by a team of AI researchers and comedy enthusiasts, we've helped 
                over 100,000 creators generate millions of memes that have brought laughter to 
                people around the world.
              </p>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  Join Our Community
                </Button>
              </Link>
            </div>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 text-center"
              >
                <Sparkles className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  5M+ Memes Generated
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  And counting! Our community creates amazing content every day.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              What Makes Us Special
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Cutting-edge technology meets creative expression
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
                >
                  <Card className="h-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              The creative minds behind GiggleGen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who are already making the internet a funnier place.
          </p>
          <Link to="/register">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold rounded-full"
            >
              Get Started Free
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
