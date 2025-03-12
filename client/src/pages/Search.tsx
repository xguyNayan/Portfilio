import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import ProjectGrid from "@/components/gallery/ProjectGrid";
import type { Project } from "@shared/schema";

export default function Search() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div className="pb-16">
      <div className="sticky top-0 bg-white p-4 border-b">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            className="pl-10"
            placeholder="Search projects..."
            type="search"
          />
        </div>
      </div>
      {isLoading ? (
        <div className="p-4">Loading projects...</div>
      ) : (
        <ProjectGrid projects={projects || []} />
      )}
    </div>
  );
}
