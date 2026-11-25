import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useAiChatDetailController } from '../hooks/useAiChatDetailController';
import { ChatMessages } from '../components/ChatMessages';
import { MessageForm } from '../components/MessageForm';
import './AiChatDetailPage.css';

export function AiChatDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const chatId = Number(id);
  const { state, refetch, sendMessage } = useAiChatDetailController(chatId);

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t('aiAssistant.title')}
        subtitle={t('aiAssistant.continueConversation')}
        actions={<Link to="/ai-assistant" className="ai-back-link">{t('aiAssistant.backToConversations')}</Link>}
      />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(chat) => (
          <>
            <div className="dashboard-card">
              <h3 className="ai-section-title">{chat.title}</h3>
              <ChatMessages messages={chat.messages} />
            </div>
            <div className="dashboard-card">
              <MessageForm
                onSubmit={(message, image) => sendMessage.sendData({ message, image })}
                isSubmitting={sendMessage.isSubmitting}
              />
            </div>
          </>
        )}
      />
    </div>
  );
}
