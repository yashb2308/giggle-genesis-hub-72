
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memesAPI } from '../api/memes';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Image as ImageIcon, Zap, Upload, Heart, Eye } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [userMemes, setUserMemes] = useState<any[]>([]);
  const [userTemplates, setUserTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ totalMemes: 0, totalLikes: 0, totalViews: 0 });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [memesResponse, templatesResponse] = await Promise.all([
        memesAPI.getUserMemes(),
        memesAPI.getUserTemplates(),
      ]);

      const memes = memesResponse.data.results || memesResponse.data;
      const templates = templatesResponse.data.results || templatesResponse.data;

      setUserMemes(memes);
      setUserTemplates(templates);

      // Calculate stats
      const totalLikes = memes.reduce((sum: number, meme: any) => sum + (meme.likes_count || 0), 0);
      const totalViews = memes.reduce((sum: number, meme: any) => sum + (meme.views_count || 0), 0);

      setStats({
        totalMemes: memes.length,
        totalLikes,
        totalViews,
      });
    } catch (error) {
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${color} mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      </CardContent>
    </Card>
  );

  const MemeGrid = ({ items, type }: { items: any[], type: 'memes' | 'templates' }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            {type === 'memes' ? (
              <Link to={`/memes/${item.id}`}>
                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image_url || item.image}
                    alt={item.caption || 'Meme'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ) : (
              <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={item.image_url || item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <CardContent className="p-4">
              <h3 className="font-semibold truncate text-gray-900 dark:text-white mb-2">
                {type === 'memes' ? (item.caption || 'Untitled Meme') : item.name}
              </h3>
              
              {type === 'memes' && (
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>{item.likes_count || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{item.views_count || 0}</span>
                  </div>
                </div>
              )}
              
              {type === 'templates' && item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {user?.username}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Meme Creator & Template Contributor
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <StatCard
            icon={Zap}
            title="Memes Created"
            value={stats.totalMemes}
            color="bg-gradient-to-r from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={Heart}
            title="Total Likes"
            value={stats.totalLikes}
            color="bg-gradient-to-r from-pink-500 to-red-500"
          />
          <StatCard
            icon={Eye}
            title="Total Views"
            value={stats.totalViews}
            color="bg-gradient-to-r from-purple-500 to-indigo-500"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link to="/generate">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Zap className="mr-2 h-4 w-4" />
              Generate New Meme
            </Button>
          </Link>
          <Link to="/upload-template">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Template
            </Button>
          </Link>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs defaultValue="memes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="memes" className="flex items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                My Memes ({userMemes.length})
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                My Templates ({userTemplates.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="memes">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <Card className="overflow-hidden">
                        <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                        <CardContent className="p-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : userMemes.length > 0 ? (
                <MemeGrid items={userMemes} type="memes" />
              ) : (
                <div className="text-center py-12">
                  <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No memes created yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 mb-6">
                    Start creating your first meme to see it here!
                  </p>
                  <Link to="/generate">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Create Your First Meme
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="templates">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <Card className="overflow-hidden">
                        <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                        <CardContent className="p-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : userTemplates.length > 0 ? (
                <MemeGrid items={userTemplates} type="templates" />
              ) : (
                <div className="text-center py-12">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No templates uploaded yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 mb-6">
                    Upload your first template to share with the community!
                  </p>
                  <Link to="/upload-template">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Upload Your First Template
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
