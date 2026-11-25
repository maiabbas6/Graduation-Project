import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';

export interface PopupSelectOption {
  id: number;
  name: string;
}

interface PopupSelectProps {
  label: string;
  value: number | null;
  options: PopupSelectOption[] | null;
  isLoading?: boolean;
  onSelect: (id: number | null) => void;
}

export function PopupSelect({ label, value, options, isLoading, onSelect }: PopupSelectProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const selected = options?.find((option) => option.id === value) ?? null;

  const handleSelect = (id: number | null) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="popup-select">
      <span className="popup-select-label">{label}</span>
      <button type="button" className="btn-outline" onClick={() => setIsOpen(true)}>
        {selected ? selected.name : t('common.select')}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={t('common.select')}>
        {isLoading ? (
          <p className="list-empty">{t('common.loading')}</p>
        ) : (
          <ul className="selection-list">
            {options?.map((option) => (
              <li key={option.id} onClick={() => handleSelect(option.id)}>
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
}
