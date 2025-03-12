import { Bell, Send } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold" style={{ fontFamily: 'SF Pro Display, Roboto, sans-serif' }}>
          John Doe
        </h1>
        <div className="flex gap-4">
          <button className="text-black hover:text-gray-600 transition-colors duration-300">
            <Send className="w-6 h-6" />
          </button>
          <button className="text-black hover:text-gray-600 transition-colors duration-300">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}