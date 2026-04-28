import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sprout } from "lucide-react";

const navLinks = [
  { href: "/grants", label: "Grant Finder" },
  { href: "/grants#discover", label: "Discover" },
  { href: "/grants#pipeline", label: "My Pipeline" },
  { href: "/grants#draft", label: "Draft Application" },
];

const HarvestTouchNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border/50" />

      <nav className="container-custom relative z-10">
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/grants" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-base text-foreground">
                Harvest Touch
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wide uppercase">
                CIC · Grant Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop nav pills */}
          <div className="hidden lg:flex items-center gap-1">
            <span className="text-xs text-muted-foreground px-3">
              Rochdale, Greater Manchester
            </span>
            <div className="w-px h-4 bg-border mx-1" />
            <a
              href="mailto:hello@harvesttouch.org.uk"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              hello@harvesttouch.org.uk
            </a>
          </div>

          {/* CTA badge */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-400">
                {new Date().getFullYear()} Grants Active
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden relative z-50 bg-background border-b border-border"
          >
            <div className="container-custom px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === "/grants"
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">
                    {new Date().getFullYear()} Grant Season Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HarvestTouchNavbar;
