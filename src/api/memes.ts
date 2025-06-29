
import { apiClient } from './client';

export const memesAPI = {
  // Templates
  getTemplates: () => apiClient.get('/templates/'),
  uploadTemplate: (formData: FormData) => 
    apiClient.post('/templates/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  // Meme generation
  generate: (data: { prompt: string; template_id?: number; size?: string }) =>
    apiClient.post('/generate/', data),
  
  generateBatch: (data: { prompts: string[]; template_id?: number }) =>
    apiClient.post('/generate-batch/', data),
  
  // Memes gallery
  getMemes: (params?: { page?: number; limit?: number }) =>
    apiClient.get('/memes/', { params }),
  
  getMeme: (id: number) => apiClient.get(`/memes/${id}/`),
  
  likeMeme: (id: number) => apiClient.post(`/memes/${id}/like/`),
  
  // Trending
  getTrending: () => apiClient.get('/trending/'),
  
  // User content
  getUserTemplates: () => apiClient.get('/user/templates/'),
  getUserMemes: () => apiClient.get('/user/memes/'),
};
