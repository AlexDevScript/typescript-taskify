interface Props {
  icon: string;
  name: string;
  onClick: () => void;
}

const ListButton = ({ icon, name, onClick }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className="w-11 h-11 bg-white bg-opacity-60 rounded-full text-xl "
        onClick={onClick}>
        {icon}
      </button>
      <small>{name}</small>
    </div>
  );
};

export default ListButton;
