// src/pages/homepage-ayur-nutri-platform/index.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import PlatformShowcase from "./components/PlatformShowcase";
import LiveDemo from "./components/LiveDemo";
import Footer from "./components/Footer";

// ------------ DYNAMIC HOMEPAGE CONFIG (CAN COME FROM BACKEND) ------------
const defaultHomeData = {
  hero: {
    badge: "Pioneering Ayurvedic-Nutrition Intelligence",
    headingTop: "Where Ancient Wisdom",
    highlightPrimary: "Meets Modern",
    highlightSecondary: "Precision",
    description:
      "The world's first comprehensive platform bridging Ayurvedic principles with modern nutritional science. Generate personalized diet plans that honor both clinical requirements and constitutional balance.",
    primaryCta: {
      label: "Watch Demo",
      iconName: "Stethoscope",
      href: "#live-demo",
    },
    trustIndicators: [
      { icon: "Shield", text: "HIPAA Compliant" },
      { icon: "Award", text: "Clinically Validated" },
      { icon: "Users", text: "500+ Practitioners" },
    ],
  },
  patientSnapshot: {
    name: "Shreyanshu Gupta",
    constitutionLabel: "Vata-Pitta",
    balanceScore: 85,
    dailyCalories: 3000,
    planWeeks: 12,
    progressLabel: "Constitutional Balance",
    progressStatus: "Optimizing",
    progressPercent: 75,
  },
  // You can later move these to backend too if needed
  platformShowcaseItems: null, // use defaults inside component
  liveDemoSampleResults: null, // use defaults inside component
  footer: {
    newsletterEndpoint: "http://localhost:5000/api/subscribe",
    sections: null, // use defaults inside Footer for now
    socialLinks: [],
  },
};

const HomepageAyurNutriPlatform = () => {
  const [homeData, setHomeData] = useState(defaultHomeData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // OPTIONAL: fetch dynamic config from your backend
  useEffect(() => {
    const loadHomeConfig = async () => {
      try {
        const res = await fetch("/api/homepage-config");
        if (!res.ok) return;
        const data = await res.json();

        // Merge backend data over defaults (partial overrides allowed)
        setHomeData((prev) => ({
          ...prev,
          ...data,
          hero: { ...prev.hero, ...(data.hero || {}) },
          patientSnapshot: {
            ...prev.patientSnapshot,
            ...(data.patientSnapshot || {}),
          },
          footer: { ...prev.footer, ...(data.footer || {}) },
        }));
      } catch (err) {
        console.error("Failed to load homepage config", err);
      }
    };

    // Uncomment when your API is ready
    // loadHomeConfig();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          AyurNutri - Where Ancient Wisdom Meets Modern Precision | Ayurvedic-Nutrition Intelligence Platform
        </title>
        <meta
          name="description"
          content="Revolutionary healthcare platform bridging Ayurvedic wisdom with cutting-edge nutritional science."
        />
        <meta
          name="keywords"
          content="Ayurveda, nutrition, healthcare, AI, personalized medicine, dosha"
        />
        <meta
          property="og:title"
          content="AyurNutri - Ancient Wisdom Meets Modern Precision"
        />
        <meta
          property="og:description"
          content="The world's first comprehensive platform for personalized Ayurvedic-nutrition intelligence."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage-ayur-nutri-platform" />
      </Helmet>

      <Header isHomePage={true} />

      <main className="pt-16">
        <HeroSection
          heroContent={homeData.hero}
          patientSnapshot={homeData.patientSnapshot}
        />
        <PlatformShowcase items={homeData.platformShowcaseItems} />
        <LiveDemo initialResults={homeData.liveDemoSampleResults} />
      </main>

      <Footer
        sections={homeData.footer.sections}
        socialLinks={homeData.footer.socialLinks}
        newsletterEndpoint={homeData.footer.newsletterEndpoint}
      />
    </div>
  );
};

export default HomepageAyurNutriPlatform;
