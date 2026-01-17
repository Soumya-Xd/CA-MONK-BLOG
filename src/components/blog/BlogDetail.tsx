import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Share2, User } from 'lucide-react';
import { Blog } from '@/types/blog';
import { formatDate, getReadTime } from '@/lib/utils';

interface BlogDetailProps {
  blog: Blog;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    FINANCE: 'bg-blue-100 text-blue-800',
    TECH: 'bg-green-100 text-green-800',
    CAREER: 'bg-purple-100 text-purple-800',
    REGULATIONS: 'bg-orange-100 text-orange-800',
    SKILLS: 'bg-pink-100 text-pink-800',
    TECHNOLOGY: 'bg-indigo-100 text-indigo-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <div className="h-full overflow-y-auto">
      <Card className="border-0 shadow-none">
        {/* Cover Image */}
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.category.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className={getCategoryColor(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(blog.date)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {getReadTime(blog.content)} min read
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              CA Monk Team
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-lg text-gray-700 font-medium">
              {blog.description}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {blog.content}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                © 2024 CA Monk. All rights reserved.
              </div>
{/* Author Section */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <img
  src="https://img.icons8.com/color/96/company.png"
  alt="Author Logo"
  className="w-12 h-12 rounded-full object-contain bg-white p-1 border"
/>



            <div>
              <p className="text-sm text-gray-500">Published by</p>
              <p className="font-semibold text-gray-900">
                CA Monk Team
              </p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};