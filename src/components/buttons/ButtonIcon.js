export default function ButtonIcon({ handleClick, icon }) {
  return (
    <span className={"button_icon"} onClick={handleClick}>
      {icon}
    </span>
  );
}
