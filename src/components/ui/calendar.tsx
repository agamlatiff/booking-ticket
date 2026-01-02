"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
}

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

function getDaysInMonth(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();
}

export function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  className,
}: CalendarProps) {
  const [viewDate, setViewDate] = React.useState(value || new Date());
  const today = new Date();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some((d) => isSameDay(d, date));
  };

  const isSelected = (date: Date): boolean => {
    return value ? isSameDay(date, value) : false;
  };

  const isToday = (date: Date): boolean => {
    return isSameDay(date, today);
  };

  return (
    <div className={cn("rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h3 className="text-lg font-black text-foreground">
          {MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-extrabold text-gray-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before first day of month */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {/* Days */}
        {daysInMonth.map((date) => {
          const disabled = isDisabled(date);
          const selected = isSelected(date);
          const todayDate = isToday(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => !disabled && onChange?.(date)}
              disabled={disabled}
              className={cn(
                "aspect-square flex items-center justify-center rounded-xl border-2 text-sm font-bold transition-all",
                disabled && "text-gray-300 border-transparent cursor-not-allowed",
                !disabled && !selected && "border-transparent hover:border-foreground hover:bg-accent-yellow/20",
                selected && "border-foreground bg-primary text-white shadow-pop",
                todayDate && !selected && "border-primary bg-primary/10 text-primary"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
