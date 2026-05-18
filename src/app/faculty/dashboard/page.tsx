"use client";

import { useState } from "react";

const scheduleCards = [
  {
    title: "Calculus",
    className: "Class 1",
    students: "20 Students",
    period: "Period 1 • 11:59 AM",
    next: "Next: Applications of Diff...",
    tone: "purple"
  },
  {
    title: "Art History",
    className: "Class 3",
    students: "12 Students",
    period: "Period 2 • 12:59 PM",
    next: "Next: Spring showcase",
    tone: "pink"
  },
  {
    title: "Biology 2",
    className: "Class 4",
    students: "42 Students",
    period: "Period 3 • 01:59 PM",
    next: "Next: Cell division",
    tone: "blue"
  },
  {
    title: "Computer Science",
    className: "Class 2",
    students: "28 Students",
    period: "Period 4 • 02:59 PM",
    next: "Next: Data structures",
    tone: "gold"
  },
  {
    title: "AP Spanish I",
    className: "Class 5",
    students: "18 Students",
    period: "Period 5 • 10:00 AM",
    next: "Next: Subjunctive mood",
    tone: "blue"
  },
  {
    title: "Geology",
    className: "Class 6",
    students: "24 Students",
    period: "Period 6 • 11:00 AM",
    next: "Next: Rock formations",
    tone: "gold"
  },
  {
    title: "Data Science",
    className: "Class 7",
    students: "32 Students",
    period: "Period 7 • 12:00 PM",
    next: "Next: Machine learning",
    tone: "purple"
  },
  {
    title: "Chemistry Honors",
    className: "Class 8",
    students: "26 Students",
    period: "Period 8 • 01:00 PM",
    next: "Next: Chemical bonds",
    tone: "pink"
  }
] as const;

export default function FacultyDashboardPage() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 25));
  const [displayMonth, setDisplayMonth] = useState(new Date(2026, 2, 1));

  const buttonDateLabel = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const monthLabel = displayMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const firstDayOfMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const calendarCells = Array.from({ length: totalCells }, (_, idx) => idx - firstDayOfMonth + 1);

  const goMonth = (delta: number) => {
    setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const pickDay = (day: number) => {
    const d = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
    setSelectedDate(d);
  };

  const selectToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setDisplayMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <section className="faculty-main">
      <h1>Welcome to Edison360!</h1>

      <div className="faculty-metrics">
        <article className="faculty-metric-card">
          <h3>RM - 204</h3>
          <p>Room</p>
        </article>

        <article className="faculty-metric-card faculty-attendance-card">
          <div>
            <h3>92%</h3>
            <p>Class attendance</p>
          </div>
          <div className="faculty-mini-calendar" aria-label="Date marker">
            <span>MAR</span>
            <strong>25</strong>
          </div>
        </article>

        <article className="faculty-metric-card">
          <h3>07</h3>
          <p>My classes</p>
        </article>
      </div>

      <div className="faculty-schedule-header">
        <h2>Schedule</h2>
        <div className="date-filter-wrap">
          <button className="date-filter" type="button" onClick={() => setCalendarOpen((v) => !v)}>
            <span className="calendar-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.33337 1.33337V4.00004" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6666 1.33337V4.00004" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.6667 2.66663H3.33333C2.59695 2.66663 2 3.26358 2 3.99996V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0697 14 13.3333V3.99996C14 3.26358 13.403 2.66663 12.6667 2.66663Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 6.66663H14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="date-text">{buttonDateLabel}</span>
            <span className="caret" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          {calendarOpen && (
            <div className="calendar-popover" role="dialog" aria-label="Calendar">
              <div className="calendar-header">
                <button className="calendar-nav" type="button" aria-label="Previous month" onClick={() => goMonth(-1)}>‹</button>
                <div className="calendar-title">{monthLabel}</div>
                <button className="calendar-nav" type="button" aria-label="Next month" onClick={() => goMonth(1)}>›</button>
              </div>
              <div className="calendar-weekdays">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
              </div>
              <div className="calendar-grid">
                {calendarCells.map((day, idx) => {
                  const isEmpty = day <= 0 || day > daysInMonth;
                  const isSelected =
                    !isEmpty &&
                    selectedDate.getFullYear() === displayMonth.getFullYear() &&
                    selectedDate.getMonth() === displayMonth.getMonth() &&
                    selectedDate.getDate() === day;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`calendar-day${isSelected ? " is-selected" : ""}${isEmpty ? " is-empty" : ""}`}
                      onClick={() => !isEmpty && pickDay(day)}
                      disabled={isEmpty}
                    >
                      {isEmpty ? "" : day}
                    </button>
                  );
                })}
              </div>
              <div className="calendar-divider" />
              <div className="calendar-actions">
                <button className="calendar-btn calendar-btn--primary" type="button" onClick={selectToday}>Today</button>
                <button className="calendar-btn" type="button" onClick={() => setCalendarOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="schedule-grid">
        {scheduleCards.map((card) => (
          <article className="schedule-item" key={card.title}>
            <div className={`schedule-top tone-${card.tone}`}>
              <div className="schedule-content">
                <div className="schedule-title">{card.title}</div>
                <div className="schedule-teacher">{card.className}</div>
                <div className="schedule-room">{card.students}</div>
              </div>
            </div>

            <div className="schedule-bottom">
              <div className="schedule-meta">{card.period}</div>
              <div className="schedule-next">{card.next}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
