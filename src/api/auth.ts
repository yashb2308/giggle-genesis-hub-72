
import { apiClient } from './client';

export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    apiClient.post('/auth/login/', credentials),
  
  register: (userData: { username: string; email: string; password: string }) =>
    apiClient.post('/auth/register/', userData),
  
  logout: () => apiClient.post('/auth/logout/'),
};
