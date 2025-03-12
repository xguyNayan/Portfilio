import { useQuery } from "@tanstack/react-query";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileGrid from "@/components/profile/ProfileGrid";
import type { User, Project } from "@shared/schema";

export default function Profile() {
  const userId = 1; // For demo purposes

  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoadingUser || isLoadingProjects) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="pb-16">
      <ProfileHeader user={user} />
      <ProfileGrid projects={projects || []} />
    </div>
  );
}
