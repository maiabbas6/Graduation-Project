import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface RoomFormProps {
  submitLabel: string;
  onSubmit: (name: string) => void;
  isSubmitting?: boolean;
}

export function RoomForm({ submitLabel, onSubmit, isSubmitting }: RoomFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setName('');
  };

  return (
    <form className="room-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={t('rooms.roomNamePlaceholder')}
      />
      <button type="submit" className="filter-button" disabled={isSubmitting}>
        {submitLabel}
      </button>
    </form>
  );
}
