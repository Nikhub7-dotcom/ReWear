import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IndianRupee, ShieldCheck, User, ArrowLeft, Heart, Share2, Leaf, Droplets, Wind, Scale, Maximize } from "lucide-react";
import { motion } from "motion/react";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
      <div className="animate-pulse text-stone-400 font-bold">Loading Item Intelligence...</div>
    </div>
  );
  
  if (!item) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
      <div className="text-stone-500 font-bold">Item not found.</div>
    </div>
  );

  const placeholderUrl = item ? `https://placehold.co/800x1000/f5f5f4/1c1917?text=${item.category}` : "";
  const displayImage = item?.image_url || placeholderUrl;

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/browse" className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Circular Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm"
            >
              <img
                src={displayImage}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderUrl;
                }}
              />
            </motion.div>
          </div>

          {/* Right: Item Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-900/30">
                  {item.category}
                </span>
                <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {item.condition}
                </span>
                <span className="px-3 py-1 bg-stone-900 dark:bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400 dark:text-white" />
                  Trust: {item.trust_score}%
                </span>
                {item.sustainability_grade && (
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-200 dark:border-amber-900/30 flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    {item.sustainability_grade}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-4">{item.name}</h1>
              <div className="flex items-center text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                <IndianRupee className="h-8 w-8" />
                <span>{item.price}</span>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800">
                <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center shadow-sm">
                  <User className="h-6 w-6 text-stone-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">{item.seller_name}</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">Verified Circular Seller</div>
                </div>
                <div className="ml-auto">
                  <ShieldCheck className="h-6 w-6 text-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-stone-100 dark:border-stone-800 rounded-2xl">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Brand</div>
                  <div className="text-stone-900 dark:text-white font-medium">{item.brand || "Unbranded"}</div>
                </div>
                <div className="p-4 border border-stone-100 dark:border-stone-800 rounded-2xl">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Size</div>
                  <div className="text-stone-900 dark:text-white font-medium">{item.size || "M"}</div>
                </div>
                <div className="p-4 border border-stone-100 dark:border-stone-800 rounded-2xl">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Usage</div>
                  <div className="text-stone-900 dark:text-white font-medium">{item.months_used} Months</div>
                </div>
                <div className="p-4 border border-stone-100 dark:border-stone-800 rounded-2xl">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Gender</div>
                  <div className="text-stone-900 dark:text-white font-medium">{item.gender}</div>
                </div>
              </div>
            </div>

            {/* Sustainability Impact */}
            <div className="bg-stone-900 dark:bg-stone-900/50 rounded-3xl p-8 text-white mb-10 border border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold uppercase tracking-widest text-sm">Sustainability Impact</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="text-xl font-bold text-cyan-400">{item.water_saved?.toLocaleString() || "0"}L</div>
                  <div className="text-[8px] text-stone-400 uppercase tracking-widest">Water Saved</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-blue-400">{item.co2_prevented || "0"}kg</div>
                  <div className="text-[8px] text-stone-400 uppercase tracking-widest">CO₂ Prevented</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-emerald-400">{item.waste_diverted || "0"}g</div>
                  <div className="text-[8px] text-stone-400 uppercase tracking-widest">Waste Diverted</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-amber-400">+{item.lifecycle_extended || "0"}m</div>
                  <div className="text-[8px] text-stone-400 uppercase tracking-widest">Lifecycle</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-5 bg-stone-900 dark:bg-emerald-600 text-white rounded-2xl font-bold text-xl hover:bg-stone-800 dark:hover:bg-emerald-700 transition-all shadow-xl shadow-stone-200 dark:shadow-none active:scale-[0.98]">
                Buy Now
              </button>
              <button className="p-5 border border-stone-200 dark:border-stone-800 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                <Heart className="h-6 w-6 text-stone-600 dark:text-stone-400" />
              </button>
              <button className="p-5 border border-stone-200 dark:border-stone-800 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                <Share2 className="h-6 w-6 text-stone-600 dark:text-stone-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
