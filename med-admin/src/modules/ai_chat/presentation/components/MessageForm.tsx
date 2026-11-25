import { useState, useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './chatForm.css';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

interface MessageFormProps {
  onSubmit: (message: string, image?: File) => void;
  isSubmitting?: boolean;
}

export function MessageForm({ onSubmit, isSubmitting }: MessageFormProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageError(null);

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError(t('aiAssistant.imageTooLarge'));
      event.target.value = '';
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed && !image) return;
    onSubmit(trimmed, image ?? undefined);
    setMessage('');
    removeImage();
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      {imagePreview && (
        <div className="chat-image-preview">
          <img src={imagePreview} alt="Preview" />
          <button type="button" className="chat-image-remove" onClick={removeImage}>×</button>
        </div>
      )}
      {imageError && <p className="chat-image-error">{imageError}</p>}
      <div className="chat-form-row">
        <textarea
          className="chat-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t('aiAssistant.typeMessage')}
          rows={2}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="chat-file-input"
          onChange={handleImageChange}
        />
        <button
          type="button"
          className="chat-attach-btn"
          onClick={() => fileInputRef.current?.click()}
          title={t('aiAssistant.attachImage')}
        >
          📎
        </button>
        <button type="submit" className="btn-primary-pill chat-submit" disabled={isSubmitting}>
          {isSubmitting ? t('aiAssistant.sending') : t('aiAssistant.send')}
        </button>
      </div>
    </form>
  );
}
