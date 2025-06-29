
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { memesAPI } from '../api/memes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Heart, Eye, User, Calendar, Download, Share2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MemeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [meme, setMeme] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      fetchMeme();
    }
  }, [id]);

  const fetchMeme = async () => {
    try {
      const response = await memesAPI.getMeme(Number(id));
      setMeme(response.data);
    } catch (error) {
      toast.error('Failed to load meme');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like memes');
      return;
    }

    try {
      await memesAPI.likeMeme(Number(id));
      setMeme((prev: any) => ({
        ...prev,
        likes_count: (prev.likes_count || 0) + 1,
        is_liked: !prev.is_liked
      }));
      toast.success('Meme liked!');
    } catch (error) {
      toast.error('Failed to like meme');
    }
  };

  const handleDownload = () => {
    if (meme?.image_url) {
      const link = document.createElement('a');
      link.href = meme.image_url;
      link.download = `meme-${meme.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Meme downloaded!');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share && meme) {
      try {
        await navigator.share({
          title: `Check out this meme: ${meme.caption || 'Funny meme'}`,
          text: meme.caption,
          url: url,
        });
      } catch (error) {
        navigator.clipboard.writeText(url);
        toast.success('Meme URL copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Meme URL copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!meme) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meme Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            This meme might have been deleted or the link is incorrect.
          </p>
          <Link to="/memes">
            <Button>Back to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link to="/memes">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Meme Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                <img
                  src={meme.image_url || meme.image}
                  alt={meme.caption || 'Meme'}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </motion.div>

          {/* Meme Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {meme.caption && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Caption
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        "{meme.caption}"
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="h-5 w-5 text-red-500 mr-1" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {meme.likes_count || 0}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="h-5 w-5 text-blue-500 mr-1" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {meme.views_count || 0}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                    </div>
                  </div>

                  {/* Author & Date */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Created by <span className="font-semibold">{meme.author?.username || 'Anonymous'}</span>
                      </span>
                    </div>
                    
                    {meme.created_at && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {new Date(meme.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  {meme.template && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Template Used
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {meme.template.name}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleLike}
                className={`w-full h-12 ${
                  meme.is_liked 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
              >
                <Heart className={`mr-2 h-4 w-4 ${meme.is_liked ? 'fill-current' : ''}`} />
                {meme.is_liked ? 'Liked!' : 'Like this Meme'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="h-12"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="h-12"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MemeDetail;
