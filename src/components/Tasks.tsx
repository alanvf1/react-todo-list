import { Task } from "./Task";
import styles from "./Tasks.module.css";
import clipboardImg from "../assets/clipboard.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";

const tasksList = JSON.parse(localStorage.getItem("tasks") ?? "");

export function Tasks() {
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [isTaskTextEmpty, setIsTaskTextEmpty] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(tasksList);
  const [countTotalTasks, setCountTotalTasks] = useState<number>(0);
  const [countDoneTasks, setCountDoneTasks] = useState<number>(0);

  function handleNewTaskTextChange(e: ChangeEvent<HTMLInputElement>) {
    setIsTaskTextEmpty(false);
    setNewTaskText(e.target.value);
  }

  function handleNewTask(e: FormEvent) {
    e.preventDefault();
    if (newTaskText === "") {
      setIsTaskTextEmpty(true);
      return;
    }
    const id = uuidv4();
    const newTask = {
      id,
      content: newTaskText,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    setNewTaskText("");
  }

  function changeTask(taskId: string) {
    const newTasksList = tasks.map((task) => {
      if (task.id == taskId) {
        task.isDone = !task.isDone;
        return task;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasksList));
    setTasks(newTasksList);
  }

  function deleteTask(taskId: string) {
    const newTasksList = tasks.filter((task) => taskId != task.id);
    localStorage.setItem("tasks", JSON.stringify(newTasksList));
    setTasks(newTasksList);
  }

  useEffect(() => {
    setCountTotalTasks(tasks.length);
    const doneTasks = tasks.filter((task) => task.isDone == true).length;
    setCountDoneTasks(doneTasks);
  }, [tasks]);

  const hasTasks = tasks.length > 0;

  return (
    <>
      <form onSubmit={handleNewTask} className={styles.formCreateTask}>
        <div>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskTextChange}
          />
          {isTaskTextEmpty && (
            <p className={styles.formCreateTaskError}>Dê um nome à tarefa.</p>
          )}
        </div>
        <button type="submit" disabled={isTaskTextEmpty}>
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </form>

      <div className={styles.tasks}>
        <div className={styles.tasksInfos}>
          <span className={styles.tasksInfosBlue}>
            Tarefas criadas <span>{countTotalTasks}</span>
          </span>
          <span className={styles.tasksInfosPurple}>
            Concluídas{" "}
            <span>
              {hasTasks
                ? `${countDoneTasks} de ${countTotalTasks}`
                : countTotalTasks}
            </span>
          </span>
        </div>
        <div className={styles.tasksList}>
          {hasTasks ? (
            tasks?.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                content={task.content}
                isDone={task.isDone}
                onChangeTask={changeTask}
                onDeleteTask={deleteTask}
              />
            ))
          ) : (
            <div className={styles.tasksEmpty}>
              <img src={clipboardImg} />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
