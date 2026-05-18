"use client";

import { useMemo, useRef, useState } from "react";

type ClassCard = {
  id: string;
  title: string;
  subtitle: string;
  tone: "purple" | "pink" | "gold" | "blue";
  total: string;
  specialEd?: string;
  partner: string;
};

type Student = {
  id: string;
  name: string;
  studentId: string;
  gradeSection: string;
  avatar?: string;
};

type FullScheduleTone = "pink" | "gold" | "blue" | "gray" | "indigo" | "purple" | "green";

type FullScheduleItem = {
  title: string;
  time: string;
  period: string;
  teacher?: string;
  location: string;
  tone: FullScheduleTone;
  isMeet?: boolean;
};

type FullWeekDay = {
  day: string;
  date: string;
  active?: boolean;
  items: Array<{
    title: string;
    time: string;
    teacher?: string;
    location: string;
    tone: FullScheduleTone;
    isMeet?: boolean;
  }>;
};

type DevelopmentAreaConfig = {
  key: "Strengths" | "Interests" | "Future Goals" | "Room To Grow";
  title: string;
  tone: "blue" | "teal" | "orange" | "green";
  icon: string;
  items: { label: string; desc: string }[];
};

type SkillEntry = {
  label: string;
  desc: string;
};

type SkillProfileCard = {
  title: string;
  high: SkillEntry;
  mid: SkillEntry;
  low: SkillEntry;
};

const classCards: ClassCard[] = [
  { id: "calculus", title: "Calculus", subtitle: "Class 1", tone: "purple", total: "16 Students", specialEd: "9 Students", partner: "Dr. Sarah Mitchell" },
  { id: "art-history", title: "Art History", subtitle: "Class 3", tone: "pink", total: "25 Students", partner: "--" },
  { id: "cs", title: "Computer Science", subtitle: "Class 2", tone: "gold", total: "25 Students", partner: "--" },
  { id: "spanish", title: "AP Spanish I", subtitle: "Class 5", tone: "blue", total: "25 Students", partner: "--" }
];

const students: Student[] = [
  { id: "emma", name: "Emma Wilson", studentId: "ST06500", gradeSection: "Grade 11 - B", avatar: "/assets/Studentprofileimg.png" },
  { id: "marcus", name: "Marcus Chen", studentId: "ST06595", gradeSection: "Grade 11 - B" },
  { id: "sofia", name: "Sofia Rodriguez", studentId: "ST06508", gradeSection: "Grade 11 - B" },
  { id: "aiden", name: "Aiden Park", studentId: "ST06505", gradeSection: "Grade 11 - B" },
  { id: "olivia", name: "Olivia Taylor", studentId: "ST06504", gradeSection: "Grade 11 - B" },
  { id: "ryan", name: "Ryan Cooper", studentId: "ST06505", gradeSection: "Grade 11 - B" },
  { id: "zoe", name: "Zoe Rivera", studentId: "ST06575", gradeSection: "Grade 11 - B" },
  { id: "noah", name: "Noah Bennett", studentId: "ST06421", gradeSection: "Grade 11 - B" },
  { id: "mia", name: "Mia Turner", studentId: "ST06218", gradeSection: "Grade 11 - B" }
];

const todaySchedule = [
  ["Computer Science", "8:00 - 8:50 AM", "Lab 3"],
  ["Biology 2", "9:00 - 9:50 AM", "Lab 1"],
  ["English Literature", "10:00 - 10:50 AM", "Room 108"],
  ["Lunch Break", "11:00 - 11:40 AM", "Cafeteria"],
  ["Parent-Teacher Conf.", "12:00 - 12:50 PM", "Room 305"],
  ["Calculus", "1:00 - 1:50 PM", "Room 201"],
  ["Physics", "2:00 - 2:50 PM", "Room 210"]
] as const;

const fullDaySchedule: FullScheduleItem[] = [
  { title: "Computer Science", time: "8:00 - 8:50 AM", period: "Period 1", teacher: "Mr. Kevin Torres", location: "Lab 3", tone: "pink" },
  { title: "Biology 2", time: "9:00 - 9:50 AM", period: "Period 2", teacher: "Dr. Linda Park", location: "Lab 1", tone: "gold" },
  { title: "English Literature", time: "10:00 - 10:50 AM", period: "Period 3", teacher: "Ms. Rachel Green", location: "Room 108", tone: "blue" },
  { title: "Lunch Break", time: "11:00 - 11:40 AM", period: "Lunch", location: "Cafeteria", tone: "gray" },
  { title: "Parent-Teacher Conf.", time: "12:00 - 12:50 PM", period: "Period 4", teacher: "Ms. Rachel Green", location: "Room 305", tone: "indigo", isMeet: true },
  { title: "Calculus", time: "1:00 - 1:50 PM", period: "Period 5", teacher: "Dr. Sarah Mitchell", location: "Room 201", tone: "purple" },
  { title: "Physics", time: "2:00 - 2:50 PM", period: "Period 6", teacher: "Dr. Alan Webb", location: "Room 210", tone: "purple" }
];

const fullWeekSchedule: FullWeekDay[] = [
  {
    day: "Mon",
    date: "16",
    items: [
      { title: "Art History", time: "8:00 - 8:50 AM", teacher: "Prof. James Carter", location: "Room 305", tone: "green" },
      { title: "Biology 2", time: "9:00 - 9:50 AM", teacher: "Dr. Linda Park", location: "Lab 1", tone: "gold" },
      { title: "Computer Science", time: "10:00 - 10:50 AM", teacher: "Mr. Kevin Torres", location: "Lab 3", tone: "pink" },
      { title: "Lunch Break", time: "11:00 - 11:40 AM", location: "Cafeteria", tone: "gray" },
      { title: "Parent-Teacher Conf.", time: "12:00 - 12:50 PM", teacher: "Ms. Rachel Green", location: "Room 108", tone: "indigo", isMeet: true },
      { title: "Physics", time: "1:00 - 1:50 PM", teacher: "Dr. Alan Webb", location: "Room 210", tone: "purple" },
      { title: "Calculus", time: "2:00 - 2:50 PM", teacher: "Dr. Sarah Mitchell", location: "Room 201", tone: "indigo" }
    ]
  },
  {
    day: "Tue",
    date: "17",
    items: [
      { title: "Biology 2", time: "8:00 - 8:50 AM", teacher: "Dr. Linda Park", location: "Lab 1", tone: "gold" },
      { title: "Art History", time: "9:00 - 9:50 AM", teacher: "Prof. James Carter", location: "Room 305", tone: "green" },
      { title: "Calculus", time: "10:00 - 10:50 AM", teacher: "Dr. Sarah Mitchell", location: "Room 201", tone: "indigo" },
      { title: "Lunch Break", time: "11:00 - 11:40 AM", location: "Cafeteria", tone: "gray" },
      { title: "Parent-Teacher Conf.", time: "12:00 - 12:50 PM", teacher: "Ms. Rachel Green", location: "Room 108", tone: "indigo", isMeet: true },
      { title: "Physics", time: "1:00 - 1:50 PM", teacher: "Dr. Alan Webb", location: "Room 210", tone: "purple" },
      { title: "Computer Science", time: "2:00 - 2:50 PM", teacher: "Mr. Kevin Torres", location: "Lab 3", tone: "pink" }
    ]
  },
  {
    day: "Wed",
    date: "18",
    active: true,
    items: [
      { title: "Computer Science", time: "8:00 - 8:50 AM", teacher: "Mr. Kevin Torres", location: "Lab 3", tone: "pink" },
      { title: "Biology 2", time: "9:00 - 9:50 AM", teacher: "Dr. Linda Park", location: "Lab 1", tone: "gold" },
      { title: "English Literature", time: "10:00 - 10:50 AM", teacher: "Ms. Rachel Green", location: "Room 108", tone: "blue" },
      { title: "Lunch Break", time: "11:00 - 11:40 AM", location: "Cafeteria", tone: "gray" },
      { title: "Parent-Teacher Conf.", time: "12:00 - 12:50 PM", teacher: "Ms. Rachel Green", location: "Room 305", tone: "indigo", isMeet: true },
      { title: "Calculus", time: "1:00 - 1:50 PM", teacher: "Dr. Sarah Mitchell", location: "Room 201", tone: "indigo" },
      { title: "Physics", time: "2:00 - 2:50 PM", teacher: "Dr. Alan Webb", location: "Room 210", tone: "purple" }
    ]
  },
  {
    day: "Thu",
    date: "19",
    items: [
      { title: "Physics", time: "8:00 - 8:50 AM", teacher: "Dr. Alan Webb", location: "Room 210", tone: "purple" },
      { title: "English Literature", time: "9:00 - 9:50 AM", teacher: "Ms. Rachel Green", location: "Room 108", tone: "blue" },
      { title: "Calculus", time: "10:00 - 10:50 AM", teacher: "Dr. Sarah Mitchell", location: "Room 201", tone: "indigo" },
      { title: "Lunch Break", time: "11:00 - 11:40 AM", location: "Cafeteria", tone: "gray" },
      { title: "Parent-Teacher Conf.", time: "12:00 - 12:50 PM", teacher: "Ms. Rachel Green", location: "Lab 3", tone: "indigo", isMeet: true },
      { title: "Art History", time: "1:00 - 1:50 PM", teacher: "Prof. James Carter", location: "Room 305", tone: "green" },
      { title: "Biology 2", time: "2:00 - 2:50 PM", teacher: "Dr. Linda Park", location: "Lab 1", tone: "gold" }
    ]
  },
  {
    day: "Fri",
    date: "20",
    items: [
      { title: "Art History", time: "8:00 - 8:50 AM", teacher: "Prof. James Carter", location: "Room 305", tone: "green" },
      { title: "Computer Science", time: "9:00 - 9:50 AM", teacher: "Mr. Kevin Torres", location: "Lab 3", tone: "pink" },
      { title: "Physics", time: "10:00 - 10:50 AM", teacher: "Dr. Alan Webb", location: "Room 210", tone: "purple" },
      { title: "Lunch Break", time: "11:00 - 11:40 AM", location: "Cafeteria", tone: "gray" },
      { title: "Parent-Teacher Conf.", time: "12:00 - 12:50 PM", teacher: "Ms. Rachel Green", location: "Lab 1", tone: "indigo", isMeet: true },
      { title: "Calculus", time: "1:00 - 1:50 PM", teacher: "Dr. Sarah Mitchell", location: "Room 201", tone: "indigo" },
      { title: "English Literature", time: "2:00 - 2:50 PM", teacher: "Ms. Rachel Green", location: "Room 108", tone: "blue" }
    ]
  }
];

const developmentAreas: DevelopmentAreaConfig[] = [
  {
    key: "Strengths",
    title: "Strengths",
    tone: "blue",
    icon: "✓",
    items: [
      { label: "Analytical Thinker", desc: "Breaks down complex questions into clear steps." },
      { label: "Problem Solver", desc: "Evaluates options and picks practical solutions." },
      { label: "Detail-Oriented", desc: "Maintains high accuracy in classwork and projects." }
    ]
  },
  {
    key: "Room To Grow",
    title: "Room To Grow",
    tone: "green",
    icon: "⚡",
    items: [
      { label: "Speed in Tests", desc: "Improve time allocation under timed assessments." },
      { label: "Word Problems", desc: "Practice narrative-to-equation translation." },
      { label: "Time Management", desc: "Build a weekly prep and review routine." }
    ]
  },
  {
    key: "Interests",
    title: "Interests",
    tone: "teal",
    icon: "☺",
    items: [
      { label: "Mathematics", desc: "Enjoys advanced and abstract problem solving." },
      { label: "Physics", desc: "Strong curiosity in systems and mechanics." },
      { label: "Chess", desc: "Applies strategic planning and pattern recognition." }
    ]
  },
  {
    key: "Future Goals",
    title: "Future Goals",
    tone: "orange",
    icon: "✪",
    items: [
      { label: "Engineering School", desc: "Target admission to a top engineering program." },
      { label: "STEM Career", desc: "Develop depth in quantitative and technical skills." },
      { label: "Research Internship", desc: "Gain project exposure through guided research." }
    ]
  }
] as const;

const skillsProfile: SkillProfileCard[] = [
  {
    title: "Resilience",
    high: { label: "Perseverance", desc: "Persists through setbacks and sustains effort." },
    mid: { label: "Flexibility", desc: "Adjusts strategy when context changes." },
    low: { label: "Adaptability", desc: "Build confidence in trying unfamiliar approaches." }
  },
  {
    title: "Effective Communication",
    high: { label: "Reasoning", desc: "Explains ideas with clear logic and evidence." },
    mid: { label: "Clarity", desc: "Communicates intent concisely and consistently." },
    low: { label: "Active Listening", desc: "Strengthen listening and reflective response." }
  },
  {
    title: "Engaged Community Member",
    high: { label: "Service", desc: "Contributes actively to peers and community." },
    mid: { label: "Empathy", desc: "Recognizes and respects others' perspectives." },
    low: { label: "Respect", desc: "Maintain consistency in collaborative environments." }
  },
  {
    title: "Lifelong Learner",
    high: { label: "Initiative", desc: "Pursues learning opportunities independently." },
    mid: { label: "Collaboration", desc: "Shares ownership and builds with teammates." },
    low: { label: "Curiosity", desc: "Ask deeper questions to expand understanding." }
  },
  {
    title: "Emotionally Intelligent",
    high: { label: "Accountability", desc: "Owns actions and follows through reliably." },
    mid: { label: "Self-Regulation", desc: "Balances emotional response during challenge." },
    low: { label: "Self-Awareness", desc: "Identify triggers and plan coping patterns." }
  },
  {
    title: "Critical Thinking",
    high: { label: "Innovation", desc: "Creates new approaches to complex problems." },
    mid: { label: "Analysis", desc: "Evaluates tradeoffs using structured reasoning." },
    low: { label: "Reasoning", desc: "Build stronger argument chains with evidence." }
  }
] ;

function SkillPill({
  level,
  label,
  description
}: {
  level: "high" | "mid" | "low";
  label: string;
  description: string;
}) {
  const levelClass = level === "high" ? "skill-high" : level === "mid" ? "skill-mid" : "skill-low";
  return (
    <div className={`skill-pill ${levelClass}`}>
      <span className="skill-dot" />
      {label}
      <div className="skill-tooltip">
        <div className="skill-tooltip-title">{label}</div>
        <div className="skill-tooltip-desc">{description}</div>
      </div>
    </div>
  );
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14.116 4.54138C14.4685 4.189 14.6665 3.71103 14.6666 3.21262C14.6666 2.71421 14.4687 2.23619 14.1163 1.88372C13.7639 1.53124 13.286 1.33319 12.7876 1.33313C12.2892 1.33307 11.8111 1.531 11.4587 1.88338L2.56133 10.7827C2.40654 10.9371 2.29207 11.1271 2.228 11.3361L1.34733 14.2374C1.3301 14.295 1.3288 14.3563 1.34356 14.4146C1.35833 14.473 1.38861 14.5262 1.43119 14.5687C1.47378 14.6112 1.52708 14.6414 1.58544 14.6561C1.64379 14.6708 1.70504 14.6694 1.76266 14.6521L4.66466 13.7721C4.87344 13.7086 5.06345 13.5948 5.218 13.4407L14.116 4.54138Z" stroke="#AD46FF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 3.33337L12.6667 6.00004" stroke="#AD46FF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GMeetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <g clipPath="url(#clip0_18291_1155_modal)">
        <path d="M7.63171 2.36829H10V7.63162H7.63171V2.36829Z" fill="#1967D2"/>
        <path d="M2.36833 7.63162H0V2.36829H2.36833V7.63162Z" fill="#188038"/>
        <path d="M7.63162 10V7.63171H2.36829V10H7.63162Z" fill="#1967D2"/>
        <path d="M2.36829 2.36833V0H7.63162V2.36833H2.36829Z" fill="#EA4335"/>
        <path d="M7.63171 2.36833H10V0H7.63171V2.36833Z" fill="#1A73E8"/>
        <path d="M7.63171 7.63171H10V10H7.63171V7.63171Z" fill="#1967D2"/>
        <path d="M0 7.63171H2.36833V10H0V7.63171Z" fill="#34A853"/>
        <path d="M0 0H2.36833V2.36833H0V0Z" fill="#FBBC04"/>
      </g>
      <defs>
        <clipPath id="clip0_18291_1155_modal">
          <rect width="10" height="10" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function clsTone(tone: ClassCard["tone"]) {
  return `faculty-class-tone-${tone}`;
}

function skillItemsFromCard(skill: SkillProfileCard) {
  return [skill.high, skill.mid, skill.low];
}

export default function FacultyClassesPage() {
  const [selectedClassId, setSelectedClassId] = useState(classCards[0].id);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [fullScheduleView, setFullScheduleView] = useState<"day" | "week">("day");
  const [showDevAreasModal, setShowDevAreasModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [openDevDropdown, setOpenDevDropdown] = useState<DevelopmentAreaConfig["key"] | null>(null);
  const [devAreaSelections, setDevAreaSelections] = useState<Record<DevelopmentAreaConfig["key"], string[]>>({
    Strengths: developmentAreas.find((a) => a.key === "Strengths")?.items.map((i) => i.label) ?? [],
    Interests: developmentAreas.find((a) => a.key === "Interests")?.items.map((i) => i.label) ?? [],
    "Future Goals": developmentAreas.find((a) => a.key === "Future Goals")?.items.map((i) => i.label) ?? [],
    "Room To Grow": developmentAreas.find((a) => a.key === "Room To Grow")?.items.map((i) => i.label) ?? []
  });
  const [draftDevAreaSelections, setDraftDevAreaSelections] = useState(devAreaSelections);
  const [skillsCards, setSkillsCards] = useState([...skillsProfile]);
  const [draftSkillsCards, setDraftSkillsCards] = useState([...skillsProfile]);
  const [academicGoalText, setAcademicGoalText] = useState(
    "Emma is focused on mastering advanced calculus concepts and improving test-taking speed. She's working closely with her study partner to tackle complex word problems and strengthen time management skills for upcoming AP exams."
  );
  const [draftAcademicGoalText, setDraftAcademicGoalText] = useState(academicGoalText);
  const [draggedSkill, setDraggedSkill] = useState<{ cardTitle: string; fromIndex: number } | null>(null);
  const [viewByOpen, setViewByOpen] = useState(false);
  const [selectedViewBy, setSelectedViewBy] = useState("Overall");
  const [sortAsc, setSortAsc] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedStudentId) ?? students[0],
    [selectedStudentId]
  );

  const sortedStudents = useMemo(() => {
    const copy = [...students];
    copy.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      return sortAsc ? cmp : -cmp;
    });
    return copy;
  }, [sortAsc]);

  const slideCarousel = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  };

  const optionLookup = useMemo(() => {
    return developmentAreas.reduce<Record<DevelopmentAreaConfig["key"], { label: string; desc: string }[]>>((acc, area) => {
      acc[area.key] = area.items;
      return acc;
    }, {} as Record<DevelopmentAreaConfig["key"], { label: string; desc: string }[]>);
  }, []);

  const renderAreas = useMemo(
    () =>
      developmentAreas.map((area) => ({
        ...area,
        items: devAreaSelections[area.key]
          .map((label) => optionLookup[area.key].find((opt) => opt.label === label))
          .filter((item): item is { label: string; desc: string } => Boolean(item))
      })),
    [devAreaSelections, optionLookup]
  );

  const openDevEditor = () => {
    setDraftDevAreaSelections(devAreaSelections);
    setOpenDevDropdown(null);
    setShowDevAreasModal(true);
  };

  const openSkillsEditor = () => {
    setDraftSkillsCards([...skillsCards]);
    setShowSkillsModal(true);
  };

  const openGoalEditor = () => {
    setDraftAcademicGoalText(academicGoalText);
    setShowGoalModal(true);
  };

  const toggleDevSelection = (areaKey: DevelopmentAreaConfig["key"], label: string) => {
    setDraftDevAreaSelections((prev) => {
      const current = prev[areaKey];
      const exists = current.includes(label);
      if (exists) {
        return { ...prev, [areaKey]: current.filter((item) => item !== label) };
      }
      if (current.length >= 3) return prev;
      return { ...prev, [areaKey]: [...current, label] };
    });
  };

  const removeDraftTag = (areaKey: DevelopmentAreaConfig["key"], label: string) => {
    setDraftDevAreaSelections((prev) => ({
      ...prev,
      [areaKey]: prev[areaKey].filter((item) => item !== label)
    }));
  };

  const moveSkillPill = (cardTitle: string, fromIndex: number, toIndex: number) => {
    setDraftSkillsCards((prev) =>
      prev.map((card) => {
        if (card.title !== cardTitle) return card;
        const arr = [...skillItemsFromCard(card)];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return {
          ...card,
          high: arr[0],
          mid: arr[1],
          low: arr[2]
        };
      })
    );
  };

  return (
    <section className="faculty-main faculty-classes-page">
      <p className="faculty-breadcrumbs">Dashboard &gt; Current Classes</p>
      <div className="faculty-classes-header-row">
        <h1>My Classes</h1>
        <div className="faculty-carousel-nav">
          <button type="button" onClick={() => slideCarousel("left")} aria-label="Previous classes">‹</button>
          <button type="button" onClick={() => slideCarousel("right")} aria-label="Next classes">›</button>
        </div>
      </div>

      <div className="faculty-class-carousel" ref={carouselRef}>
        {classCards.map((card) => {
          const active = selectedClassId === card.id;
          return (
            <article
              key={card.id}
              className={`faculty-class-overview-card ${active ? "is-active" : ""}`}
              onClick={() => setSelectedClassId(card.id)}
            >
              <div className={`faculty-class-overview-top ${clsTone(card.tone)}`}>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
              <div className="faculty-class-overview-bottom">
                {card.specialEd ? (
                  <>
                    <div className="faculty-overview-line"><span>General Education</span><strong>{card.total}</strong></div>
                    <div className="faculty-overview-line"><span>Special Education</span><strong>{card.specialEd}</strong></div>
                  </>
                ) : (
                  <div className="faculty-overview-line"><span>Total Students</span><strong>{card.total}</strong></div>
                )}
                <hr />
                <div className="faculty-overview-line"><span>Teaching Partner</span><strong>{card.partner}</strong></div>
              </div>
            </article>
          );
        })}
      </div>

      <article className="faculty-students-shell">
        <aside className="faculty-students-list-column">
          <div className="faculty-students-list-head-row">
            <div className="faculty-students-list-head">
              <h2>
                <span className="faculty-students-list-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5" stroke="#101828" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z" stroke="#101828" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.3333 17.4999V15.8333C18.3327 15.0947 18.0869 14.3773 17.6344 13.7935C17.1819 13.2098 16.5484 12.7929 15.8333 12.6083" stroke="#101828" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.3333 2.60828C14.0503 2.79186 14.6858 3.20886 15.1396 3.79353C15.5935 4.37821 15.8398 5.0973 15.8398 5.83744C15.8398 6.57758 15.5935 7.29668 15.1396 7.88135C14.6858 8.46603 14.0503 8.88303 13.3333 9.06661" stroke="#101828" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Students List
              </h2>
            </div>
          </div>
          <div className="faculty-search-row">
            <input type="text" placeholder="Search students..." aria-label="Search students" />
            <button type="button" aria-label={`Sort students ${sortAsc ? "descending" : "ascending"}`} onClick={() => setSortAsc((v) => !v)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 10.6667L4.66667 13.3334L7.33333 10.6667" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.66669 13.3334V2.66669" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3333 5.33331H10" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6.66669V4.33335C10 3.89133 10.1756 3.4674 10.4882 3.15484C10.8007 2.84228 11.2246 2.66669 11.6667 2.66669C12.1087 2.66669 12.5326 2.84228 12.8452 3.15484C13.1577 3.4674 13.3333 3.89133 13.3333 4.33335V6.66669" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9.33331H13.3333L10 13.3333H13.3333" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="faculty-students-pager"><span>‹ Previous</span><strong>1 of 25</strong><span>Next ›</span></div>

          <div className="faculty-students-scroll">
            {sortedStudents.map((student) => {
              const active = selectedStudentId === student.id;
              return (
                <button
                  type="button"
                  key={student.id}
                  className={`faculty-student-row ${active ? "is-active" : ""}`}
                  onClick={() => setSelectedStudentId(student.id)}
                >
                  <span className="faculty-student-avatar" aria-hidden>
                    {student.avatar ? <img src={student.avatar} alt="" /> : student.name.slice(0, 1)}
                  </span>
                  <span>
                    <strong>{student.name}</strong>
                    <em>#{student.studentId}</em>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="faculty-student-details-scroll">
          <div className="faculty-details-top-controls">
            <label className="faculty-view-by faculty-view-by--dropdown">
              <span>View by</span>
              <div className="fat-class-select faculty-inline-select">
                <button
                  type="button"
                  className="faculty-inline-select-btn"
                  aria-label="View by"
                  onClick={() => setViewByOpen((v) => !v)}
                >
                  <span>{selectedViewBy}</span>
                  <ChevronDownIcon />
                </button>
                {viewByOpen && (
                  <div className="faculty-inline-select-menu">
                    {["Overall", "General Education", "Special Education"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`faculty-inline-select-item ${selectedViewBy === option ? "is-active" : ""}`}
                        onClick={() => {
                          setSelectedViewBy(option);
                          setViewByOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </label>
          </div>
          <header className="faculty-student-overview-head">
            <h3>{selectedStudent.name} Performance Overview <span>(Class of 2030)</span></h3>
            <div className="faculty-student-meta">
              <div><span>Student ID</span><strong>{selectedStudent.studentId}</strong></div>
              <div><span>Grade &amp; Section</span><strong>{selectedStudent.gradeSection}</strong></div>
            </div>
          </header>

          <section className="faculty-student-schedule-strip">
            <div className="faculty-strip-head">
              <h4>Today&apos;s Schedule <span>(Wed 3/18)</span></h4>
              <button type="button" onClick={() => setShowFullSchedule(true)}>View full schedule</button>
            </div>
            <div className="faculty-strip-scroll">
              {todaySchedule.map((item) => (
                <article key={item[0]}>
                  <div className="faculty-strip-card-top">
                    <strong>{item[0]}</strong>
                    {item[0] === "Parent-Teacher Conf." && (
                      <span className="faculty-gmeet-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <g clipPath="url(#clip0_18291_1155)">
                            <path d="M7.63171 2.36829H10V7.63162H7.63171V2.36829Z" fill="#1967D2"/>
                            <path d="M2.36833 7.63162H0V2.36829H2.36833V7.63162Z" fill="#188038"/>
                            <path d="M7.63162 10V7.63171H2.36829V10H7.63162Z" fill="#1967D2"/>
                            <path d="M2.36829 2.36833V0H7.63162V2.36833H2.36829Z" fill="#EA4335"/>
                            <path d="M7.63171 2.36833H10V0H7.63171V2.36833Z" fill="#1A73E8"/>
                            <path d="M7.63171 7.63171H10V10H7.63171V7.63171Z" fill="#1967D2"/>
                            <path d="M0 7.63171H2.36833V10H0V7.63171Z" fill="#34A853"/>
                            <path d="M0 0H2.36833V2.36833H0V0Z" fill="#FBBC04"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_18291_1155">
                              <rect width="10" height="10" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    )}
                  </div>
                  <span>{item[1]}</span>
                  <span>{item[2]}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="faculty-dev-areas-section">
            <div className="faculty-dev-areas-head">
              <h4>Development Areas</h4>
              <button className="goal-edit" type="button" aria-label="Edit development areas" onClick={openDevEditor}>
                <span className="goal-edit-icon" aria-hidden="true"><EditIcon /></span>
              </button>
            </div>
            <div className="faculty-dev-areas-grid">
              {renderAreas.map((area) => (
                <article key={area.title}>
                  <span className={`faculty-dev-icon ${area.tone}`}>
                  {area.title === "Strengths" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {area.title === "Room To Grow" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10.8334 8.33333V2.5L3.33337 11.6667H9.16671V17.5L16.6667 8.33333H10.8334Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {area.title === "Interests" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12.3567 12.3567C11.7316 12.9816 10.8839 13.3326 10 13.3326C9.11612 13.3326 8.26843 12.9816 7.64333 12.3567M7.5 8.33333H7.50833M12.5 8.33333H12.5083M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {area.title === "Future Goals" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 10L9.16666 11.6667L12.5 8.33333M6.52916 3.91416C7.12692 3.86646 7.6944 3.63142 8.15083 3.2425C8.66659 2.80272 9.3222 2.56116 10 2.56116C10.6778 2.56116 11.3334 2.80272 11.8492 3.2425C12.3056 3.63142 12.8731 3.86646 13.4708 3.91416C14.1465 3.96792 14.7808 4.26068 15.2601 4.73993C15.7393 5.21918 16.0321 5.85354 16.0858 6.52916C16.1335 7.12692 16.3686 7.6944 16.7575 8.15083C17.1973 8.66659 17.4388 9.3222 17.4388 10C17.4388 10.6778 17.1973 11.3334 16.7575 11.8492C16.3686 12.3056 16.1335 12.8731 16.0858 13.4708C16.0321 14.1465 15.7393 14.7808 15.2601 15.2601C14.7808 15.7393 14.1465 16.0321 13.4708 16.0858C12.8731 16.1335 12.3056 16.3686 11.8492 16.7575C11.3334 17.1973 10.6778 17.4388 10 17.4388C9.3222 17.4388 8.66659 17.1973 8.15083 16.7575C7.6944 16.3686 7.12692 16.1335 6.52916 16.0858C5.85354 16.0321 5.21918 15.7393 4.73993 15.2601C4.26068 14.7808 3.96792 14.1465 3.91416 13.4708C3.86646 12.8731 3.63142 12.3056 3.2425 11.8492C2.80272 11.3334 2.56116 10.6778 2.56116 10C2.56116 9.3222 2.80272 8.66659 3.2425 8.15083C3.63142 7.6944 3.86646 7.12692 3.91416 6.52916C3.96792 5.85354 4.26068 5.21918 4.73993 4.73993C5.21918 4.26068 5.85354 3.96792 6.52916 3.91416Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  </span>
                  <h5>{area.title}</h5>
                  {area.items.map((item) => (
                    <p key={item.label} className="faculty-hover-line">
                      {item.label}
                      <span className="faculty-tip">
                        <strong>{item.label}</strong>
                        <em>{item.desc}</em>
                      </span>
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </section>

          <section className="skills-card">
            <div className="skills-header">
              <div className="card-title">Skills Profile</div>
              <div className="skills-header-right">
                <div className="skills-legend">
                  <span className="legend-item legend-high"><span className="legend-dot" />High Skill</span>
                  <span className="legend-item legend-mid"><span className="legend-dot" />Middle Skill</span>
                  <span className="legend-item legend-low"><span className="legend-dot" />Elementary Skill</span>
                </div>
                <button className="goal-edit" type="button" aria-label="Edit skills" onClick={openSkillsEditor}>
                  <span className="goal-edit-icon" aria-hidden="true"><EditIcon /></span>
                </button>
              </div>
            </div>
            <div className="skills-grid">
              {skillsCards.map((skill) => (
                <div className="skill-card" key={skill.title}>
                  <div className="skill-title">{skill.title}</div>
                  <SkillPill level="high" label={skill.high.label} description={skill.high.desc} />
                  <SkillPill level="mid" label={skill.mid.label} description={skill.mid.desc} />
                  <SkillPill level="low" label={skill.low.label} description={skill.low.desc} />
                </div>
              ))}
            </div>
          </section>

          <section className="faculty-goal-card">
            <div className="faculty-goal-head">
              <h4>Academic Goal for 2030-2031</h4>
              <button className="goal-edit" type="button" aria-label="Edit goal" onClick={openGoalEditor}>
                <span className="goal-edit-icon" aria-hidden="true"><EditIcon /></span>
              </button>
            </div>
            <p>{academicGoalText}</p>
          </section>
        </section>
      </article>

      {showFullSchedule && (
        <div className="fcs-modal-backdrop" onClick={() => setShowFullSchedule(false)}>
          <div className={`fcs-modal ${fullScheduleView === "week" ? "is-week-view" : ""}`} onClick={(e) => e.stopPropagation()}>
            <button className="fcs-close" type="button" onClick={() => setShowFullSchedule(false)} aria-label="Close full schedule">
              ×
            </button>
            <h3>Emma Wilson&apos;s Schedule</h3>
            <p>Wednesday, Mar 18, 2026</p>

            <div className="fcs-topbar">
              <div className="fcs-switch">
                <button type="button" className={fullScheduleView === "day" ? "is-active" : ""} onClick={() => setFullScheduleView("day")}>Day</button>
                <button type="button" className={fullScheduleView === "week" ? "is-active" : ""} onClick={() => setFullScheduleView("week")}>Week</button>
              </div>
              <div className="fcs-nav">
                <button type="button" aria-label="Previous">‹</button>
                <span>Today</span>
                <button type="button" aria-label="Next">›</button>
              </div>
            </div>

            {fullScheduleView === "day" ? (
              <div className="fcs-day-view">
                {fullDaySchedule.map((item) => (
                  <div className="fcs-day-row" key={`${item.title}-${item.time}`}>
                    <div className="fcs-time-col">
                      <strong>{item.time}</strong>
                      <span>{item.period}</span>
                    </div>
                    <article className={`fcs-event-card tone-${item.tone} ${item.isMeet ? "is-meet" : ""}`}>
                      <div className="fcs-event-accent" />
                      <div className="fcs-event-content">
                        <strong>{item.title}</strong>
                        <span>
                          {item.teacher ? `${item.teacher} ` : ""}
                          <em>⌖</em> {item.location}
                          {item.isMeet ? <i className="fcs-meet-badge" aria-hidden="true"><GMeetIcon /></i> : null}
                        </span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fcs-week-view">
                {fullWeekSchedule.map((day) => (
                  <div className="fcs-week-col" key={day.day}>
                    <div className={`fcs-week-col-head ${day.active ? "is-active" : ""}`}>
                      <strong>{day.day}</strong>
                      <span>{day.date}</span>
                    </div>
                    <div className="fcs-week-events">
                      {day.items.map((item, idx) => (
                        <article className={`fcs-week-card tone-${item.tone} ${item.isMeet ? "is-meet" : ""}`} key={`${day.day}-${item.title}-${idx}`}>
                          <div className="fcs-week-accent" />
                          <strong>{item.title}{item.isMeet ? <i className="fcs-meet-badge" aria-hidden="true"><GMeetIcon /></i> : null}</strong>
                          <span>{item.time}</span>
                          <span>{item.teacher ?? ""}</span>
                          <span>{item.location}</span>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showDevAreasModal && (
        <div className="fdam-backdrop" onClick={() => setShowDevAreasModal(false)}>
          <div className="fdam-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fdam-close" type="button" onClick={() => setShowDevAreasModal(false)} aria-label="Close development areas editor">
              ×
            </button>
            <h3>Development Areas</h3>
            <p>Select up to 3 skills per area.</p>
            <hr />

            {(["Strengths", "Interests", "Future Goals", "Room To Grow"] as const).map((areaKey) => {
              const area = developmentAreas.find((item) => item.key === areaKey);
              const selected = draftDevAreaSelections[areaKey];
              return (
                <div className="fdam-field" key={areaKey}>
                  <h4 className={`tone-${area?.tone ?? "blue"}`}>{areaKey}</h4>
                  <div className={`fdam-multiselect ${openDevDropdown === areaKey ? "is-open" : ""}`}>
                    <button type="button" className="fdam-trigger" onClick={() => setOpenDevDropdown((prev) => (prev === areaKey ? null : areaKey))}>
                      <div className="fdam-tags">
                        {selected.length ? (
                          selected.map((tag) => (
                            <span className="fdam-tag" key={tag} onClick={(e) => e.stopPropagation()}>
                              {tag}
                              <button type="button" aria-label={`Remove ${tag}`} onClick={() => removeDraftTag(areaKey, tag)}>×</button>
                            </span>
                          ))
                        ) : (
                          <span className="fdam-placeholder">Select areas</span>
                        )}
                      </div>
                      <span className="fdam-arrow">▾</span>
                    </button>
                    {openDevDropdown === areaKey && (
                      <div className="fdam-menu">
                        {optionLookup[areaKey].map((opt) => {
                          const isSelected = selected.includes(opt.label);
                          const disabled = !isSelected && selected.length >= 3;
                          return (
                            <button
                              type="button"
                              key={opt.label}
                              className={`fdam-option ${isSelected ? "is-selected" : ""}`}
                              disabled={disabled}
                              onClick={() => toggleDevSelection(areaKey, opt.label)}
                            >
                              <span>{opt.label}</span>
                              {isSelected ? <em>✓</em> : null}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="fdam-actions">
              <button type="button" className="secondary" onClick={() => setShowDevAreasModal(false)}>Cancel</button>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setDevAreaSelections(draftDevAreaSelections);
                  setShowDevAreasModal(false);
                  setOpenDevDropdown(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showSkillsModal && (
        <div className="fsk-backdrop" onClick={() => setShowSkillsModal(false)}>
          <div className="fsk-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fsk-close" type="button" onClick={() => setShowSkillsModal(false)} aria-label="Close skills editor">
              ×
            </button>

            <h3>Skills Profile</h3>
            <p>Drag to arrange the skill in the right skill level</p>
            <div className="fsk-legend">
              <span className="high"><i />High Skill</span>
              <span className="mid"><i />Middle Skill</span>
              <span className="low"><i />Elementary Skill</span>
            </div>
            <hr />

            <div className="fsk-grid">
              {draftSkillsCards.map((skill) => (
                <article key={skill.title} className="fsk-card">
                  <h4>{skill.title}</h4>
                  {skillItemsFromCard(skill).map((pill, idx) => {
                    const levelClass = idx === 0 ? "high" : idx === 1 ? "mid" : "low";
                    const isDragging = draggedSkill?.cardTitle === skill.title && draggedSkill?.fromIndex === idx;
                    return (
                      <div
                        key={pill.label}
                        className={`fsk-pill ${levelClass} ${isDragging ? "is-dragging" : ""}`}
                        draggable
                        onDragStart={() => setDraggedSkill({ cardTitle: skill.title, fromIndex: idx })}
                        onDragEnd={() => setDraggedSkill(null)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (!draggedSkill) return;
                          if (draggedSkill.cardTitle !== skill.title) return;
                          if (draggedSkill.fromIndex === idx) return;
                          moveSkillPill(skill.title, draggedSkill.fromIndex, idx);
                          setDraggedSkill(null);
                        }}
                      >
                        <span className="dot" />
                        {pill.label}
                        <span className="handle" aria-hidden="true">⠿</span>
                      </div>
                    );
                  })}
                </article>
              ))}
            </div>

            <div className="fsk-actions">
              <button type="button" className="secondary" onClick={() => setShowSkillsModal(false)}>Cancel</button>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setSkillsCards([...draftSkillsCards]);
                  setShowSkillsModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showGoalModal && (
        <div className="fag-backdrop" onClick={() => setShowGoalModal(false)}>
          <div className="fag-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fag-close" type="button" onClick={() => setShowGoalModal(false)} aria-label="Close academic goal editor">
              ×
            </button>
            <h3>Edit Academic Goal</h3>
            <p>Update the student&apos;s focus area and progress notes.</p>
            <label className="fag-field">
              <span>Description</span>
              <textarea
                value={draftAcademicGoalText}
                onChange={(e) => setDraftAcademicGoalText(e.target.value)}
                placeholder="Enter academic goal details..."
                rows={7}
              />
            </label>
            <div className="fag-actions">
              <button type="button" className="secondary" onClick={() => setShowGoalModal(false)}>Cancel</button>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setAcademicGoalText(draftAcademicGoalText.trim() || academicGoalText);
                  setShowGoalModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
