"use client";

import { Fragment, useMemo, useState } from "react";

type ViewMode = "day" | "week" | "month";
type Tone = "lavender" | "beige" | "pink" | "green" | "neutral";

type EventItem = {
  title: string;
  subtitle: string;
  tone: Tone;
  gmeet?: boolean;
  note?: string;
};

type AssignmentPopup = {
  title: string;
  brief: string;
  due: string;
  organiser: string;
};

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];
const weekDays = [
  { id: "mon", label: "Mon", date: "Mar 23" },
  { id: "tue", label: "Tue", date: "Mar 24" },
  { id: "wed", label: "Wed", date: "Mar 25" },
  { id: "thu", label: "Thu", date: "Mar 26" },
  { id: "fri", label: "Fri", date: "Mar 27" }
] as const;

const weekEvents: Record<(typeof weekDays)[number]["id"], Array<EventItem | null>> = {
  mon: [
    { title: "Calculus", subtitle: "Room 201", tone: "lavender" },
    { title: "Computer Science", subtitle: "Lab 3", tone: "pink" },
    { title: "Art History", subtitle: "Room 305", tone: "green" },
    { title: "Lunch Break", subtitle: "Cafeteria", tone: "neutral" },
    { title: "Biology 2", subtitle: "Lab 1", tone: "beige" },
    { title: "+1 Due Assignment", subtitle: "", tone: "neutral", note: "assignment" },
    { title: "Physics", subtitle: "Room 210", tone: "lavender" },
    null
  ],
  tue: [
    { title: "Biology 2", subtitle: "Lab 1", tone: "beige" },
    { title: "Calculus", subtitle: "Room 201", tone: "lavender" },
    { title: "+1 Due Assignment", subtitle: "", tone: "neutral", note: "assignment" },
    { title: "Lunch Break", subtitle: "Cafeteria", tone: "neutral" },
    { title: "Computer Science", subtitle: "Lab 3", tone: "pink" },
    { title: "Art History", subtitle: "Room 305", tone: "green" },
    { title: "English Literature", subtitle: "Room 108", tone: "green" },
    null
  ],
  wed: [
    { title: "Computer Science", subtitle: "Lab 3", tone: "pink" },
    { title: "Art History", subtitle: "Room 305", tone: "green" },
    { title: "Scope of Syllabus Discussion", subtitle: "Room 302", tone: "neutral", gmeet: true },
    { title: "Lunch Break", subtitle: "Cafeteria", tone: "neutral" },
    { title: "Calculus", subtitle: "Room 201", tone: "lavender" },
    { title: "Biology 2", subtitle: "Lab 1", tone: "beige" },
    { title: "Physics", subtitle: "Room 210", tone: "lavender" },
    null
  ],
  thu: [
    { title: "Art History", subtitle: "Room 305", tone: "green" },
    { title: "+1 Due Assignment", subtitle: "", tone: "neutral", note: "assignment" },
    { title: "Physics", subtitle: "Room 210", tone: "lavender" },
    { title: "Lunch Break", subtitle: "Cafeteria", tone: "neutral" },
    { title: "+1 Due Assignment", subtitle: "", tone: "neutral", note: "assignment" },
    { title: "Calculus", subtitle: "Room 201", tone: "lavender" },
    { title: "English Literature", subtitle: "Room 108", tone: "green" },
    null
  ],
  fri: [
    { title: "Calculus", subtitle: "Room 201", tone: "lavender" },
    { title: "English Literature", subtitle: "Room 108", tone: "green" },
    { title: "Computer Science", subtitle: "Lab 3", tone: "pink" },
    { title: "Lunch Break", subtitle: "Cafeteria", tone: "neutral" },
    { title: "Biology 2", subtitle: "Lab 1", tone: "beige" },
    { title: "Parent-Teacher Conf.", subtitle: "Conf. Room B", tone: "neutral", gmeet: true },
    { title: "Physics", subtitle: "Room 210", tone: "lavender" },
    null
  ]
};

const monthWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const gmeetIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <g clipPath="url(#clip0_meet)">
      <path d="M7.63171 2.36829H10V7.63162H7.63171V2.36829Z" fill="#1967D2" />
      <path d="M2.36833 7.63162H0V2.36829H2.36833V7.63162Z" fill="#188038" />
      <path d="M7.63162 10V7.63171H2.36829V10H7.63162Z" fill="#1967D2" />
      <path d="M2.36829 2.36833V0H7.63162V2.36833H2.36829Z" fill="#EA4335" />
      <path d="M7.63171 2.36833H10V0H7.63171V2.36833Z" fill="#1A73E8" />
      <path d="M7.63171 7.63171H10V10H7.63171V7.63171Z" fill="#1967D2" />
      <path d="M0 7.63171H2.36833V10H0V7.63171Z" fill="#34A853" />
      <path d="M0 0H2.36833V2.36833H0V0Z" fill="#FBBC04" />
    </g>
    <defs>
      <clipPath id="clip0_meet">
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function FacultySchedulePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [connected, setConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Classes");
  const [selectedDateLabel, setSelectedDateLabel] = useState("March 2026");
  const [assignmentPopup, setAssignmentPopup] = useState<AssignmentPopup | null>(null);

  const canShowEvent = (event: EventItem | null) => {
    if (!event) return false;
    if (event.gmeet && !connected) return false;
    return true;
  };

  const monthCells = useMemo<Array<{ day: number; items: EventItem[] }>>(
    () =>
      Array.from({ length: 35 }, (_, i) => i + 1).map((day) => {
        if (day === 1 || day === 7 || day === 8 || day === 14 || day === 15 || day === 21 || day === 22 || day === 28 || day === 29 || day === 30 || day === 31) {
          return { day, items: [] };
        }
        if (day === 2 || day === 13) {
          return {
            day,
            items: [
              { title: "Calculus", subtitle: "", tone: "lavender" },
              { title: "Computer Science", subtitle: "", tone: "pink" },
              { title: "+1 Due Assignment", subtitle: "", tone: "neutral", note: "assignment" }
            ]
          };
        }
        if (day % 5 === 0) return { day, items: [{ title: "Art History", subtitle: "", tone: "green" }, { title: "Biology 2", subtitle: "", tone: "beige" }] };
        if (day % 4 === 0) return { day, items: [{ title: "Computer Science", subtitle: "", tone: "pink", gmeet: day === 4 }, { title: "Art History", subtitle: "", tone: "green" }] };
        return { day, items: [{ title: "Calculus", subtitle: "", tone: "lavender" }, { title: "English Literature", subtitle: "", tone: "green" }] };
      }),
    []
  );

  return (
    <section className="faculty-main faculty-schedule-screen">
      <p className="faculty-breadcrumbs">Dashboard &gt; Schedule</p>

      <article className="fs-toolbar-card">
        <div className="fs-toolbar-top">
          <h1 className="fs-title">My Schedule</h1>
          <div className="fs-toolbar-controls">
            <div className="fs-filter-wrap">
              <button className="fs-select" type="button" onClick={() => setFilterOpen((v) => !v)}>
                <span>{selectedFilter}</span>
                <span>⌄</span>
              </button>
              {filterOpen && (
                <div className="fs-select-menu">
                  {["All Classes", "Calculus - Class 1", "Art History - Class 3", "Biology 2 - Class 4"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`fs-select-item ${selectedFilter === item ? "is-active" : ""}`}
                      onClick={() => {
                        setSelectedFilter(item);
                        setFilterOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="fs-view-toggle">
              <button className={viewMode === "day" ? "is-active" : ""} onClick={() => setViewMode("day")} type="button">Day</button>
              <button className={viewMode === "week" ? "is-active" : ""} onClick={() => setViewMode("week")} type="button">Week</button>
              <button className={viewMode === "month" ? "is-active" : ""} onClick={() => setViewMode("month")} type="button">Month</button>
            </div>
          </div>
        </div>
        <div className="fs-toolbar-bottom">
          <div className="fat-date-wrap fs-date-wrap">
            <button
              className={`fs-date-btn ${viewMode === "day" ? "day" : ""} ${showDatePicker ? "open" : ""}`}
              type="button"
              onClick={() => setShowDatePicker((v) => !v)}
            >
              <span className="calendar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.33334 1.3335V4.00016" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.6667 1.3335V4.00016" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 6.6665H14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span>{selectedDateLabel}</span>
              <span className="fs-date-caret">⌄</span>
            </button>

            {showDatePicker ? (
              <div className="fat-calendar-popover" role="dialog" aria-label="Select date">
                <div className="fat-calendar-nav">
                  <button type="button" aria-label="Previous month">‹</button>
                  <button type="button" aria-label="Next month">›</button>
                </div>
                <div className="fat-calendar-grid">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const active = day === 25;
                    return (
                      <button
                        key={day}
                        type="button"
                        className={active ? "active" : ""}
                        onClick={() => {
                          setSelectedDateLabel(viewMode === "day" ? `Mar ${day}, 2026` : "March 2026");
                          setShowDatePicker(false);
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {connected ? (
            <div className="fs-connected-wrap">
              <div className="fs-connected-pill">✓&nbsp; Google Calendar Connected</div>
              <div className="fs-connected-meta">Last synced: Today</div>
            </div>
          ) : (
            <button className="fs-google-btn" type="button" onClick={() => setShowConnectModal(true)}>
              <span>{gmeetIcon}</span>
              Sync with Google Calendar
            </button>
          )}
        </div>
      </article>

      <article className="fs-board-card">
        {viewMode !== "month" && (
          <div className={`fs-grid ${viewMode === "day" ? "day" : "week"}`}>
            <div className="fs-time-head" />
            {(viewMode === "day" ? [{ id: "wed", label: "Wednesday", date: "Mar 25" }] : weekDays).map((day) => (
              <div className="fs-day-head" key={day.id}>
                <div className="fs-day-label">{day.label}</div>
                <div className="fs-day-date">{day.date}</div>
              </div>
            ))}

            {timeSlots.map((time, slotIdx) => (
              <Fragment key={time}>
                <div className="fs-time-cell">{time}</div>
                {(viewMode === "day" ? [{ id: "wed" as const }] : weekDays).map((day) => {
                  const event = weekEvents[day.id][slotIdx];
                  return (
                    <div className={`fs-slot ${event?.note === "assignment" ? "has-assignment" : ""}`} key={`${day.id}-${slotIdx}`}>
                      {canShowEvent(event) && event && (
                        event.note === "assignment" ? (
                          <button
                            type="button"
                            className="fs-event assignment fs-assignment-link"
                            onClick={() =>
                              setAssignmentPopup({
                                title: "Scope of Syllabus Discussion",
                                brief:
                                  "This quiz is designed to evaluate your understanding of the biology topics discussed in class. You will be tested on concepts such as cell structure, functions, and life processes. Read each question carefully and answer based on your learning.",
                                due: "6th, March 2026 • 10:00 AM - 10:50 AM",
                                organiser: "Dr. Alan Webb"
                              })
                            }
                          >
                            <span className="fs-event-title">{event.title}</span>
                          </button>
                        ) : (
                          <div className={`fs-event tone-${event.tone} ${event.gmeet ? "has-gmeet" : ""}`}>
                            <div>
                              <div className="fs-event-title">{event.title}</div>
                              {event.subtitle ? <div className="fs-event-sub">{viewMode === "day" ? `${time} • ${event.subtitle}` : event.subtitle}</div> : null}
                            </div>
                            {event.gmeet ? <span className="fs-gmeet">{gmeetIcon}</span> : null}
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        )}

        {viewMode === "month" && (
          <div className="fs-month">
            <div className="fs-month-head">
              {monthWeekDays.map((d) => <div key={d}>{d}</div>)}
            </div>
            <div className="fs-month-grid">
              {monthCells.map((cell) => (
                <div key={cell.day} className="fs-month-cell">
                  <div className="fs-month-day">{cell.day}</div>
                  {cell.items.filter((item) => !item.gmeet || connected).slice(0, 3).map((item, idx) => (
                    item.note === "assignment" ? (
                      <button
                        key={`${cell.day}-${idx}`}
                        type="button"
                        className="fs-month-item assignment fs-assignment-link"
                        onClick={() =>
                          setAssignmentPopup({
                            title: "Scope of Syllabus Discussion",
                            brief:
                              "This quiz is designed to evaluate your understanding of the biology topics discussed in class. You will be tested on concepts such as cell structure, functions, and life processes. Read each question carefully and answer based on your learning.",
                            due: "6th, March 2026 • 10:00 AM - 10:50 AM",
                            organiser: "Dr. Alan Webb"
                          })
                        }
                      >
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <div key={`${cell.day}-${idx}`} className={`fs-month-item tone-${item.tone} ${item.gmeet ? "has-gmeet" : ""}`}>
                        <span>{item.title}</span>
                        {item.gmeet ? <span className="fs-gmeet">{gmeetIcon}</span> : null}
                      </div>
                    )
                  ))}
                  {cell.items.length > 2 ? <div className="fs-month-more">+5 more</div> : null}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="fs-footer-nav">
          <button type="button">‹</button>
          <span>{viewMode === "month" ? "March 2026" : viewMode === "day" ? "Mar 25, 2026" : "Mar 23 - Mar 27, 2026"}</span>
          <button type="button">›</button>
        </div>
      </article>

      {showConnectModal && (
        <div className="fs-modal-backdrop" onClick={() => setShowConnectModal(false)} role="presentation">
          <div className="fs-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Connect Google Calendar">
            <div className="fs-modal-icon">{gmeetIcon}</div>
            <h3>Connect Google Calendar</h3>
            <p>Sync your teaching schedule with Google Calendar to automatically add and update your class events.</p>
            <div className="fs-modal-actions">
              <button type="button" onClick={() => setShowConnectModal(false)}>Cancel</button>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setConnected(true);
                  setShowConnectModal(false);
                }}
              >
                Connect Google Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {assignmentPopup && (
        <div className="fs-modal-backdrop" onClick={() => setAssignmentPopup(null)} role="presentation">
          <div className="fs-assignment-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Assignment details">
            <div className="fs-assignment-head">
              <div className="fs-assignment-brand">
                <span>{gmeetIcon}</span>
                <strong>Google Calendar</strong>
              </div>
              <button type="button" onClick={() => setAssignmentPopup(null)} aria-label="Close assignment popup">×</button>
            </div>
            <h4>{assignmentPopup.title}</h4>
            <p className="label">Assignment Brief</p>
            <div className="brief">{assignmentPopup.brief}</div>
            <p className="meta"><span>Due</span> {assignmentPopup.due}</p>
            <p className="meta"><span>Organiser</span> {assignmentPopup.organiser}</p>
            <div className="actions">
              <button type="button" onClick={() => setAssignmentPopup(null)}>Close</button>
              <button type="button" className="primary">View on Classroom</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
