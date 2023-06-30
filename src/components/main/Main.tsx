import { ITask } from "../../types";
import useToggleBtn from "../../hooks/useToggleBtn";
import SectionCompletedTasks from "./section-completed-tasks/SectionCompletedTasks";
import SectionPendingTasks from "./section-pending-tasks/SectionPendingTasks";

interface Props {
  tasks: ITask[];
  getEditTask: (task: ITask) => void;
  handleCompleted(task: ITask): void;
  deleteTask: (id: string) => void;
  tasksCompleted: ITask[];
  disabled?: boolean;
}

const Main = ({
  tasks,
  tasksCompleted,
  getEditTask,
  handleCompleted,
  deleteTask,
  disabled,
}: Props) => {
  const taskCounter = tasks.length;
  const taskCompletedCounter = tasksCompleted.length;

  const { toggleTasks, isToggleTask } = useToggleBtn(
    taskCounter,
    taskCompletedCounter
  );

  return (
    <main className="h-auto mb-5">
      <div className="w-full h-16 mb-3 flex justify-evenly items-center bg-slate-600 ">
        {tasks.length > 0 && (
          <button
            className="w-44 h-12 bg-slate-400 text-sky-800 font-semibold tracking-wide rounded border-2 border-b-blue-500 border-x-blue-300 py-2 active:scale-90 ease-out duration-100 ring-white active:ring-2"
            onClick={() => toggleTasks(true)}>
            Pendientes {taskCounter}
          </button>
        )}
        {tasksCompleted.length > 0 && (
          <button
            className="w-44 h-12 bg-slate-400 text-indigo-800 font-semibold tracking-wide rounded border-2 border-b-indigo-500 border-x-indigo-300 py-2 active:scale-90 ease-out duration-100 ring-white active:ring-2"
            onClick={() => toggleTasks(false)}>
            Completadas {taskCompletedCounter}
          </button>
        )}
      </div>

      {tasks.length > 0 && isToggleTask && (
        <SectionPendingTasks
          tasks={tasks}
          getEditTask={getEditTask}
          handleCompleted={handleCompleted}
          deleteTask={deleteTask}
          disabled={disabled}
        />
      )}

      {tasksCompleted.length > 0 && !isToggleTask && (
        <SectionCompletedTasks
          tasks={tasksCompleted}
          getEditTask={getEditTask}
          handleCompleted={handleCompleted}
          deleteTask={deleteTask}
        />
      )}
    </main>
  );
};

export default Main;
