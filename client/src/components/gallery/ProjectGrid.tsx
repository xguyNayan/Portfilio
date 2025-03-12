import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@shared/schema";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="columns-2 md:columns-3 gap-4 p-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="mb-4 break-inside-avoid"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 text-white text-center p-4">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}