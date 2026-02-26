import { Recycle, Droplets, Wind } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Items Reused", value: "12,450+", icon: Recycle, color: "text-emerald-600" },
  { label: "CO₂ Saved", value: "45.2 Tons", icon: Wind, color: "text-blue-600" },
  { label: "Water Saved", value: "2.1M Liters", icon: Droplets, color: "text-cyan-600" },
];

export default function StatsBar() {
  return (
    <div className="bg-stone-50 border-y border-stone-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-stone-100"
            >
              <stat.icon className={`h-8 w-8 ${stat.color} mb-4`} />
              <div className="text-3xl font-bold text-stone-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-stone-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
