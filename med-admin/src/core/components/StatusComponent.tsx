import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { DataState, DataStatus } from '../utils/dataState';

interface StatusComponentProps<T> {
  state: DataState<T>;
  onSuccess: (data: T) => ReactNode;
  onError?: (message: string) => ReactNode;
  onLoading?: () => ReactNode;
  onInit?: () => ReactNode;
}

export function StatusComponent<T>({
  state,
  onSuccess,
  onError,
  onLoading,
  onInit,
}: StatusComponentProps<T>) {
  const { t } = useTranslation();
  switch (state.status) {
    case DataStatus.ERROR:
      if (onError) {
        return <>{onError(state.error || t('common.unknownError'))}</>;
      }
      return (
        <div className="dashboard-card status-error">
          <span className="status-message">{state.error || t('common.unknownError')}</span>
        </div>
      );

    case DataStatus.SUCCESS:
      return <>{onSuccess(state.data!)}</>;

    case DataStatus.INIT:
      if (onInit) return <>{onInit()}</>;
      return <DefaultLoader />;

    case DataStatus.LOADING:
      if (onLoading) return <>{onLoading()}</>;
      return <DefaultLoader />;

    default:
      return null;
  }
}

function DefaultLoader() {
  return (
    <div className="status-loader">
      <div className="spinner"></div>
    </div>
  );
}
