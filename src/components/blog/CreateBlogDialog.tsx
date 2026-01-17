import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { X, Plus } from "lucide-react";
import { useCreateBlog } from "@/hooks/useBlogs";
import { CreateBlogRequest } from "@/types/blog";

interface CreateBlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CATEGORY_OPTIONS = [
  "FINANCE",
  "TECH",
  "CAREER",
  "REGULATIONS",
  "SKILLS",
  "TECHNOLOGY",
];

export const CreateBlogDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateBlogDialogProps) => {
  const [formData, setFormData] = useState<CreateBlogRequest>({
    title: "",
    category: [],
    description: "",
    coverImage: "",
    content: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const createBlogMutation = useCreateBlog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.content ||
      formData.category.length === 0
    ) {
      return;
    }

    try {
      await createBlogMutation.mutateAsync(formData);
      setFormData({
        title: "",
        category: [],
        description: "",
        coverImage: "",
        content: "",
      });
      setSelectedCategory("");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  const addCategory = () => {
    if (
      selectedCategory &&
      !formData.category.includes(selectedCategory)
    ) {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, selectedCategory],
      }));
      setSelectedCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== category),
    }));
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Create New Blog
          </AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to publish a new blog post.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Categories */}
          <div className="space-y-3 rounded-lg border p-4 bg-gray-50">
  <label className="text-sm font-medium text-gray-900">
    Categories
  </label>

  <div className="flex items-center gap-2">
    <Select
      value={selectedCategory}
      onValueChange={setSelectedCategory}
    >
      <SelectTrigger className="w-48 bg-white">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>

      {/* 🔥 IMPORTANT FIX */}
      <SelectContent className="z-[9999] bg-white">
        {CATEGORY_OPTIONS.map((category) => (
          <SelectItem
            key={category}
            value={category}
            disabled={formData.category.includes(category)}
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Button
      type="button"
      size="icon"
      onClick={addCategory}
      disabled={!selectedCategory}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>

  {/* Selected Categories */}
  {formData.category.length > 0 ? (
    <div className="flex flex-wrap gap-2 pt-2">
      {formData.category.map((cat) => (
        <Badge
          key={cat}
          variant="secondary"
          className="flex items-center gap-1 px-3 py-1 bg-white border"
        >
          {cat}
          <button
            type="button"
            onClick={() => removeCategory(cat)}
            className="ml-1 text-gray-500 hover:text-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  ) : (
    <p className="text-xs text-gray-500">
      Select one or more categories
    </p>
  )}
</div>


          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Short summary of the blog"
              rows={3}
              required
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Cover Image URL (optional)
            </label>
            <Input
              type="url"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData((p) => ({ ...p, coverImage: e.target.value }))
              }
              placeholder="https://images.pexels.com/..."
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((p) => ({ ...p, content: e.target.value }))
              }
              placeholder="Write your blog content here..."
              rows={10}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createBlogMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createBlogMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createBlogMutation.isPending
                ? "Creating..."
                : "Create Blog"}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
