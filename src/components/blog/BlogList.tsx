import { BlogCard } from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText } from "lucide-react";
import { Blog } from "@/types/blog";

interface BlogListProps {
  blogs: Blog[];
  selectedBlogId?: number;
  onSelectBlog: (blog: Blog) => void;
  isLoading?: boolean;
  error?: Error | null;
}

/* -------- Skeleton -------- */
const BlogSkeleton = () => (
  <div className="space-y-3 p-4 border rounded-lg bg-white">
    <div className="flex gap-2">
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-5 w-20 rounded-full" />
    </div>
    <Skeleton className="h-5 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-24" />
  </div>
);

/* -------- Blog List -------- */
export const BlogList = ({
  blogs,
  selectedBlogId,
  onSelectBlog,
  isLoading,
  error,
}: BlogListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, index) => (
          <BlogSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-1" />
          <div>
            <AlertTitle>Error loading blogs</AlertTitle>
            <AlertDescription>
              Something went wrong while fetching blogs. Please try again
              later.
            </AlertDescription>
          </div>
        </Alert>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
        <div className="w-14 h-14 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <FileText className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          No blogs available
        </h3>
        <p className="text-sm">
          Once blogs are added, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 overflow-y-auto">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="transition-all duration-200 hover:scale-[1.01]"
        >
          <BlogCard
            blog={blog}
            isActive={selectedBlogId === blog.id}
            onClick={() => onSelectBlog(blog)}
          />
        </div>
      ))}
    </div>
  );
};
