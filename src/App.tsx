import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Error from "./components/Error";
import useTaskCRUD from "./hooks/useTaskCRUD";

function App() {
  const {
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
  } = useTaskCRUD();

  return (
    <div className="w-11/12 min-h-screen max-w-screen-2xl m-auto flex flex-col justify-center lg:w-3/5">
      <Header
        addTask={addTask}
        edit={edit}
        editTask={editTask}
        handleError={handleError}
        disabled={disabled}
      />

      {errorForm && <Error error={handleError} message="Completa los campos" />}

      <Main
        tasks={tasks}
        getEditTask={getEditTask}
        handleCompleted={handleCompleted}
        deleteTask={deleteTask}
        tasksCompleted={tasksCompleted}
        disabled={disabled}
      />
    </div>
  );
}

export default App;
