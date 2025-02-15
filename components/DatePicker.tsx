"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[250px] justify-start text-left font-medium rounded-xl border border-gray-300 shadow-md transition-all hover:bg-gray-100",
            !date && "text-gray-500"
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
          {date ? format(date, "PPP") : <span className="text-gray-400">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-2 bg-white border border-gray-200 shadow-lg rounded-xl"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="rounded-lg  shadow-sm"
        />
      </PopoverContent>
    </Popover>
  );
}
