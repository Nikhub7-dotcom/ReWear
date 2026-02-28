import { motion } from "motion/react";

interface ConfidenceMeterProps {
  label: string;
  value: number; // 0-1
  color?: string;
}

export default function ConfidenceMeter({ label, value, color = "bg-emerald-500" }: ConfidenceMeterProps) {
  const percentage = Math.round(value * 100);
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-bold text-stone-900">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}
