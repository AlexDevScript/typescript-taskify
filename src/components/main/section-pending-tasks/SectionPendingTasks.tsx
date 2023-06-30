import { ITask } from "../../../types";
import ListTask from "../tasks-List/ListTask";
import PendingTasksButton from "./PendingTasksButton";
import useFilterPriority from "../../../hooks/useFilterPriority";
import useToggleBtn from "../../../hooks/useToggleBtn";

interface Props {
  tasks: ITask[];
  getEditTask: (task: ITask) => void;
  handleCompleted: (task: ITask) => void;
  deleteTask: (id: string) => void;
  disabled?: boolean;
}

const SectionPendingTasks = ({
  tasks,
  getEditTask,
  handleCompleted,
  deleteTask,
  disabled,
}: Props) => {
  const { toggle, isShow } = useToggleBtn();
  const textBtbfilter = isShow ? "Ocultar Filtro" : "Mostrar Filtro";

  function countTasksByPriority(tasks: ITask[], priority: string): number {
    const count = tasks.filter((task) => task.priority === priority);
    return count.length;
  }
  const { getPriority, filterPriority, priority } = useFilterPriority(tasks);

  return (
    <section className="relative">
      <div className="bg-primary sticky top-0 text-center">
        <h3 className="h-12 text-xl bg-sky-800 text-shadow-white font-bold text-white grid place-items-center tracking-wider">
          Tareas Pendientes
        </h3>

        <div className="md:h-24 md:flex justify-evenly items-center">
          {tasks.length > 0 && (
            <button
              className="w-44 my-2 bg-slate-400 text-white font-semibold tracking-wide rounded py-2 active:scale-95 ease-out duration-100 ring-white active:ring-2 md:h-12 "
              onClick={() => toggle()}>
              {textBtbfilter}
            </button>
          )}

          {isShow && (
            <div className="w-full h-20 flex justify-evenly md:w-1/2  md:justify-between items-center">
              <PendingTasksButton
                name="Todas"
                bgColor="bg-secondary border-2 border-indigo-300"
                textColor="text-white"
                active={priority}
                onClick={() => getPriority("todas")}
              />
              <PendingTasksButton
                name="Alta"
                bgColor="bg-secondary border-4 border-red-700 border-x "
                textColor="text-white"
                active={priority}
                noTasks={countTasksByPriority(tasks, "alta")}
                onClick={() => getPriority("alta")}
              />
              <PendingTasksButton
                name="Media"
                bgColor="bg-secondary border-4 border-orange-500 border-x"
                textColor="text-white"
                active={priority}
                noTasks={countTasksByPriority(tasks, "media")}
                onClick={() => getPriority("media")}
              />

              <PendingTasksButton
                name="Baja"
                bgColor="bg-secondary border-4 border-yellow-300 border-x"
                textColor="text-white"
                active={priority}
                noTasks={countTasksByPriority(tasks, "baja")}
                onClick={() => getPriority("baja")}
              />
            </div>
          )}
        </div>
      </div>

      <ListTask
        tasks={filterPriority}
        getEditTask={getEditTask}
        handleCompleted={handleCompleted}
        deleteTask={deleteTask}
        disabled={disabled}
      />
    </section>
  );
};

export default SectionPendingTasks;
