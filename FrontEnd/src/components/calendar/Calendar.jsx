import "./calendar.css";
import { useState, useEffect } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1)); // September 2024
  const [selectedDay, setSelectedDay] = useState(9);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sample leave data - you can modify this
  const leaveData = {
    "2024-9-9": true, // September 9, 2024 has leave
    // Add more leave dates as needed
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const hasLeave = (year, month, day) => {
    const key = `${year}-${month + 1}-${day}`;
    return leaveData[key] || false;
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentMonth =
        currentDate.getMonth() === 8 && currentDate.getFullYear() === 2024;
      const isSelected = isCurrentMonth && day === selectedDay;
      const hasLeaveIndicator = hasLeave(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? "selected" : ""} ${
            hasLeaveIndicator ? "has-leave" : ""
          }`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector(".calendar-container");
      const windowWidth = window.innerWidth;

      if (windowWidth <= 360) {
        container?.classList.add("small-screen");
      } else {
        container?.classList.remove("small-screen");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="calendar-container">
        {/* Header */}
        <div className="calendar-header">
          <h1>Leave Calendar</h1>
        </div>

        {/* Calendar Navigation */}
        <div className="calendar-content">
          <div className="calendar-navigation">
            <button className="nav-btn" onClick={() => navigateMonth(-1)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <h2 className="current-month">
              {months[currentDate.getMonth()]}, {currentDate.getFullYear()}
            </h2>

            <button className="nav-btn" onClick={() => navigateMonth(1)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Days of week header */}
          <div className="days-header">
            <div className="day-label">S</div>
            <div className="day-label">M</div>
            <div className="day-label">T</div>
            <div className="day-label">W</div>
            <div className="day-label">T</div>
            <div className="day-label">F</div>
            <div className="day-label">S</div>
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">{renderCalendarDays()}</div>
        </div>

        {/* Approved Leaves Section */}
        <div className="approved-leaves">
          <h3>Approved Leaves</h3>

          <div className="leave-item">
            <div className="avatar">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <div className="employee-info">
              <div className="employee-name">Cody Fisher</div>
              <div className="employee-title">Senior Backend Developer</div>
            </div>

            <div className="leave-date">8/09/24</div>
          </div>
        </div>
      </div>
    </>
  );
}
