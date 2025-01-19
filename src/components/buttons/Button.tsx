import clsx from "clsx";

type ButtonProps = {
  label: string;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "default";
};

export default function Button({ label, type = "button", onClick, disabled, size = "default" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "border py-3 rounded-lg text-sm text-white bg-[#F5946D] cursor-pointer disabled:cursor-not-allowed hover:bg-[#e7a68c]",
        {
          "px-8": size === "default",
          "px-2": size === "small",
        }
      )}
    >
      {label}
    </button>
  );
}
