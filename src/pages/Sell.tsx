import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, X, Sparkles, IndianRupee, CheckCircle2, Loader2, 
  AlertCircle, Shirt, ShieldAlert, Zap, Tag, Info, 
  ArrowRight, Leaf, Droplets, Wind, Scale, User, 
  ShieldCheck, Camera, Sun, Maximize, Scissors, ShoppingBag, 
  Palette, Recycle, Trash2, Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyzeClothingImage } from "../services/aiAnalysisService";
import { calculatePrice } from "../services/pricingEngine";
import { calculateTrustScore } from "../services/trustScoreEngine";
import { calculateSustainabilityImpact } from "../services/sustainabilityCalculator";
import ConfidenceMeter from "../components/ConfidenceMeter";
import TrustScoreBar from "../components/TrustScoreBar";
import UploadInstructions from "../components/UploadInstructions";
import { AIAnalysis, Gender, TrustScoreResult, SustainabilityMetrics } from "../types";

export default function Sell() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Instructions, 2: Upload & Details, 3: AI Analysis & Pricing
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [trustResult, setTrustResult] = useState<TrustScoreResult | null>(null);
  const [sustainability, setSustainability] = useState<SustainabilityMetrics | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "Tops",
    gender: "Men" as Gender,
    size: "" as any, // Mandatory
    condition: "Good",
    brand: "",
    monthsUsed: 6,
    price: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAiAnalysis(null);
        setTrustResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAI = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // 1. AI Analysis
      const analysis = await analyzeClothingImage(image);
      setAiAnalysis(analysis);

      // Auto-fill size if detected and not already set
      if (analysis.size && !formData.size) {
        setFormData(prev => ({ ...prev, size: analysis.size }));
      }

      // 2. Trust Score Calculation
      const trust = calculateTrustScore(analysis, {
        condition: formData.condition,
        category: formData.category
      });
      setTrustResult(trust);

      // 3. Pricing Calculation
      const price = calculatePrice(analysis, formData.gender, formData.monthsUsed, trust.penaltyMultiplier);
      setFormData(prev => ({ ...prev, price }));

      // 4. Sustainability Impact
      const impact = calculateSustainabilityImpact(analysis.clothingType, analysis.lifecycleExtensionScore);
      setSustainability(impact);

      setStep(3);
    } catch (error) {
      console.error("AI Upgrade Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image || !formData.name || !formData.price || !aiAnalysis || !formData.size) return;

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        image_url: image,
        seller_name: "EcoUser01",
        seller_id: "demo_user",
        trust_score: trustResult?.score || 100,
        water_saved: sustainability?.waterSaved || 0,
        co2_prevented: sustainability?.co2Prevented || 0,
        waste_diverted: sustainability?.wasteDiverted || 0,
        landfill_prevented: sustainability?.landfillPrevented || 0,
        lifecycle_extended: sustainability?.lifecycleExtended || 0,
        sustainability_grade: aiAnalysis.sustainabilityGrade
      })
    });

    if (res.ok) {
      navigate("/browse");
    }
  };

  const isFormValid = formData.name && formData.category && formData.gender && formData.condition && formData.brand && formData.monthsUsed !== undefined && formData.size;

  const upcyclingIdeas = [
    { title: "Cleaning Cloth", icon: Trash2, desc: "Cut into squares for durable, reusable cleaning rags." },
    { title: "Tote Bag", icon: ShoppingBag, desc: "Simple sewing project to turn old shirts into bags." },
    { title: "Cushion Cover", icon: Heart, desc: "Repurpose soft fabrics into cozy home decor." },
    { title: "Fabric Art", icon: Palette, desc: "Use colorful scraps for patchwork or textile art." }
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step >= s ? "bg-emerald-600 text-white" : "bg-stone-200 dark:bg-stone-800 text-stone-500"
              }`}>
                {s}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest hidden sm:block ${
                step >= s ? "text-stone-900 dark:text-white" : "text-stone-400"
              }`}>
                {s === 1 ? "Mission" : s === 2 ? "Upload & Info" : "AI Valuation"}
              </span>
              {s < 3 && <div className="w-12 h-[2px] bg-stone-200 dark:bg-stone-800 mx-2" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-4">Join the Circular Economy</h1>
                <p className="text-stone-600 dark:text-stone-400">Our AI ensures only high-quality items are resold, maintaining platform integrity and maximizing sustainability impact.</p>
              </div>
              
              <UploadInstructions />

              <div className="flex justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-10 py-4 bg-stone-900 dark:bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-stone-800 dark:hover:bg-emerald-700 transition-all shadow-xl shadow-stone-200 dark:shadow-none"
                >
                  Start Circular Journey
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Image Section */}
              <div className="space-y-6">
                <div
                  onClick={() => !image && fileInputRef.current?.click()}
                  className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
                    image ? "border-emerald-500 bg-white dark:bg-stone-900" : "border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 hover:border-emerald-400 hover:bg-emerald-50/30"
                  }`}
                >
                  {image ? (
                    <>
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setImage(null); }}
                        className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-full text-stone-600 dark:text-stone-300 hover:text-red-500 shadow-lg"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-white dark:bg-stone-800 rounded-2xl shadow-sm flex items-center justify-center mb-4 mx-auto">
                        <Camera className="h-8 w-8 text-stone-400" />
                      </div>
                      <div className="text-stone-900 dark:text-white font-bold mb-1">Upload Item Photo</div>
                      <div className="text-stone-500 text-sm">Clear, well-lit front view</div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                
                {image && (
                  <button
                    onClick={handleRunAI}
                    disabled={loading || !isFormValid}
                    className="w-full py-5 bg-stone-900 dark:bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-stone-800 dark:hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-xl shadow-stone-200 dark:shadow-none"
                  >
                    {loading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Sparkles className="h-6 w-6 text-amber-400" />
                    )}
                    Analyze Sellability
                  </button>
                )}
              </div>

              {/* Form Section */}
              <div className="space-y-6 bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-4">Item Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Item Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Blue Denim Jeans"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Gender</label>
                      <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                        {["Men", "Women", "Unisex"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormData({ ...formData, gender: g as Gender })}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${
                              formData.gender === g ? "bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-stone-500"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm dark:text-white"
                      >
                        {["T-shirt", "Shirt", "Jeans", "Hoodie", "Jacket", "Kurti", "Tops", "Bottomwear"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Size (Mandatory)</label>
                      <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                        {["S", "M", "L", "XL"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormData({ ...formData, size: s as any })}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${
                              formData.size === s ? "bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-stone-500"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Declaration</label>
                      <select
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm dark:text-white"
                      >
                        {["New", "Like New", "Good", "Fair"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Brand Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Levi's, Zara, H&M"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Months Used</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.monthsUsed}
                        onChange={(e) => setFormData({ ...formData, monthsUsed: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && aiAnalysis && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {!aiAnalysis.isSellable ? (
                <div className="space-y-8">
                  <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 p-8 rounded-3xl text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/40 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <ShieldAlert className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">Not Suitable for Resale</h2>
                    <p className="text-stone-600 dark:text-stone-400 mb-6">
                      Our AI detected {aiAnalysis.damageStatus.toLowerCase()} and assigned it <strong>{aiAnalysis.sustainabilityGrade}</strong>. 
                      This item is not suitable for resale. Let’s explore sustainable alternatives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="px-6 py-3 bg-stone-900 dark:bg-stone-800 text-white rounded-xl font-bold flex items-center gap-2 justify-center">
                        <Recycle className="h-4 w-4" />
                        Send to Recycling Partner
                      </button>
                      <button onClick={() => setStep(2)} className="px-6 py-3 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 rounded-xl font-bold">
                        Try Another Item
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white text-center">Upcycling & Repurpose Suggestions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {upcyclingIdeas.map((idea, idx) => (
                        <div key={idx} className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md transition-all">
                          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center mb-4">
                            <idea.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <h4 className="font-bold text-stone-900 dark:text-white mb-2">{idea.title}</h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{idea.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* AI Analysis Cards */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-stone-800 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center">
                            <Shirt className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sustainability Grade</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">{aiAnalysis.sustainabilityGrade}</div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1">Lifecycle Extension</div>
                        <div className="text-sm font-bold text-stone-900 dark:text-white">+{aiAnalysis.lifecycleExtensionScore} Months</div>
                      </div>

                      <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-stone-800 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center">
                            <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Condition</span>
                        </div>
                        <div className="text-xl font-bold text-stone-900 dark:text-white mb-4">{aiAnalysis.damageStatus}</div>
                        <ConfidenceMeter label="Condition Match" value={aiAnalysis.confidenceScores.condition} color="bg-amber-500" />
                      </div>

                      <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-stone-800 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                            <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Brand</span>
                        </div>
                        <div className="text-xl font-bold text-stone-900 dark:text-white mb-4">
                          {aiAnalysis.brandTagVisible ? aiAnalysis.brandClass : "Unverified Brand"}
                        </div>
                        <ConfidenceMeter label="Brand Confidence" value={aiAnalysis.confidenceScores.brand} color="bg-blue-500" />
                      </div>

                      <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-stone-800 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
                            <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Quality</span>
                        </div>
                        <div className="text-xl font-bold text-stone-900 dark:text-white mb-4">{aiAnalysis.qualityRating}</div>
                        <ConfidenceMeter label="Quality Score" value={aiAnalysis.confidenceScores.quality} color="bg-purple-500" />
                      </div>
                    </div>

                    {/* Trust Score Bar */}
                    {trustResult && <TrustScoreBar score={trustResult.score} />}

                    {/* Sustainability Dashboard */}
                    {sustainability && (
                      <div className="bg-stone-900 dark:bg-stone-900/50 rounded-3xl p-8 text-white border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-xl font-bold mb-1">Sustainability Impact</h3>
                            <p className="text-stone-400 text-sm">Your contribution to a circular economy</p>
                          </div>
                          <Leaf className="h-8 w-8 text-emerald-400" />
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                              <Droplets className="h-5 w-5 text-cyan-400" />
                            </div>
                            <div className="text-xl font-bold">{(sustainability.waterSaved || 0).toLocaleString()}L</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-widest">Water Saved</div>
                          </div>
                          <div className="space-y-2">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                              <Wind className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="text-xl font-bold">{sustainability.co2Prevented}kg</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-widest">CO₂ Prevented</div>
                          </div>
                          <div className="space-y-2">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                              <Scale className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div className="text-xl font-bold">{sustainability.wasteDiverted}g</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-widest">Waste Diverted</div>
                          </div>
                          <div className="space-y-2">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                              <Maximize className="h-5 w-5 text-amber-400" />
                            </div>
                            <div className="text-xl font-bold">+{sustainability.lifecycleExtended}m</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-widest">Lifecycle</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing Reveal Card */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="bg-emerald-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-200 dark:shadow-none"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="h-6 w-6 text-amber-300" />
                        <span className="text-sm font-bold uppercase tracking-widest opacity-80">AI Smart Valuation</span>
                      </div>
                      
                      <div className="mb-8">
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">AI Recommended Price (Affordable Range)</div>
                        <div className="flex items-center text-6xl font-bold">
                          <IndianRupee className="h-10 w-10" />
                          <span>{formData.price}</span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                          <p className="text-sm leading-relaxed italic opacity-90">
                            "{aiAnalysis.reasoning}"
                          </p>
                        </div>
                        {trustResult && trustResult.penaltyMultiplier < 1 && (
                          <div className="flex items-center gap-2 p-3 bg-amber-500/20 rounded-xl border border-amber-500/30 text-xs font-bold">
                            <AlertCircle className="h-4 w-4" />
                            AI confidence is low due to inconsistency. Price adjusted.
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="w-full py-5 bg-white text-emerald-600 rounded-2xl font-bold text-xl hover:bg-stone-50 transition-all shadow-lg active:scale-[0.98]"
                      >
                        Confirm & List
                      </button>
                    </motion.div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-4 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 rounded-2xl font-bold hover:bg-stone-50 dark:hover:bg-stone-900 transition-all"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
