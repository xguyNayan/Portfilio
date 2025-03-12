import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Reel {
  id: number;
  title: string;
  description: string;
  image: string;
}

const reels: Reel[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    description: "5 years of experience building web applications",
    image: "https://images.unsplash.com/photo-1476916713558-2842194a8e49"
  },
  // Add more reels
];

export default function ReelsView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipe = (swipeDirection: number) => {
    setDirection(swipeDirection);
    setCurrentIndex((prev) => 
      swipeDirection > 0 
        ? (prev + 1) % reels.length 
        : (prev - 1 + reels.length) % reels.length
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipeThreshold = 50;
            if (Math.abs(offset.x) > swipeThreshold) {
              swipe(offset.x > 0 ? -1 : 1);
            }
          }}
          className="absolute w-full h-full"
        >
          <Card className="h-full">
            <CardContent className="p-0 h-full relative">
              <img
                src={reels[currentIndex].image}
                alt={reels[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                <h2 className="text-2xl font-bold">{reels[currentIndex].title}</h2>
                <p className="mt-2">{reels[currentIndex].description}</p>
              </div>
              <div className="absolute right-4 bottom-20 flex flex-col gap-4">
                <button className="bg-white rounded-full p-2">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => swipe(-1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={() => swipe(1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
