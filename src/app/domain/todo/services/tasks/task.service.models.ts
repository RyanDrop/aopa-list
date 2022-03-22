export enum KeyLists {
  TODAY = 'today',
  WEEK = 'week',
}

export interface Task {
  id: number;
  description: string;
  status: boolean;
}
