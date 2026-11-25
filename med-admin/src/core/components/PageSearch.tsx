import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appNavItems } from '../const/appNav';

export function PageSearch() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return appNavItems;
        return appNavItems.filter((item) => {
            const label = t(item.labelKey).toLowerCase();
            const path = item.to.toLowerCase();
            return label.includes(q) || path.includes(q);
        });
    }, [query, t]);

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen]);

    const go = (to: string) => {
        navigate(to);
        setQuery('');
        setIsOpen(false);
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, results.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const item = results[activeIndex];
            if (item) go(item.to);
        }
    };

    const hasQuery = query.trim() !== '';

    return (
        <div className="page-search" ref={containerRef}>
            <input
                type="search"
                className="topbar-search-input"
                placeholder={t('header.search')}
                aria-label={t('header.search')}
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
            />
            {isOpen && results.length > 0 && (
                <ul className="page-search-results" role="listbox">
                    {results.map((item, index) => (
                        <li
                            key={item.to}
                            role="option"
                            aria-selected={index === activeIndex}
                            className={`page-search-item${index === activeIndex ? ' active' : ''}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => go(item.to)}
                        >
                            {t(item.labelKey)}
                        </li>
                    ))}
                </ul>
            )}
            {isOpen && hasQuery && results.length === 0 && (
                <ul className="page-search-results">
                    <li className="page-search-empty">{t('header.noResults')}</li>
                </ul>
            )}
        </div>
    );
}
