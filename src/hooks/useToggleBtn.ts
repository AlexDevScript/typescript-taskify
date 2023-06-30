import { useEffect, useState } from "react";

const useToggleBtn = (taskCounter?: number, taskCompleted?: number) => {
  const [isToggleTask, setIsToggleTask] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleTasks = (toggleTask: boolean): void => {
    setIsToggleTask(toggleTask);
  };

  const toggle = (): void => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    if (taskCounter === 0) toggleTasks(false);
    if (taskCompleted === 0) toggleTasks(true);
  }, [taskCounter, taskCompleted]);

  return {
    toggle,
    toggleTasks,
    isToggleTask,
    isShow,
  };
};

export default useToggleBtn;
