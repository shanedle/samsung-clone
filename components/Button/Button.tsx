import { Button as ButtonProps } from "@/interfaces/button.interface";

export default function Button({
  title,
  onClick,
  width,
  loading,
  padding,
}: ButtonProps) {
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
}
