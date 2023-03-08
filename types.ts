export type Task = {
  id: string;
  task: string;
  finished: boolean;
  createdAt: Date;
  userId: string;
};

export interface ITodos {
  todos: Task[];
  onRemoveTodo: (id: string) => void;
  onHandleCompleted: ({
    id,
    finished,
  }: {
    id: string;
    finished: boolean;
  }) => void;
}

export interface Itodo {
  todo: Task;
  onRemoveTodo: (id: string) => void;
  onHandleCompleted: ({
    id,
    finished,
  }: {
    id: string;
    finished: boolean;
  }) => void;
}

export interface IForm {
  onHandleAdd: (task: string) => void;
}
