"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "onSelect"
> & {
  onSelect?: (year: number) => void;
  year: number;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = false, // Hiding outside days for simplicity
  onSelect,
  year,
  ...props
}: CalendarProps) {
  const currentYear = new Date().getFullYear();
  const [displayYear, setDisplayYear] = React.useState(currentYear);

  // Sync displayYear with the selected year prop
  React.useEffect(() => {
    if (year) {
      setDisplayYear(year);
    }
  }, [year]);

  const handleYearSelect = (year: number) => {
    if (onSelect) {
      onSelect(year);
    }
  };

  const startYear = displayYear - 5; // Adjust starting year based on zoom
  const endYear = displayYear + 6; // Adjust ending year based on zoom

  return (
    <div className={cn("p-3 bg-neutral-900", className)}>
      <div className="flex justify-between items-center">
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 border-neutral-600 text-white opacity-50 hover:opacity-100"
          )}
          onClick={() => setDisplayYear(displayYear - 12)}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {/* Main Heading */}
        <span className="text-sm text-white font-medium">
          {startYear} - {endYear}
        </span>
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 border-neutral-600 text-white opacity-50 hover:opacity-100"
          )}
          onClick={() => setDisplayYear(displayYear + 12)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {Array.from({ length: 12 }, (_, i) => {
          const yrs = startYear + i;
          return (
            <button
              key={yrs}
              onClick={() => handleYearSelect(yrs)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-full text-center hover:bg-neutral-800 hover:text-white text-neutral-400 font-normal",
                yrs === year ? "bg-neutral-200 text-neutral-900" : ""
              )}
            >
              {yrs}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
