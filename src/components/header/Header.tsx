import { ITask } from "../../types";
import Form from "./form/Form";

interface Props {
  addTask(task: ITask): void;
  edit: ITask;
  editTask(task: ITask): void;
  handleError: (error: boolean) => void;
  disabled: boolean;
}

const Header = ({ addTask, edit, editTask, handleError, disabled }: Props) => {
  return (
    <header className="h-90 mb-3 bg-primary flex flex-col justify-evenly py-4">
      <h1 className="w-11/12 m-auto pb-2 text-3xl text-center text-white border-b-2">
        Tareas
      </h1>
      <Form
        addTask={addTask}
        edit={edit}
        editTask={editTask}
        handleError={handleError}
        disabled={disabled}
      />
      <small className="text-center text-white pb-2">
        La tarea no puede contener más de 50 caracteres.
      </small>
    </header>
  );
};

export default Header;
