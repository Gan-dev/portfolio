import { useEffect, useState, useRef } from "react";

const GITHUB_USER = "Gan-dev";
const GITHUB_ORG = "gandev-com";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Astro: "#ff5a03",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Dockerfile: "#2496ed",
  Vue: "#41b883",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C#": "#178600",
};

function useCountUp(target: number, duration = 1200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active, duration]);
  return count;
}

interface LangEntry {
  name: string;
  count: number;
}

interface Stats {
  repos: number;
  stars: number;
  followers: number;
  recentCommits: number;
  languages: LangEntry[];
  profileUrl: string;
  avatarUrl: string;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Trigger count-up animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [userRes, reposRes, eventsRes, orgReposRes, orgEventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=100`),
          fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/orgs/${GITHUB_ORG}/events?per_page=100`),
        ]);

        if (!userRes.ok) throw new Error("GitHub API error");

        const user = await userRes.json();
        const repos = await reposRes.json();
        const events = await eventsRes.json();
        const orgRepos = orgReposRes.ok ? await orgReposRes.json() : [];
        const orgEvents = orgEventsRes.ok ? await orgEventsRes.json() : [];

        const allRepos = [
          ...(Array.isArray(repos) ? repos : []),
          ...(Array.isArray(orgRepos) ? orgRepos : []),
        ];

        const stars = allRepos.reduce(
          (acc: number, r: any) => acc + (r.stargazers_count || 0),
          0
        );

        const langMap: Record<string, number> = {};
        allRepos.forEach((r: any) => {
          if (r.language && !r.fork) {
            langMap[r.language] = (langMap[r.language] || 0) + 1;
          }
        });

        const languages: LangEntry[] = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }));

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const countCommits = (evs: any[]) =>
          Array.isArray(evs)
            ? evs
                .filter(
                  (e: any) =>
                    e.type === "PushEvent" &&
                    new Date(e.created_at) > thirtyDaysAgo &&
                    (e.actor?.login?.toLowerCase() === GITHUB_USER.toLowerCase())
                )
                .reduce((acc: number, e: any) => acc + (e.payload?.commits?.length || 0), 0)
            : 0;

        const recentCommits = countCommits(events) + countCommits(orgEvents);

        const totalRepos =
          (user.public_repos || 0) +
          (Array.isArray(orgRepos) ? orgRepos.filter((r: any) => !r.private).length : 0);

        setStats({
          repos: totalRepos,
          stars,
          followers: user.followers || 0,
          recentCommits,
          languages,
          profileUrl: user.html_url || `https://github.com/${GITHUB_USER}`,
          avatarUrl: user.avatar_url || "",
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const animActive = visible && !loading && !error;
  const repos = useCountUp(stats?.repos ?? 0, 1200, animActive);
  const stars = useCountUp(stats?.stars ?? 0, 1200, animActive);
  const followers = useCountUp(stats?.followers ?? 0, 1200, animActive);
  const commits = useCountUp(stats?.recentCommits ?? 0, 1200, animActive);

  const maxLangCount = stats?.languages[0]?.count ?? 1;

  const statItems = [
    {
      value: repos,
      label: "Public Repos",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z" />
        </svg>
      ),
    },
    {
      value: stars,
      label: "Total Stars",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2L14.09 8.26L21 9L16 14L17.18 21L12 18L6.82 21L8 14L3 9L9.91 8.26L12 2Z" />
        </svg>
      ),
    },
    {
      value: followers,
      label: "Followers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      ),
    },
    {
      value: commits,
      label: "Commits (30d)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 18.178L4.62 21.563 6.017 13.68 0 7.854l7.938-1.105L12 1.6l4.062 5.15L24 7.854l-6.017 5.826 1.397 7.883L12 18.178z" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={ref} className="w-full">
      {loading && (
        <div className="flex items-center justify-center py-6">
          <div className="w-5 h-5 rounded-full border-2 border-[var(--sec)]/20 border-t-[var(--sec)]" style={{ animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {error && (
        <p className="text-[10px] text-[var(--white-muted)] text-center py-4">
          Could not load —{" "}
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="text-[var(--sec)] hover:underline">GitHub</a>
        </p>
      )}

      {!loading && !error && stats && (
        <div className="space-y-4">
          {/* 4 stats in a 2x2 minimal grid */}
          <div className="grid grid-cols-2 gap-px bg-[var(--component-border)] rounded-xl overflow-hidden border border-[var(--component-border)]">
            {statItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5 px-4 py-3 bg-[var(--component-bg)]">
                <span className="text-2xl font-bold text-[var(--white)] tabular-nums leading-none">{item.value}</span>
                <span className="text-[10px] text-[var(--white-muted)] mt-1">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Language dots — single line */}
          {stats.languages.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 px-1">
              {stats.languages.map((lang) => {
                const color = LANG_COLORS[lang.name] ?? "#6b7280";
                return (
                  <div key={lang.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-[11px] text-[var(--white-muted)]">{lang.name}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* View profile link */}
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-[var(--white-muted)] hover:text-[var(--sec)] transition-colors duration-200 px-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
            </svg>
            github.com/Gan-dev
          </a>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;
