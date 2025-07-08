import React from "react";

// components
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />

      {/* 메인 콘텐츠 */}
      <main>{children}</main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Layout;
