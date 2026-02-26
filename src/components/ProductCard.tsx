import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { IndianRupee, Heart, Leaf } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
  condition: string;
  size: string;
  sustainability_grade?: string;
}

export default function ProductCard({ id, name, price, image_url, category, condition, size, sustainability_grade }: ProductCardProps) {
  const placeholderUrl = `https://placehold.co/800x1000/f5f5f4/1c1917?text=${category}`;
  const displayImage = image_url || placeholderUrl;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all"
    >
      <Link to={`/item/${id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderUrl;
          }}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="p-2 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-full text-stone-600 dark:text-stone-300 hover:text-red-500 transition-colors shadow-sm">
            <Heart className="h-4 w-4" />
          </button>
          {sustainability_grade && (
            <div className="p-2 bg-emerald-600/90 backdrop-blur-sm rounded-full text-white shadow-sm flex items-center justify-center" title="Sustainability Grade">
              <span className="text-[10px] font-black">{sustainability_grade.replace("Grade ", "")}</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-stone-900/80 dark:bg-emerald-600/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded">
            {condition}
          </span>
          <span className="px-2 py-1 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm text-stone-900 dark:text-white text-[10px] font-bold uppercase tracking-wider rounded border border-stone-200 dark:border-stone-700">
            {size}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <div className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider mb-1">{category}</div>
        <h3 className="font-bold text-stone-900 dark:text-white truncate mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">
            <IndianRupee className="h-4 w-4" />
            <span>{price}</span>
          </div>
          <Link
            to={`/item/${id}`}
            className="text-xs font-bold text-stone-900 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase tracking-widest"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
