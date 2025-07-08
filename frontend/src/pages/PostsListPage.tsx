import React, { useState } from "react";
import { Eye, MessageCircle, ChevronRight, Filter } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 더미 데이터
import { mockPosts } from "@/data/posts";
const categories = [
  { id: "all", name: "전체", count: 142 },
  { id: "nextjs", name: "Next.js", count: 25 },
  { id: "react", name: "React", count: 45 },
  { id: "javascript", name: "JavaScript", count: 38 },
  { id: "typescript", name: "TypeScript", count: 22 },
  { id: "nodejs", name: "Node.js", count: 12 },
];

const PostsListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // 필터링된 게시글 (Header의 검색 기능과 별도로 카테고리 필터링만)
  const filteredPosts = mockPosts
    .filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      return matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views;
        case "comments":
          return b.comments - a.comments;
        default: // latest
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-6">
            {/* 카테고리 */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="font-semibold">카테고리</h2>
              </CardHeader>
              <CardContent className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-sm opacity-70">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* 인기 태그 */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="font-semibold">인기 태그</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "JavaScript",
                    "TypeScript",
                    "Node.js",
                    "CSS",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">📋 전체 게시글</h1>
                  <p className="text-gray-600 mt-1">
                    총{" "}
                    <span className="font-semibold">
                      {filteredPosts.length}개
                    </span>
                    의 게시글
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">최신순</SelectItem>
                      <SelectItem value="popular">인기순</SelectItem>
                      <SelectItem value="comments">댓글순</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    필터
                  </Button>
                </div>
              </div>
            </div>

            {/* 인기 게시글 섹션 */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center">
                    🔥 인기 게시글
                  </h2>
                  <button className="text-sm text-gray-500 hover:text-black flex items-center">
                    더보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPosts.slice(0, 5).map((post, index) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-md px-2 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500 w-4">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-sm">{post.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {post.comments}
                        </span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 게시글 목록 */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <span className="text-sm font-medium text-gray-500 w-6">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 hover:text-black">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-2">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </span>
                        <span className="w-12 text-right">
                          {post.createdAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  이전
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="px-2 text-gray-500">...</span>
                <Button variant="outline" size="sm">
                  24
                </Button>
                <Button variant="outline" size="sm">
                  다음
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsListPage;
