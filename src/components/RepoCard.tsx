import CategoryIcon from './CategoryIcon';
import { formatStars } from '../lib/format-stars';
import type { RepositoryRecord } from '../features/catalog/catalog-types';

type RepoCardProps = {
  repo: RepositoryRecord;
};

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="repo-card">
      <div className="repo-card-head">
        <div className="repo-avatar">
          <CategoryIcon icon="github" className="repo-avatar-icon" />
        </div>
        <span className="repo-tag">{repo.category}</span>
      </div>

      <div className="repo-card-body">
        <div className="repo-title-block">
          <h3>{repo.repo}</h3>
          <p className="repo-owner">@{repo.owner}</p>
        </div>
        <p className="repo-description">{repo.description}</p>
      </div>

      <div className="repo-card-footer">
        <div className="repo-stars">
          <span className="repo-status-dot" />
          <span className="repo-star-icon">★</span>
          <span>{formatStars(repo.stars)}</span>
        </div>
        <a className="repo-link" href={repo.url} target="_blank" rel="noreferrer">
          View Source
        </a>
      </div>
    </article>
  );
}
