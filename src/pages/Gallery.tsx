
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memesAPI } from '../api/memes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Heart, Eye, User, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Gallery = () => {
  const [memes, setMemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async (pageNum = 1) => {
    try {
      const response = await memesAPI.getMemes({ page: pageNum, limit: 12 });
      const newMemes = response.data.results || response.data;
      
      if (pageNum === 1) {
        setMemes(newMemes);
      } else {
        setMemes(prev => [...prev, ...newMemes]);
      }
      
      setHasMore(response.data.next !== null);
      setPage(pageNum + 1);
    } catch (error) {
      toast.error('Failed to load memes');
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
      // Update the meme in the state
      setMemes(prev => prev.map(meme => 
        meme.id === memeId 
          ? { ...meme, likes_count: (meme.likes_count || 0) + 1, is_liked: !meme.is_liked }
          : meme
      ));
      toast.success('Meme liked!');
    } catch (error) {
      toast.error('Failed to like meme');
    }
  };

  const loadMore = () => {
    fetchMemes(page);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Meme Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the funniest memes created by our community
          </p>
        </motion.div>

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
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {memes.map((meme, index) => (
                <motion.div
                  key={meme.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                    <Link to={`/memes/${meme.id}`}>
                      <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={meme.image_url || meme.image}
                          alt={meme.caption || 'Meme'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Overlay stats */}
                        <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                <span>{meme.likes_count || 0}</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{meme.views_count || 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {meme.caption && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                            "{meme.caption}"
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <User className="h-3 w-3 mr-1" />
                            <span>{meme.author?.username || 'Anonymous'}</span>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLike(meme.id)}
                            className={`p-1 h-auto ${meme.is_liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                          >
                            <Heart className={`h-4 w-4 ${meme.is_liked ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                        
                        {meme.created_at && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(meme.created_at).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className="text-center mt-12">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Load More Memes
                </Button>
              </div>
            )}
          </>
        )}

        {!isLoading && memes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No memes yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Be the first to create and share a meme!
            </p>
            <Link to="/generate">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Create Your First Meme
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
