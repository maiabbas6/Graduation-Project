import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthController } from '../hooks/useAuthController';
import './LoginPage.css';

interface LoginLocationState {
  from?: { pathname?: string };
}

export function LoginPage() {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login, state, isSubmitting } = useAuthController();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (state.isSuccess) {
      const from = (location.state as LoginLocationState | null)?.from?.pathname ?? '/';
      navigate(from);
    }
  }, [state.isSuccess, navigate, location.state]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login({ phone, password });
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">{t('login.signIn')}</h1>
        <p className="login-subtitle">{t('login.subtitle')}</p>

        <label className="login-field">
          <span>{t('login.phone')}</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="0933214587"
            required
          />
        </label>

        <label className="login-field">
          <span>{t('login.password')}</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t('login.passwordPlaceholder')}
            required
          />
        </label>

        {state.isError && <p className="login-error">{String(state.error)}</p>}

        <button className="login-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('login.signingIn') : t('login.signIn')}
        </button>
      </form>
    </div>
  );
}