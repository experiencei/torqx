import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

export function SchedulingGridSection() {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [timezone, setTimezone] = useState('WAT');

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
    const daySelected = hours.every(hour => selectedSlots.has(`${day}-${hour}`));
    
    if (daySelected) {
      // Deselect all hours for this day
      hours.forEach(hour => newSelectedSlots.delete(`${day}-${hour}`));
    } else {
      // Select all hours for this day
      hours.forEach(hour => newSelectedSlots.add(`${day}-${hour}`));
    }
    
    setSelectedSlots(newSelectedSlots);
  };

  const selectAllTime = () => {
    if (selectedSlots.size === days.length * hours.length) {
      setSelectedSlots(new Set());
    } else {
      const allSlots = new Set<string>();
      days.forEach(day => {
        hours.forEach(hour => {
          allSlots.add(`${day}-${hour}`);
        });
      });
      setSelectedSlots(allSlots);
    }
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  return (
    <Card className="bg-white border-gray-200 p-4 md:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-black mb-2">Scheduling Grid</h3>
          <p className="text-sm text-gray-600">
            Select the days and hours when you want your ads to be displayed. 
            Click on time slots to toggle selection.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="w-full sm:w-32 bg-white border-gray-300 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="WAT" className="text-black hover:bg-gray-50">WAT</SelectItem>
              <SelectItem value="GMT" className="text-black hover:bg-gray-50">GMT</SelectItem>
              <SelectItem value="EST" className="text-black hover:bg-gray-50">EST</SelectItem>
              <SelectItem value="PST" className="text-black hover:bg-gray-50">PST</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={selectAllTime}
            className="border-gray-300 text-black hover:bg-gray-50"
          >
            {selectedSlots.size === days.length * hours.length ? 'Clear All' : 'Select All'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Time Header */}
        <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-2">
          <div></div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-1">
            {[0, 4, 8, 12, 16, 20].map(hour => (
              <div key={hour} className="text-xs text-gray-600 text-center">
                {formatHour(hour)}
              </div>
            ))}
            <div className="hidden md:block text-xs text-gray-600 text-center">{formatHour(2)}</div>
            <div className="hidden md:block text-xs text-gray-600 text-center">{formatHour(6)}</div>
            <div className="hidden md:block text-xs text-gray-600 text-center">{formatHour(10)}</div>
            <div className="hidden md:block text-xs text-gray-600 text-center">{formatHour(14)}</div>
            <div className="hidden md:block text-xs text-gray-600 text-center">{formatHour(18)}</div>
            <div className="hidden md:block text-xs text-gray-600 text-center">{formatHour(22)}</div>
          </div>
        </div>

        {/* Day Rows */}
        {days.map(day => {
          const daySelected = hours.every(hour => selectedSlots.has(`${day}-${hour}`));
          const dayPartiallySelected = hours.some(hour => selectedSlots.has(`${day}-${hour}`));
          
          return (
            <div key={day} className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-2 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectAllDay(day)}
                className={`justify-start text-xs md:text-sm ${
                  daySelected 
                    ? 'text-purple-600 bg-purple-50' 
                    : dayPartiallySelected 
                    ? 'text-purple-500 bg-purple-25'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {day}
              </Button>
              <div className="grid grid-cols-24 gap-0.5">
                {hours.map(hour => (
                  <button
                    key={hour}
                    onClick={() => toggleSlot(day, hour)}
                    className={`h-4 md:h-6 rounded-sm transition-colors ${
                      selectedSlots.has(`${day}-${hour}`)
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-200 hover:bg-gray-300 border border-gray-300'
                    }`}
                    title={`${day} ${formatHour(hour)}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-black">Selection Summary</span>
        </div>
        <p className="text-sm text-gray-600">
          {selectedSlots.size} hour slots selected across {days.filter(day => 
            hours.some(hour => selectedSlots.has(`${day}-${hour}`))
          ).length} days
        </p>
        {selectedSlots.size > 0 && (
          <p className="text-sm text-purple-600 mt-1">
            Timezone: {timezone} • Optimal reach during selected hours
          </p>
        )}
      </div>
    </Card>
  );
}