export interface Notification {
  severity: 'info' | 'warn' | 'success' | 'error';
  summary: string;
  detail: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
}
