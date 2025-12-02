// src/pages/homepage-ayur-nutri-platform/components/LiveDemo.jsx

import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const LiveDemo = () => {
  const hospitalFeatures = [
    "Role-based access for doctors, dietitians and admins.",
    "Standardized diet chart templates across departments.",
    "Printable reports for OPD, IPD and discharge summaries.",
    "Future-ready for HIS / EHR integration.",
  ];

  const dietitianFeatures = [
    "Recipe-based planning with automated nutrient analysis.",
    "Reusable plan templates by condition, age group or prakriti.",
    "Support for Indian and international cuisines.",
    "Optimized for laptop and tablet usage in busy clinics.",
  ];

  const workflowSteps = [
    {
      icon: "ClipboardPen",
      title: "Intake & Capture",
      text: "Dietitian records patient context, habits, bowel movements, water intake and key clinical notes in one structured profile.",
    },
    {
      icon: "Sparkles",
      title: "Plan & Adjust",
      text: "AyurNutri suggests Ayurveda-aligned options from the food intelligence engine; dietitian refines portions and timings.",
    },
    {
      icon: "Printer",
      title: "Share & Follow-Up",
      text: "Generate a clear, printable diet chart for the patient and save the plan for future follow-ups and reporting.",
    },
  ];

  const systemFeatures = [
    {
      icon: "Lock",
      title: "Security & Compliance",
      text: "Designed with healthcare data privacy in mind and configurable to local regulations (HIPAA-like workflows).",
    },
    {
      icon: "FileChartColumn",
      title: "Reporting Tools",
      text: "Exportable, printable diet charts and summaries for patient handouts and hospital records.",
    },
    {
      icon: "PlugZap",
      title: "Integration-Ready",
      text: "API-first mindset so the platform can integrate with hospital information systems in the future.",
    },
    {
      icon: "TabletSmartphone",
      title: "Mobile-Friendly",
      text: "Responsive design that works across laptops, tablets and larger mobile devices.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-card to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 5. Built for hospitals & dietitians */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Stethoscope" size={16} />
              <span>Built for Ayurvedic Hospitals &amp; Dietitians</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              Fits the Way Your Team Already Works
            </h2>

            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              AyurNutri is not a consumer diet app. It’s a clinical tool
              designed around the realities of Ayurvedic practice – OPD rush,
              IPD rounds, and the need for clear, defensible dietary decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hospitals & clinics */}
            <div className="bg-card rounded-2xl border border-border p-6 organic-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Icon name="Building2" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary">
                    For Hospitals &amp; Clinics
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Standardize diet care across departments.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary">
                {hospitalFeatures.map((f) => (
                  <li key={f} className="flex gap-2 items-start">
                    <Icon
                      name="Check"
                      size={14}
                      className="mt-0.5 text-primary"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dietitians */}
            <div className="bg-card rounded-2xl border border-border p-6 organic-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Icon
                    name="Utensils"
                    size={20}
                    className="text-secondary"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary">
                    For Ayurvedic Dietitians
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Faster planning without losing nuance.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary">
                {dietitianFeatures.map((f) => (
                  <li key={f} className="flex gap-2 items-start">
                    <Icon
                      name="Check"
                      size={14}
                      className="mt-0.5 text-primary"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 6. Workflow timeline */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="Workflow" size={16} />
              <span>How It Fits Into Your Workflow</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
              From Intake to Follow-Up in Three Steps
            </h3>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
              AyurNutri doesn’t replace the practitioner. It captures their
              reasoning, keeps it consistent, and makes it faster to repeat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.title}
                className="relative bg-card rounded-2xl border border-border p-6 organic-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon
                      name={step.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <span className="text-xs text-text-secondary">
                    Step {idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-text-primary mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-text-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Security, reporting, future-ready + CTA band */}
        <div className="space-y-10">
          <div className="grid md:grid-cols-4 gap-6">
            {systemFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl border border-border p-5"
              >
                <div className="p-2 rounded-lg bg-muted inline-flex mb-3">
                  <Icon
                    name={feature.icon}
                    size={18}
                    className="text-primary"
                  />
                </div>
                <h4 className="text-sm font-semibold text-text-primary mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs text-text-secondary">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* CTA band above footer */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 organic-shadow">
            <div>
              <h3 className="text-lg font-display font-semibold text-text-primary mb-1">
                Ready to move beyond handwritten diet charts?
              </h3>
              <p className="text-sm text-text-secondary max-w-xl">
                Bring AyurNutri into your Ayurvedic hospital or clinic and
                standardize diet care without losing the depth of classical
                practice.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Talk to the Team
              </Button>
              <Button
                variant="outline"
                iconName="LogIn"
                iconPosition="left"
              >
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
