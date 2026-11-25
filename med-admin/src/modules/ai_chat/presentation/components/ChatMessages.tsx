import { useTranslation } from 'react-i18next';
import type { AiChatMessageModel } from '../../data/models/AiChatModel';
import Markdown from 'react-markdown';
import './ChatMessages.css';

interface ChatMessagesProps {
  messages: AiChatMessageModel[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const { t } = useTranslation();

  if (!messages || messages.length === 0) {
    return <p className="list-empty">{t('aiAssistant.noMessages')}</p>;
  }

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <div key={message.id} className="chat-message-group">
          <div className="chat-bubble chat-bubble-user">
            {message.image_url && (
              <img src={message.image_url} alt="User image" className="chat-message-image" />
            )}
            <p>{message.question}</p>
          </div>
          <div className="chat-bubble chat-bubble-ai">
            <Markdown>{message.answer}</Markdown>
          </div>
        </div>
      ))}
    </div>
  );
}
