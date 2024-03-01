import { Check, Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";

export interface Task {
  id: string;
  content: string;
  isDone: boolean;
}

interface TaskProps extends Task {
  onChangeTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({
  id,
  content,
  isDone,
  onChangeTask,
  onDeleteTask,
}: TaskProps) {
  function handleChangeTask() {
    onChangeTask(id);
  }
  function handleDeleteTask() {
    onDeleteTask(id);
  }
  return (
    <div className={styles.task} data-task-id={id}>
      <button
        className={`${styles.taskCheck} ${isDone && styles.isDone}`}
        onClick={handleChangeTask}
      >
        {isDone && <Check size={10} />}
      </button>
      <p className={`${isDone && styles.isDone}`}>{content}</p>
      <button
        title="Excluir tarefa"
        className={styles.taskDelete}
        onClick={handleDeleteTask}
      >
        <Trash size={20} />
      </button>
    </div>
  );
}
