import { useEffect, useState } from "react";
import { ITask } from "../types";
import { initialForm } from "../helpers/initialForm";
import Swal from "sweetalert2";

const useTaskCRUD = () => {
  const storedTasks = localStorage.getItem("Tasks");
  const storedTasksCompleted = localStorage.getItem("TasksCompleted");

  const [tasks, setTasks] = useState<ITask[]>(
    storedTasks ? JSON.parse(storedTasks) : []
  );

  const [tasksCompleted, setTasksCompleted] = useState<ITask[]>(
    storedTasksCompleted ? JSON.parse(storedTasksCompleted) : []
  );

  const [edit, setEdit] = useState<ITask>(initialForm);
  const [errorForm, setErrorForm] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    localStorage.setItem("TasksCompleted", JSON.stringify(tasksCompleted));
  }, [tasks, tasksCompleted]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [edit]);

  const addTask = (task: ITask): void => {
    const idTask = crypto.randomUUID().slice(0, 8);
    const LimitName = task.name.slice(0, 50).trim();

    if (task.priority === "media") task.order = 1;
    if (task.priority === "baja") task.order = 2;

    setTasks([{ ...task, id: idTask, name: LimitName }, ...tasks]);
  };

  const getEditTask = (task: ITask) => {
    console.log(task);
    setEdit(task);
    setDisabled(true);
  };

  const btnCancel = () => {
    setDisabled(false);
    setEdit(initialForm);
  };

  const editTask = (form: ITask): void => {
    const newTasks = tasks.map((task) => {
      return task.id === form.id ? form : task;
    });

    const isEdited = tasks.some((task) => {
      return task.name === form.name && task.priority === form.priority;
    });

    if (!isEdited) {
      btnCancel();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Editada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setTasks(newTasks);
    btnCancel();
  };

  const deleteTask = (id: string): void => {
    Swal.fire({
      title: "¿Estas seguro de eliminar la tarea?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡Eliminar!",
    }).then(() => {
      const removeTask = tasks.filter((task) => task.id !== id);
      setTasks(removeTask);

      const removeTaskCompleted = tasksCompleted.filter(
        (task) => task.id !== id
      );
      setTasksCompleted(removeTaskCompleted);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Eliminada 🙂",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const handleCompleted = (task: ITask): void => {
    if (tasks.find((el) => el.id === task.id)) {
      const item = tasks.filter((el) => el.id !== task.id);
      setTasks(item);
      setTasksCompleted([...tasksCompleted, { ...task, completed: true }]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Completada 😁",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (tasksCompleted.find((el) => el.id === task.id)) {
      const item = tasksCompleted.filter((el) => el.id !== task.id);
      setTasksCompleted(item);
      setTasks([...tasks, { ...task, completed: false }]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Pendiente 🤔",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleError = (error: boolean): void => {
    setErrorForm(error);
  };

  return {
    tasks,
    tasksCompleted,
    edit,
    errorForm,
    disabled,
    addTask,
    getEditTask,
    editTask,
    deleteTask,
    handleCompleted,
    handleError,
    btnCancel,
  };
};

export default useTaskCRUD;
