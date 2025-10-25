import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { TrackedItem } from "./ItemCard";
import { cn } from "@/lib/utils";

interface CampusMapProps {
  items: TrackedItem[];
  selectedItem?: string;
  onItemSelect: (id: string) => void;
}

const CampusMap = ({ items, selectedItem, onItemSelect }: CampusMapProps) => {
  const getMarkerColor = (status: TrackedItem["status"]) => {
    switch (status) {
      case "in-range":
        return "bg-success border-success shadow-[0_0_20px_rgba(34,197,94,0.5)]";
      case "last-seen":
        return "bg-warning border-warning shadow-[0_0_20px_rgba(251,146,60,0.5)]";
      case "lost":
        return "bg-destructive border-destructive shadow-[0_0_20px_rgba(239,68,68,0.5)]";
    }
  };

  // Mock positions for items (in a real app, these would come from actual coordinates)
  const getItemPosition = (index: number) => {
    const positions = [
      { top: "25%", left: "30%" },
      { top: "45%", left: "60%" },
      { top: "60%", left: "35%" },
      { top: "70%", left: "65%" },
      { top: "30%", left: "75%" },
    ];
    return positions[index % positions.length];
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-muted/50 to-muted/20 border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Campus Map</h2>
        <Badge variant="outline" className="border-border">
          Live Tracking
          <span className="ml-2 w-2 h-2 rounded-full bg-success animate-pulse-glow" />
        </Badge>
      </div>

      <div className="relative aspect-[16/10] bg-background rounded-lg border-2 border-border overflow-hidden">
        {/* Map background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="border border-foreground/20" />
            ))}
          </div>
        </div>

        {/* Building outlines (simplified representation) */}
        <div className="absolute inset-0 p-8">
          <div className="absolute top-10 left-10 w-32 h-24 border-2 border-muted-foreground/40 rounded bg-muted/20">
            <div className="text-xs text-muted-foreground p-2">Library</div>
          </div>
          <div className="absolute top-20 right-20 w-40 h-32 border-2 border-muted-foreground/40 rounded bg-muted/20">
            <div className="text-xs text-muted-foreground p-2">Academic Block</div>
          </div>
          <div className="absolute bottom-20 left-16 w-36 h-28 border-2 border-muted-foreground/40 rounded bg-muted/20">
            <div className="text-xs text-muted-foreground p-2">Student Center</div>
          </div>
          <div className="absolute bottom-16 right-24 w-32 h-36 border-2 border-muted-foreground/40 rounded bg-muted/20">
            <div className="text-xs text-muted-foreground p-2">Sports Complex</div>
          </div>
        </div>

        {/* Item markers */}
        {items.map((item, index) => {
          const position = getItemPosition(index);
          const isSelected = selectedItem === item.id;
          
          return (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
              style={position}
              onClick={() => onItemSelect(item.id)}
            >
              <div
                className={cn(
                  "relative w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300",
                  getMarkerColor(item.status),
                  isSelected ? "scale-125 ring-4 ring-primary/30" : ""
                )}
              >
                <MapPin className="w-6 h-6 text-white" />
                {item.status === "in-range" && (
                  <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-50 bg-current" />
                )}
              </div>
              
              {isSelected && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap animate-fade-in">
                  <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2">
                    <p className="text-sm font-semibold text-card-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">In Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-muted-foreground">Last Seen</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Lost</span>
        </div>
      </div>
    </Card>
  );
};

export default CampusMap;
