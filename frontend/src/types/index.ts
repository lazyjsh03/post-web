export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  comments: number;
  category: string;
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export interface Tag {
  name: string;
  count: number;
}
