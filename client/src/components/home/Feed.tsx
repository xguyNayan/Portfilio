import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Post } from "@shared/schema";

interface FeedProps {
  posts: Post[];
}

export default function Feed({ posts }: FeedProps) {
  return (
    <div className="space-y-6 p-4">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden border-none shadow-md">
          <CardHeader className="flex-row items-center gap-4 p-4">
            <Avatar className="h-10 w-10 ring-2 ring-primary">
              <AvatarImage src={post.image} alt={`${post.userId}'s avatar`} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-muted-foreground">
                Software Developer
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <img
              src={post.image}
              alt={post.caption}
              className="aspect-square w-full object-cover"
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4 p-4">
            <div className="flex w-full justify-between">
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Send className="h-6 w-6" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">{post.likes} endorsements</p>
              <p>
                <span className="font-semibold">John Doe</span>{" "}
                {post.caption}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(post.createdAt || new Date()).toLocaleDateString()}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}