import { motion } from "motion/react";
import { Leaf, Recycle, TrendingUp, ShieldCheck, Zap, Globe, BarChart3, Users } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Textile Waste", value: "92M", unit: "Tons/Year", desc: "Global textile waste produced annually." },
    { label: "Water Usage", value: "2.7K", unit: "Liters", desc: "Water required to make just one cotton T-shirt." },
    { label: "Landfill", value: "85%", unit: "of Textiles", desc: "Percentage of all textiles that end up in landfills." }
  ];

  const features = [
    {
      title: "AI-Driven Valuation",
      desc: "Our proprietary vision models analyze fabric quality, brand value, and condition to ensure fair, data-backed pricing.",
      icon: Zap,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      title: "Trust Protocol",
      desc: "We use multi-layered verification to match user claims with AI observations, building a marketplace of integrity.",
      icon: ShieldCheck,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Circular Impact",
      desc: "Every transaction on EcoThrift extends a garment's life by an average of 2.2 years, reducing its carbon footprint by 44%.",
      icon: Recycle,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 transition-colors">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-stone-50 dark:bg-stone-900/20 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-100 dark:border-emerald-900/30"
          >
            <Globe className="h-4 w-4" />
            Our Mission: Zero Textile Waste
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-stone-900 dark:text-white mb-8 tracking-tight"
          >
            The Future of <span className="text-emerald-600">Conscious</span> Fashion.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed"
          >
            EcoThrift is more than a marketplace. It's an intelligent ecosystem designed to accelerate the transition to a circular economy through AI-powered trust and transparency.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-center"
              >
                <div className="text-5xl font-bold text-stone-900 dark:text-white mb-2">
                  {stat.value}<span className="text-2xl text-emerald-600 dark:text-emerald-400 ml-1">{stat.unit}</span>
                </div>
                <div className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">{stat.label}</div>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI Section */}
      <section className="py-24 bg-stone-900 dark:bg-stone-900/50 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why AI-Powered Thrifting?</h2>
              <div className="space-y-8">
                {features.map((f, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className={`shrink-0 w-12 h-12 ${f.bg} dark:bg-stone-800 rounded-2xl flex items-center justify-center`}>
                      <f.icon className={`h-6 w-6 ${f.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-stone-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full bg-emerald-500/10 absolute -inset-10 blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <BarChart3 className="h-6 w-6 text-emerald-400" />
                  <span className="text-sm font-bold uppercase tracking-widest">Efficiency Simulation</span>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                      <span>Resale Speed</span>
                      <span className="text-emerald-400">+340%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} className="h-full bg-emerald-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                      <span>Pricing Accuracy</span>
                      <span className="text-emerald-400">98.2%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "98%" }} className="h-full bg-emerald-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                      <span>User Trust Rate</span>
                      <span className="text-emerald-400">94%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "94%" }} className="h-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-10 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    AI-driven automation reduces the listing-to-sale time from weeks to hours by eliminating manual negotiation and pricing uncertainty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 dark:text-white mb-4">The EcoThrift Edge</h2>
            <p className="text-stone-600 dark:text-stone-400">How we compare to traditional marketplaces.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th className="py-6 px-4 text-sm font-bold text-stone-400 uppercase tracking-widest">Feature</th>
                  <th className="py-6 px-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">EcoThrift</th>
                  <th className="py-6 px-4 text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Pricing Model", e: "AI-Powered Intelligence", t: "Manual Guesswork" },
                  { f: "Verification", e: "Computer Vision Analysis", t: "None / Self-Reported" },
                  { f: "Trust System", e: "Dynamic Trust Scoring", t: "Basic Star Ratings" },
                  { f: "Sustainability", e: "Real-time Impact Tracking", t: "None" },
                  { f: "Listing Speed", e: "Instant (< 60 seconds)", t: "Manual Entry (5-10 mins)" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                    <td className="py-6 px-4 font-bold text-stone-900 dark:text-white">{row.f}</td>
                    <td className="py-6 px-4 text-emerald-600 dark:text-emerald-400 font-medium">{row.e}</td>
                    <td className="py-6 px-4 text-stone-500 dark:text-stone-400">{row.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Join the Climate-Tech Revolution.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-4 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-stone-50 transition-all shadow-xl">
              Start Selling
            </button>
            <button className="px-10 py-4 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all">
              Browse Impact
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
