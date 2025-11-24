// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// import Select from '../../../components/ui/Select';

// const InteractiveTools = () => {
//   const [activeTab, setActiveTab] = useState('compatibility');
//   const [compatibilityResult, setCompatibilityResult] = useState(null);
//   const [assessmentStep, setAssessmentStep] = useState(1);
//   const [assessmentData, setAssessmentData] = useState({});

//   const tools = [
//     {
//       id: 'compatibility',
//       name: 'Food Compatibility Calculator',
//       icon: 'Calculator',
//       description: 'Check how different foods interact according to Ayurvedic principles'
//     },
//     {
//       id: 'seasonal',
//       name: 'Seasonal Wellness Guide',
//       icon: 'Calendar',
//       description: 'Get personalized recommendations based on current season and your dosha'
//     },
//     {
//       id: 'assessment',
//       name: 'Constitutional Assessment',
//       icon: 'User',
//       description: 'Discover your unique dosha constitution through guided questions'
//     }
//   ];

//   const foodOptions = [
//     { value: 'milk', label: 'Milk' },
//     { value: 'banana', label: 'Banana' },
//     { value: 'honey', label: 'Honey' },
//     { value: 'yogurt', label: 'Yogurt' },
//     { value: 'fish', label: 'Fish' },
//     { value: 'chicken', label: 'Chicken' },
//     { value: 'rice', label: 'Rice' },
//     { value: 'lemon', label: 'Lemon' },
//     { value: 'ghee', label: 'Ghee' },
//     { value: 'spinach', label: 'Spinach' }
//   ];

//   const seasonOptions = [
//     { value: 'spring', label: 'Spring (March-May)' },
//     { value: 'summer', label: 'Summer (June-August)' },
//     { value: 'autumn', label: 'Autumn (September-November)' },
//     { value: 'winter', label: 'Winter (December-February)' }
//   ];

//   const checkCompatibility = (food1, food2) => {
//     const incompatibleCombinations = {
//       'milk-banana': {
//         compatible: false,
//         reason: 'Milk and banana have different digestion times and can create toxins (ama)',
//         recommendation: 'Consume separately with 2-3 hours gap'
//       },
//       'milk-fish': {
//         compatible: false,
//         reason: 'Combining milk with fish can disturb digestive fire and create imbalances',
//         recommendation: 'Avoid this combination completely'
//       },
//       'honey-ghee': {
//         compatible: true,
//         reason: 'When used in equal proportions, this combination is beneficial for health',
//         recommendation: 'Use in 1:1 ratio for maximum benefits'
//       },
//       'yogurt-fish': {
//         compatible: false,
//         reason: 'Both are heavy to digest and can create excessive kapha',
//         recommendation: 'Consume separately or avoid combination'
//       }
//     };

//     const key1 = `${food1}-${food2}`;
//     const key2 = `${food2}-${food1}`;
    
//     return incompatibleCombinations?.[key1] || incompatibleCombinations?.[key2] || {
//       compatible: true,
//       reason: 'This combination is generally safe according to Ayurvedic principles',
//       recommendation: 'Enjoy in moderation as part of a balanced diet'
//     };
//   };

//   const getSeasonalGuidance = (season, dosha = 'vata') => {
//     const guidance = {
//       spring: {
//         vata: {
//           focus: 'Detoxification and renewal',
//           foods: ['Light, warm foods', 'Bitter greens', 'Spices like turmeric', 'Warm water'],
//           avoid: ['Heavy, oily foods', 'Excessive sweets', 'Cold drinks'],
//           lifestyle: ['Early morning exercise', 'Dry brushing', 'Meditation']
//         }
//       },
//       summer: {
//         vata: {
//           focus: 'Cooling and hydration',
//           foods: ['Sweet, cooling foods', 'Fresh fruits', 'Coconut water', 'Mint tea'],
//           avoid: ['Spicy foods', 'Excessive heat', 'Alcohol'],
//           lifestyle: ['Avoid midday sun', 'Swimming', 'Cool environments']
//         }
//       }
//     };

//     return guidance?.[season]?.[dosha] || {
//       focus: 'Seasonal balance',
//       foods: ['Seasonal, local foods', 'Warm, cooked meals'],
//       avoid: ['Processed foods', 'Excessive cold'],
//       lifestyle: ['Regular routine', 'Adequate rest']
//     };
//   };

//   const FoodCompatibilityTool = () => {
//     const [food1, setFood1] = useState('');
//     const [food2, setFood2] = useState('');

//     const handleCheck = () => {
//       if (food1 && food2) {
//         const result = checkCompatibility(food1, food2);
//         setCompatibilityResult(result);
//       }
//     };

//     return (
//       <div className="space-y-6">
//         <div className="grid sm:grid-cols-2 gap-4">
//           <Select
//             label="First Food"
//             options={foodOptions}
//             value={food1}
//             onChange={setFood1}
//             placeholder="Select first food"
//           />
//           <Select
//             label="Second Food"
//             options={foodOptions}
//             value={food2}
//             onChange={setFood2}
//             placeholder="Select second food"
//           />
//         </div>
//         <div className="text-center">
//           <Button 
//             onClick={handleCheck}
//             disabled={!food1 || !food2}
//             iconName="Search"
//             iconPosition="left"
//           >
//             Check Compatibility
//           </Button>
//         </div>
//         {compatibilityResult && (
//           <div className={`p-6 rounded-xl border-2 ${
//             compatibilityResult?.compatible 
//               ? 'bg-success/10 border-success/30' :'bg-warning/10 border-warning/30'
//           }`}>
//             <div className="flex items-center space-x-3 mb-4">
//               <Icon 
//                 name={compatibilityResult?.compatible ? "CheckCircle" : "AlertTriangle"} 
//                 size={24}
//                 className={compatibilityResult?.compatible ? "text-success" : "text-warning"}
//               />
//               <h4 className="text-lg font-semibold text-primary">
//                 {compatibilityResult?.compatible ? "Compatible Combination" : "Incompatible Combination"}
//               </h4>
//             </div>
//             <p className="text-text-secondary mb-3">{compatibilityResult?.reason}</p>
//             <div className="bg-background/50 p-3 rounded-lg">
//               <span className="font-medium text-primary">Recommendation: </span>
//               <span className="text-text-secondary">{compatibilityResult?.recommendation}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const SeasonalWellnessTool = () => {
//     const [selectedSeason, setSelectedSeason] = useState('');
//     const [guidance, setGuidance] = useState(null);

//     const handleGetGuidance = () => {
//       if (selectedSeason) {
//         const result = getSeasonalGuidance(selectedSeason);
//         setGuidance(result);
//       }
//     };

//     return (
//       <div className="space-y-6">
//         <Select
//           label="Current Season"
//           options={seasonOptions}
//           value={selectedSeason}
//           onChange={setSelectedSeason}
//           placeholder="Select current season"
//         />
//         <div className="text-center">
//           <Button 
//             onClick={handleGetGuidance}
//             disabled={!selectedSeason}
//             iconName="Compass"
//             iconPosition="left"
//           >
//             Get Seasonal Guidance
//           </Button>
//         </div>
//         {guidance && (
//           <div className="bg-gradient-to-br from-brand-cream to-brand-ivory rounded-xl p-6 border border-brand-gold/20">
//             <h4 className="text-lg font-semibold text-primary mb-4 flex items-center">
//               <Icon name="Target" size={20} className="mr-2" />
//               {guidance?.focus}
//             </h4>
            
//             <div className="grid sm:grid-cols-2 gap-6">
//               <div>
//                 <h5 className="font-medium text-success mb-2 flex items-center">
//                   <Icon name="Plus" size={16} className="mr-1" />
//                   Recommended Foods
//                 </h5>
//                 <div className="space-y-1">
//                   {guidance?.foods?.map((food, index) => (
//                     <div key={index} className="text-sm text-text-secondary bg-success/10 px-2 py-1 rounded">
//                       {food}
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h5 className="font-medium text-error mb-2 flex items-center">
//                   <Icon name="Minus" size={16} className="mr-1" />
//                   Foods to Avoid
//                 </h5>
//                 <div className="space-y-1">
//                   {guidance?.avoid?.map((food, index) => (
//                     <div key={index} className="text-sm text-text-secondary bg-error/10 px-2 py-1 rounded">
//                       {food}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <h5 className="font-medium text-primary mb-2 flex items-center">
//                 <Icon name="Heart" size={16} className="mr-1" />
//                 Lifestyle Recommendations
//               </h5>
//               <div className="flex flex-wrap gap-2">
//                 {guidance?.lifestyle?.map((tip, index) => (
//                   <span key={index} className="text-sm bg-brand-sage/20 text-primary px-3 py-1 rounded-full">
//                     {tip}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const ConstitutionalAssessment = () => {
//     const questions = [
//       {
//         id: 'body_frame',
//         question: 'How would you describe your body frame?',
//         options: [
//           { value: 'vata', label: 'Thin, light, small-boned' },
//           { value: 'pitta', label: 'Medium, well-proportioned' },
//           { value: 'kapha', label: 'Large, heavy, big-boned' }
//         ]
//       },
//       {
//         id: 'appetite',
//         question: 'How is your appetite typically?',
//         options: [
//           { value: 'vata', label: 'Variable, sometimes forget to eat' },
//           { value: 'pitta', label: 'Strong, get irritable when hungry' },
//           { value: 'kapha', label: 'Steady, can skip meals easily' }
//         ]
//       },
//       {
//         id: 'sleep',
//         question: 'How would you describe your sleep pattern?',
//         options: [
//           { value: 'vata', label: 'Light sleeper, wake up easily' },
//           { value: 'pitta', label: 'Moderate sleep, wake up refreshed' },
//           { value: 'kapha', label: 'Deep sleeper, hard to wake up' }
//         ]
//       }
//     ];

//     const handleAnswer = (questionId, answer) => {
//       setAssessmentData(prev => ({
//         ...prev,
//         [questionId]: answer
//       }));
//     };

//     const calculateResult = () => {
//       const scores = { vata: 0, pitta: 0, kapha: 0 };
//       Object.values(assessmentData)?.forEach(answer => {
//         scores[answer]++;
//       });
      
//       const dominant = Object.keys(scores)?.reduce((a, b) => 
//         scores?.[a] > scores?.[b] ? a : b
//       );
      
//       return dominant;
//     };

//     const getResult = () => {
//       const result = calculateResult();
//       const descriptions = {
//         vata: {
//           name: 'Vata Constitution',
//           traits: 'Creative, energetic, quick-thinking',
//           recommendations: 'Focus on warm, grounding foods and regular routines'
//         },
//         pitta: {
//           name: 'Pitta Constitution',
//           traits: 'Organized, focused, strong digestion',
//           recommendations: 'Choose cooling foods and avoid excessive heat'
//         },
//         kapha: {
//           name: 'Kapha Constitution',
//           traits: 'Calm, stable, strong immunity',
//           recommendations: 'Prefer light, spicy foods and regular exercise'
//         }
//       };
      
//       return descriptions?.[result];
//     };

//     if (assessmentStep > questions?.length) {
//       const result = getResult();
//       return (
//         <div className="text-center space-y-6">
//           <div className="bg-gradient-to-br from-brand-gold/10 to-brand-sage/10 rounded-xl p-8 border border-brand-gold/20">
//             <Icon name="Award" size={48} className="text-brand-gold mx-auto mb-4" />
//             <h4 className="text-2xl font-display font-semibold text-primary mb-3">
//               {result?.name}
//             </h4>
//             <p className="text-text-secondary mb-4">{result?.traits}</p>
//             <div className="bg-background/50 p-4 rounded-lg">
//               <span className="font-medium text-primary">Personalized Recommendation: </span>
//               <span className="text-text-secondary">{result?.recommendations}</span>
//             </div>
//           </div>
//           <div className="flex justify-center space-x-4">
//             <Button 
//               onClick={() => {
//                 setAssessmentStep(1);
//                 setAssessmentData({});
//               }}
//               variant="outline"
//               iconName="RotateCcw"
//               iconPosition="left"
//             >
//               Retake Assessment
//             </Button>
//             <Button 
//               iconName="Download"
//               iconPosition="left"
//             >
//               Download Report
//             </Button>
//           </div>
//         </div>
//       );
//     }

//     const currentQuestion = questions?.[assessmentStep - 1];

//     return (
//       <div className="space-y-6">
//         <div className="text-center mb-6">
//           <div className="flex justify-center space-x-2 mb-4">
//             {questions?.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-3 h-3 rounded-full ${
//                   index < assessmentStep ? 'bg-brand-gold' : 'bg-border'
//                 }`}
//               />
//             ))}
//           </div>
//           <p className="text-sm text-text-secondary">
//             Question {assessmentStep} of {questions?.length}
//           </p>
//         </div>
//         <div className="bg-background rounded-xl p-6 organic-shadow">
//           <h4 className="text-lg font-semibold text-primary mb-4">
//             {currentQuestion?.question}
//           </h4>
          
//           <div className="space-y-3">
//             {currentQuestion?.options?.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   handleAnswer(currentQuestion?.id, option?.value);
//                   setAssessmentStep(prev => prev + 1);
//                 }}
//                 className="w-full text-left p-4 rounded-lg border border-border hover:border-brand-sage hover:bg-brand-sage/5 organic-transition"
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-4 h-4 rounded-full border-2 border-brand-sage"></div>
//                   <span className="text-text-secondary">{option?.label}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderActiveTab = () => {
//     switch (activeTab) {
//       case 'compatibility':
//         return <FoodCompatibilityTool />;
//       case 'seasonal':
//         return <SeasonalWellnessTool />;
//       case 'assessment':
//         return <ConstitutionalAssessment />;
//       default:
//         return <FoodCompatibilityTool />;
//     }
//   };

//   return (
//     <div className="bg-background rounded-2xl organic-shadow">
//       <div className="p-6 border-b border-border">
//         <h2 className="text-2xl font-display font-semibold text-primary mb-3">
//           Interactive Learning Tools
//         </h2>
//         <p className="text-text-secondary">
//           Experience Ayurvedic principles through hands-on tools that provide personalized insights.
//         </p>
//       </div>
//       {/* Tab Navigation */}
//       <div className="border-b border-border">
//         <div className="flex overflow-x-auto">
//           {tools?.map((tool) => (
//             <button
//               key={tool?.id}
//               onClick={() => setActiveTab(tool?.id)}
//               className={`flex items-center space-x-3 px-6 py-4 border-b-2 organic-transition whitespace-nowrap ${
//                 activeTab === tool?.id
//                   ? 'border-brand-gold text-primary bg-brand-gold/5' :'border-transparent text-text-secondary hover:text-primary hover:bg-muted/30'
//               }`}
//             >
//               <Icon name={tool?.icon} size={18} />
//               <div className="text-left">
//                 <div className="font-medium">{tool?.name}</div>
//                 <div className="text-xs opacity-70">{tool?.description}</div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Tab Content */}
//       <div className="p-6">
//         {renderActiveTab()}
//       </div>
//     </div>
//   );
// };

// export default InteractiveTools;




import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import foodData from '../../../data/foodData.json'; // <-- corrected path

/**
 * InteractiveTools (updated)
 * - Uses a richer food database (foodData.json)
 * - Computes a compatibility score with breakdown and recommendations
 */

const InteractiveTools = () => {
  const [activeTab, setActiveTab] = useState('compatibility');
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({});

  const foodOptions = foodData.map(f => ({ value: f.value, label: f.label, attrs: f.attrs }));

  const seasonOptions = [
    { value: 'spring', label: 'Spring (March-May)' },
    { value: 'summer', label: 'Summer (June-August)' },
    { value: 'autumn', label: 'Autumn (September-November)' },
    { value: 'winter', label: 'Winter (December-February)' }
  ];

  const computeCompatibilityScore = (aAttrs, bAttrs) => {
    const weights = {
      digestionTimeDiff: 0.30,
      viryaOpposition: 0.25,
      heavinessSum: 0.20,
      doshaConflict: 0.15,
      specialPatterns: 0.10
    };

    let score = 100;
    const breakdown = [];

    const dtDiff = Math.abs((aAttrs.digestionTime || 90) - (bAttrs.digestionTime || 90));
    const dtPenalty = Math.min(1, dtDiff / 240) * 100 * weights.digestionTimeDiff;
    score -= dtPenalty;
    breakdown.push({ factor: 'digestionTime', weight: -dtPenalty, explanation: `Digestion times differ by ${dtDiff} minutes` });

    const viryaOpposition = (aAttrs.virya !== bAttrs.virya) && (aAttrs.virya !== 'neutral' && bAttrs.virya !== 'neutral');
    if (viryaOpposition) {
      const vPenalty = 100 * weights.viryaOpposition;
      score -= vPenalty;
      breakdown.push({ factor: 'viryaOpposition', weight: -vPenalty, explanation: `${aAttrs.virya} vs ${bAttrs.virya} (opposing thermal effects)` });
    } else {
      breakdown.push({ factor: 'viryaOpposition', weight: 0, explanation: 'No major heating/cooling opposition' });
    }

    const heavinessSum = (aAttrs.heaviness || 2) + (bAttrs.heaviness || 2);
    const heavinessPenalty = Math.max(0, (heavinessSum - 6) / 8) * 100 * weights.heavinessSum;
    score -= heavinessPenalty;
    breakdown.push({ factor: 'heaviness', weight: -heavinessPenalty, explanation: `Combined heaviness score ${heavinessSum}` });

    let doshaPenalty = 0;
    if (aAttrs.dominantDosha === 'kapha' && bAttrs.dominantDosha === 'kapha') {
      doshaPenalty = 100 * weights.doshaConflict * 0.9;
      breakdown.push({ factor: 'doshaConflict', weight: -doshaPenalty, explanation: 'Both foods increase kapha — risk of heaviness/ama' });
    } else if (aAttrs.dominantDosha === bAttrs.dominantDosha) {
      doshaPenalty = 100 * weights.doshaConflict * 0.4;
      breakdown.push({ factor: 'doshaSimilarity', weight: -doshaPenalty, explanation: `Both foods lean ${aAttrs.dominantDosha}` });
    } else {
      breakdown.push({ factor: 'dosha', weight: 0, explanation: 'No major dosha conflict' });
    }
    score -= doshaPenalty;

    // special pattern: honey + ghee -> small bonus
    let specialAdjustment = 0;
    const pair = `${aAttrs._value || ''}-${bAttrs._value || ''}`;
    if ((pair === 'honey-ghee') || (pair === 'ghee-honey')) {
      specialAdjustment = 10;
      score += specialAdjustment;
      breakdown.push({ factor: 'special', weight: +specialAdjustment, explanation: 'Honey + Ghee (in proper proportion) gives a traditional benefit' });
    }

    score = Math.max(0, Math.min(100, Math.round(score)));
    return { score, breakdown, specialAdjustment };
  };

  const checkCompatibility = (food1Value, food2Value) => {
    if (!food1Value || !food2Value) return null;
    const food1 = foodOptions.find(f => f.value === food1Value);
    const food2 = foodOptions.find(f => f.value === food2Value);
    if (!food1 || !food2) return null;

    // curated overrides (traditional rules)
    const explicit = {
      'milk-banana': {
        compatible: false,
        reason: 'Traditional texts caution against combining milk and banana due to different digestive properties leading to heaviness and possible ama.',
        recommendation: 'Consume separately, leave 2–3 hours in between.',
        score: 30
      },
      'milk-fish': {
        compatible: false,
        reason: 'Fish and milk are classically advised against by many traditions — mixing can be heating and upsetting to digestion.',
        recommendation: 'Avoid combination.',
        score: 10
      },
      'honey-ghee': {
        compatible: true,
        reason: 'Honey and ghee when clarified and used in proper proportions are described as beneficial in certain preparations.',
        recommendation: 'Use in recommended ratios (often 1:1) and avoid high heat.',
        score: 85
      }
    };
    const key1 = `${food1.value}-${food2.value}`;
    const key2 = `${food2.value}-${food1.value}`;
    if (explicit[key1] || explicit[key2]) {
      const e = explicit[key1] || explicit[key2];
      return {
        compatible: !!e.compatible,
        score: e.score,
        reason: e.reason,
        breakdown: [{ factor: 'explicitRule', weight: 0, explanation: 'Matched an explicit traditional rule' }],
        recommendation: e.recommendation,
        confidence: 0.9
      };
    }

    const aAttrs = { ...food1.attrs, _value: food1.value };
    const bAttrs = { ...food2.attrs, _value: food2.value };
    const { score, breakdown } = computeCompatibilityScore(aAttrs, bAttrs);
    const compatible = score >= 60;
    const reason = compatible
      ? 'This combination appears generally compatible based on digestion time, thermal properties and heaviness.'
      : 'This combination may create digestive imbalance (differences in digestion time or opposing thermal qualities).';

    const alternatives = [];
    if (!compatible) {
      alternatives.push('Consume separately with a 1–3 hour gap');
      if (aAttrs.virya === 'cooling' && bAttrs.virya === 'heating') {
        alternatives.push('Prefer one warming and one cooling at different meals');
      }
      if (aAttrs.heaviness + bAttrs.heaviness > 6) {
        alternatives.push('Reduce portion size or add digestive spice (e.g., ginger, fennel) after the meal');
      }
    } else {
      alternatives.push('Enjoy in moderation; keep portion sizes balanced');
    }

    const templates = [
      `${food1.label} + ${food2.label}: ${reason}`,
      `Combination of ${food1.label} and ${food2.label} — ${reason}`
    ];
    const summary = templates[Math.floor(Math.random() * templates.length)];

    return {
      compatible,
      score,
      reason: summary,
      breakdown,
      recommendation: compatible ? 'Enjoy in moderation as part of a balanced diet' : alternatives.join('; '),
      alternatives,
      confidence: 0.75
    };
  };

  // --- FoodCompatibilityTool UI ---
  const FoodCompatibilityTool = () => {
    const [food1, setFood1] = useState('');
    const [food2, setFood2] = useState('');

    const handleCheck = () => {
      if (food1 && food2) {
        const result = checkCompatibility(food1, food2);
        setCompatibilityResult(result);
      }
    };

    return (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            label="First Food"
            options={foodOptions.map(o => ({ value: o.value, label: o.label }))}
            value={food1}
            onChange={setFood1}
            placeholder="Select first food"
          />
          <Select
            label="Second Food"
            options={foodOptions.map(o => ({ value: o.value, label: o.label }))}
            value={food2}
            onChange={setFood2}
            placeholder="Select second food"
          />
        </div>
        <div className="text-center">
          <Button
            onClick={handleCheck}
            disabled={!food1 || !food2}
            iconName="Search"
            iconPosition="left"
          >
            Check Compatibility
          </Button>
        </div>
        {compatibilityResult && (
          <div className={`p-6 rounded-xl border-2 ${
            compatibilityResult?.compatible
              ? 'bg-success/10 border-success/30' :'bg-warning/10 border-warning/30'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <Icon
                name={compatibilityResult?.compatible ? "CheckCircle" : "AlertTriangle"}
                size={24}
                className={compatibilityResult?.compatible ? "text-success" : "text-warning"}
              />
              <h4 className="text-lg font-semibold text-primary">
                {compatibilityResult?.compatible ? "Compatible Combination" : "Incompatible Combination"}
              </h4>
              <div className="ml-auto text-sm font-medium">Score: {compatibilityResult.score}/100</div>
            </div>
            <p className="text-text-secondary mb-3">{compatibilityResult?.reason}</p>

            <div className="mb-3">
              <div className="text-xs font-semibold mb-1">Why (breakdown):</div>
              <ul className="text-sm space-y-1">
                {compatibilityResult.breakdown.map((b, i) => (
                  <li key={i}>• {b.explanation} ({b.weight >= 0 ? '+' : ''}{Math.round(b.weight)})</li>
                ))}
              </ul>
            </div>

            <div className="bg-background/50 p-3 rounded-lg">
              <span className="font-medium text-primary">Recommendation: </span>
              <span className="text-text-secondary">{compatibilityResult?.recommendation}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // SeasonalWellnessTool & ConstitutionalAssessment (unchanged UI logic)
  const SeasonalWellnessTool = () => {
    const [selectedSeason, setSelectedSeason] = useState('');
    const [guidance, setGuidance] = useState(null);

    const getSeasonalGuidance = (season, dosha = 'vata') => {
      const guidanceMap = {
        spring: {
          vata: {
            focus: 'Detoxification and renewal',
            foods: ['Light, warm foods', 'Bitter greens', 'Spices like turmeric', 'Warm water'],
            avoid: ['Heavy, oily foods', 'Excessive sweets', 'Cold drinks'],
            lifestyle: ['Early morning exercise', 'Dry brushing', 'Meditation']
          }
        },
        summer: {
          vata: {
            focus: 'Cooling and hydration',
            foods: ['Sweet, cooling foods', 'Fresh fruits', 'Coconut water', 'Mint tea'],
            avoid: ['Spicy foods', 'Excessive heat', 'Alcohol'],
            lifestyle: ['Avoid midday sun', 'Swimming', 'Cool environments']
          }
        }
      };
      return guidanceMap?.[season]?.[dosha] || {
        focus: 'Seasonal balance',
        foods: ['Seasonal, local foods', 'Warm, cooked meals'],
        avoid: ['Processed foods', 'Excessive cold'],
        lifestyle: ['Regular routine', 'Adequate rest']
      };
    };

    const handleGetGuidance = () => {
      if (selectedSeason) {
        const result = getSeasonalGuidance(selectedSeason);
        setGuidance(result);
      }
    };

    return (
      <div className="space-y-6">
        <Select
          label="Current Season"
          options={seasonOptions}
          value={selectedSeason}
          onChange={setSelectedSeason}
          placeholder="Select current season"
        />
        <div className="text-center">
          <Button
            onClick={handleGetGuidance}
            disabled={!selectedSeason}
            iconName="Compass"
            iconPosition="left"
          >
            Get Seasonal Guidance
          </Button>
        </div>
        {guidance && (
          <div className="bg-gradient-to-br from-brand-cream to-brand-ivory rounded-xl p-6 border border-brand-gold/20">
            <h4 className="text-lg font-semibold text-primary mb-4 flex items-center">
              <Icon name="Target" size={20} className="mr-2" />
              {guidance?.focus}
            </h4>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-success mb-2 flex items-center">
                  <Icon name="Plus" size={16} className="mr-1" />
                  Recommended Foods
                </h5>
                <div className="space-y-1">
                  {guidance?.foods?.map((food, index) => (
                    <div key={index} className="text-sm text-text-secondary bg-success/10 px-2 py-1 rounded">
                      {food}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-error mb-2 flex items-center">
                  <Icon name="Minus" size={16} className="mr-1" />
                  Foods to Avoid
                </h5>
                <div className="space-y-1">
                  {guidance?.avoid?.map((food, index) => (
                    <div key={index} className="text-sm text-text-secondary bg-error/10 px-2 py-1 rounded">
                      {food}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="font-medium text-primary mb-2 flex items-center">
                <Icon name="Heart" size={16} className="mr-1" />
                Lifestyle Recommendations
              </h5>
              <div className="flex flex-wrap gap-2">
                {guidance?.lifestyle?.map((tip, index) => (
                  <span key={index} className="text-sm bg-brand-sage/20 text-primary px-3 py-1 rounded-full">
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ConstitutionalAssessment = () => {
    const questions = [
      {
        id: 'body_frame',
        question: 'How would you describe your body frame?',
        options: [
          { value: 'vata', label: 'Thin, light, small-boned' },
          { value: 'pitta', label: 'Medium, well-proportioned' },
          { value: 'kapha', label: 'Large, heavy, big-boned' }
        ]
      },
      {
        id: 'appetite',
        question: 'How is your appetite typically?',
        options: [
          { value: 'vata', label: 'Variable, sometimes forget to eat' },
          { value: 'pitta', label: 'Strong, get irritable when hungry' },
          { value: 'kapha', label: 'Steady, can skip meals easily' }
        ]
      },
      {
        id: 'sleep',
        question: 'How would you describe your sleep pattern?',
        options: [
          { value: 'vata', label: 'Light sleeper, wake up easily' },
          { value: 'pitta', label: 'Moderate sleep, wake up refreshed' },
          { value: 'kapha', label: 'Deep sleeper, hard to wake up' }
        ]
      }
    ];

    const handleAnswer = (questionId, answer) => {
      setAssessmentData(prev => ({
        ...prev,
        [questionId]: answer
      }));
    };

    const calculateResult = () => {
      const scores = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(assessmentData)?.forEach(answer => {
        scores[answer]++;
      });

      const dominant = Object.keys(scores)?.reduce((a, b) =>
        scores?.[a] > scores?.[b] ? a : b
      );

      return dominant;
    };

    const getResult = () => {
      const result = calculateResult();
      const descriptions = {
        vata: {
          name: 'Vata Constitution',
          traits: 'Creative, energetic, quick-thinking',
          recommendations: 'Focus on warm, grounding foods and regular routines'
        },
        pitta: {
          name: 'Pitta Constitution',
          traits: 'Organized, focused, strong digestion',
          recommendations: 'Choose cooling foods and avoid excessive heat'
        },
        kapha: {
          name: 'Kapha Constitution',
          traits: 'Calm, stable, strong immunity',
          recommendations: 'Prefer light, spicy foods and regular exercise'
        }
      };

      return descriptions?.[result];
    };

    if (assessmentStep > questions?.length) {
      const result = getResult();
      return (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-brand-gold/10 to-brand-sage/10 rounded-xl p-8 border border-brand-gold/20">
            <Icon name="Award" size={48} className="text-brand-gold mx-auto mb-4" />
            <h4 className="text-2xl font-display font-semibold text-primary mb-3">
              {result?.name}
            </h4>
            <p className="text-text-secondary mb-4">{result?.traits}</p>
            <div className="bg-background/50 p-4 rounded-lg">
              <span className="font-medium text-primary">Personalized Recommendation: </span>
              <span className="text-text-secondary">{result?.recommendations}</span>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                setAssessmentStep(1);
                setAssessmentData({});
              }}
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
            >
              Retake Assessment
            </Button>
            <Button
              iconName="Download"
              iconPosition="left"
            >
              Download Report
            </Button>
          </div>
        </div>
      );
    }

    const currentQuestion = questions?.[assessmentStep - 1];

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            {questions?.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < assessmentStep ? 'bg-brand-gold' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-text-secondary">
            Question {assessmentStep} of {questions?.length}
          </p>
        </div>
        <div className="bg-background rounded-xl p-6 organic-shadow">
          <h4 className="text-lg font-semibold text-primary mb-4">
            {currentQuestion?.question}
          </h4>

          <div className="space-y-3">
            {currentQuestion?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  handleAnswer(currentQuestion?.id, option?.value);
                  setAssessmentStep(prev => prev + 1);
                }}
                className="w-full text-left p-4 rounded-lg border border-border hover:border-brand-sage hover:bg-brand-sage/5 organic-transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full border-2 border-brand-sage"></div>
                  <span className="text-text-secondary">{option?.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const tools = [
    {
      id: 'compatibility',
      name: 'Food Compatibility Calculator',
      icon: 'Calculator',
      description: 'Check how different foods interact according to Ayurvedic principles'
    },
    {
      id: 'seasonal',
      name: 'Seasonal Wellness Guide',
      icon: 'Calendar',
      description: 'Get personalized recommendations based on current season and your dosha'
    },
    {
      id: 'assessment',
      name: 'Constitutional Assessment',
      icon: 'User',
      description: 'Discover your unique dosha constitution through guided questions'
    }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'compatibility':
        return <FoodCompatibilityTool />;
      case 'seasonal':
        return <SeasonalWellnessTool />;
      case 'assessment':
        return <ConstitutionalAssessment />;
      default:
        return <FoodCompatibilityTool />;
    }
  };

  return (
    <div className="bg-background rounded-2xl organic-shadow">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-display font-semibold text-primary mb-3">
          Interactive Learning Tools
        </h2>
        <p className="text-text-secondary">
          Experience Ayurvedic principles through hands-on tools that provide personalized insights.
        </p>
      </div>

      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tools?.map((tool) => (
            <button
              key={tool?.id}
              onClick={() => setActiveTab(tool?.id)}
              className={`flex items-center space-x-3 px-6 py-4 border-b-2 organic-transition whitespace-nowrap ${
                activeTab === tool?.id
                  ? 'border-brand-gold text-primary bg-brand-gold/5' :'border-transparent text-text-secondary hover:text-primary hover:bg-muted/30'
              }`}
            >
              <Icon name={tool?.icon} size={18} />
              <div className="text-left">
                <div className="font-medium">{tool?.name}</div>
                <div className="text-xs opacity-70">{tool?.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default InteractiveTools;
