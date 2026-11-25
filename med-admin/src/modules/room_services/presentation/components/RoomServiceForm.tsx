import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface RoomServiceFormProps {
  submitLabel: string;
  onSubmit: (name: string, price: string) => void;
  isSubmitting?: boolean;
}

export function RoomServiceForm({ submitLabel, onSubmit, isSubmitting }: RoomServiceFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedPrice = price.trim();
    if (!trimmedName || !trimmedPrice) return;
    onSubmit(trimmedName, trimmedPrice);
    setName('');
    setPrice('');
  };

  return (
    <form className="room-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={t('roomServices.serviceNamePlaceholder')}
      />
      <input
        type="text"
        inputMode="decimal"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder={t('roomServices.pricePlaceholder')}
      />
      <button type="submit" className="filter-button" disabled={isSubmitting}>
        {submitLabel}
      </button>
    </form>
  );
}
