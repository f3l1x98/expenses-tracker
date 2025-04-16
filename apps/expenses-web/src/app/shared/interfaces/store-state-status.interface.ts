export interface StoreStateStatus {
  error: string | undefined;
  status: 'initial' | 'error' | 'pending' | 'success';
}

export type UpdateStoreStateStatus = {
  [expenseId: string]: UpdateStoreStateStatusEntry;
};

export type UpdateStoreStateStatusEntry = StoreStateStatus & {
  isEdit: boolean;
};
