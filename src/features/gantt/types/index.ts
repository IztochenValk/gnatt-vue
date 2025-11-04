// Types internes au canvas
export type Tick = { index: number; date: Date; label: string };
export type TaskView = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  row: number;
};
