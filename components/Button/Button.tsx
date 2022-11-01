import { FC } from "react";

interface Props {
  title: string;
  onClick?: () => void;
  width?: string;
  loading?: boolean;
  padding?: string;
}

const Button: FC<Props> = ({ title, onClick, width, loading, padding }) => {
  return (
    <button
      className={`ease group relative z-30 box-border inline-flex ${
        width ? width : "w-auto"
      } ${padding} cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black px-8 py-3 font-bold text-white hover:bg-neutral-700 focus:outline-none`}
      onClick={onClick}
    >
      <span className="relative z-20 flex items-center font-semibold">
        {loading ? "Loading..." : title}
      </span>
    </button>
  );
};

export default Button;
