// src/pages/homepage-ayur-nutri-platform/components/PlatformShowcase.jsx

import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";

const PlatformShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const el = document.getElementById("platform-showcase");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: "PenSquare",
      title: "Manual, Time-Consuming Charts",
      text: "Diet charts are handwritten and recreated at every visit, making it hard to standardize care.",
    },
    {
      icon: "BarChart2",
      title: "Generic Nutrition Software",
      text: "Existing tools focus on macros and calories but ignore Rasa, Virya, Guna and digestibility.",
    },
    {
      icon: "FileWarning",
      title: "Fragmented Patient Information",
      text: "Diet history, bowel movements, water intake and lifestyle notes live in different systems.",
    },
    {
      icon: "FileOutput",
      title: "No Standard, Shareable Output",
      text: "It is difficult to give patients clear, printable diet charts aligned with Ayurvedic reasoning.",
    },
  ];

  const pillars = [
    {
      icon: "ClipboardList",
      title: "Patient Context Workspace",
      points: [
        "Profiles with age, gender and life stage.",
        "Diet habits, meal frequency, bowel patterns, water intake.",
        "Space for clinical notes and key health parameters.",
      ],
    },
    {
      icon: "Database",
      title: "Ayurvedic Food Intelligence Engine",
      points: [
        "Large, extensible food database for Indian & global cuisines.",
        "Calories, macros and micronutrients mapped to Rasa, Virya, Guna.",
        "Tags for hot/cold, light/heavy, easy/difficult to digest.",
      ],
    },
    {
      icon: "FileText",
      title: "Automated Diet Chart Generation",
      points: [
        "Ayurveda-compliant, nutritionally balanced plans.",
        "Recipe-based charts with automated nutrient analysis.",
        "Clear, printable outputs for doctors, dietitians and patients.",
      ],
    },
  ];

  const intelligenceBulletsLeft = [
    "Rasa (Taste) – 6 classical tastes linked to dosha impact.",
    "Virya (Potency) – Hot / cold energy of each food item.",
    "Guna (Qualities) – 20 attributes like heavy/light, dry/unctuous.",
  ];

  const intelligenceBulletsRight = [
    "Digestibility – Easy or difficult to digest classification.",
    "Meal Timing – Configurable for prakriti, age and lifestyle.",
    "Meal Structure – Breakfast / lunch / dinner aligned to Agni.",
  ];

  return (
    <section
      id="platform-showcase"
      className="py-20 bg-gradient-to-br from-muted/30 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 1. Problem section */}
        <div
          className={`organic-transition duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="AlertTriangle" size={16} />
              <span>The Reality in Ayurvedic Hospitals Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              Handwritten Diet Charts Don’t Scale
            </h2>

            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Most Ayurvedic hospitals still rely on handwritten charts and
              general-purpose nutrition tools. These approaches are slow,
              difficult to standardize and rarely respect core Ayurvedic
              concepts like Rasa, Virya, Guna and digestibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="bg-card rounded-2xl border border-border p-6 organic-shadow flex gap-4"
              >
                <div className="mt-1">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon
                      name={problem.icon}
                      size={18}
                      className="text-primary"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary mb-1">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{problem.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. What AyurNutri solves – pillars */}
        <div
          className={`organic-transition duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              What AyurNutri Solves
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A dedicated Ayurvedic Diet Management Software that respects both
              modern nutritional science and traditional Ayurvedic dietary
              principles – in a single, clinician-friendly interface.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-card rounded-2xl border border-border p-6 organic-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon
                      name={pillar.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">
                    {pillar.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex gap-2 items-start">
                      <Icon
                        name="Check"
                        size={14}
                        className="mt-0.5 text-primary"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Ayurvedic intelligence inside */}
        <div
          className={`organic-transition duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-card rounded-3xl border border-border organic-shadow p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
              <div className="max-w-md space-y-3">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  <Icon name="Leaf" size={14} />
                  <span>Ayurvedic Intelligence Inside</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-text-primary">
                  Ayurvedic Intelligence at the Core
                </h3>
                <p className="text-sm sm:text-base text-text-secondary">
                  AyurNutri does more than count calories. Every food decision
                  is informed by classical Ayurvedic properties so practitioners
                  can reason in their own language while benefiting from modern
                  nutrient data.
                </p>
              </div>

              {/* Simple icon cluster */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Atom" size={24} className="text-primary" />
                </div>
                <div className="h-10 w-10 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Icon name="Droplets" size={18} className="text-secondary" />
                </div>
                <div className="h-8 w-8 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Icon name="Sparkles" size={16} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <ul className="space-y-3 text-text-secondary">
                {intelligenceBulletsLeft.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <Icon
                      name="ChevronRight"
                      size={14}
                      className="mt-0.5 text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-text-secondary">
                {intelligenceBulletsRight.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <Icon
                      name="ChevronRight"
                      size={14}
                      className="mt-0.5 text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
