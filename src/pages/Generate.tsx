
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { memesAPI } from '../api/memes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, Download, Share2, Wand2 } from 'lucide-react';

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error('Please enter a prompt for your meme');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await memesAPI.generate({ prompt });
      setGeneratedMeme(response.data);
      toast.success('Meme generated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to generate meme. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedMeme?.image_url) {
      const link = document.createElement('a');
      link.href = generatedMeme.image_url;
      link.download = `meme-${generatedMeme.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Meme downloaded!');
    }
  };

  const handleShare = async () => {
    if (navigator.share && generatedMeme?.image_url) {
      try {
        await navigator.share({
          title: 'Check out this meme I made!',
          text: generatedMeme.caption,
          url: generatedMeme.image_url,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(generatedMeme.image_url);
        toast.success('Meme URL copied to clipboard!');
      }
    } else if (generatedMeme?.image_url) {
      navigator.clipboard.writeText(generatedMeme.image_url);
      toast.success('Meme URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generate Your Meme
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Describe your idea and let AI create the perfect meme for you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="mr-2 h-5 w-5 text-purple-500" />
                  Meme Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="e.g., A cat wearing sunglasses saying something funny about Monday"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="h-12 text-base"
                      disabled={isGenerating}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Generating Magic...
                      </div>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Meme
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">💡 Pro Tips:</h3>
                  <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Be specific about emotions and context</li>
                    <li>• Include popular meme formats or characters</li>
                    <li>• Mention current trends or relatable situations</li>
                    <li>• Keep it funny and engaging!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Your Generated Meme</CardTitle>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
                    <p className="text-purple-600 dark:text-purple-300 font-medium">Creating your masterpiece...</p>
                  </div>
                ) : generatedMeme ? (
                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={generatedMeme.image_url}
                        alt={generatedMeme.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {generatedMeme.caption && (
                      <p className="text-center text-gray-700 dark:text-gray-300 font-medium">
                        "{generatedMeme.caption}"
                      </p>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        onClick={handleShare}
                        variant="outline"
                        className="flex-1"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Your generated meme will appear here
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
