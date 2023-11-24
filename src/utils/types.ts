export enum EntryState {
  'invalidated' = 'invalidated',
  'validating' = 'validating',
  'validated' = 'validated'
}

export type Entry = {
  value: number;
  state: EntryState;
}

export enum Sorting {
  'merge' = 'merge',
  'quick' = 'quick',
  'heap' = 'heap',
  'bubble' = 'bubble'
}
