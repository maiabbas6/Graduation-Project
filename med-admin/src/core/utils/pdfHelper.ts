import { ApiConst } from '../const/ApiConst';

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function timestamp(): string {
  return new Date().toISOString().slice(0, 10);
}

async function downloadPdf(url: string, filename: string): Promise<void> {
  const response = await fetch(url, { headers: authHeaders() });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || `Download failed (${response.status})`);
  }
  const blob = await response.blob();
  triggerDownload(blob, filename);
}

export async function downloadStatisticsPdf() {
  await downloadPdf(ApiConst.statisticsExportPdf, `statistics-${timestamp()}.pdf`);
}

export async function downloadMedicalReportPdf(userId: number) {
  await downloadPdf(ApiConst.userMedicalReportPdf(userId), `medical-report-${userId}-${timestamp()}.pdf`);
}

export async function downloadCostPdf(costId: number) {
  await downloadPdf(ApiConst.costExportPdf(costId), `cost-${costId}-${timestamp()}.pdf`);
}
