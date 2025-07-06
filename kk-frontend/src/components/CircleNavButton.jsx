// Using Heroicons for nicer arrows
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

const CircleNavButton = ({ direction = "right", onClick }) => {
  const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-beige text-black flex items-center justify-center shadow-md hover:bg-wheat transition"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default CircleNavButton;
