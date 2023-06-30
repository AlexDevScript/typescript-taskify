import { ITask } from "../../../types";
import ListTask from "../tasks-List/ListTask";

interface Props {
  tasks: ITask[];
  getEditTask: (task: ITask) => void;
  handleCompleted: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

const SectionCompletedTasks = ({
  tasks,
  getEditTask,
  handleCompleted,
  deleteTask,
}: Props) => {
  return (
    <section className="">
      <div className="bg-indigo-800 sticky top-0 text-center md:h-24 md:grid place-content-center">
        <h3 className="h-12 text-xl text-shadow-white font-bold text-indigo-100 grid place-items-center tracking-wider">
          Tareas completadas
        </h3>
      </div>

      <ListTask
        tasks={tasks}
        getEditTask={getEditTask}
        handleCompleted={handleCompleted}
        deleteTask={deleteTask}
      />
    </section>
  );
};

export default SectionCompletedTasks;
