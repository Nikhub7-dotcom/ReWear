import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, X, Leaf } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "motion/react";

export default function Browse() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [grade, setGrade] = useState("All");
  const [size, setSize] = useState("All");
  const [priceRange, setPriceRange] = useState(900);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    const matchesGrade = grade === "All" || item.sustainability_grade === grade;
    const matchesSize = size === "All" || item.size === size;
    const matchesPrice = item.price <= priceRange;
    return matchesSearch && matchesCategory && matchesGrade && matchesSize && matchesPrice;
  });

  const categories = ["All", "T-shirt", "Shirt", "Jeans", "Hoodie", "Jacket", "Kurti", "Tops", "Bottomwear"];
  const grades = ["All", "Grade A", "Grade B"];
  const sizes = ["All", "S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-2">Circular Marketplace</h1>
            <p className="text-stone-600 dark:text-stone-400">Curated high-quality pre-loved fashion with AI-verified sustainability.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search circular fashion..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-stone-900 dark:bg-emerald-600 text-white rounded-xl hover:bg-stone-800 dark:hover:bg-emerald-700 transition-colors"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 space-y-10">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-6">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                      category === cat
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold"
                        : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-6">Sustainability Grade</h3>
              <div className="space-y-3">
                {grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                      grade === g
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold"
                        : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {g !== "All" && <Leaf className="h-3 w-3" />}
                      {g}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-6">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                      size === s
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg"
                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-emerald-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest">Max Price</h3>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="0"
                max="900"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-2">
                <span>₹0</span>
                <span>₹900</span>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Modal */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-stone-900 p-8 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white">Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-6 w-6 text-stone-500" />
                    </button>
                  </div>
                  
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-6">Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${
                              category === cat
                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold"
                                : "text-stone-600 dark:text-stone-400 border border-stone-100 dark:border-stone-800"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-6">Size</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${
                              size === s
                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold"
                                : "text-stone-600 dark:text-stone-400 border border-stone-100 dark:border-stone-800"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest">Max Price</h3>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹{priceRange}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="900"
                        step="10"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full py-4 bg-stone-900 dark:bg-emerald-600 text-white rounded-xl font-bold"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-stone-100 dark:bg-stone-900 aspect-[4/5] rounded-2xl" />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-stone-50 dark:bg-stone-900/50 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800">
                <div className="text-stone-400 mb-4">No items found matching your criteria.</div>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setGrade("All");
                    setPriceRange(900);
                  }}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
