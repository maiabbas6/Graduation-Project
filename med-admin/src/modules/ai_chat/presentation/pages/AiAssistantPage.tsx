import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useAiChatsController } from '../hooks/useAiChatsController';
import { AiChatList } from '../components/AiChatList';
import { NewChatForm } from '../components/NewChatForm';
import './AiAssistantPage.css';

export function AiAssistantPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, refetch, createChat } = useAiChatsController((chat) =>
    navigate(`/ai-assistant/${chat.id}`)
  );

  return (
    <div className="dashboard-page">
      <PageHeader title={t('aiAssistant.title')} subtitle={t('aiAssistant.subtitle')} />

      <div className="dashboard-card">
        <h3 className="ai-section-title">{t('aiAssistant.newConversation')}</h3>
        <NewChatForm
          onSubmit={(message, image) => createChat.sendData({ message, image })}
          isSubmitting={createChat.isSubmitting}
        />
      </div>

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(chats) => (
          <div className="dashboard-card">
            <h3 className="ai-section-title">{t('aiAssistant.recentConversations')}</h3>
            <AiChatList chats={chats} />
          </div>
        )}
      />
    </div>
  );
}
