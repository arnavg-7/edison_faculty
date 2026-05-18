"use client";

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const resources: ResourceItem[] = [
  {
    id: "classroom",
    title: "Google Classroom",
    description: "Access your classes, assignments, and course materials",
    icon: "📚"
  },
  {
    id: "genesis",
    title: "Genesis",
    description: "Student information system and gradebook",
    icon: "G"
  },
  {
    id: "handbook",
    title: "Handbook",
    description: "School policies, procedures, and guidelines",
    icon: "📖"
  },
  {
    id: "library",
    title: "Library",
    description: "Browse and manage library resources",
    icon: "📕"
  },
  {
    id: "payroll",
    title: "Payroll",
    description: "View pay stubs and manage payroll information",
    icon: "💰"
  },
  {
    id: "employee-portal",
    title: "Employee Portal",
    description: "Access documents, contracts, and employee resources",
    icon: "✓"
  }
];

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M9.33333 2.6665H13.3333V6.6665" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66667 9.3335L13.3333 2.66683" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8.6665V12.6665C14 13.0201 13.8595 13.3593 13.6095 13.6093C13.3594 13.8594 13.0203 13.9998 12.6667 13.9998H3.33333C2.97971 13.9998 2.64057 13.8594 2.39052 13.6093C2.14048 13.3593 2 13.0201 2 12.6665V3.33317C2 2.97955 2.14048 2.64041 2.39052 2.39036C2.64057 2.14031 2.97971 1.99984 3.33333 1.99984H7.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FacultyResourcesPage() {
  return (
    <section className="faculty-main fr-page">
      <h1 className="fr-title">Resources</h1>
      <p className="fr-subtitle">Quick access to important tools and platforms</p>

      <div className="fr-grid">
        {resources.map((item) => (
          <button key={item.id} type="button" className="fr-card">
            <span className="fr-open-icon" aria-hidden>
              <ExternalIcon />
            </span>

            <span className="fr-badge" aria-hidden>{item.icon}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

