// components
import HeroSection from "@/components/home/HeroSection";
import PopularPosts from "@/components/home/container/MainContent/PopularPosts";

const Home = () => {
  return (
    <div className="mx-30">
      <HeroSection />
      <PopularPosts />
    </div>
  );
};

export default Home;
