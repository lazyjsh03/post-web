import type { Post } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";

interface PostsListProps {
  posts?: Post[];
  title: string;
  icon: string;
  sortBy: "views" | "date";
  limit?: number;
  className?: string;
}

const PostsList = ({
  posts = [],
  title,
  icon,
  sortBy,
  limit = 5,
  className,
}: PostsListProps) => {
  // posts가 없거나 빈 배열일 때 처리
  if (!posts || posts.length === 0) {
    return (
      <Card className={`shadow-sm ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {icon} {title}
            </span>
            <Button variant="ghost" size="sm">
              더보기 →
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-gray-500">
          게시글이 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon} {title}
          </span>
          <Button variant="ghost" size="sm">
            더보기 →
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {(() => {
          const sortedPosts = posts
            .sort((a, b) => {
              if (sortBy === "views") {
                return b.views - a.views;
              } else {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              }
            })
            .slice(0, limit);

          return sortedPosts.map((post, index) => (
            <div key={post.id}>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <Badge variant="outline" className="text-xs">
                  {index + 1}
                </Badge>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{post.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span>👁️ {post.views}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              {index < sortedPosts.length - 1 && <Separator className="my-2" />}
            </div>
          ));
        })()}
      </CardContent>
    </Card>
  );
};

export default PostsList;
