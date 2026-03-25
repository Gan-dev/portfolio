import React from "react";

interface SkillGroup {
  category: string;
  icon: string;
  color: string;
  skills: { name: string; icon?: string }[];
}

const groups: SkillGroup[] = [
  {
    category: "Backend & APIs",
    icon: "/page_svg/web-development.svg",
    color: "#37e4e7",
    skills: [
      { name: "NestJS", icon: "/svg/nestjs.svg" },
      { name: "Node.js", icon: "/svg/nodejs.svg" },
      { name: "TypeScript", icon: "/svg/typeScript.svg" },
      { name: "DDD / Hexagonal" },
      { name: "RabbitMQ" },
      { name: "REST APIs" },
    ],
  },
  {
    category: "Databases & Data",
    icon: "/page_svg/cloud.svg",
    color: "#a78bfa",
    skills: [
      { name: "PostgreSQL", icon: "/svg/postgresql.svg" },
      { name: "MySQL", icon: "/svg/mysql.svg" },
      { name: "Snowflake" },
      { name: "Metabase" },
      { name: "Docker", icon: "/svg/docker.svg" },
      { name: "AWS EC2/RDS", icon: "/svg/aws-cloud.svg" },
    ],
  },
  {
    category: "AI & Automation",
    icon: "/page_svg/ai-platform.svg",
    color: "#f59e0b",
    skills: [
      { name: "LLM APIs / MCP" },
      { name: "n8n", icon: "/svg/n8n.svg" },
      { name: "Python", icon: "/svg/Python.svg" },
      { name: "AI Agents", icon: "/svg/ai-agent.svg" },
      { name: "WhatsApp API" },
    ],
  },
];

const SkillsList = () => {
  return (
    <div className="text-left pt-3 md:pt-9 w-full">
      <div className="mb-8">
        <h3 className="text-[var(--white)] text-3xl md:text-4xl font-bold mb-2">
          What I do
        </h3>
        <div className="h-1 w-20 bg-gradient-to-r from-[var(--sec)] to-transparent rounded-full" />
      </div>

      <div className="space-y-4 md:w-[450px] w-full">
        {groups.map((group) => (
          <div
            key={group.category}
            className="bg-[#1414149c] border border-[var(--white-icon-tr)] rounded-2xl p-4 hover:border-[var(--sec)]/20 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="p-2 rounded-xl flex-shrink-0"
                style={{ backgroundColor: `${group.color}15` }}
              >
                <img
                  src={group.icon}
                  alt={group.category}
                  className="h-5 w-5 object-contain"
                  width="20"
                  height="20"
                  loading="lazy"
                />
              </div>
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: group.color }}
              >
                {group.category}
              </span>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[var(--white-muted)] bg-[var(--white-icon-tr)] border border-[var(--component-border)] hover:text-[var(--white)] hover:border-[var(--sec)]/30 transition-colors duration-200"
                >
                  {skill.icon && (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-3.5 h-3.5 object-contain opacity-80"
                      width="14"
                      height="14"
                      loading="lazy"
                    />
                  )}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;
