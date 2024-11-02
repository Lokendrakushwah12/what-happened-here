"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function YearPicker({
  onYearSelect,
}: {
  onYearSelect: (year: number) => void;
}) {
  const [year, setYear] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    setIsOpen(false);
    onYearSelect(selectedYear);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-between items-center rounded-xl flex bg-neutral-900 text-neutral-200 hover:text-neutral-300 hover:bg-neutral-800 border-0 w-full text-left font-normal",
            !year && "text-neutral-500"
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {year || <span>Pick a Year</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-neutral-700 rounded-xl overflow-hidden">
        <Calendar
          onSelect={handleYearSelect}
          mode="single"
          selected={year ? new Date(year, 0, 1) : undefined}
          year={year || new Date().getFullYear()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
