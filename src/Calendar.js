import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import './Calendar.css';
import "./tooltip.css"; // Optional: Add tooltip styles if needed

const specialDays = {
  "1-1": "New Year's Day",
  "1-26": "Republic Day",
  "12-25": "Christmas",
  "8-15": "Independence Day",
  "10-2": "Gandhi Jayanti"
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const today = dayjs();

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(dayjs()), 86400000);
    return () => clearInterval(timer);
  }, []);

  const daysInMonth = currentDate.daysInMonth();
  const firstDay = currentDate.startOf("month").day();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const selectDate = (day) => setCurrentDate(currentDate.date(day));

  const handleYearChange = (event) => setCurrentDate(currentDate.year(parseInt(event.target.value)));
  const handleMonthChange = (event) => setCurrentDate(currentDate.month(parseInt(event.target.value)));

  const days = Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));

  return (
    <div
      className="relative w-[300px] mx-auto text-center border p-3 shadow-lg rounded-lg bg-cover bg-center"
      style={{ backgroundImage: "url('/Calendar.jpg')" }}
    >
      {/* Optional white overlay for readability */}
      <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2">
          <button onClick={prevMonth} className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">◀</button>
          
          <select value={currentDate.month()} onChange={handleMonthChange} className="text-sm text-black px-2 py-1 rounded-lg">
            {[...Array(12).keys()].map(month => (
              <option key={month} value={month}>{dayjs().month(month).format("MMMM")}</option>
            ))}
          </select>

          <select value={currentDate.year()} onChange={handleYearChange} className="text-sm text-black px-2 py-1 rounded-lg">
            {[...Array(10).keys()].map(offset => {
              const year = today.year() - 5 + offset;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>

          <button onClick={nextMonth} className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">▶</button>
        </div>

        <p className="text-sm font-bold text-yellow-300 mb-2 shadow-lg bg-black bg-opacity-50 px-2 py-1 rounded-lg">
          Today: {today.format("ddd, MMM D, YYYY")}
        </p>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="font-bold text-white bg-black bg-opacity-50 px-1 py-1 rounded-lg">{day}</div>
          ))}

          {days.map((day, index) => {
            const isToday = today.date() === day && today.month() === currentDate.month() && today.year() === currentDate.year();
            const isSelected = currentDate.date() === day;
            const key = `${currentDate.month() + 1}-${day}`;
            const specialEvent = specialDays[key];

            return (
              <div
                key={index}
                onClick={() => selectDate(day)}
                className={`cursor-pointer p-1 border rounded-lg h-8 flex items-center justify-center text-xs font-semibold transition-all duration-300
                  ${isToday ? "bg-red-500 text-white shadow-lg scale-105" :
                    isSelected ? "bg-blue-500 text-white shadow-md" :
                      specialEvent ? "bg-green-500 text-white tooltip" :
                        "bg-gray-200 text-black hover:bg-gray-300"}`}
                data-tooltip={specialEvent || ""}
              >
                {day || ""}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 text-xs">
          <p className="font-bold">Legend:</p>
          <div className="flex justify-center gap-2 mt-1">
            <span className="w-4 h-4 bg-red-500 inline-block rounded"></span> <span>Today</span>
            <span className="w-4 h-4 bg-blue-500 inline-block rounded"></span> <span>Selected</span>
            <span className="w-4 h-4 bg-green-500 inline-block rounded"></span> <span>Special Day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
