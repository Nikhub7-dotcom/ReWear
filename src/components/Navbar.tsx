import { Link, useLocation } from "react-router-dom";
import { PlusCircle, User, Leaf, Globe, Search, Shirt } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/browse", label: "Browse", icon: Search },
    { path: "/sell", label: "Sell", icon: PlusCircle },
    { path: "/about", label: "Impact", icon: Globe },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-100 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">EcoThrift</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === item.path ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/sell" className="hidden sm:flex bg-stone-900 dark:bg-emerald-600 text-white px-6 py-3 rounded-2xl items-center gap-2 hover:bg-stone-800 dark:hover:bg-emerald-700 transition-all shadow-lg shadow-stone-200 dark:shadow-none active:scale-95 text-sm font-bold">
              <PlusCircle className="h-4 w-4" />
              List Item
            </Link>
            <Link to="/profile" className="p-3 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-2xl transition-colors border border-transparent hover:border-stone-100 dark:hover:border-stone-800">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
