import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Header } from "@/components/layout/Header";
import { BlogList } from "@/components/blog/BlogList";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { useBlogs } from "@/hooks/useBlogs";
import { Blog } from "@/types/blog";
import { Card } from "@/components/ui/card";
import Footer from "@/components/layout/footer";

/* ---------------- Query Client ---------------- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/* ---------------- Blog App ---------------- */
function BlogApp() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { data: blogs = [], isLoading, error } = useBlogs();

  const handleSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const handleCreateBlog = () => {
    // Query invalidation will handle refresh
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header onCreateBlog={handleCreateBlog} />

      {/* Hero Section */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CA Monk Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in finance, accounting, and
            career growth
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    
    {/* Blog List */}
    <div className="lg:col-span-5">
      <Card className="h-[calc(100vh-320px)] flex flex-col">
        <div className="p-4 border-b bg-white rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-900">
            Latest Articles
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {blogs.length} articles available
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <BlogList
            blogs={blogs}
            selectedBlogId={selectedBlog?.id}
            onSelectBlog={handleSelectBlog}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </Card>
    </div>

    {/* Blog Detail */}
    <div className="lg:col-span-7">
      <Card className="min-h-[calc(100vh-320px)]">
        {selectedBlog ? (
          <BlogDetail blog={selectedBlog} />
        ) : (
          <div className="h-full flex items-center justify-center">
            {/* empty state */}
          </div>
        )}
      </Card>
    </div>

  </div>
</main>


      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ---------------- App Wrapper ---------------- */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
