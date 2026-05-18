"use client";

import { useMemo, useState } from "react";

type Priority = "high" | "medium";
type DayGroup = "Today" | "Yesterday";

type AlertItem = {
  id: string;
  studentName: string;
  message: string;
  timeText: string;
  priority: Priority;
  group: DayGroup;
  category: string;
  createdBy: string;
  avatar: string;
};

const alertsData: AlertItem[] = [
  {
    id: "a1",
    studentName: "Joshua Mitchell",
    message: "has not been attending classes for the past 3 days.",
    timeText: "30 seconds ago",
    priority: "high",
    group: "Today",
    category: "Attendance",
    createdBy: "Kenneth Blekeski",
    avatar: "/assets/Studentprofileimg.png"
  },
  {
    id: "a2",
    studentName: "Jeremy Sullivan",
    message: "reported a minor outburst for Issac R from grade 10",
    timeText: "11:00 AM",
    priority: "medium",
    group: "Today",
    category: "Behavior",
    createdBy: "Kenneth Blekeski",
    avatar: "/assets/Studentprofileimg.png"
  },
  {
    id: "a3",
    studentName: "James Carter",
    message: "has been feeling unpleasant. Would you like to check on him?",
    timeText: "Mar 24",
    priority: "medium",
    group: "Yesterday",
    category: "Health",
    createdBy: "Kenneth Blekeski",
    avatar: "/assets/Studentprofileimg.png"
  },
  {
    id: "a4",
    studentName: "Linda Nguyen",
    message: "temperature is 103°F+, please alert the school nurse.",
    timeText: "Mar 24",
    priority: "high",
    group: "Yesterday",
    category: "Health",
    createdBy: "Kenneth Blekeski",
    avatar: "/assets/Studentprofileimg.png"
  }
];

const recipientOptions = ["All", "Teachers", "Admin", "Counselors / CST", "Nurse"] as const;

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

export default function FacultyStudentAlertsPage() {
  const [tab, setTab] = useState<"all" | "high">("all");
  const [timeRange, setTimeRange] = useState("All time");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [recipient, setRecipient] = useState<(typeof recipientOptions)[number]>("All");
  const [timeFilterOpen, setTimeFilterOpen] = useState(false);

  const filteredAlerts = useMemo(() => {
    if (tab === "high") return alertsData.filter((item) => item.priority === "high");
    return alertsData;
  }, [tab]);

  const grouped = useMemo(() => {
    const today = filteredAlerts.filter((item) => item.group === "Today");
    const yesterday = filteredAlerts.filter((item) => item.group === "Yesterday");
    return [
      { label: "Today", rows: today },
      { label: "Yesterday", rows: yesterday }
    ];
  }, [filteredAlerts]);

  const highCount = alertsData.filter((item) => item.priority === "high").length;

  return (
    <section className="faculty-main faculty-alerts-page">
      <p className="faculty-breadcrumbs">Dashboard &gt; Student Alerts</p>

      <article className="fl-header-card">
        <div className="fl-header-top">
          <div>
            <h1>Student Alerts</h1>
            <p>{highCount} high priority alerts • {alertsData.length} total</p>
          </div>
          <button type="button" className="fl-add-btn" onClick={() => setShowAddModal(true)}>
            <span>+</span>
            Add alert
          </button>
        </div>

        <div className="fl-header-filters">
          <div className="fl-pill-group">
            <button type="button" className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>All alerts</button>
            <button type="button" className={tab === "high" ? "active" : ""} onClick={() => setTab("high")}>High priority</button>
          </div>

          <label className="fl-time-filter">
            <button type="button" className="fl-time-filter-btn" onClick={() => setTimeFilterOpen((v) => !v)}>
              <span className="fl-time-filter-icon"><CalendarIcon /></span>
              <span>{timeRange}</span>
              <ChevronDown />
            </button>
            {timeFilterOpen ? (
              <div className="fl-time-filter-menu">
                {["All time", "Today", "This week"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`fl-time-filter-item ${timeRange === option ? "is-active" : ""}`}
                    onClick={() => {
                      setTimeRange(option);
                      setTimeFilterOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </label>
        </div>
      </article>

      <article className="fl-list-card">
        {grouped.map((group) => (
          <div key={group.label} className="fl-day-group">
            {group.rows.length > 0 ? <h2>{group.label}</h2> : null}
            {group.rows.map((alert) => (
              <button key={alert.id} className="fl-alert-row" type="button" onClick={() => setSelectedAlert(alert)}>
                <div className="fl-alert-left">
                  <img src={alert.avatar} alt={alert.studentName} />
                  <div>
                    <p>
                      <span>{alert.studentName}</span> {alert.message}
                    </p>
                    <small>{alert.timeText}</small>
                  </div>
                </div>
                <span className={`fl-priority ${alert.priority}`}>{alert.priority}</span>
              </button>
            ))}
          </div>
        ))}
      </article>

      {showAddModal ? (
        <div className="fl-modal-backdrop" role="presentation" onClick={() => setShowAddModal(false)}>
          <div className="fl-modal" role="dialog" aria-modal="true" aria-label="Add New Alert" onClick={(e) => e.stopPropagation()}>
            <div className="fl-modal-head">
              <h3>Add New Alert</h3>
              <button type="button" onClick={() => setShowAddModal(false)} aria-label="Close">×</button>
            </div>

            <div className="fl-form-grid">
              <label>
                <span>Class *</span>
                <select><option>Select</option></select>
              </label>
              <label>
                <span>Student Name *</span>
                <select><option>Select</option></select>
              </label>
              <div>
                <span className="fl-label">Send Alert To:</span>
                <div className="fl-recipient-chips">
                  {recipientOptions.map((item) => (
                    <button key={item} type="button" className={recipient === item ? "active" : ""} onClick={() => setRecipient(item)}>{item}</button>
                  ))}
                </div>
              </div>
              <label>
                <span>Select Staff</span>
                <select><option>Select</option></select>
              </label>
              <label>
                <span>Alert Type *</span>
                <select><option>Select</option></select>
              </label>
              <label>
                <span>Priority</span>
                <select><option>Select</option></select>
              </label>
              <label>
                <span>Description <em>(optional)</em></span>
                <input type="text" placeholder="Add a short note about this alert..." />
              </label>
            </div>

            <div className="fl-modal-actions">
              <button type="button" className="fl-btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="button" className="fl-btn-gradient">Add Alert</button>
            </div>
          </div>
        </div>
      ) : null}

      {selectedAlert ? (
        <div className="fl-modal-backdrop" role="presentation" onClick={() => setSelectedAlert(null)}>
          <div className="fl-modal fl-details-modal" role="dialog" aria-modal="true" aria-label="Alert Details" onClick={(e) => e.stopPropagation()}>
            <div className="fl-modal-head">
              <h3>Alert Details</h3>
              <button type="button" onClick={() => setSelectedAlert(null)} aria-label="Close">×</button>
            </div>

            <div className="fl-details-profile">
              <img src={selectedAlert.avatar} alt={selectedAlert.studentName} />
              <div>
                <p>{selectedAlert.studentName} <span className={`fl-priority ${selectedAlert.priority}`}>{selectedAlert.priority}</span></p>
                <small>2 minutes ago</small>
              </div>
            </div>

            <div className="fl-details-message">
              <strong>{selectedAlert.category}</strong>
              <p>{selectedAlert.message}</p>
            </div>

            <p className="fl-created-by"><span>Created by:</span> {selectedAlert.createdBy}</p>

            <div className="fl-details-actions">
              <button type="button" className="fl-btn-outline">View Student Profile</button>
              <button type="button" className="fl-btn-outline fl-btn-danger">Mark as Resolved</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
