import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MapPin, Signal, Edit, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type ItemStatus = "in-range" | "last-seen" | "lost";

export interface TrackedItem {
  id: string;
  name: string;
  type: string;
  status: ItemStatus;
  lastSeen: string;
  location: string;
  signalStrength: number;
  batteryLevel: number;
}

interface ItemCardProps {
  item: TrackedItem;
  onRing: (id: string) => void;
  onLocate: (id: string) => void;
}

const ItemCard = ({ item, onRing, onLocate }: ItemCardProps) => {
  const statusConfig = {
    "in-range": {
      label: "In Range",
      color: "bg-success text-success-foreground",
      dotColor: "bg-success",
    },
    "last-seen": {
      label: "Last Seen",
      color: "bg-warning text-warning-foreground",
      dotColor: "bg-warning",
    },
    lost: {
      label: "Lost",
      color: "bg-destructive text-destructive-foreground",
      dotColor: "bg-destructive",
    },
  };

  const config = statusConfig[item.status];
  const signalBars = Math.ceil((item.signalStrength / 100) * 4);

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-gradient-to-br from-card to-card/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-card-foreground">{item.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {item.type}
            </Badge>
          </div>
          <Badge className={cn("text-xs font-medium", config.color)}>
            <span className={cn("w-2 h-2 rounded-full mr-2 animate-pulse-glow", config.dotColor)} />
            {config.label}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="text-foreground font-medium">{item.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Signal className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-muted-foreground mb-1">Signal Strength</p>
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-3 w-2 rounded-sm transition-colors",
                    i < signalBars ? "bg-primary" : "bg-muted"
                  )}
                  style={{ height: `${(i + 1) * 3 + 6}px` }}
                />
              ))}
              <span className="ml-2 text-xs font-medium text-foreground">
                {item.signalStrength}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
          <span className="text-muted-foreground">Last seen</span>
          <span className="text-foreground font-medium">{item.lastSeen}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Battery</span>
          <span className="text-foreground font-medium">{item.batteryLevel}%</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => onRing(item.id)}
          disabled={item.status === "lost"}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Bell className="w-4 h-4 mr-2" />
          Ring
        </Button>
        <Button
          onClick={() => onLocate(item.id)}
          variant="outline"
          className="flex-1 border-border hover:bg-accent/10"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Locate
        </Button>
      </div>
    </Card>
  );
};

export default ItemCard;
