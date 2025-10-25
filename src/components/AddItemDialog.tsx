import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddItemDialogProps {
  onAddItem: (item: { name: string; type: string; location: string }) => void;
}

const AddItemDialog = ({ onAddItem }: AddItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !location) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddItem({ name, type, location });
    
    toast({
      title: "Item added successfully",
      description: `${name} is now being tracked`,
    });

    // Reset form
    setName("");
    setType("");
    setLocation("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Add New Tracker</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Register a new Bluetooth tracker to monitor your belongings
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-card-foreground">Item Name</Label>
              <Input
                id="name"
                placeholder="e.g., My Keys"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-input bg-background text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-card-foreground">Item Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className="border-input bg-background text-foreground">
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Keys">Keys</SelectItem>
                  <SelectItem value="ID Card">ID Card</SelectItem>
                  <SelectItem value="Wallet">Wallet</SelectItem>
                  <SelectItem value="Bag">Bag</SelectItem>
                  <SelectItem value="Phone">Phone</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location" className="text-card-foreground">Last Known Location</Label>
              <Input
                id="location"
                placeholder="e.g., Library, 2nd Floor"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-input bg-background text-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Add Tracker
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
