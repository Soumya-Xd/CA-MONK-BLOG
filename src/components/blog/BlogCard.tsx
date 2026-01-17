import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { Blog } from '@/types/blog';
import { formatDate, getReadTime } from '@/lib/utils';

interface BlogCardProps {
  blog: Blog;
  isActive?: boolean;
  onClick: () => void;
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

export const BlogCard = ({ blog, isActive, onClick }: BlogCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
        isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1">
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
          <div className="flex items-center text-xs text-gray-500 ml-auto">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(blog.date)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {blog.description}
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {getReadTime(blog.content)} min read
        </div>
      </CardContent>
    </Card>
  );
};