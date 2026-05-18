"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/faculty/dashboard", icon: "dashboard" },
  { label: "My Classes", href: "/faculty/classes", icon: "classes" },
  { label: "Schedule", href: "/faculty/schedule", icon: "schedule" },
  { label: "Attendance", href: "/faculty/attendance", icon: "attendance" },
  { label: "Student Alerts", href: "/faculty/student-alerts", icon: "alerts" },
  { label: "Academics", href: "/faculty/academics", icon: "academics" },
  { label: "Resources", href: "/faculty/resources", icon: "resources" }
] as const;

function NavIcon({
  name
}: {
  name: "dashboard" | "classes" | "schedule" | "attendance" | "alerts" | "academics" | "resources" | "logout";
}) {
  if (name === "dashboard") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9.99584 13.9942V8.66309C9.99584 8.48635 9.92563 8.31685 9.80065 8.19188C9.67568 8.06691 9.50618 7.9967 9.32945 7.9967H6.66389C6.48715 7.9967 6.31765 8.06691 6.19268 8.19188C6.06771 8.31685 5.9975 8.48635 5.9975 8.66309V13.9942" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.99917 6.66384C1.99912 6.46996 2.04137 6.27841 2.12297 6.10255C2.20458 5.92668 2.32356 5.77074 2.47164 5.64559L7.13636 1.64726C7.37692 1.44395 7.6817 1.3324 7.99667 1.3324C8.31163 1.3324 8.61642 1.44395 8.85698 1.64726L13.5217 5.64559C13.6698 5.77074 13.7888 5.92668 13.8704 6.10255C13.952 6.27841 13.9942 6.46996 13.9942 6.66384V12.6613C13.9942 13.0148 13.8538 13.3538 13.6038 13.6037C13.3539 13.8536 13.0149 13.9941 12.6614 13.9941H3.33195C2.97847 13.9941 2.63947 13.8536 2.38953 13.6037C2.13958 13.3538 1.99917 13.0148 1.99917 12.6613V6.66384Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (name === "classes" || name === "academics") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99667 4.66479V13.9943" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.99917 11.9951C1.82243 11.9951 1.65293 11.9249 1.52796 11.7999C1.40299 11.675 1.33278 11.5055 1.33278 11.3287V2.66566C1.33278 2.48892 1.40299 2.31942 1.52796 2.19445C1.65293 2.06948 1.82243 1.99927 1.99917 1.99927H5.33111C6.03806 1.99927 6.71606 2.2801 7.21595 2.77999C7.71583 3.27988 7.99667 3.95787 7.99667 4.66482C7.99667 3.95787 8.2775 3.27988 8.77739 2.77999C9.27728 2.2801 9.95528 1.99927 10.6622 1.99927H13.9942C14.1709 1.99927 14.3404 2.06948 14.4654 2.19445C14.5904 2.31942 14.6606 2.48892 14.6606 2.66566V11.3287C14.6606 11.5055 14.5904 11.675 14.4654 11.7999C14.3404 11.9249 14.1709 11.9951 13.9942 11.9951H9.99584C9.46562 11.9951 8.95713 12.2057 8.58221 12.5806C8.20729 12.9556 7.99667 13.4641 7.99667 13.9943C7.99667 13.4641 7.78604 12.9556 7.41113 12.5806C7.03621 12.2057 6.52771 11.9951 5.9975 11.9951H1.99917Z" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (name === "schedule") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.33111 1.33276V3.99831" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.6622 1.33276V3.99831" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.6614 2.66553H3.33195C2.59587 2.66553 1.99917 3.26223 1.99917 3.9983V13.3278C1.99917 14.0639 2.59587 14.6606 3.33195 14.6606H12.6614C13.3975 14.6606 13.9942 14.0639 13.9942 13.3278V3.9983C13.9942 3.26223 13.3975 2.66553 12.6614 2.66553Z" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.99917 6.66382H13.9942" stroke="currentColor" strokeWidth="1.33278" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (name === "attendance") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 7V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H11.6667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 7.33341L8 9.33341L14.6667 2.66675" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (name === "alerts") return <span className="material-symbols-outlined" style={{ fontSize: 17 }}>notifications</span>;
  if (name === "resources") return <span className="material-symbols-outlined" style={{ fontSize: 17 }}>folder_open</span>;
  if (name === "logout") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.6667 11.3332L14 7.99984L10.6667 4.6665" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 8H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  return <span className="material-symbols-outlined" style={{ fontSize: 17 }}>menu_book</span>;
}

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="faculty-dashboard-page">
      <aside className="faculty-sidebar">
        <div>
          <div className="faculty-profile">
            <div className="faculty-avatar"><img src="/assets/Facultyprofileimg.png" alt="Kenneth Blekeski" className="faculty-avatar-img" /></div>
            <h2>Kenneth Blekeski</h2>
            <p>ID 123456789</p>
          </div>

          <nav className="faculty-nav" aria-label="Faculty navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={isActive ? "faculty-nav-item active" : "faculty-nav-item"}
                >
                  <span className="faculty-nav-icon" aria-hidden>
                    <NavIcon name={item.icon} />
                  </span>
                  <span className="faculty-nav-label">{item.label}</span>
                  {item.icon === "alerts" ? <span className="faculty-nav-badge">2</span> : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <button className="faculty-logout" type="button">
          <span aria-hidden><NavIcon name="logout" /></span>
          Logout
        </button>
      </aside>

      {children}
    </main>
  );
}
