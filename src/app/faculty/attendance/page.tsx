"use client";

import { useMemo, useState } from "react";

type Mark = "P" | "A" | "T";

type StudentRow = {
  roll: number;
  name: string;
  p1: Mark;
  p2: Mark;
  p3: Mark;
  p4: Mark;
};

type NoteItem = {
  id: string;
  name: string;
  date: string;
  reason: string;
  tag: "Exceptional" | "Personal";
  avatar: string;
};

const attendanceRows: StudentRow[] = [
  { roll: 1, name: "Frank Miller", p1: "A", p2: "P", p3: "P", p4: "P" },
  { roll: 2, name: "Alex Carry", p1: "T", p2: "P", p3: "P", p4: "P" },
  { roll: 3, name: "Ian Bell", p1: "P", p2: "P", p3: "P", p4: "P" },
  { roll: 4, name: "Jacob R", p1: "P", p2: "P", p3: "P", p4: "P" },
  { roll: 5, name: "Basil Antony", p1: "P", p2: "P", p3: "P", p4: "A" },
  { roll: 6, name: "Cyril Lyle", p1: "P", p2: "P", p3: "P", p4: "T" },
  { roll: 7, name: "Daniel Jeremy", p1: "P", p2: "P", p3: "T", p4: "P" },
  { roll: 8, name: "Emma Wilson", p1: "P", p2: "A", p3: "P", p4: "P" },
  { roll: 9, name: "Frank Miller", p1: "A", p2: "P", p3: "P", p4: "P" },
  { roll: 10, name: "Grace Taylor", p1: "T", p2: "P", p3: "P", p4: "P" }
];

const attendanceNotes: NoteItem[] = [
  { id: "n1", name: "Steven Smith", date: "July 17-21, 2025", reason: "Dance competition", tag: "Exceptional", avatar: "/assets/Studentprofileimg.png" },
  { id: "n2", name: "Michael Johnson", date: "July 25, 2025", reason: "Art exhibition", tag: "Personal", avatar: "/assets/Studentprofileimg.png" },
  { id: "n3", name: "Emily Davis", date: "August 5-8, 2025", reason: "Family reunion", tag: "Personal", avatar: "/assets/Studentprofileimg.png" },
  { id: "n4", name: "Jessica Brown", date: "August 19-23, 2025", reason: "Sports tournament", tag: "Exceptional", avatar: "/assets/Studentprofileimg.png" }
];

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5.33111 1.33276V3.99831" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.6622 1.33276V3.99831" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6614 2.66553H3.33195C2.59587 2.66553 1.99917 3.26223 1.99917 3.9983V13.3278C1.99917 14.0639 2.59587 14.6606 3.33195 14.6606H12.6614C13.3975 14.6606 13.9942 14.0639 13.9942 13.3278V3.9983C13.9942 3.26223 13.3975 2.66553 12.6614 2.66553Z" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.99917 6.66382H13.9942" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function statusClass(mark: Mark) {
  if (mark === "P") return "fat-mark present";
  if (mark === "A") return "fat-mark absent";
  return "fat-mark tardy";
}

export default function FacultyAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("Calculus - Class 1");
  const [dateLabel, setDateLabel] = useState("Mar 25, 2026");
  const [showCalendar, setShowCalendar] = useState(false);

  const totals = useMemo(() => {
    let present = 0;
    let absent = 0;
    let tardy = 0;

    attendanceRows.forEach((row) => {
      [row.p1, row.p2, row.p3, row.p4].forEach((mark) => {
        if (mark === "P") present += 1;
        if (mark === "A") absent += 1;
        if (mark === "T") tardy += 1;
      });
    });

    return { present: 9, absent: 0, tardy: 1 };
  }, []);

  return (
    <section className="faculty-main fat-page">
      <p className="faculty-breadcrumbs">Dashboard &gt; Attendance</p>

      <div className="fat-grid">
        <div className="fat-left">
          <article className="fat-card fat-summary-card">
            <div className="fat-card-head">
              <h1>Attendance</h1>
              <label className="fat-class-select">
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                  <option>Calculus - Class 1</option>
                  <option>Biology 2 - Class 4</option>
                  <option>Art History - Class 3</option>
                </select>
                <ChevronDown />
              </label>
            </div>

            <div className="fat-summary-grid">
              <div className="fat-stat">
                <span>Room</span>
                <strong>Room 201</strong>
              </div>
              <div className="fat-stat">
                <span>Number of students</span>
                <strong>21</strong>
              </div>
              <div className="fat-stat">
                <span>Total days</span>
                <strong>132 days</strong>
              </div>
              <div className="fat-stat">
                <span>Attendance Percentage</span>
                <div className="fat-progress-row">
                  <div className="fat-progress"><i style={{ width: "94%" }} /></div>
                  <b>94%</b>
                </div>
              </div>
            </div>
          </article>

          <article className="fat-card fat-history-card">
            <div className="fat-card-head">
              <h2>Attendance History</h2>
              <div className="fat-date-wrap">
                <button type="button" className={`fat-date-btn ${showCalendar ? "open" : ""}`} onClick={() => setShowCalendar((v) => !v)}>
                  <span className="calendar-icon"><CalendarIcon /></span>
                  {dateLabel}
                  <ChevronDown />
                </button>

                {showCalendar ? (
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
                              setDateLabel(`Mar ${day}, 2026`);
                              setShowCalendar(false);
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
            </div>

            <div className="fat-legend">
              <span><i className="dot present" /> Present: <b>{totals.present}</b></span>
              <span><i className="dot absent" /> Absent: <b>{totals.absent}</b></span>
              <span><i className="dot tardy" /> Tardy: <b>{totals.tardy}</b></span>
            </div>

            <div className="fat-table-wrap">
              <table className="fat-table">
                <thead>
                  <tr>
                    <th>Roll #</th>
                    <th>Student name</th>
                    <th>Overall</th>
                    <th>P1</th>
                    <th>P2</th>
                    <th>P3</th>
                    <th>P4</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRows.map((row) => (
                    <tr key={`${row.roll}-${row.name}`}>
                      <td>{row.roll}</td>
                      <td>{row.name}</td>
                      <td><span className="fat-overall">Present</span></td>
                      <td><span className={statusClass(row.p1)}>{row.p1}</span></td>
                      <td><span className={statusClass(row.p2)}>{row.p2}</span></td>
                      <td><span className={statusClass(row.p3)}>{row.p3}</span></td>
                      <td><span className={statusClass(row.p4)}>{row.p4}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <aside className="fat-card fat-notes-card">
          <h3>Attendance Notes (4)</h3>
          <div className="fat-notes-list">
            {attendanceNotes.map((note) => (
              <article key={note.id} className="fat-note">
                <div className="fat-note-head">
                  <img src={note.avatar} alt={note.name} />
                  <div>
                    <h4>{note.name}</h4>
                    <p>{note.date}</p>
                  </div>
                  <span className={`fat-note-tag ${note.tag === "Exceptional" ? "exceptional" : "personal"}`}>{note.tag}</span>
                </div>
                <small>Reason for leave:</small>
                <p>{note.reason}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
