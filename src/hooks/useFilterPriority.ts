import { useEffect, useState } from "react";
import { ITask } from "../types";

const useFilterPriority = (tasks: ITask[]) => {
  const [filterPriority, setFilterPriority] = useState<ITask[]>([]);
  const [priority, setPriority] = useState<string>("todas");

  const getPriority = (priority: string): void => {
    setPriority(priority);
  };

  const filter = (tasks: ITask[], priority: string): void => {
    if (priority === "todas") {
      return setFilterPriority(tasks);
    }

    const newArray = tasks.filter((task) => task.priority == priority);
    return setFilterPriority(newArray);
  };

  useEffect(() => {
    filter(tasks, priority);
  }, [tasks, priority]);

  return { getPriority, filterPriority, priority };
};

export default useFilterPriority;
