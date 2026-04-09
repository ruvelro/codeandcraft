import { useEffect, useMemo, useRef, useState } from 'react';
import RepoCard from './RepoCard';
import type { RepositoryRecord } from '../features/catalog/catalog-types';

type RepoGridProps = {
  repos: RepositoryRecord[];
};

const PAGE_SIZE = 24;

export default function RepoGrid({ repos }: RepoGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [repos]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }

        setVisibleCount((current) => Math.min(current + PAGE_SIZE, repos.length));
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [repos.length]);

  const visibleRepos = useMemo(() => repos.slice(0, visibleCount), [repos, visibleCount]);

  if (repos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No results</h3>
        <p>Adjust the search text, category, or minimum stars threshold.</p>
      </div>
    );
  }

  return (
    <section className="repo-grid-wrap">
      <div className="repo-grid-meta">
        <span>Order: stars from highest to lowest</span>
        <span>
          {visibleRepos.length.toLocaleString('en-US')} of {repos.length.toLocaleString('en-US')} results loaded
        </span>
      </div>
      <div className="repo-grid">
        {visibleRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      {visibleCount < repos.length ? (
        <div ref={sentinelRef} className="repo-grid-sentinel">
          Loading more repositories...
        </div>
      ) : null}
    </section>
  );
}
