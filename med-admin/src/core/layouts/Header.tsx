import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProfileController } from '../hooks/useProfileController';
import { PageSearch } from '../components/PageSearch';

export function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { state, isSuccess, isLoading } = useProfileController();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const profile = state.data;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const avatarChar = profile?.first_name?.charAt(0)?.toUpperCase() ?? 'A';

  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isProfileOpen]);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="topbar-brand">
          <span className="topbar-logo">M</span>
          <span className="topbar-title">{t('header.brand')}</span>
        </Link>

        <div className="topbar-search">
          <PageSearch />
        </div>

        <div className="topbar-actions">
          <button type="button" className="topbar-lang" onClick={toggleLanguage} aria-label="Toggle language">
            {i18n.language === 'en' ? 'AR' : 'EN'}
          </button>
          <button type="button" className="topbar-notify" aria-label={t('header.notifications')} onClick={() => navigate('/notifications')}>
            <span className="notify-dot"></span>
          </button>
          <div className="topbar-profile-wrap" ref={profileRef}>
            <button
              type="button"
              className="topbar-profile"
              aria-label="Account menu"
              aria-haspopup="dialog"
              aria-expanded={isProfileOpen}
              onClick={() => setIsProfileOpen((open) => !open)}
            >
              {avatarChar}
            </button>

            {isProfileOpen && (
              <div className="profile-popover" role="dialog" aria-label={t('header.account')}>
                <div className="profile-popover-header">
                  <span className="profile-popover-avatar" aria-hidden="true">{avatarChar}</span>
                  <div className="profile-popover-heading">
                    <strong className="profile-popover-name">
                      {isSuccess && profile ? `${profile.first_name} ${profile.last_name}` : t('header.account')}
                    </strong>
                    <span className="profile-popover-phone">
                      {isSuccess && profile ? profile.phone : isLoading ? t('common.loading') : '—'}
                    </span>
                  </div>
                </div>
                <button type="button" className="btn-logout profile-popover-logout" onClick={handleLogout}>
                  {t('header.signOut')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
