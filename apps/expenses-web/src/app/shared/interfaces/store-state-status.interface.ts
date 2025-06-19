export interface StoreStateStatus {
  error: string | undefined;
  status: 'initial' | 'error' | 'pending' | 'success';
}

export type UpdateStoreStateStatus = StoreStateStatus & {
  isEdit: boolean;
  editingId: string | undefined; // Id of entity that is currently being edited
};
