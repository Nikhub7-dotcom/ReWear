import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Sell from "./pages/Sell";
import ItemDetail from "./pages/ItemDetail";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/about" element={<About />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          
          <footer className="bg-stone-900 dark:bg-stone-950 text-white py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">EcoThrift</span>
                  </div>
                  <p className="text-stone-400 max-w-sm leading-relaxed">
                    The AI-powered circular fashion intelligence platform. 
                    Extending garment lifecycles through intelligent resale and responsible repurposing.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Marketplace</h4>
                  <ul className="space-y-4 text-stone-400">
                    <li><Link to="/browse" className="hover:text-emerald-400 transition-colors">Browse All</Link></li>
                    <li><Link to="/sell" className="hover:text-emerald-400 transition-colors">Sell Items</Link></li>
                    <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Our Impact</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Platform</h4>
                  <ul className="space-y-4 text-stone-400">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">How it Works</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Sustainability</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-stone-500 text-sm">© 2024 EcoThrift. Global Circular Fashion Intelligence.</p>
                <div className="flex gap-6">
                  <a href="#" className="text-stone-500 hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="text-stone-500 hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="text-stone-500 hover:text-white transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
