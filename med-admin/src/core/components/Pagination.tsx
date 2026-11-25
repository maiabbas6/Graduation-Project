import { useTranslation } from 'react-i18next';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onChange: (page: number) => void;
}

type PageItem = number | 'ellipsis';

const buildPageItems = (currentPage: number, lastPage: number): PageItem[] => {
  const items: PageItem[] = [1];

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(lastPage - 1, currentPage + 1);

  if (start > 2) items.push('ellipsis');
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < lastPage - 1) items.push('ellipsis');

  if (lastPage > 1) items.push(lastPage);

  return items;
};

export function Pagination({ currentPage, lastPage, onChange }: PaginationProps) {
  const { t } = useTranslation();
  if (lastPage <= 1) return null;

  const items = buildPageItems(currentPage, lastPage);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="pagination-btn" disabled={currentPage <= 1} onClick={() => onChange(currentPage - 1)}>
        {t('common.previous')}
      </button>
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            className={`pagination-btn${item === currentPage ? ' active' : ''}`}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        )
      )}
      <button className="pagination-btn" disabled={currentPage >= lastPage} onClick={() => onChange(currentPage + 1)}>
        {t('common.next')}
      </button>
    </nav>
  );
}