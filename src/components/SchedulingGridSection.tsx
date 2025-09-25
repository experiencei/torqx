import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Clock } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, i) => i);

interface SchedulingGridSectionProps {
  scheduleData: any;
  setScheduleData: (data: any) => void;
}

export function SchedulingGridSection({
  scheduleData,
  setScheduleData,
}: SchedulingGridSectionProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [timezone, setTimezone] = useState("WAT");

  const toggleSlot = (day: string, hour: number) => {
    const slotKey = `${day}-${hour}`;
    const newSelectedSlots = new Set(selectedSlots);

    if (newSelectedSlots.has(slotKey)) {
      newSelectedSlots.delete(slotKey);
    } else {
      newSelectedSlots.add(slotKey);
    }

    setSelectedSlots(newSelectedSlots);
  };

  const selectAllDay = (day: string) => {
    const newSelectedSlots = new Set(selectedSlots);
    const daySelected = hours.every((hour) =>
      selectedSlots.has(`${day}-${hour}`)
    );

    if (daySelected) {
      hours.forEach((hour) => newSelectedSlots.delete(`${day}-${hour}`));
    } else {
      hours.forEach((hour) => newSelectedSlots.add(`${day}-${hour}`));
    }

    setSelectedSlots(newSelectedSlots);
  };

  const selectAllTime = () => {
    if (selectedSlots.size === days.length * hours.length) {
      setSelectedSlots(new Set());
    } else {
      const allSlots = new Set<string>();
      days.forEach((day) => {
        hours.forEach((hour) => {
          allSlots.add(`${day}-${hour}`);
        });
      });
      setSelectedSlots(allSlots);
    }
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  return (
    <Card className="bg-background border border-border p-4 md:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
            Scheduling Grid
          </h3>
          <p className="text-sm text-muted-foreground">
            Select the days and hours when you want your ads to be displayed.
            Click on time slots to toggle selection.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="w-full sm:w-32 bg-background border border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border">
              <SelectItem value="WAT">WAT</SelectItem>
              <SelectItem value="GMT">GMT</SelectItem>
              <SelectItem value="EST">EST</SelectItem>
              <SelectItem value="PST">PST</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={selectAllTime}
            className="border border-border text-foreground hover:bg-accent"
          >
            {selectedSlots.size === days.length * hours.length
              ? "Clear All"
              : "Select All"}
          </Button>
        </div>
      </div>

      {/* Time Grid */}
      <div className="space-y-4">
        {/* Time Header */}
        <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-2">
          <div></div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-1">
            {[0, 4, 8, 12, 16, 20].map((hour) => (
              <div
                key={hour}
                className="text-xs text-muted-foreground text-center"
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>
        </div>

        {/* Day Rows */}
        {days.map((day) => {
          const daySelected = hours.every((hour) =>
            selectedSlots.has(`${day}-${hour}`)
          );
          const dayPartiallySelected = hours.some((hour) =>
            selectedSlots.has(`${day}-${hour}`)
          );

          return (
            <div
              key={day}
              className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-2 items-center"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectAllDay(day)}
                className={`justify-start text-xs md:text-sm ${
                  daySelected
                    ? "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20"
                    : dayPartiallySelected
                    ? "text-purple-500 bg-purple-25 dark:text-purple-300/90 dark:bg-purple-900/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {day}
              </Button>
              <div className="grid grid-cols-24 gap-0.5">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => toggleSlot(day, hour)}
                    className={`h-4 md:h-6 rounded-sm transition-colors ${
                      selectedSlots.has(`${day}-${hour}`)
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-accent border border-border hover:bg-muted"
                    }`}
                    title={`${day} ${formatHour(hour)}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-accent rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-foreground">
            Selection Summary
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {selectedSlots.size} hour slots selected across{" "}
          {
            days.filter((day) =>
              hours.some((hour) => selectedSlots.has(`${day}-${hour}`))
            ).length
          }{" "}
          days
        </p>
        {selectedSlots.size > 0 && (
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            Timezone: {timezone} • Optimal reach during selected hours
          </p>
        )}
      </div>
    </Card>
  );
}
