import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Leaf, Droplets, Wind, Package, ShoppingBag, Settings, 
  Award, ShieldCheck, TrendingUp, Globe, Scale, Maximize,
  Edit3, Save, X
} from "lucide-react";
import SustainabilityRing from "../components/SustainabilityRing";
import { UserProfile } from "../types";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", bio: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile/demo_user");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setEditData({ name: data.name, bio: data.bio || "" });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/profile/demo_user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      });
      if (res.ok) {
        await fetchProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="animate-pulse text-stone-400 font-bold">Loading Intelligence...</div>
      </div>
    );
  }

  if (!profile) return null;

  const stats = [
    { label: "Water Saved", value: `${(profile.water_saved || 0).toLocaleString()}L`, icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20" },
    { label: "CO₂ Prevented", value: `${profile.co2_prevented || 0}kg`, icon: Wind, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Waste Diverted", value: `${((profile.waste_diverted || 0) / 1000).toFixed(1)}kg`, icon: Scale, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Lifecycle Extended", value: `${profile.lifecycle_extended || 0}m`, icon: Maximize, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-sm text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-stone-400">{profile.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-600 rounded-full border-4 border-white dark:border-stone-900 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-white" />
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-sm font-bold dark:text-white"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs dark:text-stone-400 h-20 resize-none"
                    placeholder="Tell us about your circular fashion journey..."
                  />
                  <div className="flex gap-2">
                    <button onClick={handleUpdateProfile} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                      <Save className="h-3 w-3" /> Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                      <X className="h-3 w-3" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-1">{profile.name}</h2>
                  <p className="text-stone-500 text-sm mb-4">{profile.bio || "Circular fashion enthusiast."}</p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Member since Feb 2024</p>
                  
                  <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30 mb-8">
                    <Award className="h-3 w-3" />
                    Eco-Warrior Level 4
                  </div>

                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full py-3 bg-stone-900 dark:bg-stone-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 dark:hover:bg-stone-700 transition-all"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </button>
                </>
              )}
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-sm">
              <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Account Management</h3>
              <nav className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white font-bold flex items-center gap-3">
                  <Package className="h-5 w-5 text-emerald-600" />
                  My Listings
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5" />
                  Purchase History
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  Impact Dashboard
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            {/* Sustainability Score */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-1">Sustainability Dashboard</h2>
                  <p className="text-stone-500 dark:text-stone-400">Real-time tracking of your environmental contribution.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-emerald-600 text-white rounded-full text-xs font-bold">
                  <TrendingUp className="h-4 w-4 text-emerald-400 dark:text-white" />
                  Top 5% Globally
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center justify-center">
                  <SustainabilityRing score={78} />
                  <div className="mt-4 text-center">
                    <div className="text-sm font-bold text-stone-900 dark:text-white">Impact Score</div>
                    <div className="text-xs text-stone-400">Excellent</div>
                  </div>
                </div>
                
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm"
                    >
                      <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-6`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-stone-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* My Listings */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white">My Listings</h2>
                <button className="text-sm font-bold text-emerald-600 hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Empty State */}
                <div className="col-span-full py-20 bg-white dark:bg-stone-900 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-stone-300" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">No active listings</h3>
                  <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-xs">Start selling your pre-loved clothes today and boost your impact score!</p>
                  <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 dark:shadow-none">
                    Create New Listing
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
