// components
import HeroSection from "@/components/home/HeroSection";
import PostsList from "@/components/home/container/MainContent/PostsList";
// data
import { mockPosts } from "@/data/posts";

const Home = () => {
  return (
    <div className="mx-30">
      <HeroSection />
      <PostsList
        posts={mockPosts}
        title="인기 게시글"
        icon="🔥 "
        sortBy="views"
        limit={5}
        className="mb-10"
      />
      <PostsList
        posts={mockPosts}
        title="최근 게시글"
        icon="🚀 "
        sortBy="date"
        limit={5}
      />
    </div>
  );
};

export default Home;
