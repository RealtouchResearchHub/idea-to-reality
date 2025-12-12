import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIChatWidget from "@/components/chat/AIChatWidget";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Layout;
