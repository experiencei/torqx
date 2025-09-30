import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface DotCalendarProps {
  scheduledDates?: string[]; // Array of dates with scheduled content (YYYY-MM-DD format)
  onDateClick?: (date: string) => void;
  className?: string;
}

export function DotCalendar({ scheduledDates = [], onDateClick, className = "" }: DotCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = formatDate(year, month, day);
    const isScheduled = scheduledDates.includes(dateString);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
    
    days.push(
      <div
        key={day}
        className={`
          h-8 flex items-center justify-center cursor-pointer relative
          rounded-md transition-colors hover:bg-accent
          ${isToday ? 'bg-primary text-primary-foreground' : ''}
        `}
        onClick={() => onDateClick?.(dateString)}
      >
        <span className="text-sm">{day}</span>
        {isScheduled && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="h-8 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <span>Scheduled content</span>
      </div>
    </div>
  );
}