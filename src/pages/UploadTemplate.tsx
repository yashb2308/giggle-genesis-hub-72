
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { memesAPI } from '../api/memes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, Tag } from 'lucide-react';

const UploadTemplate = () => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a template name');
      return;
    }
    
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      
      if (tags.trim()) {
        const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        formData.append('tags', JSON.stringify(tagList));
      }

      await memesAPI.uploadTemplate(formData);
      toast.success('Template uploaded successfully!');
      
      // Reset form
      setName('');
      setTags('');
      setImage(null);
      setPreview('');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to upload template');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Upload Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Share your favorite meme template with the community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5 text-purple-500" />
                Template Details
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Template Name</label>
                  <Input
                    type="text"
                    placeholder="e.g., Drake Pointing, Distracted Boyfriend"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                    disabled={isUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <Input
                    type="text"
                    placeholder="e.g., reaction, funny, popular, drake"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="h-12"
                    disabled={isUploading}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    <Tag className="inline h-3 w-3 mr-1" />
                    Help others find your template with relevant tags
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="h-12"
                      disabled={isUploading}
                    />
                    
                    {preview ? (
                      <div className="aspect-square max-w-sm mx-auto rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={preview}
                          alt="Template preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square max-w-sm mx-auto rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 dark:text-gray-400">Preview will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Template
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📝 Guidelines:</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Use high-quality images (minimum 512x512 pixels)</li>
                  <li>• Ensure the image is appropriate and meme-worthy</li>
                  <li>• Add descriptive tags to help others discover your template</li>
                  <li>• Choose a clear, recognizable name</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadTemplate;
