
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memesAPI } from '../api/memes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Heart, Eye, User, TrendingUp, Fire } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Trending = () => {
  const [trendingMemes, setTrendingMemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const response = await memesAPI.getTrending();
      setTrendingMemes(response.data.results || response.data);
    } catch (error) {
      toast.error('Failed to load trending memes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (memeId: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to like memes');
      return;
    }

    try {
      await memesAPI.likeMeme(memeId);
      setTrendingMemes(prev => prev.map(meme => 
        meme.id === memeId 
          ? { ...meme, likes_count: (meme.likes_count || 0) + 1, is_liked: !meme.is_liked }
          : meme
      ));
      toast.success('Meme liked!');
    } catch (error) {
      toast.error('Failed to like meme');
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Fire className="h-8 w-8 text-orange-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Trending Memes
            </h1>
            <Fire className="h-8 w-8 text-orange-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The hottest memes that are going viral right now
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {trendingMemes.map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${index < 3 ? 'lg:col-span-2' : ''}`}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative">
                  {/* Trending Badge */}
                  {index < 3 && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        #{index + 1} Trending
                      </div>
                    </div>
                  )}

                  <Link to={`/memes/${meme.id}`} className="block">
                    <div className={`${index < 3 ? 'aspect-video' : 'aspect-square'} relative overflow-hidden bg-gray-100 dark:bg-gray-800`}>
                      <img
                        src={meme.image_url || meme.image}
                        alt={meme.caption || 'Trending meme'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Stats overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center bg-black/30 rounded-full px-3 py-1">
                              <Heart className="h-4 w-4 mr-1 text-red-400" />
                              <span className="font-semibold">{meme.likes_count || 0}</span>
                            </div>
                            <div className="flex items-center bg-black/30 rounded-full px-3 py-1">
                              <Eye className="h-4 w-4 mr-1 text-blue-400" />
                              <span className="font-semibold">{meme.views_count || 0}</span>
                            </div>
                          </div>
                          <div className="flex items-center bg-black/30 rounded-full px-3 py-1">
                            <User className="h-4 w-4 mr-1" />
                            <span className="text-sm">{meme.author?.username || 'Anonymous'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {meme.caption && (
                        <p className={`text-gray-700 dark:text-gray-300 ${index < 3 ? 'text-lg' : 'text-sm'} line-clamp-2`}>
                          "{meme.caption}"
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            <span>{meme.likes_count || 0} likes</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{meme.views_count || 0} views</span>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLike(meme.id)}
                          className={`${meme.is_liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20`}
                        >
                          <Heart className={`h-4 w-4 ${meme.is_liked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && trendingMemes.length === 0 && (
          <div className="text-center py-12">
            <Fire className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No trending memes yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Be the first to create a viral meme!
            </p>
            <Link to="/generate">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Create Trending Meme
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
