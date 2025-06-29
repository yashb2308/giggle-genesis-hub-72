
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSettings from '../components/settings/UserSettings';
import { 
  Sparkles, 
  Image, 
  Upload, 
  TrendingUp, 
  Users, 
  Heart, 
  Zap,
  BarChart3,
  Calendar,
  Settings,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Generate Meme',
      description: 'Create a new meme with AI',
      icon: Sparkles,
      path: '/generate',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-900/20'
    },
    {
      title: 'Browse Templates',
      description: 'Explore meme templates',
      icon: Image,
      path: '/templates',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-900/20'
    },
    {
      title: 'Upload Template',
      description: 'Add your own template',
      icon: Upload,
      path: '/upload-template',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-900/20'
    },
    {
      title: 'Batch Generate',
      description: 'Create multiple memes',
      icon: Zap,
      path: '/generate-batch',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-900/20'
    }
  ];

  const stats = [
    { label: 'Memes Created', value: '127', icon: Sparkles, color: 'text-blue-400' },
    { label: 'Templates Used', value: '43', icon: Image, color: 'text-emerald-400' },
    { label: 'Total Likes', value: '1.2K', icon: Heart, color: 'text-red-400' },
    { label: 'Views', value: '8.5K', icon: Users, color: 'text-purple-400' }
  ];

  const recentActivity = [
    { action: 'Generated meme', template: 'Drake Pointing', time: '2 hours ago' },
    { action: 'Uploaded template', template: 'Custom Template', time: '1 day ago' },
    { action: 'Liked meme', template: 'Distracted Boyfriend', time: '2 days ago' },
    { action: 'Batch generated', template: '5 memes', time: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-lg text-slate-400">
            Ready to create some amazing memes today?
          </p>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} to={action.path}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${action.bgColor} rounded-xl p-6 border border-slate-700 hover:border-slate-600 hover:shadow-lg transition-all duration-200 cursor-pointer`}
                    >
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {action.description}
                      </p>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    <span>Your Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-center p-4 bg-slate-700 rounded-lg"
                        >
                          <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                          <div className="text-2xl font-bold text-white">
                            {stat.value}
                          </div>
                          <div className="text-sm text-slate-400">
                            {stat.label}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-slate-400">
                        {activity.template} • {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
