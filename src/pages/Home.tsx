import { motion } from "motion/react";
import { ArrowRight, Leaf, Recycle, Globe, Zap, Heart, AlertTriangle, Droplets, Wind, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [latestItems, setLatestItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(data => setLatestItems(data.slice(0, 4)));
  }, []);

  const missionPoints = [
    {
      title: "Combat Textile Waste",
      desc: "Fast fashion leads to massive textile waste. We provide a platform to keep clothes in circulation longer.",
      icon: Recycle,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Extend Garment Life",
      desc: "Many clothes are discarded after just a few months. Resale extends garment life and reduces landfill pressure.",
      icon: Zap,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Responsible Repurposing",
      desc: "Upcycling prevents piling up of unusable clothes. We guide you on how to repurpose items that can't be resold.",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50 dark:bg-rose-900/20"
    },
    {
      title: "Size Awareness",
      desc: "Online purchases often fail due to size mismatch. We encourage smart buying to avoid unnecessary returns.",
      icon: AlertTriangle,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-stone-50 dark:bg-stone-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-100 dark:border-emerald-900/30"
            >
              <Globe className="h-4 w-4" />
              Global Circular Fashion Intelligence
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold text-stone-900 dark:text-white mb-8 tracking-tight leading-[0.9]"
            >
              Fashion that <span className="text-emerald-600">Breathes</span> Again.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-600 dark:text-stone-400 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              This platform helps extend garment lifecycle and reduce environmental footprint through intelligent resale and responsible repurposing.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/sell"
                className="px-10 py-5 bg-stone-900 dark:bg-emerald-600 text-white rounded-2xl font-bold hover:bg-stone-800 dark:hover:bg-emerald-700 transition-all shadow-2xl shadow-stone-200 dark:shadow-none flex items-center justify-center gap-2"
              >
                List Your Item
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/browse"
                className="px-10 py-5 bg-white dark:bg-stone-900 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-800 rounded-2xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-all flex items-center justify-center"
              >
                Browse Marketplace
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-stone-900 dark:text-white mb-8">Our Core Mission</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {missionPoints.map((point, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className={`w-12 h-12 ${point.bg} rounded-2xl flex items-center justify-center`}>
                      <point.icon className={`h-6 w-6 ${point.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">{point.title}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/sustainability/800/800" 
                  alt="Sustainability" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-emerald-600 text-white p-8 rounded-3xl shadow-xl max-w-xs">
                <div className="text-3xl font-bold mb-2">92M Tons</div>
                <p className="text-sm text-emerald-100">Of textile waste is produced globally every year. We are here to change that.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-stone-50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Water Saved", value: "2.4M Liters", icon: Droplets, color: "text-cyan-600" },
              { label: "CO₂ Prevented", value: "15,400 kg", icon: Wind, color: "text-blue-600" },
              { label: "Waste Diverted", value: "850 kg", icon: Package, color: "text-emerald-600" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-stone-900 p-10 rounded-3xl border border-stone-200 dark:border-stone-800 text-center shadow-sm">
                <div className="text-4xl font-bold text-stone-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Circular Intelligence Section */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-[120px] -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-600/30">
                <Zap className="h-3 w-3" />
                AI-Powered Verification
              </div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">
                Intelligent Analysis for a <span className="text-emerald-400">Waste-Free</span> Future.
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Automated Grading", desc: "Our AI analyzes condition, brand authenticity, and quality to assign a fair sustainability grade." },
                  { title: "Dynamic Pricing", desc: "Smart algorithms suggest the best price based on market demand and garment lifecycle." },
                  { title: "Impact Tracking", desc: "Every transaction calculates real-time environmental savings like water and CO₂." }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-1 h-auto bg-emerald-600 rounded-full" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                      <p className="text-stone-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-video bg-stone-800 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://picsum.photos/seed/ai-fashion/800/450" 
                  alt="AI Fashion Analysis" 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center max-w-xs">
                    <div className="text-emerald-400 font-black text-4xl mb-2">98.4%</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-stone-300">Analysis Confidence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">Latest Arrivals</h2>
              <p className="text-stone-600 dark:text-stone-400">Freshly listed items from our global community.</p>
            </div>
            <Link to="/browse" className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {latestItems.length > 0 ? (
              latestItems.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))
            ) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-stone-200 dark:bg-stone-800 aspect-[4/5] rounded-2xl" />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
