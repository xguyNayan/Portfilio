import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Story {
  id: number;
  title: string;
  image: string;
  category: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: "Resume",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    category: "document"
  },
  {
    id: 2,
    title: "Projects",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    category: "portfolio"
  },
  {
    id: 3,
    title: "Experience",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    category: "work"
  },
  {
    id: 4,
    title: "Skills",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
    category: "skills"
  }
];

export default function Stories() {
  return (
    <div className="py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4">
          {stories.map((story) => (
            <Card key={story.id} className="w-20 shrink-0">
              <div className="relative aspect-square overflow-hidden rounded-full border-2 border-primary p-0.5">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium">{story.title}</p>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}