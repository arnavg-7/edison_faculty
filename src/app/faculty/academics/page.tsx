"use client";

import { useState } from "react";

type AssignmentRow = {
  startDate: string;
  assignment: string;
  submissions: string;
  dueDate: string;
};

const ongoingRows: AssignmentRow[] = [
  { startDate: "July 01, 2025", assignment: "Algebra Assignment 1: Quadratic Equations", submissions: "4/20", dueDate: "July 03, 2025" },
  { startDate: "July 03, 2025", assignment: "Geometry Project: Area and Volume Calculations", submissions: "21/32", dueDate: "July 05, 2025" },
  { startDate: "July 05, 2025", assignment: "Statistics Task: Data Analysis and Interpretation", submissions: "13/24", dueDate: "July 07, 2025" },
  { startDate: "July 07, 2025", assignment: "Calculus Homework: Derivatives and Integrals", submissions: "12/18", dueDate: "July 08, 2025" },
  { startDate: "July 08, 2025", assignment: "Physics Experiment: Newton's Laws of Motion", submissions: "26/40", dueDate: "July 09, 2025" },
  { startDate: "July 09, 2025", assignment: "Chemistry Lab: Acid-Base Titration", submissions: "35/48", dueDate: "July 10, 2025" },
  { startDate: "July 10, 2025", assignment: "Biology Study: Cell Structure and Functions", submissions: "19/30", dueDate: "July 11, 2025" },
  { startDate: "July 11, 2026", assignment: "History Essay: The Impact of the Industrial Revolution", submissions: "16/24", dueDate: "July 13, 2026" }
];

const completedRows: AssignmentRow[] = [
  { startDate: "June 15, 2025", assignment: "Algebra Quiz: Linear Equations", submissions: "28/28", dueDate: "June 20, 2025" },
  { startDate: "June 18, 2025", assignment: "English Essay: Shakespeare Analysis", submissions: "22/24", dueDate: "June 25, 2025" },
  { startDate: "June 20, 2025", assignment: "Chemistry Lab Report: Periodic Table", submissions: "30/32", dueDate: "June 27, 2025" },
  { startDate: "June 22, 2025", assignment: "History Project: World War II", submissions: "18/20", dueDate: "June 28, 2025" },
  { startDate: "June 25, 2025", assignment: "Physics Problem Set: Kinematics", submissions: "25/28", dueDate: "June 30, 2025" }
];

const grades = [
  ["Emily Johnson", "EJ", "A"],
  ["Michael Chen", "MC", "B+"],
  ["Sarah Williams", "SW", "A-"],
  ["James Martinez", "JM", "B"],
  ["Jessica Davis", "JD", "A"],
  ["Daniel Brown", "DB", "B+"],
  ["Ashley Garcia", "AG", "A-"],
  ["Ethan Miller", "EM", "B+"]
] as const;

export default function FacultyAcademicsPage() {
  const [tab, setTab] = useState<"ongoing" | "completed">("ongoing");
  const [selected, setSelected] = useState<AssignmentRow | null>(null);

  const rows = tab === "ongoing" ? ongoingRows : completedRows;

  return (
    <section className="faculty-main faculty-academics-page">
      <h1 className="fa-title">Academics</h1>
      <p className="fa-subtitle">Manage assignments and track student submissions</p>

      <article className="fa-card">
        <div className="fa-tabs">
          <button className={tab === "ongoing" ? "active" : ""} type="button" onClick={() => setTab("ongoing")}>
            Ongoing assignments
          </button>
          <button className={tab === "completed" ? "active" : ""} type="button" onClick={() => setTab("completed")}>
            Completed assignments
          </button>
        </div>

        <div className="fa-table-wrap">
          <table className="fa-table">
            <thead>
              <tr>
                <th>Start date</th>
                <th>Assignment</th>
                <th>No of submissions</th>
                <th>Due date</th>
                {tab === "completed" ? <th /> : null}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.startDate}-${row.assignment}`}>
                  <td>{row.startDate}</td>
                  <td>{row.assignment}</td>
                  <td>{row.submissions}</td>
                  <td>{row.dueDate}</td>
                  {tab === "completed" ? (
                    <td>
                      <button className="fa-view-btn" type="button" onClick={() => setSelected(row)}>
                        View Grades
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {selected && (
        <div className="fa-modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <div className="fa-modal" role="dialog" aria-modal="true" aria-label="View grades" onClick={(e) => e.stopPropagation()}>
            <div className="fa-modal-head">
              <div>
                <h2>View Grades</h2>
                <p>{selected.assignment}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close">×</button>
            </div>

            <div className="fa-summary">
              <div>
                <span>Submissions</span>
                <strong>{selected.submissions}</strong>
              </div>
              <div>
                <span>Due Date</span>
                <strong>{selected.dueDate}</strong>
              </div>
            </div>

            <h3>Student Grades</h3>
            <div className="fa-grade-list">
              {grades.map(([name, initials, grade]) => (
                <div className="fa-grade-row" key={name}>
                  <div className="fa-grade-left">
                    <span className="fa-avatar">{initials}</span>
                    <span>
                      <strong>{name}</strong>
                      <em>Submitted</em>
                    </span>
                  </div>
                  <span className="fa-grade-pill">{grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
