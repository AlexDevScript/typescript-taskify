import { initialForm } from "../../../helpers/initialForm";
import { ITask } from "../../../types";
import { useRef, useState, useEffect } from "react";

type FormInput =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

type FormSubmit = React.FormEvent<HTMLFormElement>;

interface Props {
  addTask(task: ITask): void;
  edit: ITask;
  editTask(task: ITask): void;
  handleError: (error: boolean) => void;
  disabled: boolean;
  btnCancel: () => void;
}

const Form = ({
  addTask,
  edit,
  editTask,
  handleError,
  disabled,
  btnCancel,
}: Props) => {
  const [form, setForm] = useState<ITask>(initialForm);
  const inputRef = useRef<HTMLInputElement>(null);

  const actionTask = form.id ? "Edita la tarea" : "Escribe una tarea";
  const actionPriority = form.id
    ? "Edita la prioridad"
    : "Selecciona la prioridad";
  const nameButton = form.id ? "Editar tarea" : "Crear tarea";

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
      return setForm(edit);
    }
  }, [edit]);

  const handleChange = (e: FormInput) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    if (!form.name || !form.priority) return handleError(true);

    form.id ? editTask(form) : addTask(form);

    setForm(initialForm);
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    btnCancel();
  };

  return (
    <>
      <form
        className="h-72 flex flex-col items-center justify-evenly"
        onSubmit={handleSubmit}>
        <label htmlFor="task" className="text-white">
          {actionTask}
        </label>

        <input
          className="w-11/12 h-10 md:w-1/2 text-center placeholder:text-center rounded-md"
          name="name"
          id="task"
          type="text"
          value={form.name}
          ref={inputRef}
          maxLength={50}
          placeholder="¿Qué tareas tienes para hoy?"
          onChange={handleChange}
        />
        <label htmlFor="priority" className="text-white">
          {actionPriority}
        </label>

        <select
          className="w-4/5 h-8 md:w-1/2"
          name="priority"
          id="priority"
          value={form.priority}
          onChange={handleChange}>
          <option value="">Prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <div className="w-full flex flex-col gap-2 items-center md:flex-row justify-center">
          <button className="w-40 h-11   bg-slate-400 text-black font-semibold tracking-wide rounded border-2 border-b-blue-400 border-x-blue-300 py-2 active:scale-90 ease-out duration-100 ring-white active:ring-2">
            {nameButton}
          </button>

          {disabled && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-40 bg-slate-400 text-black font-semibold tracking-wide rounded border-2 border-b-red-400 border-x-red-300 py-2 active:scale-90 ease-out duration-100 ring-white active:ring-2">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
