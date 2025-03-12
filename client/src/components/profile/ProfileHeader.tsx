import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@shared/schema";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.bio}</p>
      </div>
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <p className="font-bold">Posts</p>
          <p className="text-gray-600">0</p>
        </div>
        <div className="text-center">
          <p className="font-bold">Projects</p>
          <p className="text-gray-600">0</p>
        </div>
        <div className="text-center">
          <p className="font-bold">Skills</p>
          <p className="text-gray-600">0</p>
        </div>
      </div>
    </div>
  );
}
