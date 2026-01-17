import { Blog, CreateBlogRequest } from '@/types/blog';

const API_BASE_URL = 'http://localhost:3001';

export const blogApi = {
  async getAllBlogs(): Promise<Blog[]> {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return response.json();
  },

  async getBlogById(id: number): Promise<Blog> {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    return response.json();
  },

  async createBlog(blog: CreateBlogRequest): Promise<Blog> {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...blog,
        date: new Date().toISOString(),
        id: Date.now(), // Simple ID generation for demo
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    return response.json();
  },
};