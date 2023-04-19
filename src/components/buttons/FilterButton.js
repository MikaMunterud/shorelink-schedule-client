import { IoClose } from "react-icons/io5";
import { MdFilterAlt } from "react-icons/md";

export default function FilterButton({
  className,
  handleClick,
  text,
  filter,
  cross,
}) {
  return (
    <button className={`button${className}`} onClick={handleClick}>
      {text}
      <MdFilterAlt className={`filterIcon ${filter}`} />
      <IoClose className={`filterIcon ${cross}`} />
    </button>
  );
}
