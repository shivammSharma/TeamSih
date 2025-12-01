// src/utils/ayurBotEngine.js

// Example: hook this to your real evaluateCompatibility + getSeasonalGuidance
// For now I’m keeping it small so it’s easy to follow.

import { evaluateCompatibility } from "../pages/ayurvedic-intelligence-center/components/InteractiveTools";

// ^ You will create this or point it to where you moved the real function

import { getSeasonalGuidance } from "../pages/ayurvedic-intelligence-center/components/InteractiveTools";

// very naive parser: "milk with banana", "is milk and fish ok?"
function tryParseFoods(message) {
  const lower = message.toLowerCase();

  // you can expand this list with all your food values
  const knownFoods = [
    "milk", "banana", "fish", "chicken", "yogurt",
    "ghee", "rice", "lemon", "honey", "spinach"
  ];

  const found = knownFoods.filter((f) => lower.includes(f));
  if (found.length >= 2) {
    return [found[0], found[1]];
  }
  return null;
}

function tryParseSeason(message) {
  const lower = message.toLowerCase();
  if (lower.includes("summer")) return "summer";
  if (lower.includes("winter")) return "winter";
  if (lower.includes("spring")) return "spring";
  if (lower.includes("autumn") || lower.includes("fall")) return "autumn";
  return null;
}

export function getBotReply(message) {
  const trimmed = message.trim();
  if (!trimmed) {
    return "Please type a question, for example:\n- \"Is milk with banana okay?\"\n- \"What should I eat in summer?\"";
  }

  // 1) Food compatibility
  const foods = tryParseFoods(trimmed);
  if (foods) {
    const [f1, f2] = foods;
    const result = evaluateCompatibility(f1, f2); // use your real logic
    return [
      `Here’s an Ayurvedic + modern view on **${f1} + ${f2}**:`,
      "",
      `• **Summary:** ${result.summary} (score: ${result.score}/100)`,
      `• **Why:** ${result.reason}`,
      `• **Recommendation:** ${result.recommendation}`,
    ].join("\n");
  }

  // 2) Seasonal guidance
  const season = tryParseSeason(trimmed);
  if (season) {
    const guide = getSeasonalGuidance(season, "vata"); // or detect from user later
    return [
      `Seasonal guidance for **${season}**:`,
      "",
      `**Focus:** ${guide.focus}`,
      "",
      `**Foods to prefer:**`,
      ...(guide.foods || []).map((f) => `• ${f}`),
      "",
      `**Avoid:**`,
      ...(guide.avoid || []).map((f) => `• ${f}`),
      "",
      `**Lifestyle:**`,
      ...(guide.lifestyle || []).map((t) => `• ${t}`),
    ].join("\n");
  }

  // 3) Fallback
  return (
    "I can help with:\n" +
    "• Food compatibility (e.g. \"Is milk with fish okay?\")\n" +
    "• Seasonal guidance (e.g. \"What should I eat in summer?\")\n" +
    "Ask me using natural language 🙂"
  );
}
