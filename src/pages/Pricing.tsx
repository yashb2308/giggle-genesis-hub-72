
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Zap,
      color: 'from-slate-500 to-slate-600',
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
      color: 'from-blue-600 to-indigo-600',
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
      color: 'from-purple-600 to-pink-600',
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

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to premium features until the end of your billing period.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
    },
    {
      question: 'Is there a free trial for premium plans?',
      answer: 'Yes! All premium plans come with a 7-day free trial. No credit card required to start.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Absolutely! You can change your plan at any time from your account settings. Changes take effect immediately.'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Simple, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your meme creation needs. All plans include access to our AI-powered 
            meme generator and community features.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${plan.popular ? 'transform scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <Card className={`h-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${plan.popular ? 'ring-2 ring-blue-600 shadow-xl' : 'hover:shadow-lg'} transition-all duration-200`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full mb-4 mx-auto`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                        {plan.name}
                      </CardTitle>
                      <p className="text-slate-600 dark:text-slate-400">
                        {plan.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-bold text-slate-900 dark:text-white">
                            {plan.price}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400 ml-2">
                            {plan.period}
                          </span>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-slate-600 dark:text-slate-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-4">
                        <Link to="/register">
                          <Button 
                            className={`w-full ${
                              plan.popular 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
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

      {/* Features Comparison */}
      <section className="py-20 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Choose GiggleGen?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              More than just a meme generator
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                Lightning Fast
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Generate memes in seconds with our optimized AI technology
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                Premium Quality
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                High-resolution exports and professional-grade templates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                Always Improving
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Regular updates with new features and template additions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-3 text-slate-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {faq.answer}
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
            Join thousands of creators and start making amazing memes today!
          </p>
          <Link to="/register">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold rounded-full"
            >
              Start Your Free Trial
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Pricing;
