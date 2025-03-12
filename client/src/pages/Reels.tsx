import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, X } from "lucide-react";

interface ProfileCard {
  id: number;
  title: string;
  description: string;
  image: string;
  location: string;
  education: string;
  experience: string[];
  skills: string[];
  spotify: {
    artists: string[];
  };
}

const profileCards: ProfileCard[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    description: "Passionate about creating beautiful, scalable applications",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
    location: "San Francisco Bay Area",
    education: "Master's in Computer Science",
    experience: [
      "Senior Developer at Tech Corp",
      "Lead Engineer at StartupX",
      "Full Stack Developer at InnovateCo"
    ],
    skills: [
      "React/Next.js",
      "Node.js/Express",
      "TypeScript",
      "PostgreSQL",
      "AWS/Cloud Architecture",
      "CI/CD & DevOps"
    ],
    spotify: {
      artists: [
        "J Balvin",
        "Post Malone",
        "Calvin Harris",
        "Marshmello",
        "Kygo"
      ]
    }
  }
];

export default function Reels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        window.location.href = "/chat";
      }, 3000);
    } else {
      setShowReject(true);
      setTimeout(() => setShowReject(false), 2000);
    }
  };

  const swipeThreshold = 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b z-10">
        <h1 className="text-xl font-semibold text-center">Meet John</h1>
      </div>

      <div className="max-w-md mx-auto pt-4 pb-24">
        <AnimatePresence>
          {showMatch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-6">It's a Match! 🎉</h2>
                  <div className="flex justify-center gap-4 mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-yellow-400">
                      <img
                        src={profileCards[currentIndex].image}
                        alt="Your profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-yellow-400">
                      <img
                        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
                        alt="Recruiter"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-300"
                    onClick={() => window.location.href = "/chat"}
                  >
                    Start Chatting
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {showReject && (
            <motion.div
              initial={{ x: -100, y: 50, opacity: 0 }}
              animate={{ 
                x: [null, 0, 20, -20, 10, -10, 0],
                y: [null, 0],
                opacity: 1 
              }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                bounce: 0.5,
                type: "spring"
              }}
              className="fixed bottom-32 left-0 right-0 z-50 flex justify-center"
            >
              <div className="bg-white rounded-full px-6 py-3 shadow-lg">
                <p className="text-lg font-medium">Hey! 👋 I'm worth a chance!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card with Side Buttons */}
        <div className="relative mx-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
            <button
              onClick={() => handleSwipe("left")}
              className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-transform duration-300 hover:scale-110"
            >
              <X className="w-8 h-8 text-red-500" />
            </button>
          </div>

          <Card className="overflow-hidden shadow-lg">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragStart={() => setDragDirection(null)}
              onDrag={(_, { offset: { x } }) => {
                setDragDirection(x > 0 ? "right" : "left");
              }}
              onDragEnd={(_, { offset: { x } }) => {
                if (Math.abs(x) > swipeThreshold) {
                  handleSwipe(x > 0 ? "right" : "left");
                }
                setDragDirection(null);
              }}
              animate={{
                rotate: dragDirection === "right" ? 5 : dragDirection === "left" ? -5 : 0,
                scale: dragDirection ? 0.95 : 1
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <div className="relative">
                <img
                  src={profileCards[currentIndex].image}
                  alt="Profile"
                  className="w-full aspect-[4/5] object-cover"
                  draggable="false"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{profileCards[currentIndex].title}</h2>
                  <p className="text-sm">{profileCards[currentIndex].location}</p>
                </div>

                {dragDirection && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`absolute top-8 right-8 transform rotate-12 px-6 py-3 rounded-lg ${
                      dragDirection === "right"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    <p className="text-2xl font-bold">{dragDirection === "right" ? "HIRE!" : "PASS"}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </Card>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
            <button
              onClick={() => handleSwipe("right")}
              className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-transform duration-300 hover:scale-110"
            >
              <Heart className="w-8 h-8 text-green-500" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-lg mx-4 mt-4 p-6 space-y-6 shadow">
          <div>
            <h3 className="text-lg font-semibold mb-2">About me</h3>
            <p className="text-gray-600">{profileCards[currentIndex].description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{profileCards[currentIndex].education}</h3>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">Experience</h3>
            </div>
            <ul className="space-y-2 ml-7">
              {profileCards[currentIndex].experience.map((exp, index) => (
                <li key={index} className="list-disc text-sm text-gray-600">
                  {exp}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileCards[currentIndex].skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Top artists on Spotify</h3>
            <div className="space-y-2">
              {profileCards[currentIndex].spotify.artists.map((artist, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-[#1DB954] rounded-full" />
                  {artist}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}