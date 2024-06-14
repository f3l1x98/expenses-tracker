export interface StoreStateStatus {
  error: string | undefined;
  status: 'initial' | 'error' | 'pending' | 'success';
}
