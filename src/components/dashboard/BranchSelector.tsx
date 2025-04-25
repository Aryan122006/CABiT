
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Branch {
  id: string;
  name: string;
  location: string;
}

interface BranchSelectorProps {
  branches: Branch[];
  selectedBranchId: string;
  onSelect: (branchId: string) => void;
  className?: string;
}

const BranchSelector = ({ branches, selectedBranchId, onSelect, className }: BranchSelectorProps) => {
  const [open, setOpen] = useState(false);
  const selectedBranch = branches.find(branch => branch.id === selectedBranchId);

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex-1 justify-between font-normal",
              !selectedBranch && "text-muted-foreground"
            )}
          >
            {selectedBranch ? selectedBranch.name : "Select branch..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search branches..." />
            <CommandList>
              <CommandEmpty>No branches found.</CommandEmpty>
              <CommandGroup>
                {branches.map((branch) => (
                  <CommandItem
                    key={branch.id}
                    value={branch.id}
                    onSelect={() => {
                      onSelect(branch.id);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span>{branch.name}</span>
                      <span className="text-xs text-muted-foreground">{branch.location}</span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedBranchId === branch.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BranchSelector;
