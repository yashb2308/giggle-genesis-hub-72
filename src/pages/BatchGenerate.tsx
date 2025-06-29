
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { memesAPI } from '../api/memes';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Zap, Download, Share2 } from 'lucide-react';

const BatchGenerate = () => {
  const [prompts, setPrompts] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMemes, setGeneratedMemes] = useState<any[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const promptList = prompts.split('\n').filter(p => p.trim());
    if (promptList.length === 0) {
      toast.error('Please enter at least one prompt');
      return;
    }

    if (promptList.length > 10) {
      toast.error('Maximum 10 prompts allowed at once');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await memesAPI.generateBatch({ prompts: promptList });
      setGeneratedMemes(response.data.memes || []);
      toast.success(`Generated ${response.data.memes?.length || 0} memes!`);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to generate memes');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadAll = () => {
    generatedMemes.forEach((meme, index) => {
      if (meme.image_url) {
        const link = document.createElement('a');
        link.href = meme.image_url;
        link.download = `meme-batch-${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
    toast.success('All memes downloaded!');
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Batch Meme Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Generate multiple memes at once with different prompts
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
                  <Zap className="mr-2 h-5 w-5 text-purple-500" />
                  Batch Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Enter one prompt per line:&#10;A cat wearing sunglasses&#10;A dog doing homework&#10;Monday vs Friday mood&#10;..."
                      value={prompts}
                      onChange={(e) => setPrompts(e.target.value)}
                      className="min-h-[200px] text-base"
                      disabled={isGenerating}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Enter up to 10 prompts, one per line
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Generating Batch...
                      </div>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Generate All Memes
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">💡 Batch Tips:</h3>
                  <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Each line becomes a separate meme</li>
                    <li>• Mix different emotions and contexts</li>
                    <li>• Try various popular meme formats</li>
                    <li>• Keep prompts concise but descriptive</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Memes</CardTitle>
                {generatedMemes.length > 0 && (
                  <Button
                    onClick={handleDownloadAll}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
                      <p className="text-purple-600 dark:text-purple-300 font-medium">
                        Creating your meme collection...
                      </p>
                    </div>
                  </div>
                ) : generatedMemes.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {generatedMemes.map((meme, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mb-3">
                          <img
                            src={meme.image_url}
                            alt={meme.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {meme.caption && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            "{meme.caption}"
                          </p>
                        )}
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = meme.image_url;
                              link.download = `meme-${index + 1}.jpg`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(meme.image_url);
                              toast.success('Link copied!');
                            }}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Share2 className="mr-1 h-3 w-3" />
                            Share
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Your generated memes will appear here
                    </p>
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

export default BatchGenerate;
