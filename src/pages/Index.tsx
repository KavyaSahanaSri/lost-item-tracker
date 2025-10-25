import { useState } from "react";
import Hero from "@/components/Hero";
import ItemCard, { TrackedItem } from "@/components/ItemCard";
import CampusMap from "@/components/CampusMap";
import AddItemDialog from "@/components/AddItemDialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<string | undefined>();

  const [items, setItems] = useState<TrackedItem[]>([
    {
      id: "1",
      name: "Office Keys",
      type: "Keys",
      status: "in-range",
      lastSeen: "2 min ago",
      location: "Library, 2nd Floor",
      signalStrength: 85,
      batteryLevel: 67,
    },
    {
      id: "2",
      name: "Student ID",
      type: "ID Card",
      status: "in-range",
      lastSeen: "Just now",
      location: "Academic Block A",
      signalStrength: 92,
      batteryLevel: 89,
    },
    {
      id: "3",
      name: "Leather Wallet",
      type: "Wallet",
      status: "last-seen",
      lastSeen: "15 min ago",
      location: "Student Center",
      signalStrength: 45,
      batteryLevel: 34,
    },
    {
      id: "4",
      name: "Backpack",
      type: "Bag",
      status: "in-range",
      lastSeen: "5 min ago",
      location: "Sports Complex",
      signalStrength: 78,
      batteryLevel: 56,
    },
    {
      id: "5",
      name: "Lab Access Card",
      type: "ID Card",
      status: "lost",
      lastSeen: "2 hours ago",
      location: "Unknown",
      signalStrength: 0,
      batteryLevel: 12,
    },
  ]);

  const handleRing = (id: string) => {
    const item = items.find((i) => i.id === id);
    toast({
      title: "Ringing tracker",
      description: `${item?.name} tracker is now ringing`,
    });
  };

  const handleLocate = (id: string) => {
    setSelectedItem(id);
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
    const item = items.find((i) => i.id === id);
    toast({
      title: "Locating item",
      description: `Showing ${item?.name} on the map`,
    });
  };

  const handleAddItem = (newItem: { name: string; type: string; location: string }) => {
    const item: TrackedItem = {
      id: Date.now().toString(),
      name: newItem.name,
      type: newItem.type,
      status: "in-range",
      lastSeen: "Just now",
      location: newItem.location,
      signalStrength: 100,
      batteryLevel: 100,
    };
    setItems([...items, item]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <main id="dashboard" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Trackers</h2>
            <p className="text-muted-foreground">
              Monitor all your tracked items in real-time
            </p>
          </div>
          <AddItemDialog onAddItem={handleAddItem} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item) => (
            <div key={item.id} className="animate-fade-in">
              <ItemCard item={item} onRing={handleRing} onLocate={handleLocate} />
            </div>
          ))}
        </div>

        <div id="map" className="animate-fade-in">
          <CampusMap
            items={items}
            selectedItem={selectedItem}
            onItemSelect={setSelectedItem}
          />
        </div>
      </main>

      <footer className="bg-card border-t border-border py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 Campus Item Tracker. Powered by Bluetooth Low Energy technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
