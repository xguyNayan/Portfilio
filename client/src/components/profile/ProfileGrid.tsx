import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, BookMarked } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProfileGridProps {
  projects: Project[];
}

export default function ProfileGrid({ projects }: ProfileGridProps) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts" className="flex items-center gap-2">
          <Grid3X3 className="w-4 h-4" />
          Posts
        </TabsTrigger>
        <TabsTrigger value="highlights" className="flex items-center gap-2">
          <BookMarked className="w-4 h-4" />
          Highlights
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="grid grid-cols-3 gap-1">
          {projects.map((project) => (
            <div key={project.id} className="aspect-square">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="highlights">
        <div className="p-4 text-center text-gray-500">
          No highlights yet
        </div>
      </TabsContent>
    </Tabs>
  );
}
