import { IoClose, IoMenu } from "react-icons/io5";

export default function MenuIcons({ toggleMenu, menu, cross }) {
  return (
    <>
      <IoMenu
        onClick={toggleMenu}
        className={`menuIcons ${menu ? "visible" : ""}`}
      />

      <IoClose
        onClick={toggleMenu}
        className={`menuIcons ${cross ? "visible" : ""}`}
      />
    </>
  );
}
