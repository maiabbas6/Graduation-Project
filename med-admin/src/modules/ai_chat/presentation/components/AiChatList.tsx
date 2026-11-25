import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { AiChatModel } from '../../data/models/AiChatModel';
import './AiChatList.css';

interface AiChatListProps {
  chats: AiChatModel[];
}

const formatDate = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleDateString();
};

export function AiChatList({ chats }: AiChatListProps) {
  const { t } = useTranslation();

  if (!chats || chats.length === 0) {
    return <p className="list-empty">{t('aiAssistant.noConversations')}</p>;
  }

  return (
    <ul className="ai-chat-list">
      {chats.map((chat) => (
        <li key={chat.id} className="ai-chat-row">
          <Link className="ai-chat-link" to={`/ai-assistant/${chat.id}`}>
            <div className="ai-chat-icon" aria-hidden="true">AI</div>
            <div className="ai-chat-info">
              <strong className="ai-chat-title">{chat.title}</strong>
              <span className="ai-chat-meta">{formatDate(chat.created_at)}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
