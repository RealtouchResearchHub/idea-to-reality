import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import WhoWeHelp from "@/components/home/WhoWeHelp";
import WhatWeDo from "@/components/home/WhatWeDo";
import ProcessSection from "@/components/home/ProcessSection";
import IdeaLabPreview from "@/components/home/IdeaLabPreview";
import AIAssistantPreview from "@/components/home/AIAssistantPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import AboutPreview from "@/components/home/AboutPreview";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  const [, setIsChatOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Realtouch Research & Consulting | AI-Powered Business Solutions</title>
        <meta
          name="description"
          content="Transform your ideas into scalable, AI-powered realities. From concept to market launch, we help founders and businesses build with AI."
        />
        <meta name="keywords" content="AI consulting, business solutions, startup consulting, AI automation, digital transformation" />
      </Helmet>
      
      <Layout>
        <Hero />
        <WhoWeHelp />
        <WhatWeDo />
        <ProcessSection />
        <IdeaLabPreview />
        <AIAssistantPreview onOpenChat={() => setIsChatOpen(true)} />
        <GalleryPreview />
        <AboutPreview />
        <FinalCTA />
      </Layout>
    </>
  );
};

export default Index;
