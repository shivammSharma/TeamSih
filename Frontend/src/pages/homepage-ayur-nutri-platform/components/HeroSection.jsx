// src/pages/homepage-ayur-nutri-platform/components/HeroSection.jsx

import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      label: "Ayurvedic Dietitians",
      icon: "UserRound",
      desc: "Design Ayurveda-compliant diet charts without starting from a blank page.",
    },
    {
      label: "Hospitals & Clinics",
      icon: "Building2",
      desc: "Standardize diet workflows across OPDs, IPDs and departments.",
    },
    {
      label: "Patients (Phase 2)",
      icon: "Smartphone",
      desc: "Receive clear, structured guidance that’s easy to follow at home.",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(
      () => setActivePersona((p) => (p + 1) % personas.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-brand-cream overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="organic-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="2"
                fill="currentColor"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#organic-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT: headline + value + mini “manual to digital” card */}
          <div
            className={`space-y-8 organic-transition duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="ShieldCheck" size={16} />
                <span>Built for Ayurvedic Hospitals</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight">
                Ayurvedic Diet Management,
                <span className="block text-primary">
                  Built for Clinical Practice
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
                Replace handwritten diet charts and generic nutrition tools with
                a platform that combines classical Ayurvedic dietary principles
                with scientifically calculated nutrients – designed for real
                hospital workflows.
              </p>
            </div>

            {/* Mini “manual → digital” strip */}
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-5 border border-border organic-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-primary">
                  From Manual Charts to Structured Workflows
                </h3>
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                {/* Left side: current reality */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="p-3 rounded-full bg-muted">
                    <Icon name="PenSquare" size={18} className="text-text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Handwritten Diet Charts
                    </p>
                    <p className="text-xs text-text-secondary">
                      Rewritten on every visit, difficult to standardize.
                    </p>
                  </div>
                </div>

                <Icon
                  name="ArrowRight"
                  size={20}
                  className="text-text-secondary flex-shrink-0"
                />

                {/* Right side: what AyurNutri gives */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon name="LayoutPanelLeft" size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Ayurveda-Aligned Digital Plans
                    </p>
                    <p className="text-xs text-text-secondary">
                      Structured, printable, and reusable across patients.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
                iconName="LogIn"
                iconPosition="left"
              >
                Sign In to Platform
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="FileText"
                iconPosition="left"
              >
                View Solution Overview
              </Button>
            </div>
          </div>

          {/* RIGHT: “who we empower” card */}
          <div
            className={`relative organic-transition duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-card rounded-3xl organic-shadow border border-border overflow-hidden">
              {/* Window header */}
              <div className="bg-primary/5 px-6 py-4 border-b border-border rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <span className="text-xs text-text-secondary">
                    AyurNutri Workspace
                  </span>
                </div>
              </div>

              <div className="px-8 py-7 space-y-6">
                {/* Title */}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-primary uppercase tracking-wide">
                    Who We Serve
                  </p>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-text-primary">
                    One Platform for the Entire
                    <span className="text-primary"> Diet Care Team</span>
                  </h3>
                  <p className="text-sm text-text-secondary max-w-md">
                    Align doctors, Ayurvedic dietitians and patients around a
                    shared, structured view of diet – without losing classical
                    principles like Rasa, Virya and Guna.
                  </p>
                </div>

                {/* Persona chips */}
                <div className="flex flex-wrap gap-3">
                  {personas.map((persona, index) => {
                    const isActive = index === activePersona;
                    return (
                      <button
                        key={persona.label}
                        type="button"
                        onClick={() => setActivePersona(index)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs sm:text-sm organic-transition ${
                          isActive
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border text-text-secondary hover:bg-muted/60"
                        }`}
                      >
                        <Icon
                          name={persona.icon}
                          size={16}
                          className={isActive ? "text-primary" : "text-text-secondary"}
                        />
                        <span>{persona.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active persona description */}
                <div className="bg-muted/40 rounded-2xl p-4 border border-border/60 organic-transition">
                  <p className="text-sm text-text-secondary">
                    {personas[activePersona].desc}
                  </p>
                </div>

                {/* Key promises */}
                <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <Icon
                      name="ClipboardList"
                      size={16}
                      className="mt-0.5 text-primary"
                    />
                    <span>Capture patient context once in a structured profile.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      name="BrainCircuit"
                      size={16}
                      className="mt-0.5 text-primary"
                    />
                    <span>Generate Ayurveda-aligned, nutritionally sound diet plans.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon
                      name="Printer"
                      size={16}
                      className="mt-0.5 text-primary"
                    />
                    <span>Print or share charts instantly for records and patients.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END RIGHT */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
