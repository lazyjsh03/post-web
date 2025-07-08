import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
      <PWAUpdatePrompt />
    </>
  );
}

export default App;
