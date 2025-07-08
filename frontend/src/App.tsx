import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt";
import PostsListPage from "./pages/PostsListPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsListPage />} />
        </Routes>
      </Layout>
      <PWAUpdatePrompt />
    </>
  );
}

export default App;
