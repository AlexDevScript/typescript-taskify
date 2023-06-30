import { useEffect } from "react";

interface Props {
  error: (error: boolean) => void;
  message: string;
}

const Error = ({ error, message }: Props) => {
  useEffect(() => {
    let timer: number;

    const handleTimeout = () => {
      timer = setTimeout(() => {
        error(false);
      }, 3000);
    };
    handleTimeout();

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <div className="bg-red-500 py-2 text-center font-bold text-white">
      <p>{message}</p>
    </div>
  );
};

export default Error;
