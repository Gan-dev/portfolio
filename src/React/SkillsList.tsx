import React, { useState } from "react";

type SkillCategory = "AI-Agent/ML" | "Web Development" | "Cloud Computing";

const CategoryIcons: Record<SkillCategory, React.ReactElement> = {
  "AI-Agent/ML": (
    <img
      src={`/page_svg/ai-platform.svg`}
      alt={"AI Platform"}
      className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
      width="32"
      height="32"
      loading="lazy"
    />
  ),
  "Web Development": (
    <img
      src={`/page_svg/web-development.svg`}
      alt={"Web Development"}
      className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
      width="32"
      height="32"
      loading="lazy"
    />
  ),
  "Cloud Computing": (
    <img
      src={`/page_svg/cloud.svg`}
      alt={"Cloud Computing"}
      className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
      width="32"
      height="32"
      loading="lazy"
    />
  ),
};

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const skills: Record<SkillCategory, string[]> = {
    "AI-Agent/ML": [
      "Integration of AI agents and machine learning models into backend systems",
      "Building APIs for AI-driven applications",
      "Automation of workflows using AI and data processing",
    ],
    "Web Development": [
      "Design and implementation of RESTful and GraphQL APIs",
      "Scalable server-side architecture using Node.js, Python, or Go",
      "Database design and optimization (SQL & NoSQL)",
    ],
    "Cloud Computing": [
      "Cloud infrastructure deployment with AWS, Azure, or GCP",
      "Containerization and orchestration with Docker & Kubernetes",
      "CI/CD pipelines and backend monitoring for high availability",
    ],
  };

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="text-left pt-3 md:pt-9 w-full">
      <div className="mb-8">
        <h3 className="text-[var(--white)] text-3xl md:text-4xl font-bold mb-2">
          What I do?
        </h3>
        <div className="h-1 w-20 bg-gradient-to-r from-[var(--sec)] to-transparent rounded-full"></div>
      </div>
      
      <div className="space-y-3">
        {(Object.entries(skills) as [SkillCategory, string[]][]).map(([category, items]) => {
          const isOpen = openItem === category;
          return (
            <div
              key={category}
              className="group relative md:w-[450px] w-full"
            >
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--sec)]/20 via-transparent to-[var(--sec)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${
                  isOpen ? "opacity-100" : ""
                }`}
              ></div>
              
              <div
                className={`relative bg-[#1414149c] backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[var(--sec)]/30 shadow-lg shadow-[var(--sec)]/10"
                    : "border-[var(--white-icon-tr)] hover:border-[var(--sec)]/20"
                }`}
              >
                <button
                  onClick={() => toggleItem(category)}
                  className="w-full text-left p-5 flex items-center gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  {/* Icon container */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`absolute inset-0 rounded-xl bg-[var(--sec)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md ${
                        isOpen ? "opacity-10" : ""
                      }`}
                    ></div>
                    <div className="relative p-2.5 rounded-xl bg-[var(--white-icon-tr)] group-hover:bg-[var(--sec)]/10 transition-colors duration-300">
                      {CategoryIcons[category]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <h4 className="text-[var(--white)] text-lg md:text-xl font-semibold group-hover:text-[var(--sec)] transition-colors duration-300">
                      {category}
                    </h4>
                    <p className="text-[var(--white-icon)] text-sm mt-0.5">
                      {items.length} key capabilities
                    </p>
                  </div>

                  {/* Arrow icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 text-[var(--sec)]"
                        : "text-[var(--white-icon)] group-hover:text-[var(--sec)]"
                    }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </button>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-2">
                    <div className="h-px bg-gradient-to-r from-[var(--sec)]/30 via-[var(--white-icon-tr)] to-transparent mb-4"></div>
                    <ul className="space-y-3">
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-[var(--white-icon)] text-sm leading-relaxed group/item"
                          style={{
                            animation: isOpen
                              ? `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                              : "none",
                          }}
                        >
                          <svg
                            className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--sec)] opacity-60 group-hover/item:opacity-100 transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="group-hover/item:text-[var(--white)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default SkillsList;
