import { motion } from "motion/react";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface TrustScoreBarProps {
  score: number;
}

export default function TrustScoreBar({ score }: TrustScoreBarProps) {
  const isLow = score < 70;
  const colorClass = isLow ? "bg-amber-500" : "bg-emerald-500";
  const textColorClass = isLow ? "text-amber-600" : "text-emerald-600";
  const Icon = isLow ? ShieldAlert : ShieldCheck;

  return (
    <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${textColorClass}`} />
          <span className="text-xs font-bold text-stone-900 uppercase tracking-widest">Listing Trust Score</span>
        </div>
        <span className={`text-sm font-bold ${textColorClass}`}>{score}/100</span>
      </div>
      <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className={`h-full ${colorClass}`}
        />
      </div>
      {isLow && (
        <p className="mt-2 text-[10px] text-amber-600 font-medium leading-tight">
          Your listing trust score has decreased due to data mismatch.
        </p>
      )}
    </div>
  );
}
