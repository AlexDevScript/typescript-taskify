interface Props {
  name: string;
  bgColor: string;
  textColor: string;
  active: string;
  noTasks?: number;
  onClick: () => void;
}

const PendingTasksButton = ({
  name,
  bgColor,
  textColor,
  active,
  noTasks,
  onClick,
}: Props) => {
  const bg = active === name.toLocaleLowerCase() ? "bg-sky-700" : bgColor;

  return (
    <>
      <button
        onClick={onClick}
        className={`w-16 h-16 mb-2 rounded-full ${bg} ${textColor} flex flex-col justify-center items-center active:scale-90 ease-out duration-100 ring-white active:ring-2`}>
        {name}
        <small> {noTasks}</small>
      </button>
    </>
  );
};

export default PendingTasksButton;
