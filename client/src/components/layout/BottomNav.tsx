import { Link, useLocation } from "wouter";
import { Home, Search, Film, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Search, path: "/search", label: "Search" },
    { icon: Film, path: "/reels", label: "Reels" },
    { icon: MessageCircle, path: "/chat", label: "Chat" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center">
      {navItems.map(({ icon: Icon, path, label }) => {
        const isActive = location === path;
        return (
          <Link key={path} href={path}>
            <a className="relative flex flex-col items-center">
              <Icon
                className={`w-6 h-6 ${
                  isActive ? "text-primary" : "text-gray-500"
                }`}
              />
              {isActive && (
                <motion.div
                  className="absolute -bottom-2 w-full h-0.5 bg-primary"
                  layoutId="bottomNav"
                />
              )}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
