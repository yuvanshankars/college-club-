
import React, { useState } from "react";
import { useTodo } from "@/context/TodoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Trash, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const CategoryManager: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useTodo();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#9b87f5");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName, newCategoryColor);
      setNewCategoryName("");
      setNewCategoryColor("#9b87f5");
      setIsAddDialogOpen(false);
    }
  };

  const presetColors = [
    "#9b87f5", "#7E69AB", "#1EAEDB", "#D3E4FD", 
    "#ff6b6b", "#4ecdc4", "#ffd166", "#06d6a0"
  ];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="mb-4">
            Manage Categories
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Categories</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus size={16} />
              </Button>
            </div>
            
            <div className="divide-y">
              {categories.length === 0 && (
                <p className="text-sm text-muted-foreground py-2">No categories yet</p>
              )}
              
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span>{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-6 h-6 rounded-full transition-all ${
                      newCategoryColor === color 
                        ? 'ring-2 ring-offset-2 ring-primary' 
                        : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewCategoryColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryManager;
