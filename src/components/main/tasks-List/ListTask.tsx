import { ITask } from "../../../types";
import ListButton from "./ListButton";

interface Props {
  tasks: ITask[];
  getEditTask: (task: ITask) => void;
  handleCompleted: (task: ITask) => void;
  deleteTask: (id: string) => void;
  disabled?: boolean;
}

const ListTask = ({
  tasks,
  getEditTask,
  handleCompleted,
  deleteTask,
  disabled,
}: Props) => {
  function bgColor(priority: string): string {
    switch (priority) {
      case "alta":
        return "bg-red-600";
      case "media":
        return "bg-orange-600";
      case "baja":
        return "bg-yellow-500";
      default:
        return "bg-slate-400";
    }
  }

  function colorBorder(priority: string): string {
    switch (priority) {
      case "alta":
        return "border-b-4 border-red-600 ";
      case "media":
        return "border-b-4 border-orange-600 ";
      case "baja":
        return "border-b-4 border-yellow-400 ";
      default:
        return "bg-white";
    }
  }

  return (
    <div className="h-[34rem] bg-slate-600 overflow-hidden scrollbar  overflow-y-auto md:h-[44rem] md:bg-hero bg-cover bg-center">
      {tasks.length === 0 && (
        <p className="w-full h-20 grid place-content-center font-bold text-2xl text-white text-shadow-white bg-black bg-opacity-50 ">
          No hay tareas😐
        </p>
      )}

      <ul className="md:flex flex-wrap justify-evenly lg:h-full lg:items-center lg:gap-x-5">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`h-40 mt-2 mb-3 flex flex-wrap justify-center items-center bg-primary bg-opacity-90 text-white ${colorBorder(
              task.priority
            )}md:w-80 lg:w-1/3 lg:max-w-xl lg:flex-grow `}>
            <span
              className={`w-2 h-20 inline-block ${bgColor(
                task.priority
              )}`}></span>
            <p
              className={`w-11/12 h-20 flex items-center break-words bg-opacity-50 ${
                !task.completed ? bgColor(task.priority) : bgColor("slate")
              }`}>
              {task.name}
            </p>
            {!disabled && (
              <div className="w-full flex justify-evenly items-center">
                {!task.completed && (
                  <ListButton
                    icon={"📝"}
                    name="Editar"
                    onClick={() => getEditTask(task)}
                  />
                )}
                <ListButton
                  icon={"☑️"}
                  name={
                    !task.completed
                      ? "Marcar como completada"
                      : "Marcar como pendiente"
                  }
                  onClick={() => handleCompleted(task)}
                />

                <ListButton
                  icon={"🗑️"}
                  name="Eliminar"
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTask;
