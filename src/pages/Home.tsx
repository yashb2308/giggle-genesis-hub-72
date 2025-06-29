import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Brain, 
  Users, 
  TrendingUp, 
  Zap, 
  Crown, 
  Rocket, 
  Check,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

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

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Zap,
      popular: false,
      features: [
        '10 memes per day',
        'Basic templates',
        'Standard quality',
        'Community support',
        'Basic customization'
      ]
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For regular meme creators',
      icon: Crown,
      popular: true,
      features: [
        'Unlimited memes',
        'Premium templates',
        'HD quality exports',
        'Priority support',
        'Advanced customization',
        'Batch generation',
        'Custom templates upload',
        'Analytics dashboard'
      ]
    },
    {
      name: 'Enterprise',
      price: '$29',
      period: 'per month',
      description: 'For teams and businesses',
      icon: Rocket,
      popular: false,
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Brand guidelines',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
        'White-label options'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
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

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full px-4 absolute bottom-20"
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

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
              About Academy
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
              We're on a mission to democratize creativity through AI-powered meme generation, 
              making it easy for anyone to create engaging content that resonates with audiences worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-light text-white mb-4">Our Story</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Founded in 2024, Academy emerged from a simple observation: creating viral content 
                shouldn't require years of design experience. Our team of AI researchers, designers, 
                and humor enthusiasts came together to build a platform that understands both 
                technology and comedy.
              </p>
              <p className="text-gray-400 leading-relaxed font-light">
                Today, we serve millions of creators worldwide, from social media managers to 
                casual users who just want to make their friends laugh. Our AI continuously learns 
                from trending content to help you stay ahead of the curve.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h4 className="text-xl font-light text-white mb-4">Our Values</h4>
                <ul className="space-y-3 text-gray-400 font-light">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>Creativity should be accessible to everyone</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>Technology should amplify human creativity</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>Community drives innovation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>Quality content matters</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Choose the perfect plan for your meme creation needs. All plans include access to our AI-powered generator.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${plan.popular ? 'transform scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <Card className={`h-full bg-white/5 border-white/10 ${plan.popular ? 'ring-2 ring-white' : ''} transition-all duration-200`}>
                    <CardHeader className="text-center pb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 mx-auto">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-light text-white">
                        {plan.name}
                      </CardTitle>
                      <p className="text-gray-400 font-light">
                        {plan.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-light text-white">
                            {plan.price}
                          </span>
                          <span className="text-gray-400 ml-2 font-light">
                            {plan.period}
                          </span>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                            <span className="text-gray-400 font-light">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-4">
                        <Link to="/register">
                          <Button 
                            className={`w-full font-light ${
                              plan.popular 
                                ? 'bg-white text-black hover:bg-gray-200' 
                                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                            }`}
                          >
                            {plan.name === 'Free' ? 'Get Started' : `Start ${plan.name} Trial`}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-light text-white mb-2">Email Us</h3>
                  <p className="text-gray-400 font-light">hello@academy.com</p>
                  <p className="text-gray-400 font-light">support@academy.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-light text-white mb-2">Visit Us</h3>
                  <p className="text-gray-400 font-light">
                    123 Creative Street<br />
                    Innovation District<br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-light text-white mb-2">Call Us</h3>
                  <p className="text-gray-400 font-light">+1 (555) 123-4567</p>
                  <p className="text-gray-400 font-light text-sm">Mon-Fri 9AM-6PM PST</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/10"
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent font-light"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-light text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent font-light"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-light text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent font-light resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-light">
                  Send Message
                </Button>
              </form>
            </motion.div>
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
